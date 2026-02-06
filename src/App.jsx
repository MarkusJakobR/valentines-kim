import { useState } from "react";
import Crosshair from "./components/Crosshair.jsx";
import ParallaxBackground from "./components/ParallaxBackground.jsx";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [shooting, setShooting] = useState(false);

  const handleMouseMove = (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({ x: e.clientX - centerX, y: e.clientY - centerY });
  };

  const handleClick = () => {
    setShooting(true);
    setTimeout(() => setShooting(false), 100);
  };

  return (
    <div
      className="w-screen h-screen bg-gray-900 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ cursor: "none" }}
    >
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
        <Crosshair shooting={shooting} />
      </div>

      <ParallaxBackground mousePos={mousePos}>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl"> Click to shoot! </h1>
        </div>
      </ParallaxBackground>
    </div>
  );
}
