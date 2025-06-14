
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
      context.clearRect(0, 0, containerSize.width, containerSize.height);

      particles.forEach((p, index) => {
        // Update particle position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks (wrap around)
        if (p.x > containerSize.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = containerSize.width + p.size;
        if (p.y > containerSize.height + p.size) p.y = -p.size;
        if (p.y < -p.size) p.y = containerSize.height + p.size;

        // Interaction effect
        if (interactionRef.current.isInteracting) {
          const dx = p.x - interactionRef.current.mouseX;
          const dy = p.y - interactionRef.current.mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = 100; 
          if (distance < interactionRadius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (interactionRadius - distance) / interactionRadius;
            const maxSpeed = 2;
            p.vx += forceDirectionX * force * 0.5;
            p.vy += forceDirectionY * force * 0.5;

            p.vx = Math.max(-maxSpeed, Math.min(maxSpeed, p.vx));
            p.vy = Math.max(-maxSpeed, Math.min(maxSpeed, p.vy));
          }
        }
        
        // Gradually return to normal speed
        p.vx *= 0.98; 
        p.vy *= 0.98;
        if (Math.abs(p.vx) < 0.01) p.vx = (Math.random() - 0.5) * 0.3;
        if (Math.abs(p.vy) < 0.01) p.vy = (Math.random() - 0.5) * 0.5;


        // Twinkle effect (adjust opacity)
        const newOpacity = p.opacity + (Math.random() - 0.5) * 0.15;
        p.opacity = Math.max(0.1, Math.min(1, newOpacity));

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
        context.fillStyle = p.color;
        context.globalAlpha = p.opacity;
        context.fill();
      });

      setParticles([...particles]); // Trigger re-render if needed, or manage state more directly
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, particles, containerSize]);

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

