import React from "react";

export default function DoodleCanvas() {
  const canvasRef = React.useRef(null)

  const [drawing, setDrawing] = React.useState(false);
  // const [coords, setCoords] = React.useState({x: null, y: null});
  // const [previousOffsets, setPreviousOffsets] = React.useState([]);
  
  React.useEffect(() => {
    canvasRef.current.getContext('2d')
  }, [])


  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      
      onMouseDown ={(e) => {
        console.log("down");
        console.log(`drawing: ${drawing}`);
        setDrawing(true);
      }}
      onMouseMove ={(e) => {
        if(drawing) 
        console.log("drawing");
      }}
      onMouseUp ={(e) => {
        console.log("up");
        console.log(`drawing: ${drawing}`);
        setDrawing(false);
      }}
      ref={canvasRef}
      id="doodle-canvas"
    ></canvas>
  );
}
