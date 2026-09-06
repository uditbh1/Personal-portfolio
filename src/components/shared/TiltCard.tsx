"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltFactor?: number;
  perspective?: number;
  hoverScale?: number;
  glareEffect?: boolean;
  glareIntensity?: number;
  glareSize?: number;
  borderRadius?: number | string;
}

/**
 * 3D Tilt Card Component
 * Implements smooth cursor-tracking tilt with spring physics and subtle specular sheen.
 * Fully click-through safe: interactive children (buttons, links) are elevated and never blocked.
 */
export default function TiltCard({
  children,
  className = "",
  tiltFactor = 10,
  perspective = 1000,
  hoverScale = 1.02,
  glareEffect = true,
  glareIntensity = 0.06, // Significantly toned down from 0.28+ to prevent milky white film
  glareSize = 40,        // Tightened from 85% to 40% for a subtle specular highlight
  borderRadius = "1rem",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values update directly on the GPU without triggering React component re-renders.
  // This ensures mousedown -> mouseup sequences are never interrupted by re-renders.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHovered = useMotionValue(0);

  // Smooth springs for natural deceleration
  const springConfig = { stiffness: 260, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-50, 50], [tiltFactor, -tiltFactor]), springConfig);
  const rotateY = useSpring(useTransform(x, [-50, 50], [-tiltFactor, tiltFactor]), springConfig);
  const scale = useSpring(useTransform(isHovered, [0, 1], [1, hoverScale]), springConfig);
  const glareOpacity = useSpring(useTransform(isHovered, [0, 1], [0, glareIntensity]), springConfig);

  // Calculate glare position mapping
  const glareX = useTransform(x, [-50, 50], [30, 70]);
  const glareY = useTransform(y, [-50, 50], [30, 70]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
      x.set(mouseX);
      y.set(mouseY);
    },
    [x, y]
  );

  const handleMouseEnter = useCallback(() => {
    isHovered.set(1);
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    isHovered.set(0);
    x.set(0);
    y.set(0);
  }, [isHovered, x, y]);

  return (
    <div
      ref={cardRef}
      style={{
        perspective: `${perspective}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          borderRadius,
        }}
        className="relative w-full h-full"
      >
        {/* Card Content Layer — elevated to z-10 with pointer-events-auto for 100% clickability */}
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>

        {/* Subtle Specular Sheen — strictly backgrounded at z-20 with pointer-events-none */}
        {glareEffect && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              borderRadius,
              opacity: glareOpacity,
              background: useTransform(
                [glareX, glareY],
                ([latestX, latestY]) =>
                  `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) ${glareSize}%)`
              ),
            }}
            className="pointer-events-none select-none"
            aria-hidden="true"
          />
        )}
      </motion.div>
    </div>
  );
}
