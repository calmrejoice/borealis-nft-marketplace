import { useEffect, useContext, useState } from 'react';
import { Flex, Heading, SimpleGrid, Center, Spinner } from '@chakra-ui/react';

import Web3Context from '@context/Web3Context';
import { ExploreNFTCard } from './ExploreNFTCard';
import { EmptyContent } from '@components/EmptyContent';

export const ExploreNFTsBody = () => {
  const { fetchMarketItems } = useContext(Web3Context);
  const [marketItems, setMarketItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchMarketItems();
      const marketItemsArray = result[0];
      const auctionArray = result[1];
      const allMarketItemsData = marketItemsArray.map((item, index) => ({
        item: item,
        auction: auctionArray[index],
      }));
      setMarketItems(allMarketItemsData);
    };

    fetch();
  }, []);

  const renderMarketItems = () => {
    if (marketItems.length === 0) {
      return (
        <Center width='100vw' my='48'>
          <Spinner />
        </Center>
      );
    } else {
      return (
        <Flex m='16'>
          <SimpleGrid columns={6} spacing={8}>
            {marketItems.map((nft) => {
              return (
                <ExploreNFTCard key={nft.item.tokenId.toString()} nft={nft} />
              );
            })}
          </SimpleGrid>
        </Flex>
      );
    }
  };

  return (
    <Flex flexDir='column' alignItems='center' my='8'>
      <Heading>Browse All NFTs</Heading>
      {renderMarketItems()}
    </Flex>
  );
};
