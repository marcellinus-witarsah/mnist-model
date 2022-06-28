import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class Result extends Component {
  render() {
    return (
      <>
        <Button variant="warning">Clear</Button>
        <div class="inference-result">Result:</div>
      </>
    );
  }
}
