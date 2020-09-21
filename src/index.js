import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Html } from 'drei';
import { Canvas } from 'react-three-fiber';

ReactDOM.render(
  <React.StrictMode>
    <Canvas
      shadowMap
      concurrent
      pixelRatio={1}
      colorManagement
      camera={{ position: [0, 0, 45] }}
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
        stencil: false,
        depth: false,
      }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor('0x242424');
        camera.lookAt(0, 0, 0);
      }}
    >
      <ambientLight />
      <Suspense fallback={<Html>jbg</Html>}>
        <App />
      </Suspense>
    </Canvas>
  </React.StrictMode>,
  document.getElementById('root'),
);
