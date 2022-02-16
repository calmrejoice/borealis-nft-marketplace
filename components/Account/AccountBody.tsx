import { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Avatar,
  AvatarBadge,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Web3Context from '@context/Web3Context';
import { CollectedNFTsTab } from './CollectedNFTsTab';
import { CreatedCollectionsTab } from './CreatedCollectionsTab';
import { ListingsTab } from './ListingsTab';
import { TabHeaders } from './TabHeaders';

export const AccountBody = () => {
  const router = useRouter();
  const { query } = router;
  const { tab } = query;

  const { account, getUserCollections } = useContext(Web3Context);
  const [userCollections, setUserCollections] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getUserCollections();
      setUserCollections(result);
    };

    fetch();
  }, []);

  const renderTab = () => {
    if (!tab || tab === 'createdCollections') {
      return <CreatedCollectionsTab userCollections={userCollections} />;
    }
    if (tab === 'collectedNfts') {
      return <CollectedNFTsTab />;
    }
    if (tab === 'listings') {
      return <ListingsTab />;
    }
  };

  return (
    <Flex flexDir='column' width='100vw' my='16px'>
      <Flex alignSelf='center' my='16px' flexDir='column' alignItems='center'>
        <Avatar size='lg' my='16px'>
          <AvatarBadge boxSize='1em' bg='green.500' />
        </Avatar>
        <Button variant='outline' maxWidth='300px'>
          <Text isTruncated fontSize='lg'>
            {account}
          </Text>
        </Button>
      </Flex>

      <Flex flexDir='column'>
        <TabHeaders />
        <Divider />

        {renderTab()}
      </Flex>
    </Flex>
  );
};
