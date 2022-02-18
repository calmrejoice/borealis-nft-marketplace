import { useContext, useState, useEffect } from 'react';
import { Flex, Text, VStack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { utils } from 'ethers';

import Web3Context from '@context/Web3Context';
import { getJSONfromHash, imageSourceBaseURL } from '@config/axios';
import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const ExploreNFTCard = ({ nft }) => {
  const router = useRouter();

  const { item, auction } = nft;
  const { tokenId, nftContract, seller, price } = item;
  const { tokenURI } = useContext(Web3Context);
  const [metaData, setMetaData]: any = useState({});
  const [hash, setHash] = useState();

  useEffect(() => {
    const fetch = async () => {
      const result = await tokenURI(tokenId, nftContract);
      const { data } = await getJSONfromHash(result);
      setHash(result);
      setMetaData(data);
    };
    if (nftContract) {
      fetch();
    }
  }, [nftContract]);

  const { name, description, royalty, image } = metaData;

  const priceInEth = price && utils.formatEther(price);
  const formatedTokenId = tokenId && tokenId.toString();
  console.log(priceInEth);
  console.log(formatedTokenId);

  return (
    <Flex
      borderRadius='lg'
      minWidth='200px'
      flexDir='column'
      borderWidth='thin'
      shadow='lg'
      alignItems='center'
      cursor='pointer'
      className='animate-on-hover'
      onClick={() => {
        router.push({
          pathname: `/explore-nfts/${nftContract}`,
          query: {
            hash: hash,
            owner: seller,
            tokenId: formatedTokenId,
            price: priceInEth,
          },
        });
      }}
    >
      <Flex overflow='hidden' height='200px' borderTopRadius='lg'>
        <MotionChakraImage
          src={image && imageSourceBaseURL + image}
          alt='nft'
        />
      </Flex>
      <VStack spacing={4} my={4}>
        <Text fontWeight='bold'>{name}</Text>
        <Text fontWeight='thin' textAlign='center' noOfLines={2}>
          {description}
        </Text>
      </VStack>
    </Flex>
  );
};
