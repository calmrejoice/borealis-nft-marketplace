import React, { useState, createContext } from 'react';
import { ethers, Contract, utils } from 'ethers';
import {
  nftCollectionFactoryAddress,
  nftMarketAddress,
} from '../config/contractAddresses';

import FactoryAbi from '../artifacts/contracts/NFTCollectionFactory.sol/CollectionFactory.json';
import NftABI from '../artifacts/contracts/BorealisRoyalty.sol/BorealisRoyalty.json';
import MarketPlaceABI from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json';

const Web3Context = createContext();

export const Web3Provider = (props) => {
  const URL = 'https://testnet.aurora.dev';

  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const functionsToExport = {};

  functionsToExport.extensionSetup = async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await provider.send('eth_requestAccounts', []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    setSigner(signer);
    setAccount(userAddress);
  };

  const checkSigner = async () => {
    if (!signer) {
      await functionsToExport.extensionSetup();
    }
    return true;
  };

  return (
    <Web3Context.Provider value={{ account, ...functionsToExport }}>
      {props.children}
    </Web3Context.Provider>
  );
};
export default Web3Context;
