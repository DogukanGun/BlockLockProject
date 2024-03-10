require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  networks: {
    moonbase: {
      url: "https://rpc.testnet.moonbeam.network", // Moonbeam alpha RPC URL
      accounts: [`${privateKey}`], 
      chainId: 1287, // testnet 
    },
  },
};
