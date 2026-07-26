import React, { useState, useEffect, useMemo } from 'react';
import { useScrollSystem } from './ScrollSystem';
import { SemicircleGallery, ProjectGalleryItem } from './ui/semicircle-gallery';
import { ArrowUpRight, Github, X, Eye, Code } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

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
    title: 'NEXUS AUTOMATION ENGINE',
    outcome: 'Cut enterprise document processing time from 4 hours to 90 seconds.',
    description: 'Architected and implemented a high-performance multi-agent automation workflow that securely parses financial datasets, extracts complex tabular data, and performs automated cross-validation audits in real time.',
    tech: ['Python', 'LangChain', 'FastAPI', 'Supabase', 'Docker'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    liveUrl: 'https://example.com/nexus',
    repoUrl: 'https://github.com/example/nexus',
    altText: 'Technical diagram mock of the Nexus RAG pipeline rendering active nodes'
  },
  {
    id: '02',
    title: 'APEX NEURAL API',
    outcome: 'Reduced model inference latency by 40% under peak concurrent loads.',
    description: 'Designed a high-throughput orchestration layer for LLM requests, implementing smart semantic vector caching and load-aware queue routing across distributed GPU nodes to optimize hardware resource allocation.',
    tech: ['TypeScript', 'Next.js', 'PyTorch', 'Redis', 'AWS'],
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2000&auto=format&fit=crop',
    liveUrl: 'https://example.com/apex',
    repoUrl: 'https://github.com/example/apex',
    altText: 'Obsidian dark dashboard UI presenting neural network api latency statistics'
  },
  {
    id: '03',
    title: 'AURA SEMANTIC SHOP',
    outcome: 'Drove a 24% uplift in cart checkout completions via conceptual search.',
    description: 'Re-engineered the product discovery flow for a global merchant, replacing traditional keyword filtering with vector embedding indices to match buyer queries on intent, context, and semantic meaning.',
    tech: ['React', 'Node.js', 'Pinecone', 'Stripe', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    liveUrl: 'https://example.com/aura',
    repoUrl: 'https://github.com/example/aura',
    altText: 'Mock of Aura ecommerce mobile screen with product search outcomes'
  },
  {
    id: '04',
    title: 'ORBIT AGENT PLATFORM',
    outcome: 'Automated 80% of customer support workflows with zero hallucinations.',
    description: 'Developed an autonomous agent platform utilizing guardrailed state machines to handle user queries, execute database searches, and generate deterministic multi-step solutions without human intervention.',
    tech: ['Python', 'LangGraph', 'FastAPI', 'PostgreSQL', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2000&auto=format&fit=crop',
    liveUrl: 'https://example.com/orbit',
    repoUrl: 'https://github.com/example/orbit',
    altText: 'Network graph visualization of support agent routing paths'
  },
  {
    id: '05',
    title: 'SYNAPSE DATA MESH',
    outcome: 'Processed 10M+ daily telemetry events with sub-10ms query speeds.',
    description: 'Built a real-time event streaming architecture that aggregates distributed IoT sensor logs, performs online feature engineering, and streams analytics directly to live executive dashboards.',
    tech: ['Rust', 'Apache Kafka', 'GraphQL', 'ClickHouse', 'Docker'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop',
    liveUrl: 'https://example.com/synapse',
    repoUrl: 'https://github.com/example/synapse',
    altText: 'Dark theme server and data grid analytics interface'
  },
  {
    id: '06',
    title: 'VORTEX CLOUD VISION',
    outcome: 'Delivered real-time video stream analytics across 500+ edge endpoints.',
    description: 'Engineered a decentralized computer vision inference engine capable of multi-camera object tracking and automated anomaly detection with ultra-low latency.',
    tech: ['Go', 'WebRTC', 'TensorFlow', 'Kubernetes', 'GCP'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    liveUrl: 'https://example.com/vortex',
    repoUrl: 'https://github.com/example/vortex',
    altText: 'Futuristic cybernetic vision grid displaying real-time tracking metrics'
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
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] font-['Outfit']">
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
                <div className="text-[8px] font-mono text-[#f05a28] tracking-widest font-black uppercase mb-2">
                  // CORE INVENTORY
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black font-['Outfit'] tracking-tight leading-none text-white uppercase">
                  ENGINEERED<br />SOLUTIONS
                </h3>
                <p className="text-[10px] text-zinc-400 font-sans max-w-xs mt-2 leading-relaxed leading-normal px-2">
                  Intelligent workflows, scalable pipelines, and neural agent systems built for performance.
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
              <div className="h-44 sm:h-56 relative w-full overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.altText}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111115] to-black/30" />
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveProjectIndex(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-white hover:text-orange-500 hover:border-orange-500/40 flex items-center justify-center cursor-pointer transition-colors"
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
                      {selectedProject.tech.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/[0.05] font-mono text-[8px] text-zinc-300 font-bold uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
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
