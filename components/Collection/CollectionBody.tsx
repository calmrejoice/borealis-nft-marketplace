import { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdVerified } from 'react-icons/md';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import { NFTCard } from './NFTCard';
import { getJSONfromHash } from '@config/axios';

export const CollectionBody = () => {
  const router = useRouter();
  const { query } = router;
  const { collectionAddress, hash } = query;

  const [metaData, setMetaData]: any = useState({});

  useEffect(() => {
    const fetchMetaData = async () => {
      if (!hash) return;
      const { data } = await getJSONfromHash(hash);
      setMetaData(data);
    };

    fetchMetaData();
  }, []);

  const { name, symbol, title, category, description, image } = metaData;

  return (
    <Flex flexDir='column' alignItems='center'>
      <Flex
        height='200px'
        overflow='hidden'
        justifyContent='center'
        alignItems='center'
      >
        <MotionChakraImage
          src={
            image
              ? `https://gateway.pinata.cloud/ipfs/${image}`
              : '/placeholder.jpg'
          }
          alt='Collection logo'
        />
      </Flex>
      <VStack my='16' spacing='8' maxWidth='3xl'>
        <HStack>
          <Heading>{name}</Heading>
          <MdVerified />
          <Badge colorScheme='green' mt='2'>
            {category}
          </Badge>
        </HStack>
        <Text textAlign='center'>{description}</Text>
      </VStack>
      <SimpleGrid columns={6} spacing='8' mx='16'>
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
        <NFTCard />
      </SimpleGrid>
      <Button
        onClick={() =>
          router.push(`/explore-collections/${collectionAddress}/create-nft`)
        }
      >
        Create an NFT in this collection.
      </Button>
    </Flex>
  );
};
