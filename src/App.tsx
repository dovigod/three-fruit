import React, { Suspense, useRef, useState } from 'react';
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';
import { useGLTF, Environment } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

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
  const [clicked, setClicked] = useState<boolean>(false);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(1),
    y: THREE.MathUtils.randFloatSpread(height),
    z
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
      ['material-emissive']: 'red',
      rotation: new THREE.Euler(-0.05, 0.04, -0.01),
      scale: 0.11
    }
  ];

  useFrame((state) => {
    const { elapsedTime } = state.clock;
    ref.current!.position.set(data.x * width, (data.y += 0.3), data.z);
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

function App({ count = 30 }) {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
        {Array.from({ length: count }).map((_, idx) => (
          <Banana key={`box ${idx}`} z={-idx} />
        ))}
        <Environment preset={'sunset'} />
      </Suspense>
    </Canvas>
  );
}

export default App;
