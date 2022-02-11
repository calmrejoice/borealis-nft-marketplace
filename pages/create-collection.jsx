import { useContext, useState, useEffect } from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';
import { ethers } from 'ethers';

import Web3Context from '../context/Web3Context';

export default function CreateCollection() {
  const { account } = useContext(Web3Context);

  console.log(account);

  return (
    <Flex>
      <Text>Hello i am create collection</Text>
      <Button>Click me</Button>
    </Flex>
  );
}
