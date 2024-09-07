import { Environment, OrthographicCamera , OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useRef } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";

const maps = {
  // castle_on_hills: {
  //   scale: 3,
  //   position: [-6, -7, 0],
  // },
  // animal_crossing_map: {
  //   scale: 20,
  //   position: [-15, -1, 10],
  // },
  // city_scene_tokyo: {
  //   scale: 0.72,
  //   position: [0, -1, -3.5],
  // },
  // de_dust_2_with_real_light: {
  //   scale: 0.3,
  //   position: [-5, -3, 13],
  // },
  dummap1: {
    scale: 0.21,
    position:[84, -5, -50]
    // position: [-4, 0, -6],
  },
};

export const Experience = () => {
  const shadowCameraRef = useRef();
  const { map } = useControls("Map", {
    map: {
      value: "dummap1",
      options: Object.keys(maps),
    },
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics key={map}>
        <Map
          scale={maps[map].scale}
          position={maps[map].position}
          model={`models/${map}.glb`}
        />
        <CharacterController />
        {/* <mesh position={[0, 0, 0]} scale={1}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="yellow" />
        </mesh> */}
      </Physics>
    </>
  );
};
