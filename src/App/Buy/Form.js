import React, { useState, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useWeb3 } from "../Web3";

export const coefficient = 1000.0;
export const ethToOgc = value => Number.parseFloat(value) * coefficient;
export const ogcToEth = value => Number.parseFloat(value) / coefficient;

export default function PurchaseForm({ onClickBuy, initialValue }) {
  const { ethBalance } = useWeb3();
  const ethRef = useRef(null);
  const ogcRef = useRef(null);
  const [eth, setEth] = useState(Number.parseFloat(initialValue));
  const [ogc, setOgc] = useState(ethToOgc(initialValue));

  const hasFunds = Number.parseInt(eth) <= ethBalance;
  function handleEthChange(e) {
    const value = e.target?.value || 0;
    ogcRef.current.value = ethToOgc(value);
    if (value) {
      setEth(value);
      setOgc(ethToOgc(value));
    }
  }
  function handleOgcChange(e) {
    const value = e.target?.value || 0;
    ethRef.current.value = ogcToEth(value);
    if (value) {
      setOgc(value);
      setEth(ogcToEth(value));
    }
  }
  async function handleBuy(e) {
    e.preventDefault();
    if (hasFunds) {
      await onClickBuy({ eth, ogc });
    }
  }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="ETH">
        <Form.Label>You give (ETH)</Form.Label>
        <Form.Control
          size="lg"
          type="number"
          defaultValue={eth}
          placeholder="Enter ETH"
          ref={ethRef}
          onChange={handleEthChange}
        />
        <Form.Text className="text-muted">1 ETH = 100 OGC</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="OGC">
        <Form.Label>You Receive</Form.Label>
        <Form.Control
          size="lg"
          type="number"
          ref={ogcRef}
          defaultValue={ogc}
          placeholder="Enter OGC"
          onChange={handleOgcChange}
        />
        <Form.Text className="text-muted">1 OGC = 0.001 ETH</Form.Text>
      </Form.Group>
      <Button
        disabled={!hasFunds}
        variant="warning"
        type="submit"
        size="lg"
        onClick={handleBuy}
      >
        Buy {ogc} Token{Number.parseFloat(ogc) !== 1 ? "s" : ""}
      </Button>
    </Form>
  );
}
