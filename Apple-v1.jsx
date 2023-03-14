/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/apple-v1.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/apple-v1-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[24.37, -39.75, -43.15]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <group position={[24.37, 43.15, 39.75]}>
          <mesh geometry={nodes['apple_low_obj_Material_#35_0'].geometry} material={materials.Material_35} rotation={[-0.05, 0.04, -0.01]} scale={0.11} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/apple-v1-transformed.glb')
