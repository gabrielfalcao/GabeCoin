import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import TopBar from "../TopBar";
import { useWeb3 } from "../Web3";
import TransferenceForm from "./Form";

export default function Transfer() {
  const [transference, setTransference] = useState(null);
  const [error, setError] = useState(null);
  const { instance, web3, account, refresh } = useWeb3();
  async function handleClickTransfer({ addr, ogc }) {
    console.log(`attempting to transfer ${ogc} OGC to ${addr}`);

    try {
      const response = await instance.methods.transfer(addr, ogc).call();

      const result = { addr, ogc, response };
      setTransference(result);
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
        {transference ? (
          <Col className="text-center">
            <h1>Congratulations 🎉</h1>
            <h2>You transferenced {transference.ogc} OGC</h2>
            <h3>🤑 🤑 </h3>
            <Button
              variant="success"
              size="lg"
              onClick={e => {
                e.preventDefault();
                setTransference(null);
              }}
            >
              Transfer Again 💰
            </Button>
          </Col>
        ) : (
          <>
            <Col md="4">
              <h2>Transfer tokens</h2>
              <br />
              <h5>Send your OGC to other addresses 💸</h5>
            </Col>

            <Col md="6">
              {!error ? (
                <TransferenceForm
                  onClickTransfer={handleClickTransfer}
                  initialValue="1"
                />
              ) : (
                <Alert variant="danger">
                  <h4>Error:</h4>
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
