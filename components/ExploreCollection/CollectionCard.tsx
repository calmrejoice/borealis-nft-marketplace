import { useState } from 'react';
import { Flex, Text, LinkBox, Badge, HStack } from '@chakra-ui/react';
import { MdVerified } from 'react-icons/md';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const CollectionCard = () => {
  const [onHover, setOnHover] = useState(false);

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
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <Flex maxH='200px' overflow='hidden'>
        <MotionChakraImage
          src='/twittercoverpicture.jpg'
          alt='Collection banner'
        />
      </Flex>

      <HStack alignItems='center' mt='8'>
        <Text fontWeight='medium' fontSize='lg'>
          Collection Name
        </Text>
        <MdVerified />
      </HStack>
      <Badge />
      <Text m='4' textAlign='center' noOfLines={3} color='gray.500'>
        Collection NameCollection NameCollection NameCollection NameCollection
        NameCollection NameCollection NameCollection NameCollection
        NameCollection NameCollection NameCollection Name
      </Text>
    </Flex>
  );
};
