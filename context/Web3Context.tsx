import React, { useState, createContext, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { ethers, Contract, utils } from 'ethers';
import Web3Modal from 'web3modal';

import {
  collectionFactoryAddress,
  nftMarketAddress,
} from '../config/contractAddresses';
import CollectionFactory from '@abi/CollectionFactory.json';
import BorealisRoyalty from '@abi/BorealisRoyalty.json';
import NFTMarket from '@abi/NFTMarket.json';

const Web3Context = createContext(null);

export const Web3Provider = (props) => {
  const URL = 'https://testnet.aurora.dev';

  const [account, setAccount] = useState('');
  const [isOnAurora, setIsOnAurora] = useState(true);
  const [signer, setSigner] = useState(null);

  const functionsToExport = {
    connectWallet: () => {},
    setListingPrice: (price) => {},
    getCollectionCreationPrice: () => {},
    createCollection: (name, symbol, metadata, creationValue) => {},
    totalCollections: () => {},
    getCollections: (startIndex, endIndex) => {},
    getUserCollections: () => {},
    mint: (metadata, royaltyPercentage, contractAddress) => {},
    tokenURI: (tokenID, contractAddress) => {},
    balanceOf: (userAddress, contractAddress) => {},
    tokenByIndex: (contractAddress, index) => {},
    tokenOfOwnerByIndex: (ownerAddress, contractAddress, index) => {},
  };

  const toast = useToast();

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const { chainId } = await provider.getNetwork();
        if (!chainId || chainId !== 1313161555) {
          setIsOnAurora(false);
        }
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
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();
    return signer;
  };

  const showTransactionProgress = async (result) => {
    toast({
      description: 'Transaction Initiated.',
      status: 'info',
    });
    let completeResult, receipt;
    try {
      completeResult = await Promise.resolve(result);
    } catch (e) {
      toast({
        description: `Transaction Failed. ${e.toString()}`,
        status: 'error',
      });

      return false;
    }
    toast({
      description: `Transaction Sent! your hash is: ${completeResult.hash}`,
      status: 'success',
    });

    try {
      receipt = await completeResult.wait();
    } catch (e) {
      toast({
        description: `Transaction Failed! ${e.toString()}`,
        status: 'error',
      });

      return false;
    }

    if (receipt.status === 1) {
      toast({
        description: 'Transaction Completed Successfully.',
        status: 'success',
      });
      console.log('Alert', `Transaction Success!`, 'success', 2000);
    } else {
      toast({
        description: `Transaction Failed! Please try again.`,
        status: 'error',
      });
    }
    return receipt;
  };

  /**Collection Functions */
  functionsToExport.getCollectionCreationPrice = async () => {
    const signer = await checkSigner();
    const factoryContract = new Contract(
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );
    console.log(factoryContract);
    const result = await factoryContract.getPrice();
    console.log(result);
    return result;
  };

  functionsToExport.createCollection = async (
    name,
    symbol,
    metadata,
    creationValue
  ) => {
    const signer = await checkSigner();
    const factoryContract = new Contract(
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );

    return await showTransactionProgress(
      factoryContract.createCollection(name, symbol, metadata, {
        value: creationValue,
      })
    );
  };

  functionsToExport.setListingPrice = async (price) => {
    const signer = await checkSigner();
    const factoryContract = new Contract(
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );

    return await showTransactionProgress(factoryContract.setPrice(price));
  };

  functionsToExport.getCollectionCreationPrice = async () => {
    const signer = await checkSigner();
    const factoryContract = new Contract(
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );
    const result = await factoryContract.getPrice();
    return result;
  };

  functionsToExport.totalCollections = async () => {
    const signer = await checkSigner();
    const factoryContract = new Contract(
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );
    const result = await factoryContract.totalCollections();
    return result;
    console.log(result);
  };

  functionsToExport.getUserCollections = async () => {
    const signer = await checkSigner();
    const factoryContract = new Contract(
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );
    try {
      const result = await factoryContract.getUserCollections();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  functionsToExport.getCollections = async (startIndex, endIndex) => {
    const signer = await checkSigner();
    const factoryContract = new Contract(
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );
    const result = await factoryContract.getCollectionsPaginated(
      startIndex,
      endIndex
    );
    console.log(result);
    return result;
  };

  //NFT functions
  functionsToExport.mint = async (
    metadata,
    royaltyPercentage,
    contractAddress
  ) => {
    const signer = await checkSigner();
    const nftContract = new Contract(
      contractAddress,
      BorealisRoyalty.abi,
      signer
    );
    return await showTransactionProgress(
      nftContract.mint(metadata, royaltyPercentage)
    );
  };

  functionsToExport.tokenURI = async (tokenID, contractAddress) => {
    const signer = await checkSigner();
    const nftContract = new Contract(
      contractAddress,
      BorealisRoyalty.abi,
      signer
    );
    const result = await nftContract.tokenURI(tokenID);
    console.log(result);
    return result;
  };

  functionsToExport.balanceOf = async (userAddress, contractAddress) => {
    const signer = await checkSigner();

    try {
      const nftContract = new Contract(
        contractAddress,
        BorealisRoyalty.abi,
        signer
      );
      const result = await nftContract.balanceOf(userAddress);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  functionsToExport.tokenByIndex = async (contractAddress, index) => {
    const signer = await checkSigner();

    try {
      const nftContract = new Contract(
        contractAddress,
        BorealisRoyalty.abi,
        signer
      );
      const result = await nftContract.tokenByIndex(index);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  functionsToExport.tokenOfOwnerByIndex = async (
    ownerAddress,
    index,
    contractAddress
  ) => {
    const signer = await checkSigner();
    const nftContract = new Contract(
      contractAddress,
      BorealisRoyalty.abi,
      signer
    );
    const result = await nftContract.tokenOfOwnerByIndex(ownerAddress, index);
    console.log(result);
    return result;
  };

  return (
    <Web3Context.Provider value={{ account, isOnAurora, ...functionsToExport }}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
