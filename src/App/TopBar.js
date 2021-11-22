import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useWeb3 } from "./Web3";
import { metamask, coin } from "./img";

export default function TopBar() {
  const {
    getOgBalance,
    getEthBalance,
    connect,
    account,
    disconnect,
    ogBalance,
    ethBalance,
  } = useWeb3();
  return (
    <Navbar bg="success" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={coin} width="32" height="32" /> GabeCoin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="gc-navbar" />
        <Navbar.Collapse id="gc-navbar" className="justify-content-end">
          <Nav>
            {account ? (
              <>
                <Nav.Link href="#home">Buy</Nav.Link>
                <Nav.Link href="#link">Sell</Nav.Link>
                <Nav.Link
                  href="#refresh"
                  alt="click to refresh"
                  onClick={(e) => {
                    e.preventDefault();
                    getOgBalance();
                  }}
                >
                  Tokens: {ogBalance}
                </Nav.Link>
                <Nav.Link
                  href="#refresh"
                  alt="click to refresh"
                  onClick={(e) => {
                    e.preventDefault();
                    getEthBalance();
                  }}
                >
                  {ethBalance} ETH
                </Nav.Link>
                <Nav.Link
                  href="#disconnect"
                  onClick={(e) => {
                    e.preventDefault();
                    disconnect();
                  }}
                >
                  Disconnect
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                href="#connect-to-metamask"
                onClick={async (e) => {
                  e.preventDefault();
                  connect();
                }}
              >
                Connect to Metamask{" "}
                <img
                  src={metamask}
                  width="32"
                  height="32"
                  alt="Metamask Logo"
                />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

//import NavDropdown from "react-bootstrap/NavDropdown";
//import Spinner from "react-bootstrap/Spinner";
//<Spinner animation="grow" variant="info" />;
