import * as THREE from 'three';
import React, { useState, useCallback } from 'react';
import { Html } from 'drei';
import { useThree, useFrame, createPortal } from 'react-three-fiber';
import { useTextureLoader, Box } from 'drei';
import Scene from './components/Scene';
function App() {
  const [animate, set] = useState(false);
  const handleClick = () => {
    set((prev) => !prev);
  };
  return (
    <>
      <Box position-y={-20} onClick={handleClick}>
        <meshStandardMaterial attach="material" color="red" />
      </Box>
      <Scene animate={animate} setAnimate={() => set(false)} />
    </>
  );
}

export default App;
