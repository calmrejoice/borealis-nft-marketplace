import { ChakraProvider } from '@chakra-ui/react';

import { HeaderBody } from '@components/Header/HeaderBody';
import Web3Context, { Web3Provider } from '@context/Web3Context';

import customTheme from '@styles/theme';
import '@styles/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <Web3Provider>
        <HeaderBody />
        <Component {...pageProps} />
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
