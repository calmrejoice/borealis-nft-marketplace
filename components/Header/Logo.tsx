// import Image from 'next/image';
import { Image } from '@chakra-ui/react';

export const Logo = () => {
  return (
    <Image
      src='/borealis_logo.svg'
      alt='Logo of Borealis NFT Marketplace'
      width={30}
      height={30}
      rounded='lg'
    />
  );
};
