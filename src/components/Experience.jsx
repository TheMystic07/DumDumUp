import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";
import { dryrun, connect } from "@permaweb/aoconnect";
import { RemotePlayer } from "./RemotePlayer";

const DumDumProcess = "GhfdygQ3glfrzG0yciqsIVJuh2HEPi-7qnh42FremA8";
const maps = {
  dummap1: {
    scale: 0.21,
    position: [84, -5, -50],
  },
};

export const Experience = () => {
  const [players, setPlayers] = useState([]);
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
    const playersData = JSON.parse(Messages[0].Data);
    console.log(playersData);

    const newPlayers = Object.entries(playersData).reduce((acc, [key, value]) => {
      if (key !== addr) {
        const position = value.GA || { x: 0, y: 0, z: 0 };
        const rotation = value[1] || 0; // Assuming the second value is the rotation
        acc.push({ position, rotation });
      }
      return acc;
    }, []);
    setPlayers(newPlayers);
  };

  useEffect(() => {
    getActivePlayers();
    const interval = setInterval(getActivePlayers, 1000);
    return () => clearInterval(interval);
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
        {players.map((player, index) => (
          <RemotePlayer
            key={index}
            scale={0.18}
            position={[player.position.x, player.position.y, player.position.z]}
            rotation-y={player.rotation}
            animation="idle"
          />
        ))}
      </Physics>
    </>
  );
};