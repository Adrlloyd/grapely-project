import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { fetchFilteredWines } from '../services/wineService';
import { fetchFavouriteWines } from '../services/favouritesService';
import { submitRating, deleteRating } from '../services/ratingService';
import { useAuth } from '../context/useAuth';
import type { Wine } from '../types/wine';
import WineCard from './WineCard';

function Results({ favourites = false }: { favourites?: boolean }) {
  const [wines, setWines] = useState<Wine[]>([]);
  const [shouldRender, setShouldRender] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const winesPerPage = 25;
  const indexOfLastWine = currentPage * winesPerPage;
  const indexOfFirstWine = indexOfLastWine - winesPerPage;
  const currentWines = wines.slice(indexOfFirstWine, indexOfLastWine)
  const totalPages = Math.ceil(wines.length / winesPerPage);
  
  
  
  const navigate = useNavigate();
  const { search } = useLocation();
  const { user } = useAuth();

  const query = new URLSearchParams(search);
  const country = query.get('country') || '';
  const region = query.get('region') || '';
  const pairing = query.get('pairing') || '';
  const min = query.get('min');
  const max = query.get('max');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
    }, user?.token)
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

  const handleRating = async (wineId: string, newScore: number) => {
    if (!user?.token) return;

    const wine = wines.find(wine => wine.id === wineId);
    const currentScore = wine?.ratings?.[0]?.score;

    try {
      if (currentScore === newScore) {
        await deleteRating(user.token, wineId);

        if (favourites) {
          const updatedFavourites = await fetchFavouriteWines(user.token);
          if (Array.isArray(updatedFavourites.favourites)) {
            setWines(updatedFavourites.favourites);
          }
        } else {
        // Otherwise, just update local state
          setWines(prev => prev.map(wine => wine.id === wineId
            ? { ...wine, ratings: [] }
            : wine
          ));
        }
        return;
      }
      
      await submitRating(user.token, wineId, newScore);
      
      if (favourites) {
        const updatedFavourites = await fetchFavouriteWines(user.token);
        if (Array.isArray(updatedFavourites.favourites)) {
          setWines(updatedFavourites.favourites);
        }
      } else {
        setWines(prev => prev.map(wine => wine.id === wineId
          ? { ...wine, ratings: [{ score: newScore }] }
          : wine
        ));
      }
      
      console.log("Updated wine list:", wines.map(w => w.ratings));
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  }

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
        <IconButton
          aria-label="Go Back"
          icon={<ChevronLeftIcon boxSize="1.5rem" />}
          onClick={handleBackClick}
          bg="whiteAlpha.600"
          color="brand.primary"
          borderRadius="full"
          fontSize="1.5rem"
          boxShadow="md"
          _hover={{ bg: 'whiteAlpha.800' }}
        />
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
        {shouldRender && currentWines.map((wine, index) => (
          <WineCard
            index={index}
            key={wine.id}
            wine={wine}
            onRate={(value) => handleRating(wine.id, value)}
            onSelect={() => handleSelect(wine)}
          />
        ))}
      </Grid>
      {shouldRender && wines.length > 0 && (
        <Flex justify="center" align="center" mt={6} mb={16} gap={6}>
          <IconButton
            aria-label="Previous Page"
            icon={<ChevronLeftIcon boxSize="1.5rem" />}
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            isDisabled={currentPage === 1}
            bg="whiteAlpha.600"
            color="brand.primary"
            borderRadius="full"
            fontSize="1.5rem"
            boxShadow="md"
            _hover={{ bg: 'whiteAlpha.800' }}
          />

          <Text fontWeight="medium">
            Page {currentPage} of {totalPages}
          </Text>

          <IconButton
            aria-label="Next Page"
            icon={<ChevronRightIcon boxSize="1.5rem" />}
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            isDisabled={currentPage === totalPages}
            bg="whiteAlpha.600"
            color="brand.primary"
            borderRadius="full"
            fontSize="1.5rem"
            boxShadow="md"
            _hover={{ bg: 'whiteAlpha.800' }}
          />
        </Flex>)}
    </Box>
  );
}

export default Results;