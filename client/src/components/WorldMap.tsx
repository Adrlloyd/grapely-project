import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import type { Feature } from 'geojson';
import '../styles/WorldMap.css';
import { wineRegions } from '../config/wineRegions';
import type { RegionName } from '../config/wineRegions';
import { getCountryRegion } from '../utils/geo';
import { getFeatureName } from '../types/geojson';
import RegionCardList from './RegionCardList';
import { useLocation } from 'react-router';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function WorldMap() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const regionFromQuery = query.get('region') as RegionName | null;
  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(regionFromQuery);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleRegionSelect = (regionName: RegionName) => {
    setSelectedRegion(regionName);
    setSelectedCountry(null);
  };

  const handleBackToRegions = () => {
    setSelectedRegion(null);
    setSelectedCountry(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRegion && selectedCountry) {

      const encodedRegion = encodeURIComponent(selectedRegion);
      const encodedCountry = encodeURIComponent(selectedCountry);

      navigate(`/selection?country=${encodedCountry}&region=${encodedRegion}`);
    }
  },
    [selectedRegion, selectedCountry, navigate]
  )

  if (!selectedRegion) {
    return (
      <div className="worldmap-container">
        <h2 className="worldmap-title">Select Wine Region</h2>
        <RegionCardList onSelect={handleRegionSelect} />
      </div>
    );
  }

  const region = wineRegions[selectedRegion];

  return (
    <div className="map-wrapper">
      <div className="map-header">
        <button onClick={handleBackToRegions} className="back-button">← Back</button>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: region.scale,
          center: region.center
        }}
        className="map-svg"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: Feature[] }) =>
            geographies
              .filter((geo) => getFeatureName(geo) !== 'Antarctica')
              .filter((geo) => {
                const name = getFeatureName(geo);
                const countryRegion = getCountryRegion(name);
                return countryRegion === selectedRegion || !region.countries.includes(name);
              })
              .map((geo) => {
                const name = getFeatureName(geo);
                const isWineProducer = region.countries.includes(name);
                const isSelected = selectedCountry === name;

                return (
                  <Geography
                    key={name || geo.id}
                    geography={geo}
                    onClick={() => {
                      if (isWineProducer) {
                        setSelectedCountry(name);
                      }
                    }}
                    style={{
                      default: {
                        fill: isWineProducer
                          ? (isSelected ? '#4A7C59' : '#F7E6EC')
                          : 'transparent',
                        stroke: '#AAA',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: isWineProducer ? 'pointer' : 'default'
                      },
                      hover: {
                        fill: isWineProducer ? '#7B2E5A' : 'transparent',
                        stroke: '#888',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: isWineProducer ? 'pointer' : 'default'
                      },
                      pressed: {
                        fill: '#4A7C59',
                        outline: 'none'
                      }
                    }}
                  />
                );
              })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default WorldMap;