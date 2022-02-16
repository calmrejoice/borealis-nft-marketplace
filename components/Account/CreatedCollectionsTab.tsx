import { Flex, Text } from '@chakra-ui/react';

import { CollectionCard } from '@components/ExploreCollection/CollectionCard';

export const CreatedCollectionsTab = ({ userCollections }) => {
  return (
    <Flex>
      <Text>CreatedCollectionsTab</Text>
      {userCollections.map((collection) => {
        const { contractAddress, metaDataHash } = collection;
        return (
          <CollectionCard key={contractAddress} collection={metaDataHash} />
        );
      })}
    </Flex>
  );
};
