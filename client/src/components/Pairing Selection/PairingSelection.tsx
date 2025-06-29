import { useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Flex,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { usePairingCarousel } from './usePairingCarousel';

interface PairingSelectionProps {
  onSelect: (pairing: string) => void;
  availableOptions: string[];
}

// Define the shake animation keyframes
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;

function PairingSelection({ onSelect, availableOptions }: PairingSelectionProps) {
  const {
    trackRef,
    cardRefs,
    activeIndex,
    scrollLeft,
    scrollRight,
    centerInitialCard,
  } = usePairingCarousel();

  const clonedOptions = [
    availableOptions[availableOptions.length - 1],
    ...availableOptions,
    availableOptions[0],
  ];

  useEffect(() => {
    centerInitialCard();
  }, [centerInitialCard]);

  const iconSize = useBreakpointValue({ base: '20px', md: '28px' });

  return (
    <Box w="100%">
      <Heading
        as="h2"
        fontSize="2xl"
        mb={6}
        color="brand.primary"
        fontFamily="heading"
        fontWeight="semibold"
        textAlign="center"
        px={{ base: 2, md: 6 }}
      >
        What do you fancy eating?
      </Heading>

      <Box position="relative" overflowX="hidden" py="3rem">
        <IconButton
          aria-label="Scroll Left"
          icon={<ChevronLeftIcon boxSize={iconSize} />}
          onClick={() => scrollLeft(clonedOptions.length)}
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
          {clonedOptions.map((option, index) => (
            <Flex
              key={`${option}-${index}`}
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
                onClick={() => onSelect(option)}
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
                whiteSpace={{ base: "normal", md: "nowrap" }}
                textAlign="center"
                px={4}
                _hover={{
                  borderColor: 'brand.secondary',
                  color: 'brand.secondary',
                  animation: `${shake} 0.4s ease-in-out`,
                }}
              >
                {option}
              </Button>
            </Flex>
          ))}
        </Flex>

        <IconButton
          aria-label="Scroll Right"
          icon={<ChevronRightIcon boxSize={iconSize} />}
          onClick={() => scrollRight(clonedOptions.length)}
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
    </Box>
  );
}

export default PairingSelection;