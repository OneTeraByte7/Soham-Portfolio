import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function NodeSwarm({ count = 200 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      const velocity = (Math.random() * 0.02) + 0.005;
      temp.push({ x, y, z, velocity });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      // Gentle rotation and organic floating
      const t = state.clock.getElapsedTime();
      particle.y += Math.sin(t * particle.velocity) * 0.02;
      particle.x += Math.cos(t * particle.velocity) * 0.01;
      
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), particle.velocity);
      
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      
      particle.x = dummy.position.x;
      particle.z = dummy.position.z;
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshPhysicalMaterial 
        color="#00f0ff"
        emissive="#00f0ff"
        emissiveIntensity={2}
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
      />
    </instancedMesh>
  );
}

function Connections() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.x -= delta * 0.1;
      group.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[12, 2]} />
        <meshBasicMaterial color="#b026ff" wireframe transparent opacity={0.15} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[18, 1]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function QuantumField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none touch-none">
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }} gl={{ antialias: false, alpha: true }}>
        <fog attach="fog" args={['#0b0c10', 10, 40]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#b026ff" />
        <NodeSwarm count={300} />
        <Connections />
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
      </Canvas>
    </div>
  );
}
