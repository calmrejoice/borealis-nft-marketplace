import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { ExploreCollectionsBody } from '@components/ExploreCollections/ExploreCollectionsBody';
import { WrongNetworkMessage } from '@components/WrongNetworkMessage';
import Web3Context from '@context/Web3Context';

export default function ExploreCollectionsPage() {
  const { isOnAurora } = useContext(Web3Context);

  if (!isOnAurora) return <WrongNetworkMessage />;

  return (
    <Flex>
      <ExploreCollectionsBody />
    </Flex>
  );
}
