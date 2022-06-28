import React, { useEffect, useRef, useState } from "react";

function CanvasDrawing() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // This line of code will be runned if the window inner width and height are changed
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.style.width = `${window.innerWidth / 50}vw`;
    canvas.style.height = `${window.innerWidth / 50}vw`;
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({nativeEvent}) => {
    // extract offsetX and offsetY from event
    console.log("stary drawing")
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {
    if (!isDrawing){
      return;
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  return (
    <>
      <canvas
        className="canvas-container bg-light shadow p-3 mb-5 bg-body rounded"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      ></canvas>
    </>
  );
}

export default CanvasDrawing;
