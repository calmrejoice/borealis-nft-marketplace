import { useEffect, useContext, useState } from 'react';
import { Flex, Text, Button, useDisclosure, VStack } from '@chakra-ui/react';
import { getJSONfromHash, imageSourceBaseURL } from '@config/axios';

import Web3Context from '@context/Web3Context';
import { ListForSaleModal } from '@components/CollectionDetails/ListForSaleModal';
import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const CollectedNFTCard = ({ nft }) => {
  const {
    tokenURI,
    account,
    isApprovedForAll,
    setApprovalForAll,
    createMarketItem,
  } = useContext(Web3Context);

  const [metaData, setMetaData]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  useEffect(() => {
    const checkApproval = async () => {
      setIsApproved(await isApprovedForAll(account, nftContract));
    };

    if (nftContract) {
      checkApproval();
    }
  }, [nftContract]);

  const renderListForSale = () => {
    const onApprove = async () => {
      setIsLoading(true);
      const result = await setApprovalForAll(true, nftContract);
      setIsApproved(result);
      setIsLoading(false);
    };

    if (!isApproved) {
      return (
        <Button onClick={onApprove} isLoading={isLoading} variant='solid'>
          Approve
        </Button>
      );
    } else {
      return (
        <>
          <ListForSaleModal
            isOpen={isOpen}
            onClose={onClose}
            createMarketItem={createMarketItem}
            tokenId={tokenId}
            contractAddress={nftContract}
          />
          <Button
            onClick={onOpen}
            variant='solid'
            colorScheme='messenger'
            isLoading={isLoading}
          >
            List for Sale
          </Button>
        </>
      );
    }
  };

  return (
    <Flex
      borderRadius='lg'
      flexDir='column'
      shadow='lg'
      alignItems='center'
      className='animate-on-hover'
    >
      <Flex overflow='hidden' height='200px' borderTopRadius='lg'>
        <MotionChakraImage src={imageSourceBaseURL + image} alt='nft' />
      </Flex>
      <VStack spacing='4' my='4'>
        <Text fontWeight='bold' fontSize='lg'>
          {name}
        </Text>
        <Text fontWeight='thin' textAlign='center'>
          {description}
        </Text>
        {renderListForSale()}
      </VStack>
    </Flex>
  );
};
