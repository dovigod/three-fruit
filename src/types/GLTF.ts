import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export type GLTFBanana = GLTF & {
  nodes: {
    Banana: THREE.Mesh;
    banana_low_Banana_0: THREE.Mesh;
  };
  materials: {
    ['default']: THREE.MeshStandardMaterial;
    Banana: THREE.MeshStandardMaterial;
  };
};

export type GLTFApple = GLTF & {
  nodes: {
    'apple_low_obj_Material_#35_0': THREE.Mesh;
  };
  materials: {
    ['default']: THREE.MeshStandardMaterial;
    Material_35: THREE.MeshStandardMaterial;
  };
};
