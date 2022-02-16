import { useContext } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { NFTBody } from '@components/NFT/NFTBody';
import { WrongNetworkMessage } from '@components/WrongNetworkMessage';
import Web3Context from '@context/Web3Context';

export default function NFTPage() {
  const { isOnAurora } = useContext(Web3Context);

  if (!isOnAurora) return <WrongNetworkMessage />;

  return (
    <Flex>
      <NFTBody />
    </Flex>
  );
}
