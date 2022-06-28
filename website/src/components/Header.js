import React, { Component } from "react";
import { Container, Navbar } from "react-bootstrap";

export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar className="navbar navbar-light bg-light shadow p-3 mb-5 bg-body rounded">
          <Container className="container-fluid">
            <h1 class="navbar-brand mb-0 text-center justify-content-center w-100 display-1">
              MNIST
              {' '}
              <img
                src="https://www.gstatic.com/devrel-devsite/prod/v2325d8c952b9b608081f2b039989eacb0148117feedf74c3efc58771dfb973db/tensorflow/images/lockup.svg"
                class="devsite-site-logo w-25"
                alt="TensorFlow"
              />
              {' '}
              MODEL
            </h1>
          </Container>
        </Navbar>
      </>
    );
  }
}
