import { useRef, useState, memo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh } from 'three';

function Fruit({ z_origin, textureObj }: { z_origin: number; textureObj: any }) {
  const ref = useRef<Mesh>(null);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z_origin]);
  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(1),
    y: THREE.MathUtils.randFloatSpread(height),
    z: z_origin,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI
  });
  let { rx, ry, rz, x, y, z } = data;

  useFrame((state) => {
    ref.current!.rotation.set((rx += 0.001), (ry += 0.004), (rz += 0.0005));
    ref.current!.position.set(x * width, (y += 0.05), z);
    if (y > height / 1.5) {
      y = -height / 1.5;
    }
  });

  return <mesh ref={ref} {...textureObj} />;
}
export default memo(Fruit);
