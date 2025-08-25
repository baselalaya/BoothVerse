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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Create infinity curve path with perfect proportions
    class InfinityCurve extends THREE.Curve<THREE.Vector3> {
      getPoint(t: number): THREE.Vector3 {
        const scale = 2.8;
        const angle = t * Math.PI * 4; // Full infinity loop
        
        // Enhanced lemniscate equations for smoother curves
        const denominator = 1 + Math.sin(angle) * Math.sin(angle);
        const x = scale * Math.cos(angle) / denominator;
        const y = scale * Math.sin(angle) * Math.cos(angle) / denominator * 0.7; // Slightly flatten
        const z = Math.sin(angle * 2) * 0.1; // Add subtle depth variation

        return new THREE.Vector3(x, y, z);
      }
    }

    const curve = new InfinityCurve();
    
    // Create high-quality tube geometry with more detail
    const tubeGeometry = new THREE.TubeGeometry(curve, 300, 0.4, 20, false);
    
    // Create chrome/metallic material to match reference
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf8f8f8,
      metalness: 0.9,
      roughness: 0.1,
      reflectivity: 1.0,
      envMapIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const infinityMesh = new THREE.Mesh(tubeGeometry, material);
    scene.add(infinityMesh);

    // Enhanced lighting setup to match the dramatic reference image
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Key light - main dramatic lighting from top-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(4, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill light - softer light from left to fill shadows
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-3, 2, 2);
    scene.add(fillLight);

    // Rim light - creates the bright edges like in reference
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, -2, 4);
    scene.add(rimLight);

    // Back light for depth
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(0, 0, -4);
    scene.add(backLight);

    // Position camera for perfect viewing angle
    camera.position.z = 7;
    camera.position.y = 0.5;
    camera.position.x = 0;
    camera.lookAt(0, 0, 0);

    // Store references
    sceneRef.current = { scene, camera, renderer, infinity: infinityMesh, animationId: null };

    // Elegant rotation animation matching the reference
    const animate = (time: number) => {
      if (!sceneRef.current?.infinity) return;

      const elapsedTime = time * 0.001;
      
      // Subtle rotation to show the 3D form and reflections
      sceneRef.current.infinity.rotation.x = Math.sin(elapsedTime * 0.15) * 0.08;
      sceneRef.current.infinity.rotation.y = elapsedTime * 0.08;
      sceneRef.current.infinity.rotation.z = Math.cos(elapsedTime * 0.12) * 0.04;

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