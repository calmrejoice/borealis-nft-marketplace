import { useContext, useState, useEffect } from 'react';
import { Flex, Select, Button, Text, Input, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Web3Context from '@context/Web3Context';

export const ListNFTSection = () => {
  const router = useRouter();
  const { query } = router;
  const { nftAddress, hash, owner, tokenId } = query;

  const { account, createMarketItem, setApprovalForAll, isApprovedForAll } =
    useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);
  const [saleType, setSaleType] = useState('fixed');
  const [salesPrice, setSalesPrice] = useState('');
  const [initialBid, setInitialBid] = useState('');
  const [numOfDays, setNumOfDays] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const checkApproval = async () => {
      setIsApproved(await isApprovedForAll(owner, nftAddress));
    };

    if (nftAddress) {
      checkApproval();
    }
  }, [nftAddress]);

  const listForSale = async () => {
    setIsLoading(true);
    const response = await createMarketItem(nftAddress, tokenId, salesPrice);
    console.log(response);
    setIsLoading(false);
  };

  const renderInputs = () => {
    if (saleType === 'fixed') {
      return (
        <>
          <Text fontWeight='medium' fontSize='lg'>
            Sales Price
          </Text>
          <Input
            placeholder='10 ETH'
            onChange={(e) => setSalesPrice(e.target.value)}
          />
        </>
      );
    }
    if (saleType === 'auction') {
      return (
        <>
          <Text fontWeight='medium' fontSize='lg'>
            Initial Bid
          </Text>
          <Input
            placeholder='1 ETH'
            onChange={(e) => setInitialBid(e.target.value)}
          />
          <Text fontWeight='medium' fontSize='lg'>
            Number of Days
          </Text>
          <Input
            placeholder='3 days'
            onChange={(e) => setNumOfDays(e.target.value)}
          />
        </>
      );
    }
  };

  const renderListForSale = () => {
    const onApprove = async () => {
      setIsLoading(true);
      const result = await setApprovalForAll(true, nftAddress);
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
        <Button onClick={listForSale} variant='solid' isLoading={isLoading}>
          List for Sale in Marketplace
        </Button>
      );
    }
  };

  if (owner === account) {
    return (
      <VStack alignItems='flex-start' spacing='4' mt='16'>
        <Text fontWeight='medium' fontSize='lg' textTransform='capitalize'>
          Sale Type
        </Text>
        <Select onChange={(e) => setSaleType(e.target.value)} value={saleType}>
          <option value='fixed'>Fixed Price</option>
          <option value='auction'>Auction</option>
        </Select>
        {renderInputs()}
        {renderListForSale()}
      </VStack>
    );
  }
  return <></>;
};
