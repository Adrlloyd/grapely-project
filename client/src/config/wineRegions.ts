export type WineRegion = {
  countries: string[];
  center: [number, number];
  scale: number;
  color: string;
};

export const wineRegions: Record<string, WineRegion> = {
  'Europe': {
    countries: ['France', 'Spain', 'Italy', 'Portugal', 'Germany', 'Austria', 'Croatia', 'Greece'],
    center: [10, 50],
    scale: 600,
    color: '#7B2E5A'
  },
  'North America': {
    countries: ['United States'],
    center: [-100, 40],
    scale: 400,
    color: '#7B2E5A'
  },
  'South America': {
    countries: ['Argentina', 'Chile', 'Ecuador'],
    center: [-65, -20],
    scale: 500,
    color: '#7B2E5A'
  },
  'Africa': {
    countries: ['South Africa'],
    center: [22, -30],
    scale: 300,
    color: '#7B2E5A'
  },
  'Oceania': {
    countries: ['Australia'],
    center: [135, -25],
    scale: 800,
    color: '#7B2E5A'
  }
};

export type RegionName = keyof typeof wineRegions;