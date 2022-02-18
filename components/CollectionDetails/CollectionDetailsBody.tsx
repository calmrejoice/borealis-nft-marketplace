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
import { getJSONfromHash, imageSourceBaseURL } from '@config/axios';
import Web3Context from '@context/Web3Context';

export const CollectionDetailsBody = () => {
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
      const { data } = await getJSONfromHash(hash);
      setMetaData(data);
    };

    if (hash) {
      fetchMetaData();
    }
  }, [hash]);

  useEffect(() => {
    const fetchNFTs = async () => {
      const response = await balanceOf(account, collectionAddress);
      if (response) {
        const parsedResponse = parseInt(response.toString());
        setTotalNFTs(parsedResponse);
      }
    };

    if (collectionAddress) {
      fetchNFTs();
    }
  }, [collectionAddress, account]);

  useEffect(() => {
    const fetchNFTData = async () => {
      if (totalNFTs < 0) {
        return;
      }
      let nfts = [];
      for (var i = 0; i < totalNFTs; i++) {
        const result = await tokenOfOwnerByIndex(account, i, collectionAddress);
        let tokenId;
        if (result) {
          const resultString = result.toString();
          tokenId = parseInt(resultString);
        }
        const nftData = {
          ownerAddress: account,
          contractAddress: collectionAddress,
          tokenId: tokenId,
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
  console.log(totalNFTs);
  console.log(NFTDetails);

  const { name, symbol, title, category, description, image } = metaData;

  return (
    <Flex flexDir='column' alignItems='center' mx='auto'>
      <Flex
        height='200px'
        width='300px'
        overflow='hidden'
        justifyContent='center'
        alignItems='center'
        shadow='dark-lg'
        borderRadius='lg'
        mt='8'
      >
        <MotionChakraImage
          src={image ? imageSourceBaseURL + image : '/placeholder.jpg'}
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
        <Button
          onClick={() =>
            router.push(`/explore-collections/${collectionAddress}/create-nft`)
          }
          variant='solid'
          colorScheme='messenger'
        >
          Create an NFT in this collection.
        </Button>
      </VStack>
      <SimpleGrid columns={6} spacing='8' mx='16'>
        {NFTDetails.map((nft) => {
          return <NFTCard key={nft.tokenURI} nft={nft} />;
        })}
      </SimpleGrid>
    </Flex>
  );
};

// contractAddress: "0xE37B91b0303c758bF09968D5635266144378593F"
// metaData: {name: 'bear', description: 'test', royalty: '12', file: {…}, image: 'QmQ2q5T3tgpneZiWdBwhAeEieFsTvkoa5eZS7Cni9ijmD3'}
// ownerAddress: "0x33E499EDf28748744471C6507FcBA30584D5312f"
// tokenId: 2
// tokenURI: "QmSqgkX9N8hKbbAPuyDVvzN3TRa7k8YBge81a7AEyi3i1p"
