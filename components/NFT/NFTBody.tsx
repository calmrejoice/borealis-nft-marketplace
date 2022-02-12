import { Flex, HStack, Button, Text, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const NFTBody = () => {
  const router = useRouter();
  const { query } = router;
  const { nftAddress } = query;

  return (
    <Flex flex={1} mt='8'>
      <Flex flex={5} justifyContent='center'>
        <Flex
          boxSize='600px'
          overflow='hidden'
          justifyContent='center'
          alignItems='center'
        >
          <MotionChakraImage src='/nft.jpg' alt='Collection banner' />
        </Flex>
      </Flex>
      <Flex flex={2} flexDir='column' px='8'>
        <Heading>NFT Name</Heading>
        <Text my={4}>NFT description</Text>

        <Text my={4}>Creator</Text>
        <Text my={4}>Owner</Text>
        <Text my={4}>Collection</Text>
        <Text my={4}>Royalties</Text>
        <Text my={4}>Properties</Text>

        <HStack flex={1} justifyContent='flex-end'>
          <Button flex={1} variant='solid'>
            Buy for 0.2 NEAR
          </Button>
          <Button flex={1} variant='solid'>
            Bid
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};
