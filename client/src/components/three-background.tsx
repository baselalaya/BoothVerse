import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import * as THREE from "three";

interface ThreeBackgroundProps {
  className?: string;
  introOpacity?: number;
}

export default function ThreeBackground({ className, introOpacity = 1 }: ThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    particles: THREE.Points | null;
    animationId: number | null;
  }>({ scene: null, camera: null, renderer: null, particles: null, animationId: null });

  useEffect(() => {
    if (!mountRef.current || prefersReducedMotion) {
      // Fallback for reduced motion
      const container = mountRef.current;
      if (!container) return;
      
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 rounded-full opacity-40';
        particle.style.background = '#FFFFFF';  // Only white
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        container.appendChild(particle);
      }
      
      return () => {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      };
    }

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create infinity symbol particle system
    const particleCount = 6000;  // Reduced particle count
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const scale = 14;  // Increased from 10 to make shape bigger
    const thickness = 3;
    const randomness = 0.4;
    const randomnessPower = 1.5;

    const colorInside = new THREE.Color('#FFFFFF').multiplyScalar(0.3);  // Much dimmer white
    const colorOutside = new THREE.Color('#FFFFFF').multiplyScalar(0.15);  // Even dimmer white

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Assign each particle a specific position along the infinity curve
      const t = (i / particleCount) * Math.PI * 4; // Full infinity loop
      
      // Lemniscate equations: creates perfect infinity symbol
      const denominator = 1 + Math.sin(t) * Math.sin(t);
      let x = scale * Math.cos(t) / denominator;
      let y = scale * Math.sin(t) * Math.cos(t) / denominator;
      let z = (Math.random() - 0.5) * thickness;

      // Store the target infinity position
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Color based on position along the curve
      const normalizedPos = i / particleCount;
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, normalizedPos);
      
      // Store individual particle properties 
      const speed = 0.5 + Math.random() * 1.5;  // Individual speed multiplier

      // Store original color and speed in blue channel
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g; 
      colors[i3 + 2] = speed; // Store speed in blue channel

      // Size variations for dynamic behavior
      sizes[i] = Math.random() * 1.2 + 0.3;
    }

    // Add individual particle phases for more variation
    const phases = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      phases[i] = Math.random() * 6.28318;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: `
        uniform float uTime;
        uniform float uIntroOpacity;
        attribute float size;
        attribute float phase;
        varying vec3 vColor;
        varying float vIntensity;
        
        void main() {
          // Individual particle properties
          float particleSpeed = color.b; // Speed stored in blue channel
          float particlePhase = phase;
          
          // Calculate particle's position along infinity curve
          float curvePosition = atan(position.y, position.x);
          
          // Dynamic time with individual speed
          float dynamicTime = uTime * particleSpeed;
          
          // Flowing motion along the infinity path with individual variation
          float flowSpeed = dynamicTime * 1.2 + particlePhase;
          float flow = sin(curvePosition + flowSpeed) * 0.2; // Reduced from 0.4 to 0.2
          
          // Complex multi-layered wave system - reduced spreading
          float wave1 = sin(dynamicTime * 2.5 + position.x * 0.6 + particlePhase);
          float wave2 = cos(dynamicTime * 1.8 + length(position.xy) * 0.25 + particlePhase * 0.5);
          float wave3 = sin(dynamicTime * 4.1 + curvePosition * 3.0 + particlePhase * 2.0);
          float wave4 = cos(dynamicTime * 0.9 + position.x * 0.3 + particlePhase * 1.5);
          float wave5 = sin(dynamicTime * 3.7 + position.y * 0.5 + particlePhase * 0.8);
          
          // Individual particle drift and momentum - reduced spreading
          float drift = sin(dynamicTime * 0.6 + particlePhase) * 0.15; // Reduced from 0.3 to 0.15
          float momentum = cos(dynamicTime * 1.4 + particlePhase * 1.2) * 0.1;  // Reduced from 0.2 to 0.1
          
          // Breathing effect with variation
          float breathe = 1.0 + sin(dynamicTime * 0.7 + particlePhase * 0.3) * 0.15;
          
          // Dynamic clustering behavior
          float cluster = sin(curvePosition * 4.0 + dynamicTime * 1.6) * 0.1;
          
          // Complex pulsing with individual character
          float complexity = (wave1 + wave2 + wave3 + wave4 + wave5) / 5.0;
          float individualPulse = 0.3 + 0.7 * abs(complexity);
          
          // Advanced orbital and spiral motion
          float spiral = sin(dynamicTime * 2.0 + curvePosition * 2.0 + particlePhase) * 0.25;
          float orbit = cos(dynamicTime * 3.5 + particlePhase * 2.0) * 0.15;
          
          // Apply all transformations
          vec3 animatedPosition = position;
          animatedPosition.x += flow + drift + spiral + cluster;
          animatedPosition.y += momentum + orbit + sin(dynamicTime + curvePosition * 2.0 + particlePhase) * 0.2;
          animatedPosition.z += cos(dynamicTime * 2.2 + particlePhase) * 0.1;
          
          // Scale with breathing and individual variation
          animatedPosition *= breathe * (0.9 + particleSpeed * 0.2);
          
          // Restore original color (without speed data)
          vColor = vec3(color.r, color.g, color.r); // Use red for blue to maintain white
          vIntensity = individualPulse;
          
          vec4 mvPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
          
          // Dynamic size with multiple influences
          float dynamicSize = size * (300.0 / -mvPosition.z) * individualPulse;
          dynamicSize *= (1.0 + wave3 * 0.5 + sin(dynamicTime * 4.0 + particlePhase) * 0.3);
          
          gl_PointSize = dynamicSize;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uIntroOpacity;
        varying vec3 vColor;
        varying float vIntensity;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float distanceToCenter = length(center);
          
          if (distanceToCenter > 0.5) discard;
          
          // Soft circular gradient
          float alpha = smoothstep(0.5, 0.1, distanceToCenter);
          
          // Add subtle sparkle effect
          float sparkle = 1.0 + sin(distanceToCenter * 20.0) * 0.1;
          
          // Dynamic color intensity based on animation
          float finalAlpha = alpha * vIntensity * sparkle * 0.4;
          
          // Apply intro opacity control
          finalAlpha *= uIntroOpacity;
          
          gl_FragColor = vec4(vColor, finalAlpha);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uIntroOpacity: { value: introOpacity }
      }
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Remove tube geometry - particles will create the infinity shape themselves

    camera.position.z = 15;
    camera.position.y = 0;
    camera.position.x = 0;

    // Store references
    sceneRef.current = { scene, camera, renderer, particles, animationId: null };

    // Animation loop
    const animate = (time: number) => {
      const elapsedTime = time * 0.001;

      // Update shader uniforms
      if (material.uniforms) {
        material.uniforms.uTime.value = elapsedTime;
        material.uniforms.uIntroOpacity.value = introOpacity;
      }

      // No rotation - particles flow along infinity path via shader

      // Keep camera fixed front-facing
      camera.position.x = 0;
      camera.position.y = 0;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    sceneRef.current.animationId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
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
