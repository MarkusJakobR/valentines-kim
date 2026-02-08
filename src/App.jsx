import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Crosshair from "./components/Crosshair.jsx";
import ParallaxBackground from "./components/ParallaxBackground.jsx";
import Target from "./components/Target.jsx";

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [shooting, setShooting] = useState(false);
  const [locked, setLocked] = useState(false);
  const [targets, setTargets] = useState([
    { id: 1, x: 200, y: 150 },
    { id: 2, x: 600, y: 200 },
    { id: 3, x: 400, y: 400 },
    { id: 4, x: 250, y: 500 },
    { id: 5, x: 700, y: 350 },
  ]);
  const [score, setScore] = useState(0);
  const containerRef = useRef(null);
  const targetRefs = useRef({});

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

  const checkHit = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (const target of targets) {
      const element = targetRefs.current[target.id];
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const targetCenterX = rect.left + rect.width / 2;
      const targetCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(centerX - targetCenterX, 2) +
          Math.pow(centerY - targetCenterY, 2),
      );

      if (distance < 40) {
        handleTargetHit(target.id);
        return;
      }
    }
  };

  const handleClick = () => {
    if (!locked && containerRef.current) {
      containerRef.current.requestPointerLock();
    }
    setShooting(true);
    setTimeout(() => setShooting(false), 100);

    if (locked) {
      checkHit();
    }
  };

  const handleTargetHit = (id) => {
    console.log("hit a target");
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore(score + 1);
  };

  const registerTargetRef = (id, element) => {
    if (element) {
      targetRefs.current[id] = element;
    } else {
      delete targetRefs.current[id];
    }
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

      <div className="absolute top-4 right-4 text-white text-2xl font-bold z-40 bg-black/50 px-4 py-2 rounded">
        Score: {score}
      </div>

      <ParallaxBackground mousePos={mousePos}>
        <AnimatePresence>
          {targets.map((target) => (
            <Target
              key={target.id}
              id={target.id}
              position={{ x: target.x, y: target.y }}
              onHit={handleTargetHit}
              registerRef={registerTargetRef}
            />
          ))}
        </AnimatePresence>

        {targets.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-white text-4xl">All hearts shot! 💘</h1>
          </div>
        )}
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl"> Click to shoot! </h1>
        </div>
      </ParallaxBackground>
    </div>
  );
}
