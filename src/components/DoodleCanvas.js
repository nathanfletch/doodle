import React from "react";

export default function DoodleCanvas() {
  const canvasRef = React.useRef(null)
  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={(e) => {
        console.log(e);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        console.log(ctx);
      }}
      id="doodle-canvas"
    ></canvas>
  );
}
