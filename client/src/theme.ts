import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { color } from 'framer-motion';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      // Full color scale for primary (wine purple)
      50: '#F7E6F0',
      100: '#EBC0D6',
      200: '#DE99BC',
      300: '#D173A2',
      400: '#C44C88',
      500: '#7B2E5A', // Your primary
      600: '#6B2850',
      700: '#5B2246',
      800: '#4B1C3C',
      900: '#3B1632',
      // Named colors for easier reference
      primary: '#7B2E5A',
      secondary: '#4A7C59',
      tertiary: '#E6C36F',
    },
    // Additional color scales that work with your palette
    sage: {
      50: '#F0F4F1',
      100: '#D6E3D8',
      200: '#BCD1BF',
      300: '#A2C0A6',
      400: '#88AE8D',
      500: '#4A7C59', // Your secondary
      600: '#3F6B4D',
      700: '#345A41',
      800: '#294935',
      900: '#1E3829',
    },
    gold: {
      50: '#FDF8ED',
      100: '#F9EECB',
      200: '#F5E4A9',
      300: '#F1DA87',
      400: '#EDD065',
      500: '#E6C36F', // Your tertiary
      600: '#D4A845',
      700: '#A8863A',
      800: '#7C642B',
      900: '#50421C',
    }
  },
  fonts: {
    heading: `'Cinzel', serif`,
    body: `'Cinzel', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'xl',
        transition: 'all 0.2s ease',
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'brand.tertiary',
            color: 'brand.primary',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
            boxShadow: 'md',
          },
        },
        wine: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        sage: {
          bg: 'sage.500',
          color: 'white',
          _hover: {
            bg: 'sage.600',
          },
        },
        gold: {
          bg: 'gold.500',
          color: 'brand.primary',
          _hover: {
            bg: 'gold.600',
          },
        },
      },
      sizes: {
        lg: {
          h: 12,
          px: 6,
          fontSize: 'lg',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: '600',
      },
      variants: {
        wine: {
          color: 'brand.primary',
        },
        sage: {
          color: 'sage.500',
        },
        gold: {
          color: 'gold.500',
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
      },
    },
  },
  // Custom breakpoints if needed
  breakpoints: {
    base: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
});

export default theme;