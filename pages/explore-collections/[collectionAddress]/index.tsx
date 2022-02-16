import { useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { CollectionBody } from '@components/Collection/CollectionBody';
import { WrongNetworkMessage } from '@components/WrongNetworkMessage';
import Web3Context from '@context/Web3Context';

export default function CollectionPage() {
  const { isOnAurora } = useContext(Web3Context);

  if (!isOnAurora) return <WrongNetworkMessage />;

  return (
    <Flex>
      <CollectionBody />
    </Flex>
  );
}
