import { useState, useRef, useContext, useEffect } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { AiFillPicture } from 'react-icons/ai';
import { utils } from 'ethers';
import axios from 'axios';

import Web3Context from '@context/Web3Context';

export const CreateCollectionBody = () => {
  const { createCollection, getCollectionCreationPrice, setListingPrice } =
    useContext(Web3Context);
  const [cost, setCost] = useState(0);

  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [metaData, setMetaData] = useState({
    name: '',
    symbol: '',
    title: '',
    category: '',
    description: '',
    image: '',
    file: '',
  });

  useEffect(() => {
    const getF = async () => {
      setCost((await getCollectionCreationPrice()).toNumber());
    };
    getF();
  }, []);

  const handleInputChange = (field, value) => {
    const newMetaData = { ...metaData };
    newMetaData[field] = value;
    setMetaData(newMetaData);
  };

  const inputFileRef = useRef(null);

  const [previewImage, setPreviewImage] = useState('');

  const onCreate = async () => {
    if (!metaData.name || !metaData.file || !metaData.symbol) {
      toast({
        status: 'error',
        description: 'Please fill in all the required fields.',
      });
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Pin file to pinata
      const pinFileResponse = await axios.post('/api/pinata/pinFile', formData);
      toast({
        description: `File uploaded, Image Hash: ${pinFileResponse.data.IpfsHash}. Uploading metadata...`,
        status: 'success',
      });

      // Pin metadata to pinata
      const pinJSONResponse = await axios.post('/api/pinata/pinJSON', {
        ...metaData,
        image: pinFileResponse.data.IpfsHash,
      });
      toast({
        description: `Metadata uploaded ${pinJSONResponse.data.IpfsHash}. Please complete the transaction.`,
        status: 'success',
      });

      const transactionFee = cost.toString() || utils.parseEther('0.025');

      // Complete collection creation on blockchain
      const txn = await createCollection(
        metaData.name,
        metaData.symbol,
        pinJSONResponse.data.IpfsHash,
        transactionFee
      );
      if (txn) {
        console.log(txn);
      } else {
        await axios.patch('/api/pinata/unPin', {
          hash: pinFileResponse.data.IpfsHash,
        });
        await axios.patch('/api/pinata/unPin', {
          hash: pinJSONResponse.data.IpfsHash,
        });
        toast({
          description: `Transaction failed, collection unpinned from IPFS.`,
          status: 'error',
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onSetListingPrice = async () => {
    setIsLoading(true);
    const newListingPrice = utils.parseEther('0.000025');
    const txn = await setListingPrice(newListingPrice);
    if (txn) {
      console.log(txn, 'New listing price set.');
      setIsLoading(false);
    } else {
      console.log('Set listing price transaction failed.');
      setIsLoading(false);
    }
  };

  return (
    <Flex justifyContent='center' width='100vw'>
      <VStack alignItems='flex-start' spacing='8' my='16'>
        <Heading>Create a Collection</Heading>
        <FormControl isRequired>
          <FormLabel htmlFor='image'>Banner image</FormLabel>
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
                  setFile(selectedImage);
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
        <FormControl isRequired>
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
        <Button
          variant='solid'
          size='lg'
          onClick={onCreate}
          isLoading={isLoading}
        >
          Create
        </Button>

        <Button
          variant='solid'
          size='lg'
          onClick={onSetListingPrice}
          isLoading={isLoading}
        >
          Set Listing Price
        </Button>
      </VStack>
    </Flex>
  );
};
