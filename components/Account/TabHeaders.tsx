import { Flex } from '@chakra-ui/react';
import { TabHeader } from './TabHeader';

export const TabHeaders = () => {
  return (
    <Flex flexDir='row'>
      <TabHeader tabLabel='Created Collections' tabName='createdCollections' />
      <TabHeader tabLabel='Collected NFTs' tabName='collectedNfts' />
      <TabHeader tabLabel='Listings' tabName='listings' />
    </Flex>
  );
};
