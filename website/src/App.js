import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Navbar, Row, Stack } from "react-bootstrap";
import "./App.css";
import { HTTP_REQUEST_URL, WEBSITE_URL } from "./constants";
import * as tf from "@tensorflow/tfjs";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [result, setResult] = useState(null);

  // This line of code will be runned if the window inner width and height are changed
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    // canvas.width = window.innerWidth / 4;
    // canvas.height = window.innerWidth / 4;
    canvas.width = 224;
    canvas.height = 224;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = context;
  }, []);

  // event function for start drawing
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
    contextRef.current.lineWidth = 15;
    setIsDrawing(true);
  };

  // event function for stop drawing
  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  // event function for drawing
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

  // function for clearing canvas after drawing
  const clearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    contextRef.current.fillStyle = "white";
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setResult(null);
  };

  // function for getting array version of an image inside canvas
  const getArray = () => {
    const image = tf.tidy(() => {
      return tf.browser.fromPixels(canvasRef.current, 1);
    });
    console.log(image.arraySync());
    return image.arraySync();
  };

  // function for prediction image
  const predictImage = () => {
    const img_arr = getArray();
    const body = { img_arr: img_arr };
    const headers = {
      "Access-Control-Allow-Origin": WEBSITE_URL,
      "Content-Type": "application/json",
    };

    axios
      .post(HTTP_REQUEST_URL + "/predict", body, {
        headers: headers,
      })
      .then((response) => {
        setResult(response.data["result"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar className="navbar navbar-light bg-light shadow p-3 mb-5 bg-body rounded">
        <Container className="container-fluid">
          <h1 class="navbar-brand mb-0 text-center justify-content-center w-100 display-1">
            MNIST{" "}
            <img
              src="https://www.gstatic.com/devrel-devsite/prod/v2325d8c952b9b608081f2b039989eacb0148117feedf74c3efc58771dfb973db/tensorflow/images/lockup.svg"
              class="devsite-site-logo w-25"
              alt="TensorFlow"
            />{" "}
            MODEL
          </h1>
        </Container>
      </Navbar>
      <Row className="p-md-3">
        <Col>
          <Stack gap={4}>
            <div className="d-flex justify-content-center">
              <canvas
                className="canvas-container bg-light shadow mb-5 bg-body rounded"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                ref={canvasRef}
              ></canvas>
            </div>
            <div className="d-flex justify-content-center gap-5">
              <Button variant="primary" onClick={predictImage}>
                Predict
              </Button>
              <Button variant="warning" onClick={clearCanvas}>
                Clear
              </Button>
            </div>
          </Stack>
        </Col>
        <Col>
          <div className="d-flex justify-content-center">
            <h2>{result ? "Result : " + result : "No Data has been Input"}</h2>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default App;
