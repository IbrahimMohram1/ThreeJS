import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { DeckGL, ScatterplotLayer } from "deck.gl";
import React, { useEffect, useState } from "react";
import { Map } from "react-map-gl";
import Map3D from "./Map3D";


function Floor({ position, color, toggleColor }) {
  const [roomLights, setRoomLights] = useState([false, false, false, false]);

  const toggleRoomLight = (index, event) => {
    event.stopPropagation();
    setRoomLights((prev) => {
      const newLights = [...prev];
      newLights[index] = !newLights[index];
      return newLights;
    });
  };

  return (
    <group position={position}>
      <mesh onClick={toggleColor}>
        <boxGeometry args={[10, 0.5, 10]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Add rooms */}
      <Room
        position={[-3, 0.5, -3]}
        color="#8AC"
        lightOn={roomLights[0]}
        toggleLight={(event) => toggleRoomLight(0, event)}
      />
      <Room
        position={[3, 0.5, -3]}
        color="#C8A"
        lightOn={roomLights[1]}
        toggleLight={(event) => toggleRoomLight(1, event)}
      />
      <Room
        position={[-3, 0.5, 3]}
        color="#AC8"
        lightOn={roomLights[2]}
        toggleLight={(event) => toggleRoomLight(2, event)}
      />
      <Room
        position={[3, 0.5, 3]}
        color="#A8C"
        lightOn={roomLights[3]}
        toggleLight={(event) => toggleRoomLight(3, event)}
      />
    </group>
  );
}

function Room({ position, lightOn, toggleLight }) {
  return (
    <group position={position}>
      <mesh onClick={toggleLight}>
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color={"#fff"} />
      </mesh>
      {lightOn && (
        <pointLight
          position={[0, 2, 0]}
          intensity={1}
          distance={5}
          color="yellow"
        />
      )}
    </group>
  );
}

export default function Building3D() {
  const [colors, setColors] = useState(["#8AC", "#C8A", "#AC8"]);
  const availableColors = ["#8AC", "#C8A", "#AC8", "#A8C", "#D48"];

  const handleFloorClick = (index) => {
    const newColors = [...colors];
    const currentColorIndex = availableColors.indexOf(newColors[index]);
    const nextColorIndex = (currentColorIndex + 1) % availableColors.length;
    newColors[index] = availableColors[nextColorIndex];
    setColors(newColors);
  };

  

  return (
    <div style={{ display: "flex", justifyContent:'start', height: "100vh" }}>
     <Map3D/>
      <Canvas
        style={{ height: "50%", width: "50%" }}
        camera={{ position: [10, 50, 20], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[15, 10, 10]} />
        <OrbitControls />

        <Floor
          position={[0, 0, 0]}
          color={colors[0]}
          toggleColor={() => handleFloorClick(0)}
        />
        <Floor
          position={[0, 2.5, 0]}
          color={colors[1]}
          toggleColor={() => handleFloorClick(1)}
        />
        <Floor
          position={[0, 5, 0]}
          color={colors[2]}
          toggleColor={() => handleFloorClick(2)}
        />
      </Canvas>
    </div>
  );
}