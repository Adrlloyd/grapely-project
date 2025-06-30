import type { FavouriteWinesResponse } from '../types/wine';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchFavouriteWines( token: string ): Promise <FavouriteWinesResponse> {
  const response = await fetch(`${BASE_URL}/api/favourites`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch favourite wines');
  }

  return await response.json();
}