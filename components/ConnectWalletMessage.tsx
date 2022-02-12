import { useContext } from 'react';
import { Flex, Text, Button, Heading, Center, VStack } from '@chakra-ui/react';

import Web3Context from '@context/Web3Context';

export const ConnectWalletMessage = () => {
  const { connectWallet } = useContext(Web3Context);

  return (
    <Center height='100vh'>
      <VStack spacing='4'>
        <Heading>Sign In</Heading>
        <Text>
          Please sign in with your blockchain wallet to view this page.
        </Text>
        <Button variant='solid' onClick={connectWallet}>
          Connect Wallet
        </Button>
      </VStack>
    </Center>
  );
};
