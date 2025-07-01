import type { WineFilterPayload, FilteredWinesResponse } from '../types/wine';
import { geoToDataCountryName } from '../utils/countryNameMap';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchFilteredWines(
  filters: WineFilterPayload, token?: string
): Promise<FilteredWinesResponse> {
  const normalizedCountry =
    geoToDataCountryName[filters.country] || filters.country;

  const normalizedFilters: WineFilterPayload = {
    ...filters,
    country: normalizedCountry,
  };

  const response = await fetch(`${BASE_URL}/api/wines/search/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(normalizedFilters),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch wines');
  }

  return await response.json();
}