import { Flex, Text, Spinner, Center, SimpleGrid } from '@chakra-ui/react';

import { CollectionCard } from '@components/ExploreCollections/CollectionCard';

export const CreatedCollectionsTab = ({ userCollections }) => {
  if (!userCollections) {
    return (
      <Center h='100vh'>
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex m='16'>
      <SimpleGrid columns={3} spacing='8'>
        {userCollections.map((collection) => {
          return (
            <CollectionCard
              key={collection.contractAddress}
              collection={collection}
            />
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};
