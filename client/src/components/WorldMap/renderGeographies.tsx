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
};

// This function filters and maps GeoJSON features to styled <Geography> elements
export function renderGeographies({
  geographies,
  selectedRegion,
  selectedCountry,
  setSelectedCountry
}: RenderGeographiesProps) {
  const region = wineRegions[selectedRegion];

  return geographies
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
          style={getGeographyStyle(isWineProducer, isSelected)}
        />
      );
    });
}