import { Flex, Text, Badge, HStack } from '@chakra-ui/react';
import { MdVerified } from 'react-icons/md';
import { useRouter } from 'next/router';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const CollectionCard = () => {
  const router = useRouter();

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
        <MotionChakraImage src='/placeholder.jpg' alt='Collection banner' />
      </Flex>

      <HStack alignItems='center' mt='8'>
        <Text fontWeight='medium' fontSize='lg'>
          Collection Name
        </Text>
        <MdVerified />
      </HStack>
      <Badge colorScheme='green' mt='2'>
        Art
      </Badge>
      <Text m='4' textAlign='center' noOfLines={3} color='gray.500'>
        Collection NameCollection NameCollection NameCollection NameCollection
        NameCollection NameCollection NameCollection NameCollection
        NameCollection NameCollection NameCollection Name
      </Text>
    </Flex>
  );
};
