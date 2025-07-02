import { useLocation, useNavigate } from 'react-router';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { Wine } from '../types/wine';

interface WineCardProps {
  wine?: Wine;
}

function WineCard({ wine }: WineCardProps) {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);

  let selectedBottle = wine;
  if (!selectedBottle) {
    const bottleName = decodeURIComponent(query.get('bottle') || '');
    const storedWines = localStorage.getItem('filteredWines');
    const wineList: Wine[] = storedWines ? JSON.parse(storedWines) : [];
    selectedBottle = wineList.find((bottle) => bottle.name === bottleName);
  }

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!selectedBottle) {
    return (
      <Text
        fontFamily="heading"
        color="brand.primary"
        fontSize="xl"
        textAlign="center"
      >
        Bottle Not Found
      </Text>
    );
  }

  const {
    name,
    grape,
    region,
    country,
    price,
    image_url,
    description,
    pairingOptions,
  } = selectedBottle;

  return (
    <Box
      fontFamily="heading"
      color="brand.primary"
      textAlign="center"
      pb={{ base: "1rem", md: "2rem" }}
    >
      <Flex align="center" gap={4} justify="flex-start" px={4} pb={4}>
        <Button
          onClick={handleBackClick}
          bg="whiteAlpha.600"
          color="brand.primary"
          border="none"
          fontSize="xl"
          px={4}
          py={2}
          borderRadius="20px"
          boxShadow="0 2px 6px rgba(0, 0, 0, 0.1)"
          _hover={{ bg: 'whiteAlpha.850' }}
          transition="background 0.2s ease"
        >
          ←
        </Button>
      </Flex>

      <Box
        bg="transparent"
        maxW="600px"
        mx="auto"
        p={{ base: 4, md: 6 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          position="relative"
          top="-20px"
          zIndex={1}
          display="flex"
          justifyContent="center"
        >
          <Image
            src={`${IMAGE_BASE_URL}/${image_url}`}
            alt={name}
            w={{ base: "100px", md: "140px" }}
            h="auto"
            objectFit="contain"
            transition="transform 0.3s ease"
          />
        </Box>

        <VStack
          spacing={6}
          textAlign="center"
          w="100%"
          fontSize={{ base: "sm", md: "md" }}
          color="black"
          fontFamily="body"
        >
          <Heading
            as="h1"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            fontFamily="heading"
            color="brand.primary"
            mb={2}
          >
            {name}
          </Heading>

          <VStack
            spacing={3}
            w="100%"
            align="center"
            justify="center"
            mt={2}
          >
            {[
              { label: 'Grape', value: grape },
              { label: 'Region', value: region },
              { label: 'Country', value: country },
              { label: 'Price', value: `$${price}` },
            ].map((item) => (
              <Box
                key={item.label}
                bg="gold.500"
                color="black"
                px={5}
                py={2}
                borderRadius="md"
                boxShadow="md"
                w="350px"
                textAlign="center"
                fontSize="md"
                fontWeight="medium"
              >
                {item.label}: {item.value}
              </Box>
            ))}
          </VStack>

          {/* Section: Description */}
          <Box pt={2}>
            <Text fontWeight="bold" mb={1}>Description</Text>
            <Text fontWeight="medium">{description}</Text>
          </Box>

          {/* Section: Pairing */}
          <Box pt={2}>
            <Text fontWeight="bold" mb={1}>Pairing</Text>
            <Text fontWeight="medium">{pairingOptions.join(', ')}</Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default WineCard;