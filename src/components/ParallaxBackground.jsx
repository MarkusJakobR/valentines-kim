import { motion } from "framer-motion";
import GridBackground from "./GridBackground.jsx";

export default function ParallaxBackground({ mousePos, children }) {
  return (
    <motion.div
      className="w-full h-full"
      animate={{
        x: -mousePos.x / 5,
        y: -mousePos.y / 5,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
    >
      <GridBackground />
      {children}
    </motion.div>
  );
}
