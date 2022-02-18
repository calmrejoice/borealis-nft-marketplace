import { useEffect, useState, useContext } from 'react';
import {
  Flex,
  HStack,
  Button,
  Text,
  Heading,
  Badge,
  Spacer,
  Input,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import { getJSONfromHash, imageSourceBaseURL } from '@config/axios';
import Web3Context from '@context/Web3Context';
import { utils } from 'ethers';

export const NFTDetailsBody = () => {
  const router = useRouter();
  const { query } = router;
  const {
    nftAddress,
    hash,
    owner,
    tokenId,
    price,
    isAuction,
    countdown,
    parsedHighestBid,
  }: any = query;

  const [isLoading, setIsLoading] = useState(false);
  const [metaData, setMetaData]: any = useState({});
  const { account, buyNFT, createAuctionBid } = useContext(Web3Context);
  const [bid, setBid] = useState('');

  useEffect(() => {
    const fetchMetadata = async () => {
      if (hash) {
        const { data } = await getJSONfromHash(hash);
        console.log(data);
        setMetaData(data);
      }
    };

    fetchMetadata();
  }, [hash]);

  const { description, name, royalty, image } = metaData;

  const parsedPrice = price && utils.parseEther(price);

  const onBuyNFT = async () => {
    setIsLoading(true);
    const result = await buyNFT(nftAddress, tokenId, parsedPrice);
    setIsLoading(false);
  };

  const onBid = async () => {
    setIsLoading(true);
    await createAuctionBid(tokenId, bid);
    setIsLoading(false);
  };
  const renderBidBuyButton = () => {
    if (isAuction === 'false') {
      return (
        <Button
          variant='solid'
          onClick={onBuyNFT}
          isLoading={isLoading}
          colorScheme='messenger'
        >
          Buy for {price} ETH
        </Button>
      );
    } else {
      return (
        <Flex flexDir='column'>
          <HStack mb='4'>
            <Text fontWeight='medium'>Auction will end in: </Text>
            <Badge>{countdown}</Badge>
          </HStack>
          <HStack mb='4'>
            <Text fontWeight='medium'>Starting Price:</Text>
            <Badge colorScheme='blue'>{price} ETH</Badge>
          </HStack>
          <HStack mb='4'>
            <Text fontWeight='medium'>Highest Bid:</Text>
            <Badge colorScheme='green'>{parsedHighestBid} ETH</Badge>
          </HStack>
          <HStack mb='4'>
            <Text fontWeight='medium'>Enter Bid:</Text>
            <Input
              placeholder='10 ETH'
              onChange={(e) => setBid(e.target.value)}
            />
          </HStack>
          <Button
            variant='solid'
            colorScheme='messenger'
            onClick={onBid}
            isLoading={isLoading}
          >
            Bid
          </Button>
        </Flex>
      );
    }
  };

  return (
    <Flex flex={1} m='8'>
      <Flex flex={5} justifyContent='center'>
        <Flex
          boxSize='600px'
          overflow='hidden'
          justifyContent='center'
          alignItems='center'
          borderRadius='lg'
          shadow='lg'
        >
          <MotionChakraImage
            src={image && imageSourceBaseURL + image}
            alt='Collection banner'
            boxSize='600px'
          />
        </Flex>
      </Flex>
      <Flex
        flex={2}
        flexDir='column'
        p='8'
        borderWidth='thin'
        shadow='lg'
        borderRadius='lg'
      >
        <Heading>{name}</Heading>
        <Text my={4}>{description}</Text>
        <Text my={4} fontSize='lg' fontWeight='medium'>
          Owned By:
        </Text>
        <Badge alignSelf='flex-start' colorScheme='red'>
          {owner}
        </Badge>
        <Text my={4} fontSize='lg' fontWeight='medium'>
          Royalties:
        </Text>
        <Badge alignSelf='flex-start' colorScheme='orange'>
          {royalty} %
        </Badge>
        <Spacer />
        {renderBidBuyButton()}
      </Flex>
    </Flex>
  );
};
