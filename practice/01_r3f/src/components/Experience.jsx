import { Fish } from "./Fish";
import { Deno } from "./Deno";
import { Background } from "./Background";
import { Html, useGLTF } from "@react-three/drei";

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

import { useMemo, useRef, useEffect, useCallback, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber"
import { MathUtils } from "three";
import { Vector2, Color } from "three";



export const Experience = () => {
  const { scene } = useGLTF("models/scene.gltf");

  const [denoSelected, setDenoSelected] = useState(false);

  const mesh = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
      u_bg: {
        value: new Color("#A1A3F7"),
      },
      u_colorA: { value: new Color("#9FBAF9") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    );

    // console.log(`mousePosition.current.x=${mousePosition.current.x}`)
    // console.log(`mousePosition.current.y=${mousePosition.current.y}`)
    
  });

  return (
    <>

      <primitive object={scene} position={[0, -3, 0]} rotation={[0, 0.5, 0]}/>
      
      <Background />

      <mesh ref={mesh} position={[14, 1, -8]} rotation={[26.5, -0.7, 0]} scale={16}>
        <planeGeometry args={[2, 1, 1, 1]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
      <Deno 
        onPointerDown={() => setDenoSelected(true)}
        onPointerUp={() => setDenoSelected(false)}
        position={[2.5, -1.35, 0.5]} scale={ denoSelected ? 0.23 :0.2} rotation={[0, -0.25, 0]}/>

    </>

  );
};
