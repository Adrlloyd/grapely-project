import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      primary: '#7B2E5A',
      secondary: '#4A7C59',
      tertiary: '#E6C36F',
    },
  },
  fonts: {
    heading: `'Cinzel', serif`,
    body: `'Open Sans', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'xl',
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'brand.tertiary',
            color: 'brand.primary',
          },
        },
      },
    },
  },
});

export default theme;