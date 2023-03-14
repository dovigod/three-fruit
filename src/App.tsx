import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';

function Box() {
  const ref = useRef<Mesh>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const { viewport } = useThree();
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(1),
    y: THREE.MathUtils.randFloatSpread(viewport.height)
  });

  useFrame((state) => {
    const { elapsedTime } = state.clock;
    ref.current!.position.set(data.x * viewport.width, (data.y += 0.1), 0);
    if (data.y > viewport.height / 1.5) {
      data.y = -viewport.height / 1.5;
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

function App() {
  return (
    <Canvas>
      <Box />
      <Box />
      <Box />
    </Canvas>
  );
}

export default App;
