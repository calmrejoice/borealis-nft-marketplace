import { useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import Web3Context from '../context/Web3Context';
import { ConnectWalletMessage } from '@components/ConnectWalletMessage';
import { AccountBody } from '@components/Account/AccountBody';
import { WrongNetworkMessage } from '@components/WrongNetworkMessage';

export default function AccountPage() {
  const { account, isOnAurora } = useContext(Web3Context);

  if (!isOnAurora) return <WrongNetworkMessage />;
  if (!account) return <ConnectWalletMessage />;

  return (
    <Flex>
      <AccountBody />
    </Flex>
  );
}
