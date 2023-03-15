import { SpotLightProps } from '@react-three/fiber';

const SpotLight = ({ position, intensity, ...rest }: SpotLightProps) => {
  return <spotLight position={[10, 10, 10]} intensity={1} {...rest} />;
};
export default SpotLight;
