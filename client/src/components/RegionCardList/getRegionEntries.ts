import { wineRegions } from '../../config/wineRegions';
import type { RegionName } from '../../config/wineRegions';

// Returns the wine region entries with correct typing
export function getRegionEntries(): [RegionName, typeof wineRegions[RegionName]][] {
  return Object.entries(wineRegions) as [RegionName, typeof wineRegions[RegionName]][];
}