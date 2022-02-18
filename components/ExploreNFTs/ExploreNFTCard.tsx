import { useContext, useState, useEffect } from 'react';
import { Flex, Text, HStack, Button } from '@chakra-ui/react';
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

  const parsedPrice = price && utils.parseEther(price.toString());
  console.log(parsedPrice);

  return (
    <Flex
      borderRadius='lg'
      flexDir='column'
      borderWidth='thin'
      _hover={{ shadow: 'lg' }}
      alignItems='center'
      cursor='pointer'
      className='animate-on-hover'
      onClick={() => {
        router.push({
          pathname: `/explore-nfts/${nftContract}`,
          query: {
            hash: hash,
            owner: seller,
            tokenId: tokenId,
            price: price,
          },
        });
      }}
    >
      <Flex overflow='hidden' boxSize='200px'>
        <MotionChakraImage
          src={image && imageSourceBaseURL + image}
          alt='nft'
        />
      </Flex>
      <Text mb='4' fontWeight='bold'>
        {name}
      </Text>
      <HStack my='8'>
        <Button>💰 Buy</Button>
        <Button>💹 Bid</Button>
      </HStack>
    </Flex>
  );
};
