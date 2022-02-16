import { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdVerified } from 'react-icons/md';

import { MotionChakraImage } from '@components/Animated/MotionChakraImage';
import { NFTCard } from './NFTCard';
import { getJSONfromHash } from '@config/axios';
import Web3Context from '@context/Web3Context';

export const CollectionBody = () => {
  const router = useRouter();
  const { query } = router;
  const { collectionAddress, hash } = query;

  const { account, balanceOf, tokenOfOwnerByIndex, tokenURI } =
    useContext(Web3Context);

  const [metaData, setMetaData]: any = useState({});
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [NFTDetails, setNFTDetails] = useState([]);

  useEffect(() => {
    const fetchMetaData = async () => {
      if (!hash) return;
      const { data } = await getJSONfromHash(hash);
      setMetaData(data);
    };

    fetchMetaData();
  }, [hash]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const response = await balanceOf(account, collectionAddress);
      const parsedResponse = parseInt(response.toString());
      setTotalNFTs(parsedResponse);
    };

    if (collectionAddress && account) {
      fetchNFTs();
    }
  }, [collectionAddress, account, balanceOf]);

  useEffect(() => {
    const fetchNFTData = async () => {
      if (totalNFTs < 0) {
        return;
      }
      let nfts = [];
      for (var i = 0; i < totalNFTs; i++) {
        const nftData = {
          ownerAddress: account,
          contractAddress: collectionAddress,
          tokenId: parseInt(
            (
              await tokenOfOwnerByIndex(account, i, collectionAddress)
            ).toString()
          ),
          tokenURI: '',
        };
        nftData['tokenURI'] = await tokenURI(
          nftData.tokenId,
          collectionAddress
        );
        nftData['metaData'] = (await getJSONfromHash(nftData.tokenURI)).data;
        nfts.push(nftData);
      }
      setNFTDetails(nfts);
      console.log(nfts);
    };

    fetchNFTData();
  }, [totalNFTs]);

  const { name, symbol, title, category, description, image } = metaData;

  const onGetBalance = async () => {
    const response = await balanceOf(account, collectionAddress);
    const result = parseInt(response.toString());
    console.log(result);
  };

  return (
    <Flex flexDir='column' alignItems='center'>
      <Flex
        height='200px'
        overflow='hidden'
        justifyContent='center'
        alignItems='center'
      >
        <MotionChakraImage
          src={
            image
              ? `https://gateway.pinata.cloud/ipfs/${image}`
              : '/placeholder.jpg'
          }
          alt='Collection logo'
        />
      </Flex>
      <VStack my='16' spacing='8' maxWidth='3xl'>
        <HStack>
          <Heading>{name}</Heading>
          <MdVerified />
          <Badge colorScheme='green' mt='2'>
            {category}
          </Badge>
        </HStack>
        <Text textAlign='center'>{description}</Text>
      </VStack>
      <SimpleGrid columns={6} spacing='8' mx='16'>
        {NFTDetails.map((nft) => {
          return <NFTCard key={nft.contractAddress} nft={nft} />;
        })}
      </SimpleGrid>
      <Button
        onClick={() =>
          router.push(`/explore-collections/${collectionAddress}/create-nft`)
        }
      >
        Create an NFT in this collection.
      </Button>
      <Button onClick={onGetBalance}>Get Balance</Button>
    </Flex>
  );
};
