import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { fetchFilteredWines } from '../services/wineService';
import { fetchFavouriteWines } from '../services/favouritesService';
import { useAuth } from '../context/useAuth';
import type { Wine } from '../types/wine';
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Results({ favourites = false }: { favourites?: boolean }) {
  const [wines, setWines] = useState<Wine[]>([]);
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { user } = useAuth();

  const query = new URLSearchParams(search);
  const country = query.get('country') || '';
  const region = query.get('region') || '';
  const pairing = query.get('pairing') || '';
  const min = query.get('min');
  const max = query.get('max');

  const MotionBox = motion.create(Box);

  useEffect(() => {
    // Delay initial render to allow fetch to complete
    const renderTimer = setTimeout(() => {
      setShouldRender(true);
    }, 300);

    if (favourites) {
      if (!user?.token) {
        clearTimeout(renderTimer);
        return;
      }

      fetchFavouriteWines(user.token)
        .then((data) => {
          if (Array.isArray(data.favourites)) {
            setWines(data.favourites);
          } else {
            console.warn('Invalid favourites response.');
          }
        })
        .catch((error) => {
          console.error('Error fetching favourites:', error);
        });
      return () => clearTimeout(renderTimer);
    }
    
    if (!country || !pairing || !min || !max) {
      clearTimeout(renderTimer);
      return;
    }

    fetchFilteredWines({
      country,
      priceBracket: { min: parseFloat(min), max: parseFloat(max) },
      pairing,
    })
      .then((response) => {
        if ('wines' in response) {
          setWines(response.wines);
          localStorage.setItem('filteredWines', JSON.stringify(response.wines));
        } else {
          console.warn('No wines found in response.');
        }
      })
      .catch((error) => {
        console.error('Error fetching final filtered wines:', error);
      });

    return () => clearTimeout(renderTimer);
  }, [favourites, user?.token, country, min, max, pairing]);

  const handleSelect = (wine: Wine) => {
    const encodedParams = new URLSearchParams({
      country,
      region,
      pairing,
      price: wine.price.toString(),
      bottle: wine.name,
    });
    navigate(`/summary?${encodedParams.toString()}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };



  return (
    <Box
      fontFamily="heading"
      color="brand.primary"
      textAlign="center"
      minH="100vh"
    >
      <Flex
        align="center"
        gap={4}
        justify="flex-start"
        px={4}
        pb={4}
      >
        <Button
          onClick={handleBackClick}
          bg="whiteAlpha.600"
          color="brand.primary"
          border="none"
          fontSize="lg"
          px={4}
          py={2}
          borderRadius="20px"
          boxShadow="0 2px 6px rgba(0, 0, 0, 0.1)"
          _hover={{ bg: 'whiteAlpha.850' }}
          transition="background 0.3s ease"
        >
          ←
        </Button>
      </Flex>

      <Heading
        as="h2"
        fontSize="2.3rem"
        mb={55}
        fontFamily="heading"
        color="brand.primary"
      >
        Choose a bottle
      </Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)"
        }}
        gap={10}
        justifyItems="center"
        px={4}
        pb={12}
      >
        {shouldRender && wines.map((wine, index) => (
          <MotionBox
            key={wine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.6, duration: 0.8 }}
            position="relative"
            w="260px"
            bg="white"
            borderRadius="16px"
            boxShadow="0 4px 14px rgba(0, 0, 0, 0.08)"
            cursor="pointer"
            p="1rem 1rem 1.5rem"
            transitionProperty="transform, box-shadow"
            transitionDuration="0.3s"
            transitionTimingFunction="ease"
            onClick={() => handleSelect(wine)}
            _hover={{
              transform: "scale(1.03)",
              boxShadow: "0 6px 20px rgba(123, 46, 90, 0.2)",
              zIndex: 2,
              "& .wine-image-wrapper": {
                top: "-60px",
              },
              "& .wine-image": {
                transform: "scale(1.12)",
              },
            }}
          >
            <Box
              className="wine-image-wrapper"
              position="relative"
              top="-50px"
              display="flex"
              justifyContent="center"
              zIndex={1}
              transition="top 0.3s ease"
            >
              <Image
                className="wine-image"
                src={`${BASE_URL}/${wine.image_url}`}
                alt={wine.name}
                w="100px"
                h="auto"
                objectFit="contain"
                transition="transform 0.3s ease"
                zIndex={3}
              />
            </Box>
            
            <VStack
              spacing={2}
              pt={2}
              textAlign="center"
            >
              <Text
                fontWeight="600"
                color="brand.primary"
                fontSize="md"
              >
                {wine.name}
              </Text>
              <Text fontFamily="body" fontSize="sm" color="gray.600">
                <Text as="span" fontWeight="bold">Country:</Text> {wine.country}
              </Text>
              <Text fontFamily="body" fontSize="sm" color="gray.600">
                <Text as="span" fontWeight="bold">Grape:</Text> {wine.grape}
              </Text>
              <Text fontFamily="body" fontSize="sm" color="gray.600">
                <Text as="span" fontWeight="bold">Price:</Text> ${wine.price}
              </Text>
            </VStack>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
}

export default Results;