import Lottie from 'react-lottie';
import animationData from '@assets/92445-crypto-bitcoin.json';

import { Flex } from '@chakra-ui/react';

export const MarketplaceAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Flex cursor='none'>
      <Lottie
        style={{ cursor: 'default' }}
        options={defaultOptions}
        height={400}
        width={320}
        isClickToPauseDisabled={true}
      />
    </Flex>
  );
};
