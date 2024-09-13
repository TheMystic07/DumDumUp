import { useKeyboardControls, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Character } from "./Character";
import {
  result,
  message,
  createDataItemSigner,
  connect
} from "@permaweb/aoconnect";

// Constants for the AO process
const DumDumProcess = "GhfdygQ3glfrzG0yciqsIVJuh2HEPi-7qnh42FremA8";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

const ao = connect();

// Function to update both position and rotation
const UpdatePlayerPosition = async (position, rotation) => {
  let pos = {
    position: {
      x: position.x,
      y: position.y,
      z: position.z,
    },
    rotation:  rotation.y
  
  };

  await window.arweaveWallet.connect(["ACCESS_ADDRESS"]);
  const m_id = await message({
    process: DumDumProcess,
    signer: createDataItemSigner(window.arweaveWallet),
    data: JSON.stringify(pos),
    tags: [{ name: "Action", value: "UpdatePlayerPosition" }],
  });
  const res = await ao.result({
    process: DumDumProcess,
    message: m_id,
  });
  // console.log(res);
};

export const CharacterController = () => {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED, JUMP_FORCE } = useControls(
    "Character Control",
    {
      WALK_SPEED: { value: 0.8, min: 0.1, max: 4, step: 0.1 },
      RUN_SPEED: { value: 1.6, min: 0.2, max: 12, step: 0.1 },
      ROTATION_SPEED: {
        value: degToRad(0.5),
        min: degToRad(0.1),
        max: degToRad(5),
        step: degToRad(0.1),
      },
      JUMP_FORCE: { value: 5, min: 1, max: 20, step: 0.1 },
    }
  );

  const rb = useRef();
  const container = useRef();
  const character = useRef();
  const [animation, setAnimation] = useState("idle");
  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isGrounded = useRef(true); // To track if the character is grounded
  const isClicking = useRef(false); // To track if the mouse is clicked
  const [score, setScore] = useState(0); // To track the score (Y position * 10)

  // Listen for ground collision to reset jump state
  const handleCollision = () => {
    isGrounded.current = true;
  };

  useEffect(() => {
    const onMouseDown = (e) => {
      isClicking.current = true;
    };
    const onMouseUp = (e) => {
      isClicking.current = false;
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, []);

  useFrame(({ camera }) => {
    if (rb.current) {
      const vel = rb.current.linvel();

      const movement = {
        x: 0,
        z: 0,
      };

      if (get().forward) movement.z = 1;
      if (get().backward) movement.z = -1;

      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (get().left) movement.x = 1;
      if (get().right) movement.x = -1;

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        vel.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
        if (speed === RUN_SPEED) setAnimation("run");
        else setAnimation("walk");
      } else {
        setAnimation("idle");
      }

      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      );

      // Handle jump
      if (get().jump && isGrounded.current) {
        vel.y = JUMP_FORCE; // Apply instant jump force
        isGrounded.current = false; // Prevent double jump
      }

      rb.current.setLinvel(vel, true);

      // Update the score based on Y position
      const currentYPosition = rb.current.translation().y;
      setScore(Math.floor(currentYPosition * 10)); // Multiply Y position by 10 and update score
    }

    // CAMERA
    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    );

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }

    // Make score text face the camera
    const scoreTextGroup = character.current.children.find(
      (child) => child.isGroup && child.name === "scoreText"
    );
    if (scoreTextGroup) {
      scoreTextGroup.lookAt(camera.position);
    }
  });

  // Send position and rotation every second
  useEffect(() => {
    const updatePositionInterval = setInterval(() => {
      if (rb.current) {
        const position = rb.current.translation();
        const rotation = character.current.rotation.y; // Fetch the current character rotation

        console.log(position, rotation);
        UpdatePlayerPosition(position, rotation); // Send both position and rotation
      }
    }, 1000); // Update every second

    return () => clearInterval(updatePositionInterval); // Cleanup interval on component unmount
  }, []);

  return (
    <RigidBody
      colliders={false}
      lockRotations
      ref={rb}
      onCollisionEnter={handleCollision} // Reset jump when hitting the ground
    >
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={0.5} position-z={-5} />
        <group ref={character}>
          <Character scale={0.18} position-y={-0.25} animation={animation} />

          {/* Group for the score text */}
          <group name="scoreText" position={[0, 0.5, 0]}>
            {/* Front-facing text */}
            <Text
              fontSize={0.2}
              color="white"
              outlineWidth={0.01} // Adding border to the text
              outlineColor="black" // Border color
              anchorX="center"
              anchorY="middle"
            >
              {score}
            </Text>
          </group>
        </group>
      </group>
      <CapsuleCollider args={[0.08, 0.15]} />
    </RigidBody>
  );
};
