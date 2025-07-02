import { useLocation, useNavigate } from 'react-router';
import {
  Box,
  IconButton,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from "@chakra-ui/icons";
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
      <Flex
        align="center"
        gap={4}
        justify="flex-start"
        px={4}
        pb={4}
      >
        <IconButton
          aria-label="Go Back"
          icon={<ChevronLeftIcon boxSize="1.5rem" />}
          onClick={handleBackClick}
          bg="brand.primary"
          color="whiteAlpha.800"
          borderRadius="full"
          fontSize="1.5rem"
          boxShadow="md"
          zIndex={10}
          _hover={{ bg: 'brand.secondary' }}
        />
      </Flex>

      <Box
        bg="transparent"
        maxW="800px"
        mx="auto"
        p="1.5rem 1rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box
          position="relative"
          top="-30px"
          zIndex={1}
          display="flex"
          justifyContent="center"
        >
          <Image
            src={`${IMAGE_BASE_URL}/${image_url}`}
            alt={name}
            w={{ base: "80px", md: "100px" }}
            h="auto"
            objectFit="contain"
            transition="transform 0.3s ease"
          />
        </Box>

        <VStack
          spacing={3}
          textAlign="left"
          w="100%"
          mt="-10px"
          fontSize={{ base: "sm", md: "md" }}
          color="black"
          fontFamily="body"
        >
          <Heading
            as="h1"
            fontSize={{ base: "xl", md: "1.6rem" }}
            fontWeight="bold"
            mb={4}
            fontFamily="heading"
            w="100%"
            color="brand.primary"
          >
            {name}
          </Heading>
          
          <Text w="100%"><strong>Grape:</strong> {grape}</Text>
          <Text w="100%"><strong>Region:</strong> {region}</Text>
          <Text w="100%"><strong>Country:</strong> {country}</Text>
          <Text w="100%"><strong>Price:</strong> ${price}</Text>

          <Text w="100%" mt={4} color="black">
            <strong>Description:</strong> {description}
          </Text>

          <Text w="100%"><strong>Pairing:</strong> {pairingOptions.join(', ')}</Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default WineCard;