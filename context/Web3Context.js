import React, { useState, createContext, useEffect } from 'react';
import { ethers, Contract, utils } from 'ethers';
import Web3Modal from 'web3modal';

import {
  nftCollectionFactoryAddress,
  nftMarketAddress,
} from '../config/contractAddresses';
import FactoryAbi from '@abi/CollectionFactory.json';
import NftABI from '@abi/BorealisRoyalty.json';
import MarketPlaceABI from '@abi/NFTMarket.json';

const Web3Context = createContext();

export const Web3Provider = (props) => {
  const URL = 'https://testnet.aurora.dev';

  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const functionsToExport = {};

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const addresses = await provider.listAccounts();
        if (addresses.length) {
          setAccount(addresses[0]);
        } else {
          return;
        }
      }
    };
    checkConnection();
  }, []);

  functionsToExport.connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);
    } catch (error) {
      console.log(error);
    }
  };

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
