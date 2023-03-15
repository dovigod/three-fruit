import { Vector3 } from 'three';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
export const defaultSettings = {
  canvas: {
    camera: { near: 0.01, far: 110, fov: 30 },
    gl: { alpha: false }
  },
  background: {
    color: '#ffbf40'
  },
  postProcessor: {
    focalLength: 0.5,
    bokehScale: 11,
    height: 700,
    target: (depth: number) => {
      return new Vector3(0, 0, depth / 2);
    }
  },
  environment: {
    preset: 'sunset' as PresetsType
  }
};
