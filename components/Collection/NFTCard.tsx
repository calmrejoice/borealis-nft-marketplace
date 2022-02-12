import { Flex, Text, Image, Button, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const NFTCard = () => {
  const router = useRouter();

  return (
    <Flex
      borderRadius='lg'
      flexDir='column'
      borderWidth='thin'
      _hover={{ shadow: 'lg' }}
      alignItems='center'
      cursor='pointer'
      className='animate-on-hover'
      onClick={() => {
        router.push('/nft/testing');
      }}
    >
      <Flex overflow='hidden' boxSize='200px'>
        <MotionChakraImage src='/nft.jpg' alt='nft' />
      </Flex>
      <Text mb='4' fontWeight='bold'>
        NFT Name
      </Text>
      <HStack my='8'>
        <Button>💰 Buy</Button>
        <Button>💹 Bid</Button>
      </HStack>
    </Flex>
  );
};
