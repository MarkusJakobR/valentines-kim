export default function GridBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Grid pattern */}
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Center crosshair for reference */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-0.5 bg-blue-500/30" />
        <div className="w-0.5 h-20 bg-blue-500/30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Some reference dots */}
      <div className="absolute left-1/4 top-1/4 w-4 h-4 bg-pink-500 rounded-full" />
      <div className="absolute right-1/4 top-1/4 w-4 h-4 bg-purple-500 rounded-full" />
      <div className="absolute left-1/4 bottom-1/4 w-4 h-4 bg-green-500 rounded-full" />
      <div className="absolute right-1/4 bottom-1/4 w-4 h-4 bg-yellow-500 rounded-full" />
    </div>
  );
}
