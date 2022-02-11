import { Flex, Text, Input } from '@chakra-ui/react';

export const Search = () => {
  return (
    <Flex width='lg'>
      <Input
        placeholder='Collection, item or user'
        size='md'
        _focus={{ shadow: 'lg' }}
      />
    </Flex>
  );
};
