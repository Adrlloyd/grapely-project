import '../../styles/WorldMap.css';
import { ComposableMap, Geographies } from 'react-simple-maps';

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

  // Show region selector if no region is currently chosen
  if (!selectedRegion) {
    return (
      <div className="worldmap-container">
        <h2 className="worldmap-title">Select Wine Region</h2>
        <RegionCardList onSelect={setSelectedRegion} />
      </div>
    );
  }

  // Set projection config for focused region
  const region = wineRegions[selectedRegion];
  const projectionConfig = {
    scale: region.scale,
    center: region.center
  };

  return (
    <div className="map-wrapper">
      <div className="map-header">
        <button onClick={handleBackToRegions} className="back-button">← Back</button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={projectionConfig}
        className="map-svg"
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
    </div>
  );
}

export default WorldMap;