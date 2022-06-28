import { Col, Row } from "react-bootstrap";
import "./App.css";
import CanvasDrawing from "./components/CanvasDrawing";
import Header from "./components/Header";
import Result from "./components/Result";

function App() {
  return (
    <>
      <Header />
      <Row className="justify-content-center">
        <Col className="d-flex justify-content-center">
          <CanvasDrawing />
        </Col>
        <Col className="justify-content-center">
          <Result />
        </Col>
      </Row>
    </>
  );
}

export default App;
