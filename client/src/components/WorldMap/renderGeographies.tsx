import { Geography } from 'react-simple-maps';
import { getCountryRegion } from '../../utils/geo';
import { getFeatureName } from '../../types/geojson';
import { wineRegions } from '../../config/wineRegions';
import { getGeographyStyle } from './getGeographyStyle';
import type { Feature } from 'geojson';
import type { RegionName } from '../../config/wineRegions';

type RenderGeographiesProps = {
  geographies: Feature[];
  selectedRegion: RegionName;
  selectedCountry: string | null;
  setSelectedCountry: (country: string) => void;
  setHoveredCountry: (country: string | null) => void;
};

export function renderGeographies({
  geographies,
  selectedRegion,
  selectedCountry,
  setSelectedCountry,
  setHoveredCountry,
}: RenderGeographiesProps) {
  const region = wineRegions[selectedRegion];

  return geographies
    .filter((geo) => getFeatureName(geo) !== 'Antarctica')
    .filter((geo) => {
      const name = getFeatureName(geo);
      const isInSelectedRegion = getCountryRegion(name) === selectedRegion;
      const isUnrelated = !region.countries.includes(name);
      return isInSelectedRegion || isUnrelated;
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
          onMouseEnter={() => {
            if (isWineProducer) setHoveredCountry(name);
          }}
          onMouseLeave={() => {
            setHoveredCountry(null);
          }}
          style={getGeographyStyle(isWineProducer, isSelected)}
        />
      );
    });
}
