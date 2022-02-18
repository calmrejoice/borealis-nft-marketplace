import { useEffect, useState, useContext } from 'react';
import {
  Flex,
  HStack,
  Button,
  Text,
  Heading,
  Badge,
  Spacer,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import { getJSONfromHash, imageSourceBaseURL } from '@config/axios';
import Web3Context from '@context/Web3Context';

export const NFTDetailsBody = () => {
  const router = useRouter();
  const { query } = router;
  const { nftAddress, hash, owner, tokenId, price } = query;

  const [metaData, setMetaData]: any = useState({});
  const { account, buyNFT } = useContext(Web3Context);

  useEffect(() => {
    const fetchMetadata = async () => {
      if (hash) {
        const { data } = await getJSONfromHash(hash);
        console.log(data);
        setMetaData(data);
      }
    };

    fetchMetadata();
  }, [hash]);

  const { description, name, royalty, image } = metaData;

  console.log(price);

  return (
    <Flex flex={1} m='8'>
      <Flex flex={5} justifyContent='center'>
        <Flex
          boxSize='600px'
          overflow='hidden'
          justifyContent='center'
          alignItems='center'
        >
          <MotionChakraImage
            src={image && imageSourceBaseURL + image}
            alt='Collection banner'
          />
        </Flex>
      </Flex>
      <Flex
        flex={2}
        flexDir='column'
        p='8'
        borderWidth='thin'
        shadow='dark-lg'
        borderRadius='lg'
      >
        <Heading>{name}</Heading>
        <Text my={4}>{description}</Text>
        <Text my={4} fontSize='lg' fontWeight='medium'>
          Owned By:
        </Text>
        <Badge alignSelf='flex-start' colorScheme='red'>
          {owner}
        </Badge>
        <Text my={4} fontSize='lg' fontWeight='medium'>
          Royalties:
        </Text>
        <Badge alignSelf='flex-start' colorScheme='orange'>
          {royalty} %
        </Badge>
        <Spacer />
        <HStack flex={1} justifyContent='flex-end' mt='16'>
          <Button flex={1} variant='solid'>
            Buy for {price} ETH
          </Button>
          <Button flex={1} variant='solid'>
            Bid
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};
