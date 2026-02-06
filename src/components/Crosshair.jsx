import { motion } from "framer-motion";

export default function Crosshair({ shooting }) {
  return (
    <motion.div
      animate={{ scale: shooting ? 0.8 : 1 }}
      transition={{ duration: 0.1 }}
    >
      {/* Horizontal line */}
      <div className="absolute w-6 h-0.5 bg-red-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      {/* Vertical line */}
      <div className="absolute w-0.5 h-6 bg-red-500 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      {/* Center dot */}
      <div className="absolute w-1 h-1 bg-red-500 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </motion.div>
  );
}
