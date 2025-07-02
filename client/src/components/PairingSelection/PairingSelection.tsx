import { useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Flex,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { usePairingCarousel } from './usePairingCarousel';

interface PairingSelectionProps {
  onSelect: (pairing: string) => void;
  availableOptions: string[];
}

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
        fontSize="2.3rem"
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
          bg="brand.primary"
          color="whiteAlpha.800"
          borderRadius="full"
          fontSize="1.5rem"
          boxShadow="md"
          zIndex={10}
          _hover={{ bg: 'brand.secondary' }}
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
                  animation: `pulseGlow 2s ease-in-out`,
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
          bg="brand.primary"
          color="whiteAlpha.800"
          borderRadius="full"
          fontSize="1.5rem"
          boxShadow="md"
          zIndex={10}
          _hover={{ bg: 'brand.secondary' }}
        />
      </Box>
    </Box>
  );
}

export default PairingSelection;