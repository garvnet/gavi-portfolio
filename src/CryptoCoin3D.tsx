import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

function Coin() {
  return (
    <group>
      {/* Main coin body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.8}
          roughness={0.3}
          emissive="#FFD700"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Front face */}
      <mesh position={[0, 0.11, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Back face */}
      <mesh position={[0, -0.11, 0]} rotation={[Math.PI, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} />
      </mesh>
      
      {/* BTC text on front */}
      <mesh position={[0, 0.12, 0]}>
        <planeGeometry args={[1.2, 0.3]} />
        <meshBasicMaterial color="#000" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Fallback 2D coin component
function FallbackCoin() {
  return (
    <div style={{
      width: '200px',
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle, #FFD700 0%, #FFA500 100%)',
      borderRadius: '50%',
      boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)',
      animation: 'rotate 3s linear infinite',
      position: 'relative'
    }}>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#000',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        ₿
      </div>
      <style>{`
        @keyframes rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function CryptoCoin3D() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <FallbackCoin />;
  }

  return (
    <div style={{ width: '200px', height: '200px', margin: '0 auto' }}>
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 60 }} 
        shadows
        style={{ background: 'transparent' }}
        onError={() => setHasError(true)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 4, 2]} intensity={1} castShadow />
        <pointLight position={[-2, 2, 2]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <Coin />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
} 