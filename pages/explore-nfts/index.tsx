import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { ExploreNFTsBody } from '@components/ExploreNFTs/ExploreNFTsBody';
import { WrongNetworkMessage } from '@components/WrongNetworkMessage';
import Web3Context from '@context/Web3Context';

export default function ExploreNFTsPage() {
  const { isOnAurora } = useContext(Web3Context);

  if (!isOnAurora) return <WrongNetworkMessage />;

  return (
    <Flex>
      <ExploreNFTsBody />
    </Flex>
  );
}
