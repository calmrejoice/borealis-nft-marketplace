import { useEffect, useState } from 'react';
import { Flex, Text, Badge, HStack } from '@chakra-ui/react';
import { MdVerified } from 'react-icons/md';
import { useRouter } from 'next/router';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import { getJSONfromHash } from '@config/axios';

export const CollectionCard = ({ collection = '' }) => {
  const router = useRouter();
  const [metaData, setMetaData]: any = useState({});

  useEffect(() => {
    const fetchMetaData = async () => {
      if (!collection) return;
      const { data } = await getJSONfromHash(collection);
      setMetaData(data);
    };

    fetchMetaData();
  }, []);

  const { name, symbol, title, category, description, image } = metaData;

  return (
    <Flex
      borderRadius='lg'
      flexDir='column'
      borderWidth='thin'
      _hover={{ shadow: 'lg' }}
      alignItems='center'
      height='400px'
      cursor='pointer'
      className='animate-on-hover'
      onClick={() => {
        router.push('/explore-collections/testing');
      }}
    >
      <Flex
        maxH='200px'
        overflow='hidden'
        justifyContent='center'
        alignItems='center'
      >
        <MotionChakraImage
          src={
            image ? `https://ipfs.infura.io/ipfs/${image}` : '/placeholder.jpg'
          }
          alt='Collection banner'
        />
      </Flex>

      <HStack alignItems='center' mt='8'>
        <Text fontWeight='medium' fontSize='lg'>
          {name}
        </Text>
        <MdVerified />
      </HStack>
      <Badge colorScheme='green' mt='2'>
        {category}
      </Badge>
      <Text m='4' textAlign='center' noOfLines={3} color='gray.500'>
        {description}
      </Text>
    </Flex>
  );
};
