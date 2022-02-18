import { useEffect, useContext, useState } from 'react';
import { Flex, Text, Button, useDisclosure, VStack } from '@chakra-ui/react';
import { getJSONfromHash, imageSourceBaseURL } from '@config/axios';

import Web3Context from '@context/Web3Context';
import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const ListingsNFTCard = ({ nft }) => {
  const { tokenURI, account, unlistItem } = useContext(Web3Context);
  console.log(nft);

  const [metaData, setMetaData]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { tokenId, nftContract } = nft;
  const { name, description, image, royalty } = metaData;

  useEffect(() => {
    const fetch = async () => {
      const result = await tokenURI(tokenId, nftContract);
      const { data } = await getJSONfromHash(result);
      setMetaData(data);
      console.log(metaData);
    };
    if (nftContract) {
      fetch();
    }
  }, [nftContract]);

  const onUnlist = async () => {
    setIsLoading(true);
    await unlistItem(tokenId);
    setIsLoading(false);
  };

  return (
    <Flex
      borderRadius='lg'
      flexDir='column'
      shadow='lg'
      alignItems='center'
      className='animate-on-hover'
    >
      <Flex overflow='hidden' boxSize='200px'>
        <MotionChakraImage src={imageSourceBaseURL + image} alt='nft' />
      </Flex>
      <VStack spacing='4' my='4'>
        <Text fontWeight='bold' fontSize='lg'>
          {name}
        </Text>
        <Text fontWeight='thin' textAlign='center' noOfLines={2}>
          {description}
        </Text>
        <Button onClick={onUnlist} variant='solid' colorScheme='messenger'>
          Unlist
        </Button>
      </VStack>
    </Flex>
  );
};
