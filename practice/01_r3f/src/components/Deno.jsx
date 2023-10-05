/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/Deno.gltf -o src/components/Deno.jsx -r public 
*/

import { useAnimations, useFBX, useGLTF, useScroll } from "@react-three/drei";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";

export function Deno(props) {
  // const { animations: dancing } = useFBX("/animations/Dancing.fbx");
  // dancing[0].name = "Dancing";

  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Deno.gltf')
    //const { actions } = useAnimations([dancing[0],...animations], group)
    const { actions } = useAnimations(animations, group)

  const [{ animation }, set] = useControls(()=>({
    animation: { value: "Idle", options: Object.keys(actions) },
  }));

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);


  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(1);
  
  // let color = hovered ? "pink" : "white";
  // if (selected) {
  //   color = "hotpink";
  // }
  
  const getNextAnimation = () => {
    const keys = Object.keys(actions);
    const maxLength = keys.length;
    let nextIndex = currentAnimeIndex;
    if(currentAnimeIndex === maxLength ){
      nextIndex = 1;
    } else {
      nextIndex += 1; 
    }

    setCurrentAnimeIndex(nextIndex);
    return keys[nextIndex];

  }

  const getRandomAnimation = () => {
    const keys = Object.keys(actions);
    const maxLength = keys.length;
    
    let nextIndex = Math.floor(Math.random() * (maxLength-1)) +1;
    return keys[nextIndex];

  }


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <mesh
            {...props}
            onPointerEnter={(e) => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onPointerDown={() => {
                // const nextAnimation = getNextAnimation();
                const nextAnimation = getRandomAnimation();
                set({ animation: nextAnimation });
              }
            }
            onPointerUp={() => set({ animation: 'Idle' }) }
            
          >
            <group name="Dino" >
              <skinnedMesh name="Cube081" 
                geometry={nodes.Cube081.geometry} material={materials.Dino_Main} skeleton={nodes.Cube081.skeleton}   />
              <skinnedMesh name="Cube081_1" geometry={nodes.Cube081_1.geometry} material={materials.Dino_Secondary} skeleton={nodes.Cube081_1.skeleton} />
              <skinnedMesh name="Cube081_2" geometry={nodes.Cube081_2.geometry} material={materials.Eye_Black} skeleton={nodes.Cube081_2.skeleton} />
              { !hovered && 
                <>
                <skinnedMesh name="Cube081_3" geometry={nodes.Cube081_3.geometry} material={materials.Eye_White} skeleton={nodes.Cube081_3.skeleton} />
                <skinnedMesh name="Cube081_4" geometry={nodes.Cube081_4.geometry} material={materials.Dino_Teeth} skeleton={nodes.Cube081_4.skeleton} />
                <skinnedMesh name="Cube081_5" geometry={nodes.Cube081_5.geometry} material={materials.Dino_Tongue} skeleton={nodes.Cube081_5.skeleton} />
                </>
              }
            </group>

          </mesh>

        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Deno.gltf')
