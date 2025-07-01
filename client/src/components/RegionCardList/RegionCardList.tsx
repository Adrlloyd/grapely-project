import { useEffect } from 'react';
import { getRegionEntries } from './getRegionEntries';
import { useRegionCarousel } from './useRegionCarousel';
import type { RegionName } from '../../config/wineRegions';
import {
  Box,
  Button,
  IconButton,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface Props {
  onSelect: (region: RegionName) => void;
}

// Define the shake animation keyframes
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;

export default function RegionCardList({ onSelect }: Props) {
  const originalRegions = getRegionEntries();
  const duplicatedRegions = [
    originalRegions[originalRegions.length - 1],
    ...originalRegions,
    originalRegions[0]
  ];

  const {
    trackRef,
    cardRefs,
    activeIndex,
    scrollLeft,
    scrollRight,
    centerInitialCard
  } = useRegionCarousel();

  useEffect(() => {
    centerInitialCard();
  }, [centerInitialCard]);

  const iconSize = useBreakpointValue({ base: '20px', md: '28px' });

  return (
    <Box position="relative" overflowX="hidden" py="3rem">
      <IconButton
        aria-label="Scroll Left"
        icon={<ChevronLeftIcon boxSize={iconSize} />}
        onClick={() => scrollLeft(duplicatedRegions.length)}
        position="absolute"
        top="50%"
        left={{ base: '0.25rem', md: '0.5rem' }}
        transform="translateY(-50%)"
        bg="whiteAlpha.600"
        color="brand.primary"
        borderRadius="full"
        fontSize="1.5rem"
        boxShadow="md"
        zIndex={10}
        _hover={{ bg: 'whiteAlpha.800' }}
      />

      <Flex
        ref={trackRef}
        gap="2rem"
        overflowX="auto"
        px="4rem"
        scrollSnapType="x mandatory"
        css={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {duplicatedRegions.map(([name], index) => (
          <Flex
            key={`${name}-${index}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            scrollSnapAlign="center"
            flex="0 0 80%"
            justify="center"
            opacity={index === activeIndex ? 1 : 0.5}
            transform={index === activeIndex ? 'scale(1)' : 'scale(0.9)'}
            transition="transform 0.3s ease, opacity 0.3s ease"
          >
            <Button
              onClick={() => onSelect(name)}
              fontSize="1.5rem"
              fontWeight="600"
              bg="white"
              border="3px solid"
              borderColor="brand.primary"
              color="brand.primary"
              borderRadius="xl"
              boxShadow="md"
              h="250px"
              maxW="400px"
              w="100%"
              _hover={{
                borderColor: 'brand.secondary',
                color: 'brand.secondary',
                animation: `${shake} 0.4s ease-in-out`,
              }}
            >
              🍇 {name}
            </Button>
          </Flex>
        ))}
      </Flex>

      <IconButton
        aria-label="Scroll Right"
        icon={<ChevronRightIcon boxSize={iconSize} />}
        onClick={() => scrollRight(duplicatedRegions.length)}
        position="absolute"
        top="50%"
        right={{ base: '0.25rem', md: '0.5rem' }}
        transform="translateY(-50%)"
        bg="whiteAlpha.600"
        color="brand.primary"
        borderRadius="full"
        fontSize="1.5rem"
        boxShadow="md"
        zIndex={10}
        _hover={{ bg: 'whiteAlpha.800' }}
      />
    </Box>
  );
}