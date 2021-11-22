const HTWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const ICO = require("./build/ICO.json");

const deploy = async () => {
  const provider = new HTWalletProvider(
    "seed alien boil tree breeze health dose flag energy glad slight awake",
    "https://rinkeby.infura.io/v3/c4cc858e78e6454ea92e35841e5eb91b"
  );

  const web3 = new Web3(provider);

  const contract = new web3.eth.Contract(JSON.parse(ICO.interface));

  const [account] = await web3.eth.getAccounts();
  console.log(`Attempting to deploy from account: ${account}`);

  const result = await contract
    .deploy({
      data: `0x${ICO.bytecode}`
    })
    .send({
      from: account
    });

  console.log(`Contract deployed to ${result.options.address}`);
};
deploy();
