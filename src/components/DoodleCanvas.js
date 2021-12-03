import { React, useState, useRef } from "react";
import PropTypes from "prop-types";

export default function DoodleCanvas(props) {
  const { radius, speed, hue, saturation, lightness, opacity, number, width } =
    props.tools;
  const canvasRef = useRef(null);
  const rotationSpeedRadians = (speed * Math.PI) / 180;
  // let ctx = null;

  const [drawing, setDrawing] = useState(false);
  const [coords, setCoords] = useState({ x: null, y: null });
  const [localHue, setLocalHue] = useState(hue);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [rotationAdjustments, setRotationAdjustments] = useState({
    x: [],
    y: [],
  });

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvasRef.current.getContext("2d");
  // }, []);

  function draw(ctx, e) {
    ctx.strokeStyle = `hsla(${localHue}, ${saturation}%, ${lightness}%, ${opacity}%)`;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = width;
    ctx.beginPath();

    for (let i = 0; i < number; i++) {
      //move to old position using offsets, calc new offsets, line to new position, assign new offsets to old offset arrays.

      const currentRadians =
        ((rotationOffset + 2) * Math.PI * (i + 1)) / number;
      let xEndLineRotationAdjustment = radius * Math.cos(currentRadians);
      let yEndLineRotationAdjustment = radius * Math.sin(currentRadians);

      //start line
      ctx.moveTo(
        coords.x + rotationAdjustments.x[i],
        coords.y + rotationAdjustments.y[i]
      );

      //end line
      ctx.lineTo(
        e.offsetX + xEndLineRotationAdjustment,
        e.offsetY + yEndLineRotationAdjustment
      );
      setRotationAdjustments((prevRotationAdjustments) => {
        prevRotationAdjustments.x[i] = xEndLineRotationAdjustment;
        prevRotationAdjustments.y[i] = yEndLineRotationAdjustment;
        return {
          x: prevRotationAdjustments.x,
          y: prevRotationAdjustments.y,
        };
      });
    }
    ctx.stroke();

    setCoords({ x: e.offsetX, y: e.offsetY });
    setRotationOffset(
      (rotationOffset) => (rotationOffset += rotationSpeedRadians)
    );
    setLocalHue((prevLocalHue) => (prevLocalHue + 1) % 360);
  }

  return (
    <canvas
      width={window.innerWidth - 150}
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
      onMouseOut={(e) => {
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
