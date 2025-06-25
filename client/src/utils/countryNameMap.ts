// GeoJSON name → external data name
export const geoToDataCountryName: Record<string, string> = {
  'United States of America': 'United States',
};

export const dataToGeoCountryName: Record<string, string> = Object.fromEntries(
  Object.entries(geoToDataCountryName).map(([geo, data]) => [data, geo])
);
