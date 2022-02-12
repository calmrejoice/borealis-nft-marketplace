import { useContext, useState, useEffect } from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';

import Web3Context from '../context/Web3Context';
import { ConnectWalletMessage } from '@components/ConnectWalletMessage';

export default function CreateCollectionPage() {
  const { account } = useContext(Web3Context);

  if (!account) return <ConnectWalletMessage />;

  return (
    <Flex>
      <Text>Hello i am create collection</Text>
      <Button>Click me</Button>
    </Flex>
  );
}
