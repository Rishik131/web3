require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/wk1TmRcqE4Ih7fON8D1aAOwqWO9cj6nS",
      accounts: ['289e49e64c5aca3a62b84ac0360416bbad449e6c2d7f11cf742076cf031f332e']
    }
  }
};
