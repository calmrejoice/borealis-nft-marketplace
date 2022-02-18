import { useState, useEffect } from 'react';
import {
  HStack,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ColorModeToggle } from './ColorModeToggle';
import { LogoButton } from './LogoButton';
import { Search } from './Search';
import { ConnectWallet } from './ConnectWallet';

export const HeaderBody = () => {
  const router = useRouter();

  return (
    <HStack p='4' spacing='4'>
      <LogoButton />
      <Spacer />
      <Search />

      <Button
        onClick={() => {
          router.push('/explore-nfts');
        }}
      >
        Explore
      </Button>

      {/* <Menu>
        <MenuButton as={Button}>Explore</MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push('/explore-nfts');
            }}
          >
            NFTs
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push('/explore-collections');
            }}
          >
            Collections
          </MenuItem>
        </MenuList>
      </Menu> */}

      <Button
        onClick={() => {
          router.push('/account');
        }}
      >
        My Profile
      </Button>
      <Button
        onClick={() => {
          router.push('/create-collection');
        }}
      >
        Create
      </Button>
      <ColorModeToggle />
      <ConnectWallet />
    </HStack>
  );
};
