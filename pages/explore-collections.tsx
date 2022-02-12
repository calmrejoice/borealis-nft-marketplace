import { useContext, useState, useEffect } from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';

import Web3Context from '../context/Web3Context';

export default function ExploreCollectionsPage() {
  return (
    <Flex>
      <Text>Hello i am explore collections page</Text>
      <Button>Click me</Button>
    </Flex>
  );
}
