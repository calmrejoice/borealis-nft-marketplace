import { Flex, Text, Image, Button, HStack } from '@chakra-ui/react';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const NFTCard = () => {
  return (
    <Flex
      borderRadius='lg'
      flexDir='column'
      borderWidth='thin'
      _hover={{ shadow: 'lg' }}
      alignItems='center'
      cursor='pointer'
      className='animate-on-hover'
    >
      <Flex overflow='hidden' boxSize='200px'>
        <MotionChakraImage src='/nft.jpg' alt='nft' />
      </Flex>
      <Text my='4' fontWeight='bold'>
        NFT Name
      </Text>
      <HStack my='8'>
        <Button>💰 Buy</Button>
        <Button>💹 Bid</Button>
      </HStack>
    </Flex>
  );
};
