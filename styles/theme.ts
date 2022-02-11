// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#D0E6FF',
    100: '#B9DAFF',
    200: '#A2CDFF',
    300: '#7AB8FF',
    400: '#2E90FF',
    500: '#0078FF',
    600: '#0063D1',
    700: '#0052AC',
    800: '#003C7E',
    900: '#002C5C',
  },
};

const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none',
      },
    },
    defaultProps: {
      colorScheme: 'gray',
      variant: 'ghost',
    },
  },
  Input: {
    defaultProps: {
      // focusBorderColor: 'brand.500',
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config, components, colors });

export default theme;
