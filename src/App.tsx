import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';
import { useGLTF, Environment } from '@react-three/drei';

function Box({ z }: { z: number }) {
  const ref = useRef<Mesh>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(1),
    y: THREE.MathUtils.randFloatSpread(height),
    z
  });

  useFrame((state) => {
    const { elapsedTime } = state.clock;
    ref.current!.position.set(data.x * width, (data.y += 0.5), data.z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });
  return (
    <mesh
      ref={ref}
      onClick={() => setClicked((current) => !current)}
      position={[0, clicked ? 0 : 1, 0]}
      rotation={[0, 0, 0]}
    >
      <boxGeometry />
      <meshBasicMaterial color="tomato" />
    </mesh>
  );
}

function Banana(props: any) {
  const { scene } = useGLTF('/public/banana-v1.glb');
  return <primitive object={scene} {...props} />;
}
function App({ count = 100 }) {
  return (
    <Canvas>
      {/* {Array.from({ length: count }).map((_, idx) => (
        <Box key={`box ${idx}`} z={-idx} />
      ))} */}
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
        <Banana scale={0.01} />
        <Environment preset={'sunset'} />
      </Suspense>
    </Canvas>
  );
}

export default App;
