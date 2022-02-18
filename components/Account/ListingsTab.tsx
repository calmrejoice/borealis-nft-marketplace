import { useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import Web3Context from '@context/Web3Context';

export const ListingsTab = () => {
  const { withdraw } = useContext(Web3Context);

  return (
    <Flex>
      <Text>ListingsTab</Text>
    </Flex>
  );
};
