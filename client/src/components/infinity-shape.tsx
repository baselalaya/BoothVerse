import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import * as THREE from "three";

interface InfinityShapeProps {
  className?: string;
}

export default function InfinityShape({ className }: InfinityShapeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    infinity: THREE.Mesh | null;
    animationId: number | null;
  }>({ scene: null, camera: null, renderer: null, infinity: null, animationId: null });

  useEffect(() => {
    if (!mountRef.current || prefersReducedMotion) {
      return;
    }

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create infinity curve path
    class InfinityCurve extends THREE.Curve<THREE.Vector3> {
      getPoint(t: number): THREE.Vector3 {
        const scale = 3;
        const angle = t * Math.PI * 4; // Full infinity loop
        
        // Lemniscate equations
        const denominator = 1 + Math.sin(angle) * Math.sin(angle);
        const x = scale * Math.cos(angle) / denominator;
        const y = scale * Math.sin(angle) * Math.cos(angle) / denominator;
        const z = 0;

        return new THREE.Vector3(x, y, z);
      }
    }

    const curve = new InfinityCurve();
    
    // Create tube geometry with smooth curves
    const tubeGeometry = new THREE.TubeGeometry(curve, 200, 0.3, 16, false);
    
    // Create beautiful white material with subtle lighting
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100,
      specular: 0x444444,
    });

    const infinityMesh = new THREE.Mesh(tubeGeometry, material);
    scene.add(infinityMesh);

    // Add lights for proper shading like the image
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    // Position camera
    camera.position.z = 8;
    camera.position.y = 0;
    camera.position.x = 0;

    // Store references
    sceneRef.current = { scene, camera, renderer, infinity: infinityMesh, animationId: null };

    // Gentle rotation animation
    const animate = (time: number) => {
      if (!sceneRef.current?.infinity) return;

      const elapsedTime = time * 0.001;
      
      // Slow, elegant rotation
      sceneRef.current.infinity.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
      sceneRef.current.infinity.rotation.y = elapsedTime * 0.1;
      sceneRef.current.infinity.rotation.z = Math.cos(elapsedTime * 0.15) * 0.05;

      renderer.render(scene, camera);
      
      if (sceneRef.current) {
        sceneRef.current.animationId = requestAnimationFrame(animate);
      }
    };

    sceneRef.current.animationId = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      sceneRef.current.camera!.aspect = width / height;
      sceneRef.current.camera!.updateProjectionMatrix();
      sceneRef.current.renderer!.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      tubeGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div 
      ref={mountRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      data-testid="infinity-shape"
    />
  );
}