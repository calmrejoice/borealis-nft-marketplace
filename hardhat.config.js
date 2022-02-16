require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const privateKey1 = process.env.PRIVATE_KEY_1;
if (!privateKey1) {
  throw new Error('Please set your PRIVATE_KEY_1 in a .env file');
}

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: [privateKey1],
    },
    auroraTestnet: {
      url: 'https://testnet.aurora.dev',
      accounts: [privateKey1],
      chainId: 1313161555,
    },
    aurora: {
      url: 'https://mainnet.aurora.dev/',
      accounts: [privateKey1],
      chainId: 1313161554,
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
