import React from "react";
import PropTypes from "prop-types";

export default function DoodleCanvas(props) {
  const canvasRef = React.useRef(null);
  const rotationSpeedRadians = (props.tools.rotationSpeed * Math.PI/180);
  // let ctx = null;

  const [drawing, setDrawing] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: null, y: null });
  const [localHue, setLocalHue] = React.useState(props.tools.hue);
  const [rotationOffset, setRotationOffset] = React.useState(0);
  // const [rotationAdjustments, setRotationAdjustments] = React.useState({x:[], y:[]});
  // const [previousOffsets, setPreviousOffsets] = React.useState([]);
  // React.useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvasRef.current.getContext("2d");
  // }, []);

  function draw(ctx, e) {
    ctx.strokeStyle = `hsla(${localHue}, ${props.tools.saturation}%, ${props.tools.lightness}%, ${props.tools.opacity}%)`;
    ctx.beginPath();
    // ctx.moveTo(coords.x, coords.y);
    // ctx.lineTo(e.offsetX, e.offsetY);
    // ctx.stroke();

    for (let i = 0; i < props.tools.number; i++) {
      //move to old position using offsets, calc new offsets, line to new position, assign new offsets to old offset arrays.

      //new offset calc
      // let newRotationOffset = rotationOffset;
      // if (e.ctrlKey) newRotationOffset -= rotationSpeed;

      // rotationOffset + 
      const currentRadians =
        ((2) * Math.PI * (i + 1)) / props.tools.number;
      let xOffset = props.tools.radius * Math.cos(currentRadians);
      let yOffset = props.tools.radius * Math.sin(currentRadians);
      console.log(`xOffset: ${xOffset} yOffset: ${yOffset}`)

      //start line
      // if (oldXOffsets[i] === 0) {
        ctx.moveTo(coords.x + xOffset, coords.y + yOffset);
      // } else {
      //   ctx.moveTo(oldX + oldXOffsets[i], oldY + oldYOffsets[i]);
      // }

      //end line
      ctx.lineTo(e.offsetX + xOffset, e.offsetY + yOffset);
      // //set
      // oldXOffsets[i] = xOffset;
      // oldYOffsets[i] = yOffset;
    }
    ctx.stroke();

    setCoords({ x: e.offsetX, y: e.offsetY });
    // if (e.ctrlKey) {
    // setRotationOffset(prevRotationOffset => prevRotationOffset += rotationSpeedRadians);
    // }
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

/*
const canvas = document.getElementById("doodle-canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.strokeStyle = "blue";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 1;

      let drawing = false;
      // let mode = "";
      //line:
      //width, number,
      //circle:

      let oldX = null;
      let oldY = null;
      let rotationOffset = 0;
      let rotationSpeed = 0.2;
      let hue = 0;
      let saturation = 80;
      let lightness = 50;
      let opacity = 100;
      let radius = 10;
      let radiusIncreasing = true;
      let number = 5;
      let oldXOffsets = [];
      let oldYOffsets = [];
      for(let i = 0; i < number; i++) {
        oldXOffsets.push(0);
        oldYOffsets.push(0);
      }

      function draw(e) {
        if (!drawing) return;

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity}%)`;
        multiLineCircleRotate(5);

        [oldX, oldY] = [e.offsetX, e.offsetY];

        if (e.ctrlKey) {
          rotationOffset += rotationSpeed;
        }
        hue = (hue + 1) % 360;

        function multiLineCircleRotate() {
          ctx.beginPath();
          for (let i = 0; i < number; i++) {
            //move to old position using offsets, calc new offsets, line to new position, assign new offsets to old offset arrays.


            //new offset calc
            let newRotationOffset = rotationOffset;
            if (e.ctrlKey) newRotationOffset -= rotationSpeed;
            const currentRadians =
              ((newRotationOffset + 2) * Math.PI * (i + 1)) / number;
            let xOffset = radius * Math.cos(currentRadians);
            let yOffset = radius * Math.sin(currentRadians);
            // console.log(`xOffset: ${xOffset} yOffset: ${yOffset}`)

            //start line
            if (oldXOffsets[i] === 0) {
              ctx.moveTo(oldX + xOffset, oldY + yOffset);

            } else {
              ctx.moveTo(oldX + oldXOffsets[i], oldY + oldYOffsets[i]);
              
            }

            //end line
            ctx.lineTo(e.offsetX + xOffset, e.offsetY + yOffset); 

            //set
            oldXOffsets[i] = xOffset;
            oldYOffsets[i] = yOffset;

          }
          ctx.stroke();
        }
      }

      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mousedown", (e) => {
        [oldX, oldY] = [e.offsetX, e.offsetY];
        drawing = true;
        console.log(e);
      });
      canvas.addEventListener("mouseup", () => {
        [oldX, oldY] = [null, null];
        drawing = false;
        oldXOffsets = oldXOffsets.map(o => 0);
        oldYOffsets = oldYOffsets.map(o => 0);
        rotationOffset = 0;
      });
      canvas.addEventListener("mouseout", () => {
        [oldX, oldY] = [null, null];
        drawing = false;
        oldXOffsets = oldXOffsets.map(o => 0);
        oldYOffsets = oldYOffsets.map(o => 0);
        rotationOffset = 0;

      });
*/
