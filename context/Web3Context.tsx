import React, { useState, createContext, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { ethers, Contract, utils } from 'ethers';
import Web3Modal from 'web3modal';

import {
  nftCollectionFactoryAddress,
  nftMarketAddress,
} from '../config/contractAddresses';
import FactoryAbi from '@abi/CollectionFactory.json';
import NftABI from '@abi/BorealisRoyalty.json';
import MarketPlaceABI from '@abi/NFTMarket.json';

const Web3Context = createContext(null);

export const Web3Provider = (props) => {
  const URL = 'https://testnet.aurora.dev';

  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState(null);

  const functionsToExport = {
    connectWallet: () => {},
    getCollectionCreationPrice: () => {},
    createCollection: () => {},
  };

  const toast = useToast();

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
      setSigner(signer);
      toast({
        title: 'Success',
        description: 'Wallet connected succesfully.',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Please try connecting your wallet again.',
        status: 'error',
      });
      console.log(error);
    }
  };

  const checkSigner = async () => {
    if (!signer) {
      await functionsToExport.connectWallet();
    }
    return true;
  };

  const showTransactionProgress = async (result) => {
    console.log('Alert!', 'Transaction Initiated!', 'primary', 2000);
    let completeResult, receipt;
    try {
      completeResult = await Promise.resolve(result);
    } catch (e) {
      console.log(
        'Alert',
        `Transaction Failed! ${e.toString()}`,
        'danger',
        2000
      );
      return false;
    }
    console.log(
      'Alert',
      `Transaction Sent! your hash is: ${completeResult.hash}`,
      'success',
      6000
    );
    try {
      receipt = await completeResult.wait();
    } catch (e) {
      console.log(
        'Alert',
        `Transaction Failed! ${e.toString()}`,
        'danger',
        2000
      );
      return false;
    }

    if (receipt.status === 1) {
      console.log('Alert', `Transaction Success!`, 'success', 2000);
    } else {
      console.log('Alert', `Transaction Failed!`, 'danger', 2000);
    }
    return receipt;
  };

  // Get collection creation price
  functionsToExport.getCollectionCreationPrice = async () => {
    await checkSigner();
    console.log(FactoryAbi);
    console.log(signer);
    const factoryContract = new Contract(
      nftCollectionFactoryAddress,
      // @ts-ignore
      FactoryAbi,
      signer
    );
    console.log(factoryContract);
    const result = await factoryContract.getPrice();
    console.log(result);
    return result;
  };

  // @ts-ignore
  functionsToExport.createCollection = async (
    name,
    symbol,
    metadata,
    creationValue
  ) => {
    await checkSigner();
    console.log(name, metadata, symbol, creationValue);
    console.log(metadata);
    console.log(symbol);
    console.log(creationValue);
    const factoryContract = new Contract(
      nftCollectionFactoryAddress,
      // @ts-ignore
      FactoryAbi,
      signer
    );

    return await showTransactionProgress(
      factoryContract.createCollection(name, symbol, metadata, {
        value: creationValue,
      })
    );
  };

  return (
    <Web3Context.Provider value={{ account, ...functionsToExport }}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
