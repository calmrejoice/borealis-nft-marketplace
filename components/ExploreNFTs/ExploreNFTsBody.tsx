import { useEffect, useContext, useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import Web3Context from '@context/Web3Context';
import { ExploreNFTCard } from './ExploreNFTCard';

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

  return (
    <Flex flexDir='column' mx='auto' my='8'>
      <Heading>Browse All NFTs</Heading>
      {marketItems.map((nft) => {
        return <ExploreNFTCard key={nft.tokenId} nft={nft} />;
      })}
    </Flex>
  );
};
