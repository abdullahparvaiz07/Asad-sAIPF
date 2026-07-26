import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { useScrollSystem } from '../ScrollSystem';

export interface ProjectGalleryItem {
  title: string;
  outcome: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  codeUrl?: string;
}

interface SemicircleGalleryProps {
  items: ProjectGalleryItem[];
  radius?: number;
  sizeVariance?: number;
  onCardClick: (index: number) => void;
  centerChildren?: React.ReactNode;
}

export function SemicircleGallery({
  items,
  radius: customRadius,
  sizeVariance = 0.12,
  onCardClick,
  centerChildren,
}: SemicircleGalleryProps) {
  const { motionEnabled } = useScrollSystem();
  const [windowWidth, setWindowWidth] = useState(1280);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track exact screen width to dynamically size and space the arc
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute fanned positioning, margins, and heights dynamically
  const layout = useMemo(() => {
    let radius = customRadius || 460;
    let cardSize = 200; // width/height in px
    let startAngle = -92; // degrees from vertical (reaching the outer edges)
    let endAngle = 92;   // degrees from vertical (reaching the outer edges)
    let containerHeight = 740;
    let centerY = 600;
    let isMobile = false;

    if (windowWidth < 768) {
      isMobile = true;
    } else if (windowWidth < 1024) {
      // Tablet layout
      radius = customRadius || 240;
      cardSize = 120;
      startAngle = -82;
      endAngle = 82;
      containerHeight = 400;
      centerY = 310;
    } else if (windowWidth < 1280) {
      // Medium Desktop layout
      radius = customRadius || 360;
      cardSize = 160;
      startAngle = -88;
      endAngle = 88;
      containerHeight = 580;
      centerY = 460;
    }

    const N = items.length;
    const angleStep = N > 1 ? (endAngle - startAngle) / (N - 1) : 0;

    const cards = items.map((item, i) => {
      const angleDegrees = startAngle + i * angleStep;
      const angleRadians = (angleDegrees * Math.PI) / 180;
      
      // Calculate scale prominence for center cards
      const distFromCenter = Math.abs(angleDegrees) / Math.max(Math.abs(startAngle), Math.abs(endAngle));
      const targetScale = 1 + (1 - distFromCenter) * sizeVariance;

      // Trigonometry positioning: x relative to centerX, y relative to centerY
      const x = radius * Math.sin(angleRadians);
      const y = -radius * Math.cos(angleRadians);

      return {
        item,
        index: i,
        x,
        y,
        angle: angleDegrees,
        scale: targetScale,
      };
    });

    return {
      cards,
      cardSize,
      containerHeight,
      centerY,
      isMobile,
    };
  }, [items, windowWidth, customRadius, sizeVariance]);

  // Center index for stagger delay calculation
  const centerIndex = (items.length - 1) / 2;

  // Render Mobile Layout: Horizontal Scroll-Snap Carousel
  if (layout.isMobile) {
    return (
      <div className="w-full flex flex-col gap-8">
        {/* Mobile Header / Headline Container */}
        <div className="px-4 text-center select-none flex flex-col items-center">
          {centerChildren}
        </div>

        {/* Scroll Snap Carousel Row */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto flex gap-4 px-6 snap-x snap-mandatory scroll-smooth scrollbar-none pb-4"
        >
          {items.map((item, i) => (
            <div
              key={`${item.title}-mobile-${i}`}
              onClick={() => onCardClick(i)}
              className="snap-center shrink-0 w-[240px] h-[240px] rounded-2xl overflow-hidden relative border border-white/[0.08] bg-[#111113] shadow-lg cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[7px] font-mono font-bold text-orange-500 tracking-wider block mb-1 uppercase">
                  Case Study_{(i + 1).toString().padStart(2, '0')}
                </span>
                <h4 className="text-xs font-black uppercase tracking-tight font-['Outfit'] mb-1">
                  {item.title}
                </h4>
                <p className="text-[10px] text-zinc-300 leading-relaxed font-sans line-clamp-2">
                  {item.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Desktop/Tablet Layout: Semicircular Arc Gallery
  return (
    <div
      className="relative w-full flex items-center justify-center select-none overflow-hidden"
      style={{ height: `${layout.containerHeight}px` }}
    >
      {/* Background radial spotlight grid inside the semicircle */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(240,90,40,0.03),transparent_60%)]" />

      {/* Radial Fanned Project Cards */}
      {layout.cards.map((card) => {
        // Calculate stagger delay based on distance from center card
        const distanceFromCenter = Math.abs(card.index - centerIndex);
        const staggerDelay = distanceFromCenter * 0.08;

        const cardVariants = {
          collapsed: {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 0.5,
            opacity: 0,
          },
          fanned: {
            x: card.x,
            y: card.y,
            rotate: card.angle,
            scale: card.scale,
            opacity: 1,
            transition: {
              duration: 0.85,
              delay: motionEnabled ? staggerDelay : 0,
              ease: [0.22, 1, 0.36, 1], // premium cubic-bezier easing
            },
          },
        };

        const halfSize = layout.cardSize / 2;

        return (
          <motion.div
            key={`${card.item.title}-${card.index}`}
            role="group"
            aria-label={`Project: ${card.item.title}`}
            tabIndex={0}
            onClick={() => onCardClick(card.index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCardClick(card.index);
              }
            }}
            variants={cardVariants}
            initial={motionEnabled ? "collapsed" : "fanned"}
            whileInView="fanned"
            viewport={{ once: true, margin: "-10%" }}
            whileHover={motionEnabled ? {
              x: card.x,
              y: card.y - 25, // lift slightly upwards (25px)
              rotate: 0, // straighten rotation to 0
              scale: card.scale * 1.08,
              zIndex: 50,
              transition: { duration: 0.3, ease: 'easeOut' },
            } : undefined}
            className="absolute rounded-2xl shadow-xl overflow-hidden border border-white/[0.08] bg-[#111113] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-orange-500 transform-gpu transition-shadow hover:shadow-[0_20px_45px_rgba(240,90,40,0.18)]"
            style={{
              width: layout.cardSize,
              height: layout.cardSize,
              // Centered coordinate anchors subtracting the card's half-size
              left: `calc(50% - ${halfSize}px)`,
              top: `calc(${layout.centerY}px - ${halfSize}px)`,
              transformOrigin: 'center center',
            }}
          >
            {/* Screenshot */}
            <img
              src={card.item.image}
              alt={card.item.title}
              className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-[1.05] transition-transform duration-700 ease-out"
              loading="lazy"
              draggable={false}
            />

            {/* Dark Mask on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Text Overlay */}
            <div className="absolute inset-0 p-4.5 flex flex-col justify-end text-left select-none pointer-events-none z-10">
              <span className="text-[7px] font-mono font-bold text-orange-500 tracking-wider block mb-1 uppercase">
                Case Study_{(card.index + 1).toString().padStart(2, '0')}
              </span>
              <h4 className="text-xs font-black uppercase tracking-tight font-['Outfit'] text-white leading-tight group-hover:text-orange-500 transition-colors duration-300 mb-0.5">
                {card.item.title}
              </h4>
              <p className="text-[9px] text-zinc-400 font-sans line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                {card.item.outcome}
              </p>
            </div>
          </motion.div>
        );
      })}

      {/* Central Headline, Subhead, and CTA Pill inside the arch pivot */}
      <div 
        className="absolute z-10 w-[280px] md:w-[320px] lg:w-[360px] text-center flex flex-col items-center justify-center p-4 select-none pointer-events-auto"
        style={{
          left: '50%',
          top: `${layout.centerY}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {centerChildren}
      </div>
    </div>
  );
}
