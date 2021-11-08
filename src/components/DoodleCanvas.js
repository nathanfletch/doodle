import React from "react";
import PropTypes from "prop-types";


export default function DoodleCanvas(props) {
  const canvasRef = React.useRef(null);
  let ctx = null;

  const [drawing, setDrawing] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: null, y: null });
  // const [previousOffsets, setPreviousOffsets] = React.useState([]);

  function draw(e) {
    console.log(e);
    console.log("drawing");
    ctx.strokeStyle = `hsla(${props.hue}, ${props.saturation}%, ${props.lightness}%, ${props.opacity}%)`;
    ctx.moveTo(coords.x, coords.y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

  }

  React.useEffect(() => {
    ctx = canvasRef.current.getContext("2d");
  }, []);

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e) => {
        console.log(e);
        console.log(e.nativeEvent);
        console.log("down");
        setDrawing(true);
        setCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      }}
      onMouseMove={(e) => {
        if (drawing) {
          draw(e.nativeEvent);
        }
      }}
      onMouseUp={(e) => {
        console.log("up");
        setDrawing(false);
        setCoords({ x: null, y: null });
      }}
      ref={canvasRef}
    ></canvas>
  );
}

DoodleCanvas.propTypes = {
  tools: PropTypes.object,
}