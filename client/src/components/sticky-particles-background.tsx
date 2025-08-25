import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from './three-background';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface StickyParticlesBackgroundProps {
  className?: string;
}

type SectionConfig = {
  opacity: number;
  cinematicPhase: 'particles' | 'buildup' | 'climax' | 'transition' | 'content';
  scale: number;
  rotation: number;
  color: 'white' | 'purple' | 'blue';
  shape?: 'infinity' | 'questionMark';
  morphProgress?: number;
};

const sectionConfigs: Record<string, SectionConfig> = {
  'hero': {
    opacity: 1.2,
    cinematicPhase: 'climax',
    scale: 1.0,
    rotation: 0,
    color: 'white'
  },
  'brand-activation': {
    opacity: 1.2,
    cinematicPhase: 'climax',
    scale: 1.3,
    rotation: 0,
    color: 'white',
    shape: 'questionMark',
    morphProgress: 0.0 // Will be set dynamically by scroll
  },
  'products': {
    opacity: 0.8,
    cinematicPhase: 'content',
    scale: 0.9,
    rotation: -10,
    color: 'white'
  },
  'meet-talia': {
    opacity: 1.0,
    cinematicPhase: 'particles',
    scale: 1.2,
    rotation: 30,
    color: 'blue'
  },
  'beyond-booths': {
    opacity: 0.7,
    cinematicPhase: 'transition',
    scale: 0.8,
    rotation: -20,
    color: 'white'
  },
  'stats': {
    opacity: 1.1,
    cinematicPhase: 'climax',
    scale: 1.0,
    rotation: 45,
    color: 'purple'
  },
  'cta': {
    opacity: 0.6,
    cinematicPhase: 'content',
    scale: 0.9,
    rotation: 0,
    color: 'white'
  },
  'analytics': {
    opacity: 0.9,
    cinematicPhase: 'buildup',
    scale: 1.1,
    rotation: -30,
    color: 'blue'
  },
  'clients': {
    opacity: 0.5,
    cinematicPhase: 'transition',
    scale: 0.7,
    rotation: 15,
    color: 'white'
  },
  'footer': {
    opacity: 0.4,
    cinematicPhase: 'content',
    scale: 0.6,
    rotation: 0,
    color: 'purple'
  }
};

export default function StickyParticlesBackground({ className }: StickyParticlesBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentSection, setCurrentSection] = useState('hero');
  const [config, setConfig] = useState(sectionConfigs.hero);
  const [scrollBasedMorphProgress, setScrollBasedMorphProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setConfig({
        opacity: 0.8,
        cinematicPhase: 'content',
        scale: 1.0,
        rotation: 0,
        color: 'white'
      });
      return;
    }

    // Set up intersection observer to detect viewport sections
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when section is 20% into viewport
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId && sectionConfigs[sectionId]) {
            setCurrentSection(sectionId);
            setConfig(sectionConfigs[sectionId]);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    // Scroll-based morphing for brand-activation section
    const handleScroll = () => {
      const brandActivationSection = document.querySelector('[data-section="brand-activation"]');
      if (!brandActivationSection) return;

      const rect = brandActivationSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within the brand-activation section
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;
      
      let morphProgress = 0;
      
      if (sectionTop <= windowHeight && sectionBottom >= 0) {
        // Section is in viewport
        if (sectionTop <= windowHeight * 0.5 && sectionBottom >= windowHeight * 0.5) {
          // Section center is in view - full morph
          morphProgress = 1;
        } else if (sectionTop <= windowHeight && sectionTop > windowHeight * 0.5) {
          // Section entering from bottom
          morphProgress = (windowHeight - sectionTop) / (windowHeight * 0.5);
        } else if (sectionBottom >= 0 && sectionBottom < windowHeight * 0.5) {
          // Section exiting to top
          morphProgress = sectionBottom / (windowHeight * 0.5);
        }
      }
      
      // Clamp between 0 and 1
      morphProgress = Math.max(0, Math.min(1, morphProgress));
      setScrollBasedMorphProgress(morphProgress);
      
      console.log('Scroll handler - morphProgress:', morphProgress, 'sectionTop:', sectionTop, 'currentSection:', currentSection);
      
      // Always update config when brand-activation section is in viewport
      if (morphProgress > 0) {
        setConfig({
          ...sectionConfigs['brand-activation'],
          morphProgress
        });
      }
    };

    // Initial scroll position check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion, currentSection]);

  return (
    <div 
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      style={{
        perspective: '1200px',
        perspectiveOrigin: 'center center'
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: config.opacity, scale: config.scale, rotateZ: config.rotation }}
        animate={{ 
          opacity: config.opacity, 
          scale: config.scale, 
          rotateZ: config.rotation 
        }}
        transition={{ 
          duration: prefersReducedMotion ? 0 : 1.2, 
          ease: [0.19, 1, 0.22, 1] 
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
      >
        <ThreeBackground 
          introOpacity={config.opacity} 
          cinematicPhase={config.cinematicPhase}
          targetShape={config.shape || 'infinity'}
          morphProgress={config.morphProgress || 0}
        />
      </motion.div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 bg-black/50 text-white p-2 rounded text-xs space-y-1">
          <div>Section: {currentSection}</div>
          <div>Shape: {config.shape || 'infinity'}</div>
          <div>Morph: {(config.morphProgress || 0).toFixed(2)}</div>
          <div>Scroll Morph: {scrollBasedMorphProgress.toFixed(2)}</div>
          <div>Opacity: {config.opacity}</div>
        </div>
      )}
    </div>
  );
}