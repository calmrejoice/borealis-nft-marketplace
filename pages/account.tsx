import { useContext, useState, useEffect } from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';
import { ethers } from 'ethers';

import Web3Context from '../context/Web3Context';
import { ConnectWalletMessage } from '@components/ConnectWalletMessage';
import { AccountBody } from '@components/Account/AccountBody';

export default function AccountPage() {
  const { account } = useContext(Web3Context);

  if (!account) return <ConnectWalletMessage />;

  return (
    <Flex>
      <AccountBody />
    </Flex>
  );
}
