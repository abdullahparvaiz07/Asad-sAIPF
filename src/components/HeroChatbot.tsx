import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, X, Bot, User, MessageSquare, ChevronDown, RefreshCw, ArrowUpRight } from 'lucide-react';
import { useScrollSystem } from './ScrollSystem';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  'What AI agents do you build?',
  'Tell me about Asadullah',
  'What tech stack do you use?',
  'How can we collaborate?'
];

// Persona Knowledge Base for fallback AI responses
const ASADULLAH_KNOWLEDGE: Record<string, string> = {
  agents: "I build autonomous AI agent networks using LangChain and LangGraph. My agents handle multi-step planning, tool execution, long-term memory, multi-agent consensus, and RAG document parsing.",
  about: "Asadullah is an AI Automation Expert and Full-Stack System Architect. He designs intelligent workflows, AI chatbots, and cloud infrastructure that cut operational overhead by up to 90%.",
  tech: "Core Tech Stack: Python, TypeScript, FastAPI, LangChain, LangGraph, Next.js, React, Supabase, Redis, PyTorch, Docker, and Google Gemini API.",
  collaborate: "You can collaborate by sending a project inquiry via the Contact form or booking a discovery call! Scroll to the Contact section or click 'Let's Talk'.",
  default: "I'm Asadullah's AI Assistant! I can answer questions about his AI agent engineering, automation systems, tech stack, and project availability. Feel free to ask anything!"
};

export function HeroChatbot() {
  const { scrollTo } = useScrollSystem();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Hi! I'm Asadullah's AI Assistant. Ask me anything about his AI agent engineering, projects, or how to automate your business workflows!",
      timestamp: getFormattedTime()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat history to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Focus input on expand
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  function getFormattedTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const generateResponse = async (userText: string) => {
    setIsTyping(true);

    const apiKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? (process as any).env?.GEMINI_API_KEY : '');

    let replyText = '';

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `System Persona: You are the official AI Assistant on Asadullah's portfolio website. Asadullah is a world-class AI Automation Expert & System Architect specializing in Autonomous AI Agents, LangGraph multi-agent networks, RAG pipelines, FastAPI backends, and full-stack AI applications. Respond concisely, professionally, and warmly in 2-3 sentences max.
                    
User Question: ${userText}`
                  }
                ]
              }
            ]
          })
        });

        const data = await response.json();
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          replyText = data.candidates[0].content.parts[0].text;
        }
      } catch (e) {
        // Fallback to local knowledge base on network/API failure
      }
    }

    // Intelligent local fallback if no API key or on network delay
    if (!replyText) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const lower = userText.toLowerCase();

      if (lower.includes('agent') || lower.includes('build') || lower.includes('service')) {
        replyText = ASADULLAH_KNOWLEDGE.agents;
      } else if (lower.includes('about') || lower.includes('who') || lower.includes('asadullah')) {
        replyText = ASADULLAH_KNOWLEDGE.about;
      } else if (lower.includes('tech') || lower.includes('stack') || lower.includes('framework') || lower.includes('python')) {
        replyText = ASADULLAH_KNOWLEDGE.tech;
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('work') || lower.includes('collaborate') || lower.includes('cost')) {
        replyText = ASADULLAH_KNOWLEDGE.collaborate;
      } else {
        replyText = `Asadullah specializes in building next-gen AI automation and multi-agent systems. ${ASADULLAH_KNOWLEDGE.collaborate}`;
      }
    }

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: getFormattedTime()
      }
    ]);
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: getFormattedTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    generateResponse(text);
  };

  return (
    <div className="relative pointer-events-auto select-none z-30">
      {/* Collapsed Minimal Chatbot Icon Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#111115]/90 hover:bg-[#18181f] border border-white/15 hover:border-[#f05a28]/60 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(240,90,40,0.3)] cursor-pointer p-2.5"
              aria-label="Open AI Chatbot"
            >
              {/* Glowing Pulse Online Dot */}
              <div className="absolute -top-1 -right-1 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#111115]" />
                <span className="absolute w-3 h-3 rounded-full bg-emerald-400/70 animate-ping" />
              </div>

              {/* Chatbot Icon */}
              <img 
                src="/chatboticon.png" 
                alt="AI Chatbot" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md" 
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Glass Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[320px] sm:w-[360px] bg-[#0d0d11]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden text-white"
          >
            {/* Top Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#14141c] to-[#0d0d11] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center p-1 shadow-md shadow-orange-500/10">
                  <img src="/chatboticon.png" alt="Chatbot Icon" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-['Outfit'] leading-tight flex items-center gap-1.5">
                    ASADULLAH <span className="text-[#f05a28]">AI</span>
                  </h4>
                  <p className="text-[9.5px] text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE // GEMINI ENGINE
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Close Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[280px] sm:max-h-[320px] scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6.5 h-6.5 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center p-0.5 shrink-0 mt-0.5 shadow-sm">
                      <img src="/chatboticon.png" alt="AI Avatar" className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#f05a28] text-white font-medium rounded-tr-xs shadow-md'
                        : 'bg-white/8 border border-white/10 text-zinc-200 rounded-tl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[8.5px] font-mono block mt-1 ${
                        msg.sender === 'user' ? 'text-white/70 text-right' : 'text-zinc-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5 items-center text-zinc-400 text-xs pl-1"
                >
                  <div className="w-6.5 h-6.5 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center p-0.5 shrink-0 shadow-sm animate-pulse">
                    <img src="/chatboticon.png" alt="AI Avatar" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-2 rounded-2xl rounded-tl-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f05a28] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f05a28] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f05a28] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#f05a28]/20 border border-white/10 hover:border-[#f05a28]/40 text-[9.5px] font-medium text-zinc-300 hover:text-white whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#111116] border-t border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about AI agents, tech stack..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-[#f05a28]/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-xl bg-[#f05a28] hover:bg-[#ff6d39] disabled:opacity-40 disabled:hover:bg-[#f05a28] text-white flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
