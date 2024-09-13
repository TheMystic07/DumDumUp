import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function RemotePlayer({ animation, position, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/dumdum1.glb");
  const { actions } = useAnimations(animations, group);
  const [targetPosition] = useState(() => new THREE.Vector3());
  const [currentPosition] = useState(() => new THREE.Vector3());

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.24).play();
    return () => actions?.[animation]?.fadeOut(0.24);
  }, [animation, actions]);

  useEffect(() => {
    if (position) {
      targetPosition.set(position.x, position.y, position.z);
    }
  }, [position, targetPosition]);

  useFrame((state, delta) => {
    if (group.current) {
      currentPosition.lerp(targetPosition, 0.1);
      group.current.position.copy(currentPosition);
    }
  });

  return (
    <group ref={group} {...props}>
      <group name="Scene">
        <group name="fall_guys">
          <mesh name="body" geometry={nodes.body.geometry} material={materials["Material.001"]} />
          <mesh name="eye" geometry={nodes.eye.geometry} material={materials["Material.002"]} />
          <mesh name="hand-" geometry={nodes["hand-"].geometry} material={materials["Material.001"]} />
          <mesh name="leg" geometry={nodes.leg.geometry} material={materials["Material.001"]} />
        </group>
        <mesh
          name="BézierCircle"
          geometry={nodes.BézierCircle.geometry}
          material={materials["Material.003"]}
          position={[-0.309, 2.11, 0.6446]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.233}
        >
          <mesh
            name="Cylinder001"
            geometry={nodes.Cylinder001.geometry}
            material={materials["Material.004"]}
            position={[2.696, -0.119, 0.3]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-0.877, -0.046, -0.992]}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/dumdum1.glb");