import { wineRegions } from '../config/wineRegions';


// Returns the region name for a given country, or null if not found.

export function getCountryRegion(countryName: string): string | null {
  for (const [regionName, region] of Object.entries(wineRegions)) {
    if ((region.countries as unknown as string[]).includes(countryName)) {
      return regionName;
    }
  }
  return null;
}