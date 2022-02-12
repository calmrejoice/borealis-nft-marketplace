import {
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdVerified } from 'react-icons/md';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import { NFTCard } from './NFTCard';

export const CollectionBody = () => {
  const router = useRouter();
  const { query } = router;
  const { collectionAddress } = query;

  console.log(collectionAddress);
  return (
    <Flex flexDir='column' alignItems='center'>
      <Flex
        height='200px'
        overflow='hidden'
        justifyContent='center'
        alignItems='center'
      >
        <MotionChakraImage src='/placeholder.jpg' alt='Collection logo' />
      </Flex>
      <VStack my='16' spacing='8' maxWidth='3xl'>
        <HStack>
          <Heading>Collection Name</Heading>
          <MdVerified />
          <Badge colorScheme='green' mt='2'>
            Art
          </Badge>
        </HStack>
        <Text textAlign='center'>
          Collection Description Collection DescriptionCollection
          DescriptionCollection DescriptionCollection DescriptionCollection
          Description
        </Text>
      </VStack>
      <SimpleGrid columns={6} spacing='8' mx='16'>
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
      </SimpleGrid>
    </Flex>
  );
};
