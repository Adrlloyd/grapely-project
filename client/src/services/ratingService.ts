const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function submitRating(token: string, wineId: string, score: number) {
  try {
    const response = await fetch(`${BASE_URL}/api/rating/`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ wineId, score })
    });
    if (!response.ok) {
      console.error('Problem accessing server to submit rating.')
    };
    return response.json();
  } catch (error) {
    console.error('Unexpected error submitting rating:', error);
  }  
}

export async function deleteRating(token: string, wineId: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/rating/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ wineId })
    });
    if (!response.ok) {
      console.error('Problem accessing server to delete rating.')
    };
    return response.json();
  } catch (error) {
    console.error('Unexpected error deleting rating:', error);
  }
}