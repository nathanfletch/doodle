import React from "react";
import PropTypes from "prop-types";

export default function DoodleCanvas(props) {
  const canvasRef = React.useRef(null);
  const rotationSpeedRadians = (props.tools.speed * Math.PI/180);
  // let ctx = null;

  const [drawing, setDrawing] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: null, y: null });
  const [localHue, setLocalHue] = React.useState(props.tools.hue);
  const [rotationOffset, setRotationOffset] = React.useState(0);
  const [rotationAdjustments, setRotationAdjustments] = React.useState({x:[], y:[]});
  
  // React.useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvasRef.current.getContext("2d");
  // }, []);

  function draw(ctx, e) {
    ctx.strokeStyle = `hsla(${localHue}, ${props.tools.saturation}%, ${props.tools.lightness}%, ${props.tools.opacity}%)`;
    ctx.beginPath();

    for (let i = 0; i < props.tools.number; i++) {
      //move to old position using offsets, calc new offsets, line to new position, assign new offsets to old offset arrays.
      
      const currentRadians =
        ((rotationOffset + 2) * Math.PI * (i + 1)) / props.tools.number;
      let xOffset = props.tools.radius * Math.cos(currentRadians);
      let yOffset = props.tools.radius * Math.sin(currentRadians);

      //start line
      ctx.moveTo(coords.x + rotationAdjustments.x[i], coords.y + rotationAdjustments.y[i]);
      
      //end line
      ctx.lineTo(e.offsetX + xOffset, e.offsetY + yOffset);
      setRotationAdjustments(prevRotationAdjustments => {
        prevRotationAdjustments.x[i] = xOffset;
        prevRotationAdjustments.y[i] = yOffset;
        return {
          x: prevRotationAdjustments.x,
          y: prevRotationAdjustments.y,
        }
      }); 
    }
    ctx.stroke();

    setCoords({ x: e.offsetX, y: e.offsetY });
    setRotationOffset(rotationOffset => rotationOffset += rotationSpeedRadians);
    setLocalHue((prevLocalHue) => (prevLocalHue + 1) % 360);
  }

  return (
    <canvas
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e) => {
        setDrawing(true);
        setCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      }}
      onMouseMove={(e) => {
        if (drawing) {
          const ctx = canvasRef.current.getContext("2d");
          draw(ctx, e.nativeEvent);
        }
      }}
      onMouseUp={(e) => {
        setDrawing(false);
        setCoords({ x: null, y: null });
      }}
      ref={canvasRef}
    ></canvas>
  );
}

DoodleCanvas.propTypes = {
  tools: PropTypes.object,
};