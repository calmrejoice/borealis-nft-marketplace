import { Flex, Text, Image, Button, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import { imageSourceBaseURL } from '@config/axios';

export const NFTCard = ({ nft }) => {
  const router = useRouter();

  const { metaData, contractAddress, ownerAddress, tokenURI, tokenId } = nft;

  const { name, description, image, royalty } = metaData;

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
        router.push({
          pathname: `/explore-nfts/${contractAddress}`,
          query: {
            hash: tokenURI,
            owner: ownerAddress,
            tokenId: tokenId,
          },
        });
      }}
    >
      <Flex overflow='hidden' boxSize='200px'>
        <MotionChakraImage src={imageSourceBaseURL + image} alt='nft' />
      </Flex>
      <Text mb='4' fontWeight='bold'>
        {name}
      </Text>
      <HStack my='8'>
        <Button>💰 Buy</Button>
        <Button>💹 Bid</Button>
      </HStack>
    </Flex>
  );
};
