import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import TopBar from "../TopBar";
import { useWeb3 } from "../Web3";
import PurchaseForm from "./Form";

export default function Buy() {
  const [purchase, setPurchase] = useState(null);
  const [error, setError] = useState(null);
  const { instance, web3, account, refresh } = useWeb3();
  async function handleClickBuy({ eth, ogc }) {
    const value = web3.utils.toWei(`${eth}`, "ether");
    try {
      const response = await instance.methods.buyTokens().send({
        from: account,
        value
      });
      const result = { value, eth, ogc, response };
      setPurchase(result);
      refresh();
    } catch (e) {
      setError(e);
    }
  }
  if (!web3) {
    return (
      <Container fluid className="text-center">
        <Row>
          <Col md={5} />
          <Col md={2}>
            <Spinner animation="grow" variant="info" />;
          </Col>
          <Col md={5} />
        </Row>
        <Row>
          <Col md={2} />
          <Col md={8}>
            <h1>Waiting for metamask</h1>
          </Col>
          <Col md={2} />
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row>
        {purchase ? (
          <Col className="text-center">
            <h1>Congratulations 🎉</h1>
            <h2>You purchased {purchase.ogc} OGC</h2>
            <h3>🤑 🤑 </h3>
            <Button
              variant="success"
              size="lg"
              onClick={e => {
                e.preventDefault();
                setPurchase(null);
              }}
            >
              Buy Again 💰
            </Button>
          </Col>
        ) : (
          <>
            <Col md="4">
              <h2>Buy OGC Tokens</h2>
              <br />
              <h5>
                Deposit at least 0.001 <code>ETH</code> to get 1{" "}
                <code>OGC</code>
              </h5>
            </Col>

            <Col md="6">
              {!error ? (
                <PurchaseForm
                  onClickBuy={handleClickBuy}
                  initialValue="0.001"
                />
              ) : (
                <Alert variant="danger">
                  <h1>Error:</h1>
                  <p>{error.message}</p>
                  <Button
                    variant="danger"
                    onClick={e => {
                      e.preventDefault();
                      setError(null);
                    }}
                  >
                    Try again
                  </Button>
                </Alert>
              )}
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}
