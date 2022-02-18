import { useContext, useEffect, useState } from 'react';
import { Flex, Text, Center, Spinner, SimpleGrid } from '@chakra-ui/react';

import Web3Context from '@context/Web3Context';
import { ListingsNFTCard } from './ListingsNFTCard';

export const ListingsTab = () => {
  const { fetchItemsCreated } = useContext(Web3Context);
  const [itemsListed, setItemsListed] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchItemsCreated();
      setItemsListed(result);
    };

    fetch();
  }, []);

  if (itemsListed.length === 0) {
    return (
      <Center h='100vh'>
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex my='16'>
      <SimpleGrid columns={6} spacing='8' mx='16'>
        {itemsListed.map((nft) => {
          return <ListingsNFTCard key={nft.tokenId} nft={nft} />;
        })}
      </SimpleGrid>
    </Flex>
  );
};
