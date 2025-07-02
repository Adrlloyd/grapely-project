import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Box,
  Container,
  Fade,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from "@chakra-ui/icons";
import PairingSelection from './PairingSelection/PairingSelection';
import PriceSelection from './PriceSelection/PriceSelection';
import { fetchFilteredWines } from '../services/wineService';
import { getCountryRegion } from '../utils/geo';
import type { Wine } from '../types/wine';

function Selection() {
  const [pairing, setPairing] = useState<string | null>(null);
  const [price, setPrice] = useState<{ min: number; max: number } | null>(null);
  const [countryWines, setCountryWines] = useState<Wine[]>([]);
  const [availablePairings, setAvailablePairings] = useState<string[]>([]);
  const [sliderBounds, setSliderBounds] = useState<{ min: number; max: number }>({ min: 0, max: 100 });

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const country = query.get('country');
  let region = query.get('region');

  if (!region && country) {
    region = getCountryRegion(country);
  }

  useEffect(() => {
    if (!country) return;

    fetchFilteredWines({ country, priceBracket: undefined })
      .then((response) => {
        if ('wines' in response) {
          setCountryWines(response.wines);
        }
        if ('availablePairings' in response && 'overallPriceBracket' in response) {
          setAvailablePairings(response.availablePairings);
          setSliderBounds({
            min: Math.floor(response.overallPriceBracket[0]),
            max: Math.ceil(response.overallPriceBracket[1]),
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching wines for country:', error);
        setCountryWines([]);
      });
  }, [country]);

  useEffect(() => {
    if (!country || !price) return;

    fetchFilteredWines({ country, priceBracket: price })
      .then((response) => {
        if ('wines' in response) {
          setCountryWines(response.wines);
        }
        if ('availablePairings' in response) {
          setAvailablePairings(response.availablePairings);
        }
      })
      .catch((error) => {
        console.error('Error fetching wines after price:', error);
      });
  }, [country, price]);

  useEffect(() => {
    if (!region || !country || !pairing || !price) return;

    const params = new URLSearchParams({
      region,
      country,
      pairing,
      min: price.min.toString(),
      max: price.max.toString(),
    });

    navigate(`/results?${params.toString()}`);
  }, [region, country, pairing, price, navigate]);

  const handleBackClick = () => {
    navigate('/region');
  };

  return (
    <Box>
      <Flex justify="flex-start" mb={4} px={4} position="relative" zIndex="1300">
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

      {!price && (
        <Container maxW="container.md">
          <Fade in>
            <Box>
              <PriceSelection
                minPrice={sliderBounds.min - 2}
                maxPrice={sliderBounds.max + 2}
                onConfirm={setPrice}
              />
            </Box>
          </Fade>
        </Container>
      )}

      {price && !pairing && (
        <Fade in>
          <Box>
            <PairingSelection
              onSelect={setPairing}
              availableOptions={availablePairings}
            />
          </Box>
        </Fade>
      )}
    </Box>
  );
}

export default Selection;