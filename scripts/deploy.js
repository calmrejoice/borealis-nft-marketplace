const hre = require('hardhat');
const ethers = require('ethers');

// npx hardhat run scripts/deploy.js --network auroraTestnet
async function main() {
  const deployPriceWei = ethers.utils.parseEther('0.025');

  const NFTMarket = await hre.ethers.getContractFactory('NFTMarket');
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  console.log('nftMarket deployed to:', nftMarket.address);

  const CollectionFactory = await hre.ethers.getContractFactory(
    'CollectionFactory'
  );
  const collectionFactory = await CollectionFactory.deploy(deployPriceWei);
  await collectionFactory.deployed();
  console.log('collectionFactory deployed to:', collectionFactory.address);

  // const BorealisRoyalty = await hre.ethers.getContractFactory(
  //   'BorealisRoyalty'
  // );
  // const borealisRoyalty = await BorealisRoyalty.deploy();
  // await borealisRoyalty.deployed();
  // console.log('borealisRoyalty deployed to:', borealisRoyalty.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
