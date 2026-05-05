import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from "framer-motion";

const GridPattern = ({ offsetX, offsetY }) => (
  <svg style={{ width: '100%', height: '100%' }}>
    <defs>
      <motion.pattern
        id="grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x={offsetX}
        y={offsetY}
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="#0f172a"
          strokeWidth="1"
        />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);

export function InfiniteGrid() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 400);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 300);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'auto' }}
    >
      {/* Dim base grid always visible */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06 }}>
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse-revealed bright grid */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, opacity: 0.5,
          maskImage, WebkitMaskImage: maskImage,
        }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Colored blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', right: '-10%', top: '-20%',
          width: '40%', height: '40%', borderRadius: '50%',
          background: 'rgba(249,115,22,0.12)', filter: 'blur(120px)'
        }} />
        <div style={{
          position: 'absolute', left: '-10%', bottom: '-20%',
          width: '40%', height: '40%', borderRadius: '50%',
          background: 'rgba(59,130,246,0.12)', filter: 'blur(120px)'
        }} />
      </div>
    </div>
  );
}