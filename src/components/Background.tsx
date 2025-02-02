import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { type Mood, type TimeOfDay } from '../types';

interface BackgroundProps {
  mood: Mood;
  timeOfDay: TimeOfDay;
}

export function Background({ mood, timeOfDay }: BackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    
    const renderer = rendererRef.current;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Set particle colors based on mood
    const moodColors = {
      focused: new THREE.Color('#4A90E2'),
      chill: new THREE.Color('#50E3C2'),
      energized: new THREE.Color('#FF6B6B')
    };

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: moodColors[mood],
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    particlesRef.current = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneRef.current.add(particlesRef.current);

    cameraRef.current.position.z = 2;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    document.addEventListener('mousemove', handleMouseMove);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.01 * (targetX - particlesRef.current.rotation.y);
        particlesRef.current.rotation.x += 0.01 * (targetY - particlesRef.current.rotation.x);
        particlesRef.current.rotation.z += 0.001;
      }

      renderer.render(sceneRef.current!, cameraRef.current!);
    };

    animate();

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
      containerRef.current?.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [mood]);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}