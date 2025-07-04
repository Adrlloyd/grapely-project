import { useState } from 'react';
import { ComposableMap, Geographies } from 'react-simple-maps';
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from "@chakra-ui/icons";
import RegionCardList from '../RegionCardList/RegionCardList';
import { wineRegions } from '../../config/wineRegions';
import { renderGeographies } from './renderGeographies';
import { useRegionNavigation } from './useRegionNavigation';
import type { Feature } from 'geojson';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function WorldMap() {
  const {
    selectedRegion,
    setSelectedRegion,
    selectedCountry,
    setSelectedCountry,
  } = useRegionNavigation();

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleBackToRegions = () => {
    setSelectedRegion(null);
    setSelectedCountry(null);
  };

  if (!selectedRegion) {
    return (
      <Box textAlign="center" px={4} pt={8}>
        <Text
          fontSize="2.3rem"
          mb={6}
          color="brand.primary"
          fontFamily="heading"
          fontWeight="semibold"
        >
          Select Wine Region
        </Text>
        <RegionCardList onSelect={setSelectedRegion} />
      </Box>
    );
  }

  const region = wineRegions[selectedRegion];
  const projectionConfig = {
    scale: region.scale,
    center: region.center,
  };

  return (
    <Box
      px={4}
      pt={8}
      pb={12}
      textAlign="center"
    >
      <Flex 
        justify="flex-start" 
        mb={4} 
        px={2}
        position="relative"
        zIndex="1300"
      >
        <IconButton
          aria-label="Go Back"
          icon={<ChevronLeftIcon boxSize="1.5rem" />}
          onClick={handleBackToRegions}
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
        width="100%"
        maxH={{ base: '70vh', md: '80vh' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {hoveredCountry && (
          <Box
            position="absolute"
            top="1rem"
            right="1rem"
            bg="white"
            borderRadius="full"
            boxShadow="lg"
            p={3}
            zIndex="1200"
          >
            <Image
              src={`/flags/${hoveredCountry.toLowerCase().replace(/ /g, '-')}.png`}
              alt={`${hoveredCountry} flag`}
              boxSize="64px"
              borderRadius="full"
              objectFit="cover"
            />
          </Box>
        )}

        <ComposableMap
          projection="geoMercator"
          projectionConfig={projectionConfig}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: Feature[] }) =>
              renderGeographies({
                geographies,
                selectedRegion,
                selectedCountry,
                setSelectedCountry,
                setHoveredCountry,
              })
            }
          </Geographies>
        </ComposableMap>
      </Box>
    </Box>
  );
}

export default WorldMap;
