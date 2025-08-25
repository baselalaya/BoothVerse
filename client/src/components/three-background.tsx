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
        particle.style.background = `hsl(${Math.random() * 60 + 240}, 100%, 70%)`;
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

    // Create galaxy particle system
    const particleCount = 15000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const galaxyRadius = 15;
    const branches = 6;
    const spin = 1.2;
    const randomness = 0.5;
    const randomnessPower = 2;

    const colorInside = new THREE.Color('#8B5FBF');
    const colorOutside = new THREE.Color('#00BFFF');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * galaxyRadius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * spin;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY * 0.1;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Colors
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / galaxyRadius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Size
      sizes[i] = Math.random() * 2 + 0.5;
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
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (0.5 + 0.5 * sin(uTime * 2.0 + position.x * 0.1));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength);
        }
      `,
      uniforms: {
        uTime: { value: 0 }
      }
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add infinity loop geometry
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, -10),
      new THREE.Vector3(-10, 5, 0),
      new THREE.Vector3(0, 0, 10),
      new THREE.Vector3(10, 5, 0),
      new THREE.Vector3(10, 0, -10),
      new THREE.Vector3(0, -5, -20),
      new THREE.Vector3(-10, 0, -10)
    ], true);

    const tubeGeometry = new THREE.TubeGeometry(curve, 200, 0.02, 8, true);
    const tubeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x8B5FBF, 
      transparent: true, 
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);

    camera.position.z = 10;
    camera.position.y = 3;

    // Store references
    sceneRef.current = { scene, camera, renderer, particles, animationId: null };

    // Animation loop
    const animate = (time: number) => {
      const elapsedTime = time * 0.001;

      // Update shader uniforms
      if (material.uniforms) {
        material.uniforms.uTime.value = elapsedTime;
      }

      // Rotate galaxy
      particles.rotation.y = elapsedTime * 0.05;
      
      // Animate infinity loop
      tube.rotation.x = elapsedTime * 0.1;
      tube.rotation.y = elapsedTime * 0.2;

      // Camera gentle movement
      camera.position.x = Math.sin(elapsedTime * 0.1) * 2;
      camera.lookAt(scene.position);

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
