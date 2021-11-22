import React, { useContext, createContext, useState, useEffect } from "react";
import newICO from "../../ethereum/build/ICO.json";
import Web3 from "web3";

export const Web3Context = createContext();
export const contractAddress = "0x2F9834ED2ac1d3e5573128d88e44B00c84604F7C";
//const old = "0x251F2b3De50cBcD453c33F77599cf692927eEef8";
export function Web3Provider({ children }) {
  const web3 = useWeb3Provider();
  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
}

export function useWeb3() {
  return useContext(Web3Context);
}
export function getInfuraProvider() {
  return new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/c4cc858e78e6454ea92e35841e5eb91b"
  );
}

export function getProvider() {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    return window.ethereum; // https://medium.com/metamask/no-longer-injecting-web3-js-4a899ad6e59e
  }
  return new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/c4cc858e78e6454ea92e35841e5eb91b"
  );
}

//https://medium.com/valist/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
export function useWeb3Provider() {
  const [web3, setWeb3] = useState(undefined);
  const [instance, setInstance] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [ogBalance, setOgBalance] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  async function disconnect() {
    setAccount(undefined);
    setWeb3(undefined);
    setInstance(undefined);
    setEthBalance(undefined);
    setOgBalance(undefined);
    setAccounts(undefined);
    // eslint-disable-next-line no-self-assign
    window.location.href = window.location.href;
  }
  async function connect() {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      console.log("MetaMask is installed");
      window.ethereum.send("eth_requestAccounts").then(() => {
        const w3 = new Web3(getProvider());
        setWeb3(w3);
        setInstance(
          new w3.eth.Contract(JSON.parse(newICO.interface), contractAddress)
        );
      });
    }
  }
  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (instance && web3) {
      const accounts = await web3.eth.getAccounts();
      if (!accounts) {
        console.log("no accounts found in metamask");
        return;
      }
      const account = accounts[0];
      const ogBalance = await instance.methods.myBalance().call({
        from: account,
      });
      const ethBalance = await web3.eth.getBalance(account);

      setAccount(account);
      setAccounts(accounts);
      setOgBalance(web3.utils.fromWei(ogBalance, "ether"));
      setEthBalance(web3.utils.fromWei(ethBalance, "ether"));
    } else {
      await connect();
    }
  }, [instance, web3]);

  function getOgBalance() {
    if (account && instance) {
      instance.methods
        .myBalance()
        .call({
          from: account,
        })
        .then((balance) => setOgBalance(balance));
    }
  }
  function getEthBalance() {
    if (account && web3) {
      web3.eth.getBalance(account).then((balance) => setEthBalance(balance));
    }
  }
  function refresh() {
    getOgBalance();
    getEthBalance();
  }
  return {
    web3,
    connect,
    disconnect,
    instance,
    account,
    setAccount,
    accounts,
    setAccounts,
    ethBalance,
    setEthBalance,
    getEthBalance,
    ogBalance,
    setOgBalance,
    getOgBalance,
    refresh,
  };
}

/* useEffect(() => {
 *   if (!web3) {
 *     if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
 *       console.log("MetaMask is installed");
 *       window.ethereum.send('eth_requestAccounts').then(()=>{
 *         const w3 = new Web3(window.ethereum);
 *         setWeb3(w3)
 *         setInstance(
 *           new w3.eth.Contract(
 *             JSON.parse(newICO.interface),
 *             "0x251F2b3De50cBcD453c33F77599cf692927eEef8"
 *           )
 *       );
 *       })

 *     } else {
 *       console.error("MetaMask is NOT installed");
 *     }
 *   }
 * }); */
