import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { ExploreCollectionBody } from '@components/ExploreCollection/ExploreCollectionBody';
import { WrongNetworkMessage } from '@components/WrongNetworkMessage';
import Web3Context from '@context/Web3Context';

export default function ExploreCollectionsPage() {
  const { isOnAurora } = useContext(Web3Context);

  if (!isOnAurora) return <WrongNetworkMessage />;

  return (
    <Flex>
      <ExploreCollectionBody />
    </Flex>
  );
}
