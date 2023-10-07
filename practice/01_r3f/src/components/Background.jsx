import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Background = () => {
  // const map = useTexture(
  //   "/textures/anime_tavern_with_candle_lights_and_magical_purple.jpg"
  // );
  // const map = useTexture(
  //   "textures/timothee-duran-ilfsT5p_qvA-unsplash.jpg"
  // );
  const map = useTexture(
    //"wp-content/themes/twentytwentythree/r3f/textures/timothee-duran-ilfsT5p_qvA-unsplash.jpg"
    `${import.meta.env.VITE_R3F_ASSET_PATH}textures/timothee-duran-ilfsT5p_qvA-unsplash.jpg`
  );
  
  return (
    <>
      <mesh>
        <sphereGeometry args={[16, 31, 31]} />
        <meshBasicMaterial side={THREE.BackSide} map={map} toneMapped={false} />
      </mesh>
    </>
  );
};
