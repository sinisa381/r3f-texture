import * as THREE from 'three';
import React, { useEffect, useMemo } from 'react';
import { useThree, useFrame, createPortal, useLoader } from 'react-three-fiber';
import { Plane } from 'drei';
import Column from './Column';
import {
  EffectComposer,
  EffectPass,
  SavePass,
  RenderPass,
  SMAAImageLoader,
  SMAAEffect,
  BlurPass,
} from 'postprocessing';

import { VIGNETTE_OUT } from './effects';

const Effects = function Effects({ animate }) {
  const { camera, gl, scene, size } = useThree();
  const composer = new EffectComposer(gl, {
    frameBufferType: THREE.HalfFloatType,
  });

  let amount = 3;
  const [targetScene2, targetScene3, targetScene4] = useMemo(() => {
    return [...Array.from({ length: amount }).map(() => new THREE.Scene())];
  }, [amount]);
  const [targetSavePass2, targetSavePass3, targetSavePass4] = useMemo(() => {
    return [...Array.from({ length: amount }).map(() => new SavePass())];
  }, [amount]);
  const [blur2, blur3, blur4] = useMemo(() => {
    return [...Array.from({ length: amount }).map(() => new BlurPass())];
  }, [amount]);
  const targetScene = new THREE.Scene();
  const targetCamera = new THREE.PerspectiveCamera(
    75,
    size.width / 4 / size.height,
    1,
    1000,
  );
  targetCamera.position.z = 10;
  const targetSavePass = new SavePass();
  const blur = new BlurPass();
  const renderPass = new RenderPass(scene, camera);
  const targetRenderPass = new RenderPass(targetScene, targetCamera);
  const targetRenderPass2 = new RenderPass(targetScene2, targetCamera);
  const targetRenderPass3 = new RenderPass(targetScene3, targetCamera);
  const targetRenderPass4 = new RenderPass(targetScene3, targetCamera);
  const smaa = useLoader(SMAAImageLoader);
  const SMAA = new SMAAEffect(...smaa);
  SMAA.colorEdgesMaterial.setEdgeDetectionThreshold(0.1);

  const effectPass = new EffectPass(camera, SMAA, VIGNETTE_OUT);

  composer.addPass(targetRenderPass);
  composer.addPass(blur);
  composer.addPass(targetSavePass);
  composer.addPass(targetRenderPass2);
  composer.addPass(blur2);
  composer.addPass(targetSavePass2);
  composer.addPass(targetRenderPass3);
  composer.addPass(blur3);
  composer.addPass(targetSavePass3);
  composer.addPass(targetRenderPass4);
  composer.addPass(blur4);
  composer.addPass(targetSavePass4);
  composer.addPass(renderPass);
  composer.addPass(effectPass);
  useEffect(() => {
    composer.setSize(size.width, size.height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useFrame((_, delta) => {
    composer.render(delta);
  }, 1);

  return (
    <>
      {createPortal(
        <Column animate={animate} blur={blur} color="green" delay={0} />,
        targetScene,
      )}
      {createPortal(
        <Column animate={animate} blur={blur2} color="red" delay={200} />,
        targetScene2,
      )}
      {createPortal(
        <Column animate={animate} blur={blur3} color="red" delay={400} />,
        targetScene3,
      )}
      {createPortal(
        <Column
          animate={animate}
          blur={blur4}
          color="red"
          lastColumn={true}
          delay={600}
        />,
        targetScene4,
      )}
      <Plane args={[10, 20]} position={[-12, 0]}>
        <meshStandardMaterial
          attach="material"
          map={targetSavePass.renderTarget.texture}
        />
      </Plane>
      <Plane args={[10, 20]} position={[0, 0]}>
        <meshStandardMaterial
          attach="material"
          map={targetSavePass2.renderTarget.texture}
        />
      </Plane>
      <Plane args={[10, 20]} position={[12, 0]}>
        <meshStandardMaterial
          attach="material"
          map={targetSavePass3.renderTarget.texture}
        />
      </Plane>
      <Plane args={[10, 20]} position={[24, 0]}>
        <meshBasicMaterial
          attach="material"
          map={targetSavePass4.renderTarget.texture}
        />
      </Plane>
    </>
  );
};

function App(props) {
  return (
    <>
      <Effects {...props} />
    </>
  );
}

export default App;
