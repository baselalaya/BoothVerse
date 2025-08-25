import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import * as THREE from "three";

export default function ThreeBackground() {
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
      const phase = (i / particleCount) * 6.28318; // Store phase for animation
      
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

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Size based on position for flow effect  
      sizes[i] = Math.random() * 1.0 + 0.2;  // Much smaller particles
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: `
        uniform float uTime;
        attribute float size;
        varying vec3 vColor;
        varying float vIntensity;
        
        void main() {
          // Calculate particle's position along infinity curve
          float curvePosition = atan(position.y, position.x);
          
          // Flowing motion along the infinity path
          float flowSpeed = uTime * 0.8;
          float flow = sin(curvePosition + flowSpeed) * 0.3;
          
          // Multiple layered wave effects
          float wave1 = sin(uTime * 2.0 + position.x * 0.4 + position.y * 0.3);
          float wave2 = cos(uTime * 1.3 + length(position.xy) * 0.15);
          float wave3 = sin(uTime * 3.2 + curvePosition * 2.0);
          float wave4 = cos(uTime * 0.7 + position.x * 0.2);
          
          // Breathing effect for the whole shape
          float breathe = 1.0 + sin(uTime * 0.5) * 0.1;
          
          // Dynamic pulsing with complexity
          float complexity = (wave1 + wave2 + wave3 + wave4) / 4.0;
          float fluidPulse = 0.4 + 0.6 * complexity;
          
          // Orbital motion around curve points
          float orbit = sin(uTime * 2.5 + curvePosition) * 0.2;
          vec3 animatedPosition = position;
          animatedPosition.x += flow + orbit;
          animatedPosition.y += sin(uTime + curvePosition * 1.5) * 0.15;
          
          // Scale with breathing
          animatedPosition *= breathe;
          
          vColor = color;
          vIntensity = fluidPulse;
          
          vec4 mvPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * fluidPulse * (1.2 + wave3 * 0.3);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
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
          float finalAlpha = alpha * vIntensity * sparkle * 0.25;
          
          gl_FragColor = vec4(vColor, finalAlpha);
        }
      `,
      uniforms: {
        uTime: { value: 0 }
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
