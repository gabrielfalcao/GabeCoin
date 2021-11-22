import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";

import { useWeb3 } from "../Web3";
import TransferenceForm from "./Form";

export default function Transfer() {
  const [transference, setTransference] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { instance, web3, refresh } = useWeb3();
  async function handleClickTransfer({ addr, myCoin }) {
    console.log(`attempting to transfer ${myCoin} GBC to ${addr}`);
    setLoading(true);
    try {
      const response = await instance.methods.transfer(addr, myCoin).call();
      const result = { addr, myCoin, response };
      setTransference(result);
      refresh();
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }
  if (!web3) {
    return null;
  }
  return (
    <Container>
      <Row>
        {transference ? (
          <Col className="text-center">
            <h1>Congratulations 🎉</h1>
            <h2>You transferenced {transference.myCoin} GBC</h2>
            <h3>🤑 🤑 </h3>
            <Button
              variant="success"
              size="lg"
              onClick={(e) => {
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
              <h5>Send your GBC to other addresses 💸</h5>
            </Col>

            <Col md="6">
              {!error ? (
                loading ? (
                  <Spinner variant="warning" />
                ) : (
                  <TransferenceForm
                    onClickTransfer={handleClickTransfer}
                    initialValue="1"
                  />
                )
              ) : (
                <Alert variant="danger">
                  <h4>Error:</h4>
                  <p>{error.message}</p>
                  <Button
                    variant="danger"
                    onClick={(e) => {
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
