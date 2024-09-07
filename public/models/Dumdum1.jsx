/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 dumdum1.glb 
*/

import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Model(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/dumdum1.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="fall_guys">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh name="body" geometry={nodes.body.geometry} material={materials['Material.001']} skeleton={nodes.body.skeleton} />
          <skinnedMesh name="eye" geometry={nodes.eye.geometry} material={materials['Material.002']} skeleton={nodes.eye.skeleton} />
          <skinnedMesh name="hand-" geometry={nodes['hand-'].geometry} material={materials['Material.001']} skeleton={nodes['hand-'].skeleton} />
          <skinnedMesh name="leg" geometry={nodes.leg.geometry} material={materials['Material.001']} skeleton={nodes.leg.skeleton} />
        </group>
        <mesh name="BézierCircle" geometry={nodes.BézierCircle.geometry} material={materials['Material.003']} position={[-0.309, 2.11, 0.446]} rotation={[-Math.PI / 2, 0, 0]} scale={0.233}>
          <mesh name="Cylinder001" geometry={nodes.Cylinder001.geometry} material={materials['Material.004']} position={[2.696, -0.119, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-0.877, -0.046, -0.992]} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/dumdum1.glb')
