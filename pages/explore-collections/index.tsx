import { useContext, useState, useEffect } from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';

import { ExploreCollectionBody } from '@components/ExploreCollection/ExploreCollectionBody';

export default function ExploreCollectionsPage() {
  return (
    <Flex>
      <ExploreCollectionBody />
    </Flex>
  );
}
