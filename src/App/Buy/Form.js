import React, { useState, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useWeb3 } from "../Web3";

export const coefficient = 1000.0;
export const ethToMyCoin = (value) => Number.parseFloat(value) * coefficient;
export const myCoinToEth = (value) => Number.parseFloat(value) / coefficient;

export default function PurchaseForm({ onClickBuy, initialValue }) {
  const { ethBalance } = useWeb3();
  const ethRef = useRef(null);
  const myCoinRef = useRef(null);
  const [eth, setEth] = useState(Number.parseFloat(initialValue));
  const [myCoin, setMyCoin] = useState(ethToMyCoin(initialValue));

  const hasFunds = Number.parseInt(eth) <= ethBalance;
  function handleEthChange(e) {
    const value = e.target?.value || 0;
    myCoinRef.current.value = ethToMyCoin(value);
    if (value) {
      setEth(value);
      setMyCoin(ethToMyCoin(value));
    }
  }
  function handleMyCoinChange(e) {
    const value = e.target?.value || 0;
    ethRef.current.value = myCoinToEth(value);
    if (value) {
      setMyCoin(value);
      setEth(myCoinToEth(value));
    }
  }
  async function handleBuy(e) {
    e.preventDefault();
    if (hasFunds) {
      await onClickBuy({ eth, myCoin });
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
        <Form.Text className="text-muted">1 ETH = 100 GBC</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="GBC">
        <Form.Label>You Receive</Form.Label>
        <Form.Control
          size="lg"
          type="number"
          ref={myCoinRef}
          defaultValue={myCoin}
          placeholder="Enter GBC"
          onChange={handleMyCoinChange}
        />
        <Form.Text className="text-muted">1 GBC = 0.001 ETH</Form.Text>
      </Form.Group>
      <Button
        disabled={!hasFunds}
        variant="outline-primary"
        type="submit"
        size="lg"
        onClick={handleBuy}
      >
        Buy {myCoin} Token{Number.parseFloat(myCoin) !== 1 ? "s" : ""}
      </Button>
    </Form>
  );
}
