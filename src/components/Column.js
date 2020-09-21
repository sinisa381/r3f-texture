import * as THREE from 'three';
import React, { useState, useCallback } from 'react';
import * as easings from 'd3-ease';
import { a, useSpring } from 'react-spring/three';
import { useTextureLoader } from 'drei';
import image0 from '../images/ace.jpg';
import image1 from '../images/robot.jpg';

export default function Surface({ blur, color, delay = 0, animate }) {
  const [toggle, set] = useState(0);
  const onClick = useCallback(() => {
    set((toggle) => Number(toggle === 0 ? -20 : 0));
  }, []);

  const [ace, robot] = useTextureLoader([image0, image1]);
  ace.encoding = THREE.sRGBEncoding;
  robot.encoding = THREE.sRGBEncoding;
  ace.wrapS = ace.wrapT = THREE.ClampToEdgeWrapping;
  const positions = [7.5, 12.5, 17.5, 22.5, 27.5, 42.5];
  const ref = React.useRef();
  blur.scale = 0;

  const sleepRef = (ms, timeoutRef) => {
    return new Promise(
      (resolve) => (timeoutRef.current = setTimeout(resolve, ms)),
    );
  };

  const handleClick = useCallback(async () => {
    await sleepRef(delay, ref);
    onClick();
    await sleepRef(500, ref);
    blur.scale = THREE.MathUtils.lerp(0, 0.9, 1);
    await sleepRef(800, ref);
    blur.scale = THREE.MathUtils.lerp(0.9, 0, 1);
  }, [blur.scale, delay, onClick]);

  React.useEffect(() => {
    if (animate) {
      handleClick();
    }
  }, [animate, handleClick]);

  const { y } = useSpring({
    y: toggle,
    config: {
      mass: 4,
      tension: 3000,
      friction: 220,
      precision: 0.0001,
      duration: 2000,
      // easing: easings.easePolyInOut.exponent(4.0),
      easing: easings.easeBackInOut.overshoot(1.0),
    },
  });

  const scale = 1.56;

  return (
    <>
      <ambientLight />
      <a.group position-y={y} scale={[scale, scale, scale]}>
        {positions.map((p, i) => (
          <mesh position-y={p} key={i}>
            <planeBufferGeometry attach="geometry" args={[5, 5]} />
            <meshStandardMaterial
              attach="material"
              map={(i + 1) % 2 === 0 ? ace : robot}
            />
          </mesh>
        ))}
        <mesh ref={ref} position-y={2.5}>
          <planeBufferGeometry attach="geometry" args={[5, 5]} />
          <meshStandardMaterial
            attach="material"
            color={color && color}
            map={ace}
          />
        </mesh>
        <mesh ref={ref} position-y={-2.5}>
          <planeBufferGeometry attach="geometry" args={[5, 5]} />
          <meshStandardMaterial attach="material" map={robot} />
        </mesh>
      </a.group>
    </>
  );
}
