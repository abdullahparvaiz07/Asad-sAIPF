import React, { useRef } from 'react';
import { useMouseTracker } from '../utils/MouseTracker';
import { MaskReveal } from './MaskReveal';

interface HeroImageProps {
  originalSrc?: string;
  revealedSrc?: string;
  altText?: string;
  className?: string;
}

/**
 * HeroImage Component
 * High-end interactive element for the AI Engineer portfolio.
 * Combines MouseTracker logic with MaskReveal visuals to create
 * a luxury cursor-following reveal experience.
 */
export function HeroImage({
  originalSrc = '/portrait.png',
  revealedSrc = '/maskimage.png',
  altText = 'Asadullah Portrait',
  className = ''
}: HeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse coordinates, lerp positioning, and state at 60fps
  const { isHovered, isMobile, reducedMotion } = useMouseTracker(containerRef, {
    lerpFactor: 0.08, // luxurious lag-behind feeling
    mobileFloatSpeed: 0.0025 // slow elegant drift
  });

  return (
    <div
      ref={containerRef}
      className={`hero-image-container relative w-full h-full cursor-none select-none overflow-hidden pointer-events-auto ${className}`}
    >
      {/* ── Inner Mask Reveal Effect ── */}
      <MaskReveal
        originalSrc={originalSrc}
        revealedSrc={revealedSrc}
        altText={altText}
        isHovered={isHovered}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}
export default HeroImage;
