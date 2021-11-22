import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet";

import TopBar from "./TopBar";
import Buy from "./Buy";
import Transfer from "./Transfer";
import { Web3Provider } from "./Web3";
import * as img from "./img";
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>GabeCoin</title>
        <link rel="canonical" href="http://localhost:3000" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={img.appleTouchIcon}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={img.favicon32x32}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={img.favicon16x16}
        />
        <link rel="shortcut icon" href={img.favicon} />
      </Helmet>
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
