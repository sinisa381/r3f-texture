import * as THREE from 'three';
import React, { useState, useCallback } from 'react';
import { Html } from 'drei';
import { useThree, useFrame, createPortal } from 'react-three-fiber';
import { useTextureLoader, Box, Sphere } from 'drei';
import Scene from './components/Scene';
function App() {
  const [animate, set] = useState(false);
  const handleClick = () => {
    set((prev) => !prev);
  };
  return (
    <>
      <Sphere
        scale={[3, 3, 3]}
        args={[1, 70, 70]}
        position-y={-20}
        onClick={handleClick}
      >
        <meshBasicMaterial color="red" attach="material" />
        <Html position-x={-0.3}>Start</Html>
      </Sphere>
      <Scene animate={animate} setAnimate={() => set(false)} />
    </>
  );
}

export default App;
