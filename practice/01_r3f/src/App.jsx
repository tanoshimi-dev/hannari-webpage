import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Experience } from "./components/Experience";


import { Html, useProgress } from "@react-three/drei";

const LoadingScreen = () => {
  const { progress, active } = useProgress();

  return (
    <div className={`loading-screen ${active ? "" : "loading-screen--hidden"}`}>
      <div className="loading-screen__container">
        <h1 className="loading-screen__title">テストです！</h1>
        <div className="progress__container">
          <div
            className="progress__bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};


const BackToWpLink = () => {

  return (
    <Html>
      <div className="back-to-wplink">
        <div className="label__price">
          <a href="https://tanoshimi.dev/">戻る</a>
        </div>
      </div>
    </Html>
  );
};

function App() {
  return (
    <>
      <LoadingScreen />
      <Canvas camera={{ position: [-1.5, 0.25, 12], fov: 30 }} >
        <Suspense>
          <BackToWpLink/>
          <Experience />
          <OrbitControls />
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
