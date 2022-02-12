import { useEffect, useState, useContext } from 'react';
import { Flex, Button, Text, Avatar, AvatarBadge } from '@chakra-ui/react';

import Web3Context from '@context/Web3Context';

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
          <Text isTruncated>{account}</Text>
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
