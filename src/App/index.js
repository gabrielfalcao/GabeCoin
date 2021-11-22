import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import TopBar from "./TopBar";
import Buy from "./Buy";
import Transfer from "./Transfer";
import { Web3Provider } from "./Web3";
//import { BrowserRouter, Switch, Route } from "react-router-dom";

//function App() {
//  return (
//    <Web3Provider>
//      <BrowserRouter>
//        <Switch>
//          <Route path="/">
//            <Container>
//              <h1>GabeCoin</h1>
//            </Container>
//          </Route>
//        </Switch>
//      </BrowserRouter>
//    </Web3Provider>
//  );
//}

function App() {
  return (
    <Web3Provider>
      <Container fluid>
        <TopBar />
        <Container style={{ marginTop: "3rem" }}>
          <Row style={{ marginTop: "3rem" }}>
            <Col>
              <Buy />
            </Col>
          </Row>
          <Row style={{ marginTop: "3rem" }}>
            <Col>
              <Transfer />
            </Col>
          </Row>
        </Container>
      </Container>
    </Web3Provider>
  );
}

export default App;
