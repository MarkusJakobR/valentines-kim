import { useState, useRef, useEffect } from "react";
import Crosshair from "./components/Crosshair.jsx";
import ParallaxBackground from "./components/ParallaxBackground.jsx";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [shooting, setShooting] = useState(false);
  const [locked, setLocked] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (locked) {
      setMousePos((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    } else {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePos({ x: e.clientX - centerX, y: e.clientY - centerY });
    }
  };

  const handleClick = () => {
    if (!locked && containerRef.current) {
      containerRef.current.requestPointerLock();
    }
    setShooting(true);
    setTimeout(() => setShooting(false), 100);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "q" || e.key === "Q") {
        document.exitPointerLock();
      }
    };

    const handlePointerLockChange = () => {
      setLocked(document.pointerLockElement === containerRef.current);
      if (!document.pointerLockElement) {
        setMousePos({ x: 0, y: 0 });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-gray-900 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={{ cursor: "none" }}
    >
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
        <Crosshair shooting={shooting} />
      </div>

      {!locked && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded z-40">
          Click to lock cursor | Press Q to unlock
        </div>
      )}

      <ParallaxBackground mousePos={mousePos}>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl"> Click to shoot! </h1>
        </div>
      </ParallaxBackground>
    </div>
  );
}
