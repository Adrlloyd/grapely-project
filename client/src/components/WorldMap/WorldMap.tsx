import '../../styles/WorldMap.css';
import { ComposableMap, Geographies } from 'react-simple-maps';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
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
    setSelectedCountry
  } = useRegionNavigation();

  const handleBackToRegions = () => {
    setSelectedRegion(null);
    setSelectedCountry(null);
  };

  if (!selectedRegion) {
    return (
      <Box textAlign="center">
        <Heading
          as="h2"
          fontSize="2xl"
          mb={4}
          color="brand.secondary"
          fontFamily="heading"
        >
          Select Wine Region
        </Heading>
        <RegionCardList onSelect={setSelectedRegion} />
      </Box>
    );
  }

  const region = wineRegions[selectedRegion];
  const projectionConfig = {
    scale: region.scale,
    center: region.center
  };

  return (
    <Box w="100%" py={{ base: 4, md: 6 }} px={{ base: 2, md: 6 }} textAlign="center">
      <Flex justify="flex-start" mb={4} px={4}>
        <Button
          onClick={handleBackToRegions}
          bg="whiteAlpha.600"
          color="brand.primary"
          borderRadius="full"
          fontSize="lg"
          px={4}
          py={2}
          boxShadow="md"
          _hover={{ bg: "whiteAlpha.800" }}
        >
          ← Back
        </Button>
      </Flex>

      <Box
        width="100%"
        maxH={{ base: '70vh', md: '80vh' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={projectionConfig}
          style={{ width: '100%', height: 'auto' }} // Chakra can't style SVG
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: Feature[] }) =>
              renderGeographies({
                geographies,
                selectedRegion,
                selectedCountry,
                setSelectedCountry
              })
            }
          </Geographies>
        </ComposableMap>
      </Box>
    </Box>
  );
}

export default WorldMap;