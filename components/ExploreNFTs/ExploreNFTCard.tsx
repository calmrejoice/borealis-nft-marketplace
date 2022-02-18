import { useContext, useState, useEffect } from 'react';
import { Flex, Text, VStack, Button, Badge, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { utils } from 'ethers';
import { formatDistanceToNowStrict } from 'date-fns';

import Web3Context from '@context/Web3Context';
import { getJSONfromHash, imageSourceBaseURL } from '@config/axios';
import { MotionChakraImage } from '@components/Animated/MotionChakraImage';

export const ExploreNFTCard = ({ nft }) => {
  const router = useRouter();

  const { item, auction } = nft;
  const { tokenId, nftContract, seller, price, isAuction } = item;
  const { highestBid, timeEnding, highestBidder } = auction;
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

  const endDate = timeEnding && parseInt(timeEnding.toString()) * 1000;
  const countdown = endDate && formatDistanceToNowStrict(endDate);
  const parsedHighestBid = highestBid && utils.formatEther(highestBid);

  console.log(nft);

  const renderBidBuyBadge = () => {
    if (isAuction) {
      return (
        <Tooltip
          label={`Time left: ${countdown}, Starting Bid: ${priceInEth} ETH, Highest Bid: ${parsedHighestBid} ETH`}
        >
          <Badge colorScheme='orange'>🔥 Bid</Badge>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip label={`Price: ${priceInEth} ETH`}>
          <Badge colorScheme='green'>💵 Buy</Badge>
        </Tooltip>
      );
    }
  };

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
            isAuction,
            countdown,
            parsedHighestBid,
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
        {renderBidBuyBadge()}
      </VStack>
    </Flex>
  );
};
