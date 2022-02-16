import { Flex, Text, Spinner, Center } from '@chakra-ui/react';

import { CollectionCard } from '@components/ExploreCollection/CollectionCard';

export const CreatedCollectionsTab = ({ userCollections }) => {
  if (!userCollections) {
    return (
      <Center h='100vh'>
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex>
      {userCollections.map((collection) => {
        return (
          <CollectionCard
            key={collection.contractAddress}
            collection={collection}
          />
        );
      })}
    </Flex>
  );
};
