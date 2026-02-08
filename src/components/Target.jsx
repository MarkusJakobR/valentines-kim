import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Target({ position, id, registerRef }) {
  const targetRef = useRef(null);

  useEffect(() => {
    registerRef(id, targetRef.current);
    return () => registerRef(id, null);
  }, [id, registerRef]);

  return (
    <motion.div
      ref={targetRef}
      className="absolute "
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-6xl select-none pointer-events-none">❤️</div>
    </motion.div>
  );
}
