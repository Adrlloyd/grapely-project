import type { WineFilterPayload, FilteredWinesResponse } from '../types/wine';

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchFilteredWines(filters: WineFilterPayload): Promise<FilteredWinesResponse> {
  const response = await fetch(`${BASE_URL}/api/wines/search/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch wines');
  }

  return await response.json();
}