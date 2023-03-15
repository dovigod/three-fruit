import React, { Suspense, useRef, useState } from 'react';
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';
import { useGLTF, Environment } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

type GLTFBanana = GLTF & {
  nodes: {
    Banana: THREE.Mesh;
    banana_low_Banana_0: THREE.Mesh;
  };
  materials: {
    ['default']: THREE.MeshStandardMaterial;
    Banana: THREE.MeshStandardMaterial;
  };
};

type GLTFApple = GLTF & {
  nodes: {
    'apple_low_obj_Material_#35_0': THREE.Mesh;
  };
  materials: {
    ['default']: THREE.MeshStandardMaterial;
    Material_35: THREE.MeshStandardMaterial;
  };
};

function Banana({ z }: { z: number }) {
  const ref = useRef<Mesh>(null);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(1),
    y: THREE.MathUtils.randFloatSpread(height),
    z,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI
  });
  const [idx] = useState(Math.round(Math.random()));
  const { nodes: bananaNodes, materials: bananaMaterials } = useGLTF('/banana-v1-transformed.glb') as GLTFBanana;
  const { nodes: appleNodes, materials: appleMaterials } = useGLTF('/apple-v1-transformed.glb') as GLTFApple;

  const type = [
    {
      geometry: bananaNodes.banana_low_Banana_0.geometry,
      material: bananaMaterials.Banana,
      ['material-emissive']: 'orange',
      rotation: new THREE.Euler(0, 0.15, -0.01)
    },
    {
      geometry: appleNodes['apple_low_obj_Material_#35_0'].geometry,
      material: appleMaterials.Material_35,
      ['material-emissive']: 'rgb(199,3,0)',
      rotation: new THREE.Euler(-0.05, 0.04, -0.01),
      scale: 0.04
    }
  ];

  useFrame((state) => {
    ref.current!.rotation.set((data.rx += 0.001), (data.ry += 0.004), (data.rz += 0.0005));
    ref.current!.position.set(data.x * width, (data.y += 0.05), data.z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={type[idx].geometry}
      material={type[idx].material}
      rotation={type[idx].rotation}
      scale={type[idx].scale}
      material-emissive={type[idx]['material-emissive']}
    />
  );
}

useGLTF.preload('/banana-v1-transformed.glb');
useGLTF.preload('/apple-v1-transformed.glb');

function App({ count = 100, depth = 80 }) {
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
      <color attach="background" args={['#ffbf40']} />

      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        {Array.from({ length: count }).map((_, idx) => (
          <Banana key={`box ${idx}`} z={-(idx / count) * depth - 20} />
        ))}
        <EffectComposer>
          <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={11} height={700} />
        </EffectComposer>
        <Environment preset={'sunset'} />
      </Suspense>
    </Canvas>
  );
}

export default App;
