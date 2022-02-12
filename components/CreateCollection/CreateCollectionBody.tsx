import { useState, useRef } from 'react';
import {
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  VStack,
  Textarea,
  Select,
  Image,
  Center,
  Button,
} from '@chakra-ui/react';
import { AiFillPicture } from 'react-icons/ai';

export const CreateCollectionBody = () => {
  const [metaData, setMetaData] = useState({
    name: '',
    symbol: '',
    title: '',
    category: '',
    description: '',
    image: '',
    file: '',
  });

  const handleInputChange = (field, value) => {
    const newMetaData = { ...metaData };
    newMetaData[field] = value;
    setMetaData(newMetaData);
  };

  const inputFileRef = useRef(null);

  const [previewImage, setPreviewImage] = useState('');

  console.log(metaData);

  return (
    <Flex justifyContent='center' width='100vw'>
      <VStack alignItems='flex-start' spacing='8' my='16'>
        <Heading>Create a Collection</Heading>
        <FormControl isRequired>
          <FormLabel htmlFor='image'>Logo image</FormLabel>
          <Flex
            border={previewImage ? 'none' : 'dotted'}
            borderColor='gray.300'
            width='300px'
            height='200px'
            onClick={() => inputFileRef.current.click()}
            cursor='pointer'
            _hover={{
              bgColor: 'gray.100',
            }}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                width='300px'
                height='200px'
                objectPosition='center'
                objectFit='contain'
                borderRadius='lg'
                alt='Banner image'
              />
            ) : (
              <Center flex={1}>
                <AiFillPicture fontSize='60px' color='gray' />
              </Center>
            )}
            <input
              id='image'
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={inputFileRef}
              onChange={(e) => {
                const selectedImage = e.target.files[0];
                if (selectedImage) {
                  handleInputChange('file', selectedImage);
                  setPreviewImage(URL.createObjectURL(selectedImage));
                }
              }}
            />
          </Flex>
          <FormHelperText>
            This image will be used for featuring your collection on the
            homepage, category pages, or other promotional areas of Borealis.
            600 x 400 recommended.
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            id='name'
            type='text'
            placeholder='Collection name'
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <FormHelperText>
            Example: The Wonderful Polar Exploration.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='symbol'>Symbol</FormLabel>
          <Input
            id='symbol'
            type='text'
            placeholder='Enter a symbol'
            onChange={(e) => handleInputChange('symbol', e.target.value)}
          />
          <FormHelperText>Example: BAE</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='description'>Description</FormLabel>
          <Textarea
            id='description'
            placeholder='Provide a detailed description of your collection'
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <FormHelperText>
            The description will be included on the collection detail page
            underneath its image.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='category'>Category</FormLabel>
          <Select
            placeholder='Select category'
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <option value='art'>Art</option>
            <option value='collectibles'>Collectibles</option>
            <option value='music'>Music</option>
            <option value='photography'>Photography</option>
            <option value='sports'>Sports</option>
            <option value='trading cards'>Trading Cards</option>
            <option value='utility'>Utility</option>
          </Select>
          <FormHelperText>
            Adding a category will help make your item discoverable on Borealis.
          </FormHelperText>
        </FormControl>
        <Button variant='solid' size='lg'>
          Create
        </Button>
      </VStack>
    </Flex>
  );
};
