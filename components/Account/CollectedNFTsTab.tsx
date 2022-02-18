import { useContext, useState, useEffect } from 'react';
import { Flex, Text, Center, Spinner, SimpleGrid } from '@chakra-ui/react';

import Web3Context from '@context/Web3Context';
import { CollectedNFTCard } from './CollectedNFTCard';
import { EmptyContent } from '@components/EmptyContent';

export const CollectedNFTsTab = () => {
  const { fetchMyNFTs } = useContext(Web3Context);
  const [collectedNFTs, setCollectedNFTs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchMyNFTs();
      setCollectedNFTs(result);
    };
    fetch();
  }, []);

  console.log(collectedNFTs);

  if (collectedNFTs.length === 0) {
    return (
      <Center h='100vh'>
        <EmptyContent />
        {/* <Spinner /> */}
      </Center>
    );
  }

  return (
    <Flex m='16'>
      <SimpleGrid columns={6} spacing='8'>
        {collectedNFTs.map((nft) => {
          return <CollectedNFTCard key={nft.tokenId} nft={nft} />;
        })}
      </SimpleGrid>
    </Flex>
  );
};
