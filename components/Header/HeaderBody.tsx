import { useState, useEffect } from 'react';
import { Flex, Text, Button, useColorMode } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

export const HeaderBody = () => {
  const [account, setAccount] = useState(null);
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

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

  const onConnect = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);
    } catch (error) {
      console.log('failed please try again');
    }
  };

  const renderConnectButton = () => {
    if (account) {
      return <Button isTruncated>{account}</Button>;
    } else {
      return <Button onClick={onConnect}>Connect to Wallet</Button>;
    }
  };

  return (
    <Flex>
      <Button
        onClick={() => {
          router.push('/');
        }}
      >
        home
      </Button>
      <Button
        onClick={() => {
          router.push('/create-collection');
        }}
      >
        Collection
      </Button>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      {renderConnectButton()}
    </Flex>
  );
};
