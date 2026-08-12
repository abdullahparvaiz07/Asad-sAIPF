import React, { useState, useEffect, useMemo } from 'react';
import { useScrollSystem } from './ScrollSystem';
import { SemicircleGallery, ProjectGalleryItem } from './ui/semicircle-gallery';
import { ArrowUpRight, Github, X, Eye, Code } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { getTechLogo } from './TechnicalExpertise';

/* -----------------------------------------------------------------------------
   PROJECT DATA CONFIGURATION
   ----------------------------------------------------------------------------- */

interface ProjectItem {
  id: string;
  title: string;
  outcome: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  altText: string;
}

const PROJECT_DATA: ProjectItem[] = [
  {
    id: '01',
    title: 'Linkedin Autoconnect Automation',
    outcome: 'Cut enterprise document processing time from 4 hours to 90 seconds.',
    description: 'This n8n workflow automates LinkedIn lead generation and network growth using PhantomBuster agents.',
    tech: ['n8n', 'PhantomBuster', 'Docker'],
    image: '/proj1.png',
    liveUrl: 'https://github.com/asadxagentic-ai/linkedin-auto-connect-automation',
    repoUrl: 'https://github.com/asadxagentic-ai/linkedin-auto-connect-automation',
    altText: 'Linkedin Autoconnect Automation'
  },
  {
    id: '02',
    title: 'Agent Swarm',
    outcome: 'Reduced model inference latency by 40% under peak concurrent loads.',
    description: 'Agent Swarm is a production-ready, modular n8n workflow that transforms Telegram into a unified interface for intelligent personal assistance.',
    tech: ['n8n', 'Docker'],
    image: '/proj2.png',
    liveUrl: 'https://github.com/asadxagentic-ai/a-fully-agentic-assistant',
    repoUrl: 'https://github.com/asadxagentic-ai/a-fully-agentic-assistant',
    altText: 'Agent Swarm'
  },
  {
    id: '03',
    title: 'AI CRM Sales Analysis',
    outcome: 'Drove a 24% uplift in cart checkout completions via conceptual search.',
    description: 'This n8n workflow automates the process of analyzing sales call transcripts from PDF files stored in Google Drive.',
    tech: ['n8n'],
    image: '/proj3.png',
    liveUrl: 'https://github.com/asadxagentic-ai/ai-crm-sales-analysis',
    repoUrl: 'https://github.com/asadxagentic-ai/ai-crm-sales-analysis',
    altText: 'AI CRM Sales Analysis'
  },
  {
    id: '04',
    title: 'Vapi AI Recipionist',
    outcome: 'Automated 80% of customer support workflows with zero hallucinations.',
    description: 'This n8n workflow automates the process of a AI Recipionist for a Real Estate Agent using Vapi API. The AI Recipionist is able to answer phone calls from potential buyers and schedule viewings.',
    tech: ['n8n', 'Vapi', 'Docker'],
    image: '/proj4.png',
    liveUrl: 'https://github.com/asadxagentic-ai/vapi-ai-receptionist',
    repoUrl: 'https://github.com/asadxagentic-ai/vapi-ai-receptionist',
    altText: 'Vapi AI Recipionist'
  },
  {
    id: '05',
    title: 'AI Weather Report Generator',
    outcome: 'Processed 10M+ daily telemetry events with sub-10ms query speeds.',
    description: 'This n8n workflow automates the generation and delivery of a comprehensive daily weather intelligence report.',
    tech: ['n8n', 'OpenWeatherMap', 'Docker', 'Telegram'],
    image: '/proj5.png',
    liveUrl: 'https://github.com/asadxagentic-ai/ai-weather-intelligence-report-generator',
    repoUrl: 'https://github.com/asadxagentic-ai/ai-weather-intelligence-report-generator',
    altText: 'AI Weather Report Generator'
  },
  {
    id: '06',
    title: 'AI Social media post generator',
    outcome: 'Delivered real-time video stream analytics across 500+ edge endpoints.',
    description: 'This n8n workflow automates the end-to-end creation and publishing of social media content across Facebook, LinkedIn, and Pinterest.',
    tech: ['n8n', 'Docker'],
    image: '/proj6.png',
    liveUrl: 'https://github.com/asadxagentic-ai/ai-social-media-post-generator',
    repoUrl: 'https://github.com/asadxagentic-ai/ai-social-media-post-generator',
    altText: 'AI Social media post generator'
  },
  {
    id: '07',
    title: 'AI Whatsapp Rag Business Assistant',
    outcome: 'Delivered real-time video stream analytics across 500+ edge endpoints.',
    description: 'An intelligent WhatsApp business assistant built with n8n that automatically handles incoming messages, classifies them as client inquiries or personal messages.',
    tech: ['n8n', 'Docker'],
    image: '/proj6.png',
    liveUrl: 'https://github.com/asadxagentic-ai/ai-whatsapp-rag-business-assistant',
    repoUrl: 'https://github.com/asadxagentic-ai/ai-whatsapp-rag-business-assistant',
    altText: 'AI Whatsapp Rag Business Assistant'
  }
];

export function Projects() {
  const { motionEnabled, scrollTo } = useScrollSystem();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeProjectIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeProjectIndex]);

  const galleryItems: ProjectGalleryItem[] = useMemo(() =>
    PROJECT_DATA.map((item) => ({
      title: item.title,
      outcome: item.outcome,
      tags: item.tech,
      image: item.image,
      liveUrl: item.liveUrl,
      codeUrl: item.repoUrl,
    })),
  []);

  // Find active project data
  const selectedProject = useMemo(() => {
    if (activeProjectIndex === null) return null;
    return PROJECT_DATA[activeProjectIndex];
  }, [activeProjectIndex]);

  const handleCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo('contact');
  };

  return (
    <section
      id="projects"
      className="relative bg-[#09090b] border-t border-white/[0.04] py-24 selection:bg-orange-500 selection:text-white overflow-hidden"
    >
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 bottom-0 left-[5%] right-[5%] flex justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-px h-full" style={{ background: 'rgba(255,255,255,0.015)' }} />
          ))}
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10 px-[5%] md:px-0 flex flex-col gap-10">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 select-none z-20 px-4 md:px-0">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3 font-mono text-[9px] font-black tracking-[0.28em] text-zinc-500">
              <span className="text-orange-500">//</span> SELECTED CASE STUDIES
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tighter uppercase leading-[0.9] font-['Outfit']">
              FEATURED<br />
              <span
                className="block text-white"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.3)',
                }}
              >
                PROJECTS
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <span className="font-mono text-xs font-bold tracking-widest text-[#f05a28] uppercase">
              Fanned Arc Showcase
            </span>
            <p className="text-xs text-zinc-400 font-sans max-w-xs leading-relaxed">
              Hover over a case study thumbnail to inspect it, or click to lock target and download complete diagnostic parameters.
            </p>
          </div>
        </div>

        {/* Semicircular Arc Gallery Component */}
        <div className="w-full relative overflow-visible mt-4">
          <SemicircleGallery
            items={galleryItems}
            onCardClick={(index) => setActiveProjectIndex(index)}
            centerChildren={
              <>
                <div className="text-[10px] font-mono text-[#f05a28] tracking-widest font-black uppercase mb-2">
                  // CORE INVENTORY
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black font-['Outfit'] tracking-tight leading-none text-white uppercase whitespace-nowrap">
                 AI SYSTEMS ENGINEERING
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-sm sm:max-w-md md:max-w-lg mt-2.5 leading-relaxed px-2">
                  Designing, deploying, and scaling intelligent systems, agentic workflows, and machine learning infrastructure.
                </p>
                <button
                  onClick={handleCTA}
                  className="px-8 py-3 bg-[#f05a28] hover:bg-[#ff6d39] text-white font-bold text-[11px] uppercase tracking-widest rounded-full mt-5 cursor-pointer shadow-lg shadow-orange-500/20 active:scale-95 transition-all select-none"
                >
                  LET'S COLLABORATE
                </button>
              </>
            }
          />
        </div>
      </div>

      {/* Case Study Detail Modal (Signature Interaction) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProjectIndex(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111115] border border-zinc-800 rounded-3xl shadow-2xl flex flex-col z-10 scrollbar-thin"
            >
              {/* Image Banner */}
              <div className="h-48 sm:h-64 relative w-full overflow-hidden bg-[#0c0c0e]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.altText}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-[#111115]/30 to-black/40" />
                
                {/* Mock Window Header Bar */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono text-[9px] font-bold text-zinc-300 uppercase tracking-widest">
                    CASE STUDY #{selectedProject.id}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveProjectIndex(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white hover:text-orange-500 hover:border-orange-500/40 flex items-center justify-center cursor-pointer transition-colors z-20"
                  aria-label="Close case study details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-mono text-[#f05a28] tracking-widest font-black uppercase">
                      // SYSTEM DIAGNOSTICS REPORT
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] uppercase text-white tracking-tight leading-none mb-4">
                    {selectedProject.title}
                  </h3>

                  {/* Impact Outcome Block */}
                  <div className="mb-5 bg-orange-950/20 border border-orange-500/10 rounded-xl p-4">
                    <span className="text-[8px] font-mono text-orange-500 tracking-wider font-bold block mb-1 uppercase">
                      SYSTEM IMPACT / KEY OUTCOME
                    </span>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {selectedProject.outcome}
                    </p>
                  </div>

                  {/* Deep Description */}
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack tags */}
                  <div className="mb-6">
                    <span className="text-[8px] font-mono text-zinc-500 tracking-wider font-bold block mb-2 uppercase">
                      INTEGRATION STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tag) => {
                        const logo = getTechLogo(tag);
                        return (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/[0.05] font-mono text-[8px] text-zinc-300 font-bold uppercase tracking-wider flex items-center gap-1.5"
                          >
                            {logo && <img src={logo} alt={tag} className="w-3.5 h-3.5 object-contain" />}
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center gap-3 pt-5 border-t border-zinc-900 select-none">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f05a28] hover:bg-[#ff6d39] text-white font-bold text-[10px] uppercase tracking-widest cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {selectedProject.repoUrl && (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-900 hover:text-white text-zinc-400 font-bold text-[10px] uppercase tracking-widest cursor-pointer active:scale-95 transition-all"
                    >
                      <span>Github Repo</span>
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
