import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";
import { Character } from "./Character";
import { dryrun, connect } from "@permaweb/aoconnect";
import { RemotePlayer } from "./RemotePlayer";
// import { RemoteChar } from "./RemoteChar";s

const DumDumProcess = "GhfdygQ3glfrzG0yciqsIVJuh2HEPi-7qnh42FremA8";

const maps = {
  dummap1: {
    scale: 0.21,
    position: [84, -5, -50],
  },
};

export const Experience = () => {
  const [boxes, setBoxes] = useState([]);
  const shadowCameraRef = useRef();
  const { map } = useControls("Map", {
    map: {
      value: "dummap1",
      options: Object.keys(maps),
    },
  });

  const ao = connect();

  const getActivePlayers = async () => {
    const addr = await window.arweaveWallet.getActiveAddress();
    const res = await dryrun({
      process: DumDumProcess,
      tags: [
        {
          name: "Action",
          value: "GetActivePlayers",
        },
      ],
    });
    const { Messages } = res;
    const players = Messages[0].Data;
    const playerObj = JSON.parse(players);
    console.log(playerObj);
    // setRotation(playerObj[1])

    // Create boxes array with positions where key matches the address
    const newBoxes = Object.keys(playerObj).reduce((acc, key) => {
      if (key !== addr) { // Check if the key matches the current address
        const { position } = playerObj[key];
        acc.push(position);
      }
      return acc;
    }, []);

    setBoxes(newBoxes);
  };

  useEffect(() => {
    getActivePlayers();
    const interval = setInterval(() => {
      getActivePlayers();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
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
        {/* Render Characters based on the active players' positions */}
        {boxes.map((position, index) => (
          <RemotePlayer
            key={index}
            scale={0.18} // Modify the scale for all characters
            position={[position.x, position.y, position.z]}
            // rotation-y={position.rotation} // Optional: Add rotation if needed
            animation="idle" // Add the correct animation name
          />
        ))}
      </Physics>

    </>
  );
};