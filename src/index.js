import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Canvas } from 'react-three-fiber';

ReactDOM.render(
  <React.StrictMode>
    <Canvas
      shadowMap
      concurrent
      colorManagement
      camera={{ position: [0, 0, 35] }}
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
        stencil: false,
        depth: false,
      }}
      // onCreated={({ gl, camera }) => camera.lookAt(0, 0, 0)}
      onCreated={({ gl, camera }) => {
        gl.setClearColor('0x242424');
        camera.lookAt(0, 0, 0);
      }}
    >
      <ambientLight />
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Canvas>
  </React.StrictMode>,
  document.getElementById('root'),
);
