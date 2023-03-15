import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BackgroundEffect = ({ colors }: any) => {
  const [color1, color2] = colors;

  useFrame((state) => {
    const { elapsedTime } = state.clock;

    state.scene.background = new THREE.Color(color1);
    state.scene.background.lerp(new THREE.Color(color2), 0.5 * Math.sin(elapsedTime) + 1);
  });
  return <></>;
};

export default BackgroundEffect;
