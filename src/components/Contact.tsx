import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollSystem';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<'name' | 'email' | 'message' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Live GMT+5 Pakistan Time Ticker
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(new Date()) + ' PKT (GMT+5)');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "39ffa184-867d-4163-99dc-90b4f0361f23",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        console.error("Invalid Form Data", result);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <section 
      id="contact" 
      className="relative bg-white text-[#111] py-24 md:py-32 px-[5%] border-t border-zinc-200 overflow-hidden font-sans selection:bg-orange-500 selection:text-white"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[5%] right-[5%] pointer-events-none z-0 flex justify-between select-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-px h-full bg-zinc-100/80" />
        ))}
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Editorial Text & Social Channels */}
          <ScrollReveal variant="fade-up" duration={0.8} className="lg:col-span-5 flex flex-col justify-between h-full select-none">
            <div>
              <div className="flex items-center gap-3 mb-6 font-mono text-[9px] font-black tracking-[0.28em] text-zinc-400">
                <span className="text-orange-500">//</span> TRANSMIT ENQUIRY
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] font-['Outfit'] mb-8 sm:mb-10 text-zinc-950">
                LET'S START<br/>
                <span className="text-zinc-400">SOMETHING</span><br/>
                <span className="text-orange-600">NEW.</span>
              </h2>
            </div>

            {/* Metagrid: Location & Local time */}
            <div className="space-y-6 mb-10 font-mono text-[10px] tracking-wider text-zinc-500">
              <motion.div 
                className="border-t border-zinc-100 pt-5 group cursor-default"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="text-zinc-400 block mb-1 uppercase font-bold group-hover:text-orange-500/70 transition-colors duration-300">// HQ LOCATION</span>
                <span className="text-zinc-800 font-semibold uppercase">Pakistan, Global Operations</span>
              </motion.div>
              <motion.div 
                className="border-t border-zinc-100 pt-5 group cursor-default"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="text-zinc-400 block mb-1 uppercase font-bold group-hover:text-orange-500/70 transition-colors duration-300">// LOCAL ZONE TIME</span>
                <span className="text-zinc-800 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-glow" />
                  {localTime}
                </span>
              </motion.div>
            </div>

            {/* Social Channels (Uiverse EcheverriaJesus Style) */}
            <div className="border-t border-zinc-100 pt-6">
              <span className="text-[9px] font-mono text-zinc-400 block mb-5 uppercase tracking-wider font-bold">
                // System Directories
              </span>
              <div className="flex gap-4 items-center flex-wrap pl-1">
                
                {/* GitHub */}
                <a
                  href="https://github.com/asadullah"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex justify-center p-3.5 rounded-md drop-shadow-xl bg-gradient-to-r from-zinc-800 to-zinc-950 text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#24292e] hover:to-[#0f1419] cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"
                    />
                  </svg>
                  <span className="absolute opacity-0 group-hover:opacity-100 text-zinc-800 text-xs font-mono font-bold tracking-wider uppercase group-hover:-translate-y-9 duration-700 pointer-events-none">
                    GitHub
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/asadullah"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex justify-center p-3.5 rounded-md drop-shadow-xl bg-gradient-to-r from-[#0077b5] to-[#00598c] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#00598c] hover:to-[#003c61] cursor-pointer"
                  aria-label="LinkedIn Profile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  <span className="absolute opacity-0 group-hover:opacity-100 text-[#0077b5] text-xs font-mono font-bold tracking-wider uppercase group-hover:-translate-y-9 duration-700 pointer-events-none">
                    LinkedIn
                  </span>
                </a>

                {/* Discord */}
                <a
                  href="https://discord.gg/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex justify-center p-3.5 rounded-md drop-shadow-xl bg-gradient-to-r from-[#5865f2] to-[#404eed] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#404eed] hover:to-[#2e3bbf] cursor-pointer"
                  aria-label="Discord Channel"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 18.27 18.27 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"
                    />
                  </svg>
                  <span className="absolute opacity-0 group-hover:opacity-100 text-[#5865f2] text-xs font-mono font-bold tracking-wider uppercase group-hover:-translate-y-9 duration-700 pointer-events-none">
                    Discord
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/+923038837299"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex justify-center p-3.5 rounded-md drop-shadow-xl bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#128c7e] hover:to-[#0b544b] cursor-pointer"
                  aria-label="WhatsApp Contact"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path
                      d="M12.004 0C5.378 0 0 5.374 0 12.001c.001 2.124.553 4.197 1.6 6.012l-1.7 6.2 6.34-1.662c1.78.973 3.774 1.487 5.798 1.488h.008c6.622 0 12.001-5.378 12.001-12.004 0-3.21-1.25-6.223-3.51-8.49C18.23 1.25 15.213 0 12.004 0zm0 21.996c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.79.99.1-3.69-.24-.38a9.92 9.92 0 0 1-1.52-5.3c0-5.51 4.49-10 10-10 2.67 0 5.18 1.04 7.07 2.93a9.9 9.9 0 0 1 2.93 7.07c-.01 5.52-4.5 10.01-10.01 10.01zm5.5-7.51c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07a8.1 8.1 0 0 1-2.38-1.47 8.93 8.93 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6l.43-.5c.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.59-.5-.51-.67-.52h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.07 4.48.71.3 1.26.49 1.69.62.75.24 1.43.2 1.97.12.6-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35z"
                    />
                  </svg>
                  <span className="absolute opacity-0 group-hover:opacity-100 text-[#25d366] text-xs font-mono font-bold tracking-wider uppercase group-hover:-translate-y-9 duration-700 pointer-events-none">
                    WhatsApp
                  </span>
                </a>

              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: Interactive Contact Form */}
          <ScrollReveal variant="fade-up" delay={0.15} duration={0.8} className="lg:col-span-7 bg-[#fafafa] border border-zinc-200/60 rounded-3xl p-6 md:p-10 shadow-lg shadow-zinc-100 relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <input type="hidden" name="access_key" value="39ffa184-867d-4163-99dc-90b4f0361f23" />
                  
                  {/* Name Input */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-zinc-200 focus:border-orange-500 py-3 text-[#111] transition-colors focus:outline-none placeholder-transparent text-sm font-semibold relative z-10"
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-0 transition-all pointer-events-none select-none z-10 ${
                        focusedField === 'name' || formData.name 
                          ? '-top-3.5 text-[9px] text-orange-600 font-mono font-bold uppercase tracking-wider' 
                          : 'top-3 text-sm text-zinc-400 font-medium'
                      }`}
                    >
                      Your Name
                    </label>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-zinc-200 focus:border-orange-500 py-3 text-[#111] transition-colors focus:outline-none placeholder-transparent text-sm font-semibold relative z-10"
                    />
                    <label 
                      htmlFor="email" 
                      className={`absolute left-0 transition-all pointer-events-none select-none z-10 ${
                        focusedField === 'email' || formData.email 
                          ? '-top-3.5 text-[9px] text-orange-600 font-mono font-bold uppercase tracking-wider' 
                          : 'top-3 text-sm text-zinc-400 font-medium'
                      }`}
                    >
                      Email Address
                    </label>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                    <textarea 
                      id="message" 
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-zinc-200 focus:border-orange-500 py-3 text-[#111] transition-colors focus:outline-none placeholder-transparent text-sm font-semibold relative z-10 resize-none min-h-[100px]"
                    />
                    <label 
                      htmlFor="message" 
                      className={`absolute left-0 transition-all pointer-events-none select-none z-10 ${
                        focusedField === 'message' || formData.message 
                          ? '-top-3.5 text-[9px] text-orange-600 font-mono font-bold uppercase tracking-wider' 
                          : 'top-3 text-sm text-zinc-400 font-medium'
                      }`}
                    >
                      Project Details & scope
                    </label>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>

                   {/* Submit Button */}
                   <motion.div
                     whileHover={{ scale: 1.015, y: -1 }}
                     whileTap={{ scale: 0.985 }}
                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                   >
                     <button 
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full py-4 px-6 rounded-full bg-zinc-950 text-white font-bold text-xs uppercase tracking-widest hover:bg-orange-600 hover:shadow-[0_10px_35px_rgba(234,88,12,0.3)] active:scale-100 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-500 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group relative overflow-hidden"
                     >
                       {/* Shimmer sweep on hover */}
                       <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />
                       {isSubmitting ? (
                         <>
                           <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                           Transmitting details...
                         </>
                       ) : (
                         <>
                           Transmit message <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                         </>
                       )}
                     </button>
                   </motion.div>
                </motion.form>
              ) : (
                /* SUCCESS SCREEN */
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-50/80 border border-orange-200 flex items-center justify-center text-orange-600 mb-6 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <span className="text-[10px] font-mono font-bold text-orange-500 tracking-wider block mb-2 uppercase">
                    transmission received
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-black font-['Outfit'] text-zinc-950 uppercase mb-4 leading-tight">
                    Thank you, {formData.name.split(' ')[0]}!
                  </h3>
                  
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans max-w-sm mb-8 font-medium">
                    Your message packet has been routed successfully. I will review your project details and get back to you within 24 hours.
                  </p>

                   <motion.button 
                     onClick={handleReset}
                     className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-orange-300 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700 focus:ring-2 focus:ring-zinc-400 focus:outline-none transition-all duration-300 cursor-pointer hover:shadow-[0_4px_20px_rgba(240,90,40,0.1)] group"
                     whileHover={{ scale: 1.04, y: -2 }}
                     whileTap={{ scale: 0.97 }}
                     transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                   >
                     Send another message
                     <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                   </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
