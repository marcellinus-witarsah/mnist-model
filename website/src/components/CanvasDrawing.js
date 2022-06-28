import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function CanvasDrawing() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // This line of code will be runned if the window inner width and height are changed
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth / 4;
    canvas.height = window.innerWidth / 4;
    contextRef.current = context;
  }, []);

  const startDrawing = (event) => {
    // extract offsetX and offsetY from event
    console.log(event.clientX, event.clientY);
    contextRef.current.beginPath();
    contextRef.current.moveTo(
      event.clientX - canvasRef.current.offsetLeft,
      event.clientY - canvasRef.current.offsetTop
    );
    contextRef.current.lineCap = "round";
    contextRef.current.lineJoin = "round";
    contextRef.current.strokeStyle = "black";
    contextRef.current.lineWidth = 7;
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) {
      return;
    }
    contextRef.current.lineTo(
      event.clientX - canvasRef.current.offsetLeft,
      event.clientY - canvasRef.current.offsetTop
    );
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    );
  };

  return (
    <>
      <canvas
        className="canvas-container bg-light shadow mb-5 bg-body rounded"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      ></canvas>
      <div>
        <Button variant="warning" onClick={clearCanvas}>
          Clear
        </Button>
      </div>
    </>
  );
}

export default CanvasDrawing;
