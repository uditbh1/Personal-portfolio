
"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  vy: number; // Vertical velocity for a slight floating effect
  vx: number; // Horizontal velocity
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.0,
  particleDensity = 1200,
  className,
  particleColor = "#FFFFFF",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [particles, setParticles] = useState<Sparkle[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const interactionRef = useRef({ mouseX: 0, mouseY: 0, isInteracting: false });

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    const updateContainerSize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { clientWidth, clientHeight } = canvasRef.current.parentElement;
        setContainerSize({ width: clientWidth, height: clientHeight });
        if (canvasRef.current) {
            canvasRef.current.width = clientWidth;
            canvasRef.current.height = clientHeight;
        }
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  useEffect(() => {
    if (containerSize.width > 0 && containerSize.height > 0) {
      const numParticles = Math.floor(
        (particleDensity / 100000) * containerSize.width * containerSize.height
      );
      const newParticles: Sparkle[] = [];
      for (let i = 0; i < numParticles; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * containerSize.width,
          y: Math.random() * containerSize.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          color: particleColor,
          opacity: Math.random() * 0.5 + 0.2, // Start with some opacity
          vy: (Math.random() - 0.5) * 0.5, // Slow random float
          vx: (Math.random() - 0.5) * 0.3,
        });
      }
      setParticles(newParticles);
    }
  }, [containerSize, particleDensity, minSize, maxSize, particleColor]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        interactionRef.current.mouseX = event.clientX - rect.left;
        interactionRef.current.mouseY = event.clientY - rect.top;
        interactionRef.current.isInteracting = true;
      }
    };
    const handleMouseLeave = () => {
        interactionRef.current.isInteracting = false;
    }

    const parentElement = canvasRef.current?.parentElement;
    if (parentElement) {
        parentElement.addEventListener("mousemove", handleMouseMove);
        parentElement.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
        if (parentElement) {
            parentElement.removeEventListener("mousemove", handleMouseMove);
            parentElement.removeEventListener("mouseleave", handleMouseLeave);
        }
    };
  }, [canvasRef]);


  useEffect(() => {
    if (!context || !canvasRef.current) return;

    let animationFrameId: number;

    const render = () => {
      setParticles(currentParticles => {
        const updatedParticles = currentParticles.map(p => {
          let newPx = p.x + p.vx;
          let newPy = p.y + p.vy;

          // Boundary checks (wrap around)
          if (newPx > containerSize.width + p.size) newPx = -p.size;
          if (newPx < -p.size) newPx = containerSize.width + p.size;
          if (newPy > containerSize.height + p.size) newPy = -p.size;
          if (newPy < -p.size) newPy = containerSize.height + p.size;

          let newPVx = p.vx;
          let newPVy = p.vy;

          // Interaction effect
          if (interactionRef.current.isInteracting) {
            const dx = newPx - interactionRef.current.mouseX;
            const dy = newPy - interactionRef.current.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const interactionRadius = 100;
            if (distance < interactionRadius) {
              const forceDirectionX = dx / distance;
              const forceDirectionY = dy / distance;
              const force = (interactionRadius - distance) / interactionRadius;
              const maxSpeed = 2;
              newPVx += forceDirectionX * force * 0.5;
              newPVy += forceDirectionY * force * 0.5;
              newPVx = Math.max(-maxSpeed, Math.min(maxSpeed, newPVx));
              newPVy = Math.max(-maxSpeed, Math.min(maxSpeed, newPVy));
            }
          }
          
          // Gradually return to normal speed
          newPVx *= 0.98; 
          newPVy *= 0.98;
          if (Math.abs(newPVx) < 0.01) newPVx = (Math.random() - 0.5) * 0.3;
          if (Math.abs(newPVy) < 0.01) newPVy = (Math.random() - 0.5) * 0.5;

          // Twinkle effect (adjust opacity)
          const newOpacity = p.opacity + (Math.random() - 0.5) * 0.15;
          const finalOpacity = Math.max(0.1, Math.min(1, newOpacity));

          return {
            ...p,
            x: newPx,
            y: newPy,
            vx: newPVx,
            vy: newPVy,
            opacity: finalOpacity,
          };
        });

        // Draw updated particles
        context.clearRect(0, 0, containerSize.width, containerSize.height);
        updatedParticles.forEach(particle => {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
          context.fillStyle = particle.color;
          context.globalAlpha = particle.opacity;
          context.fill();
        });

        return updatedParticles;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, containerSize.width, containerSize.height]); // Corrected dependencies: removed `particles`

  return (
    <div className={cn("relative w-full h-full", className)}>
      <canvas
        id={id}
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: background,
          pointerEvents: "none", // Canvas itself should not capture mouse events for interaction
        }}
      />
    </div>
  );
};

