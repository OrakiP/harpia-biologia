import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, PresentationControls, Float, Html } from '@react-three/drei';
import { Group } from 'three';
import { motion } from 'framer-motion';

// Preload do modelo para acelerar carregamento
useGLTF.preload('/assets/harpy-model.glb');

interface HarpyModelProps {
  scrollProgress: number;
  isVisible: boolean;
}

function useResponsiveModel() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateSize();
    setMounted(true);

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { isMobile, mounted };
}

function HarpyScene({ scrollProgress, isMobile }: { scrollProgress: number, isMobile: boolean }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/assets/harpy-model.glb');

  useFrame((state) => {
    if (group.current) {
      // Rotação suave baseada no scroll
      group.current.rotation.y = scrollProgress * Math.PI * 0.5;
      // Movimento vertical sutil - velocidade aumentada
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
    }
  });

  // Configurações responsivas otimizadas
  const scale = isMobile ? 1.8 : 5.0;
  const position: [number, number, number] = isMobile ? [0, -0.2, 0] : [0, -0.3, 0];

  return (
    <Suspense fallback={<ModelLoader />}>
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <PresentationControls
          global
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <group
            ref={group}
            scale={scale}
            position={position}
          >
            <primitive object={scene} />
          </group>
        </PresentationControls>
      </Float>
    </Suspense>
  );
}

// Componente de loading mais leve
function ModelLoader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    </Html>
  );
}

export default function HarpyModel({ scrollProgress, isVisible }: HarpyModelProps) {
  const { isMobile, mounted } = useResponsiveModel();

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-full"
      animate={{
        opacity: isVisible ? 1 : 0.7,
        scale: isVisible ? 1 : 0.9,
        rotateY: scrollProgress * 20
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Canvas
        key={`canvas-${isMobile ? 'mobile' : 'desktop'}`}
        camera={{
          position: [0, 0.5, isMobile ? 5 : 10],
          fov: isMobile ? 50 : 75
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        performance={{ min: 0.5 }}
        frameloop="always"
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          castShadow={false}
          color="#ffc947"
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />

        <Suspense fallback={<ModelLoader />}>
          <HarpyScene scrollProgress={scrollProgress} isMobile={isMobile} />
        </Suspense>

        <Environment
          preset="city"
          background={false}
          blur={1}
        />
      </Canvas>
    </motion.div>
  );
}