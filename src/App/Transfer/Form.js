import React, { useState, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useWeb3 } from "../Web3";

export default function TransferenceForm({ onClickTransfer, initialValue }) {
  const { ogBalance } = useWeb3();
  const addrRef = useRef(null);
  const myCoinRef = useRef(null);
  const [addr, setAddr] = useState(
    "0xA7F2db34258fF1f53f4eB204A9b0302F13754A83"
  );
  const [myCoin, setMyCoin] = useState(Number.parseInt(initialValue));

  const hasFunds = Number.parseInt(myCoin) <= ogBalance;
  function handleAddrChange(e) {
    const value = e.target?.value || 0;
    if (value) {
      setAddr(value);
    }
  }
  function handleMyCoinChange(e) {
    const value = e.target?.value || 0;

    if (value) {
      setMyCoin(value);
    }
  }
  async function handleTransfer(e) {
    e.preventDefault();
    if (hasFunds) {
      await onClickTransfer({ addr, myCoin });
    }
  }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="ADDR">
        <Form.Label>Address</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          placeholder="0xdeadbeef"
          defaultValue={addr}
          ref={addrRef}
          onChange={handleAddrChange}
        />
        <Form.Text className="text-muted">
          The address of the wallet you want to transfer to
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="GBC">
        <Form.Label>Tokens</Form.Label>
        <Form.Control
          size="lg"
          type="number"
          ref={myCoinRef}
          defaultValue={myCoin}
          placeholder={initialValue}
          onChange={handleMyCoinChange}
        />
      </Form.Group>
      <Row>
        <Col>
          <Button
            disabled={!hasFunds}
            variant="outline-dark"
            type="submit"
            size="lg"
            onClick={handleTransfer}
          >
            Transfer {myCoin} Token{Number.parseFloat(myCoin) !== 1 ? "s" : ""}
          </Button>
        </Col>
        <Col className="text-end">
          <p>
            Balance after transfer: <code>{ogBalance - myCoin}</code>
          </p>
        </Col>
      </Row>
    </Form>
  );
}
