import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!mountRef.current || prefersReducedMotion) return;

    // Three.js will be implemented here for 3D infinity loop and galaxy particles
    // For now, we'll create a CSS-based particle system as fallback
    const container = mountRef.current;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full opacity-60 animate-float';
      particle.style.background = `hsl(${Math.random() * 60 + 240}, 100%, 70%)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 6}s`;
      particle.style.animationDuration = `${4 + Math.random() * 4}s`;
      container.appendChild(particle);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div 
      ref={mountRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      data-testid="three-background"
    />
  );
}
