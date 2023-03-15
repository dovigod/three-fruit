import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { GLTFBanana, GLTFApple } from '@type/GLTF';
import SpotLight from '@components/Light/SpotLight';
import Fruit from '@components/Mesh/Fruit';
import { defaultSettings } from '../config';

const BANANA_GLB_URI = '/banana-v1-transformed.glb';
const APPLE_GLB_URI = '/apple-v1-transformed.glb';

useGLTF.preload(BANANA_GLB_URI);
useGLTF.preload(APPLE_GLB_URI);

function App({ count = 100, depth = 80 }) {
  const { nodes: bananaNodes, materials: bananaMaterials } = useGLTF(BANANA_GLB_URI) as GLTFBanana;
  const { nodes: appleNodes, materials: appleMaterials } = useGLTF(APPLE_GLB_URI) as GLTFApple;
  const {
    canvas: {
      camera,
      gl: { alpha }
    },
    background: { color },
    postProcessor: { focalLength, bokehScale, height, target },
    environment: { preset }
  } = defaultSettings;

  const fruitType = [
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

  return (
    <Canvas gl={{ alpha }} camera={camera}>
      <color attach="background" args={[color]} />
      <SpotLight />

      <Suspense fallback={null}>
        {Array.from({ length: count }).map((_, idx) => (
          <Fruit key={idx} z_origin={-(idx / count) * depth - 20} textureObj={fruitType[idx % 2]} />
        ))}
        <EffectComposer>
          <DepthOfField target={target(depth)} focalLength={focalLength} bokehScale={bokehScale} height={height} />
        </EffectComposer>
        <Environment preset={preset} />
      </Suspense>
    </Canvas>
  );
}

export default App;
