import { Flex, HStack, Heading, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { MarketplaceAnimation } from './MarketplaceAnimation';

export const HeroBody = () => {
  const router = useRouter();

  return (
    <Flex mx='auto' mt='16'>
      <Flex
        flexDir='column'
        flex={1}
        justifyContent='center'
        alignItems='center'
      >
        <Heading>Discover, collect, and sell extraordinary NFTs</Heading>
        <Heading as='h2' fontSize='xl' fontWeight='medium' mt={8}>
          Borealis is the largest NFT marketplace on the Aurora chain.
        </Heading>
        <HStack alignSelf='flex-start' mt='16' spacing='4'>
          <Button
            size='lg'
            shadow='lg'
            variant='solid'
            onClick={() => {
              router.push('/explore-collections');
            }}
          >
            Explore
          </Button>
          <Button
            size='lg'
            onClick={() => {
              router.push('/create-collection');
            }}
          >
            Create
          </Button>
        </HStack>
      </Flex>

      <Flex flex={1} justifyContent='center'>
        <MarketplaceAnimation />
      </Flex>
    </Flex>
  );
};
