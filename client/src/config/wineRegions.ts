export type WineRegion = {
  countries: string[];
  center: [number, number];
  scale: number;
  color: string;
};

export const wineRegions: Record<string, WineRegion> = {
  'Europe': {
    countries: ['France', 'Italy', 'Spain', 'Germany', 'Portugal', 'Greece', 'Hungary', 'Austria', 'Romania', 'Switzerland', 'Slovenia', 'Croatia', 'Bulgaria', 'Czech Republic', 'Moldova'],
    center: [10, 54],
    scale: 600,
    color: '#8B1538'
  },
  'North America': {
    countries: ['United States of America', 'Canada', 'Mexico'],
    center: [-100, 45],
    scale: 400,
    color: '#A63446'
  },
  'South America': {
    countries: ['Argentina', 'Chile', 'Brazil', 'Uruguay'],
    center: [-60, -15],
    scale: 500,
    color: '#C44357'
  },
  'Africa & Middle East': {
    countries: ['South Africa', 'Lebanon', 'Israel', 'Turkey'],
    center: [20, 0],
    scale: 400,
    color: '#6B1E3A'
  },
  'Asia': {
    countries: ['China', 'Georgia'],
    center: [100, 35],
    scale: 300,
    color: '#9B2C42'
  },
  'Oceania': {
    countries: ['Australia', 'New Zealand'],
    center: [140, -25],
    scale: 800,
    color: '#7A2E47'
  }
};

export type RegionName = keyof typeof wineRegions;