import { useEffect, useState, useContext } from 'react';
import { Flex, Button, Text, Avatar, AvatarBadge } from '@chakra-ui/react';

import Web3Context from '@context/Web3Context';
import { truncate } from '@utils/helpfulFunctions';

export const ConnectWallet = () => {
  const { account, connectWallet } = useContext(Web3Context);

  const renderConnectButton = () => {
    if (account) {
      return (
        <Button
          width='140px'
          rightIcon={
            <Avatar size='xs'>
              <AvatarBadge boxSize='1em' bg='green.500' />
            </Avatar>
          }
        >
          <Text>{truncate(account, 12)}</Text>
        </Button>
      );
    } else {
      return (
        <Button onClick={connectWallet} width='140px'>
          Connect Wallet
        </Button>
      );
    }
  };
  return <Flex>{renderConnectButton()}</Flex>;
};
