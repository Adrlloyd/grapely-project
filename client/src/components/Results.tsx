import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import '../styles/Results.css';
import { fetchFilteredWines } from '../services/wineService';
import type { Wine } from '../types/wine';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Results() {
  const [wines, setWines] = useState<Wine[]>([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const country = query.get('country') || '';
  const region = query.get('region') || '';
  const pairing = query.get('pairing') || '';
  const min = query.get('min');
  const max = query.get('max');

  useEffect(() => {
    if (!country || !pairing || !min || !max) return;

    fetchFilteredWines({
      country,
      priceBracket: { min: parseFloat(min), max: parseFloat(max) },
      pairing,
    })
      .then((response) => {
        if ('wines' in response) {
          setWines(response.wines);
          localStorage.setItem('filteredWines', JSON.stringify(response.wines));
        } else {
          console.warn('No wines found in response.');
        }
      })
      .catch((error) => {
        console.error('Error fetching final filtered wines:', error);
      });
  }, [country, min, max, pairing]);

  const handleSelect = (wine: Wine) => {
    const encodedParams = new URLSearchParams({
      country,
      region,
      pairing,
      price: wine.price.toString(),
      bottle: wine.name,
    });
    navigate(`/summary?${encodedParams.toString()}`);
  };

  
  return (
    <div>
      <div className="results-page">
      <h2>Choose a bottle</h2>
      <div className="wine-list">
        {wines.map((wine) => (
          <div key={wine.id} className="wine-card" onClick={() => handleSelect(wine)}>
            <img
              src={`${BASE_URL}/${wine.image_url}`}
              alt={wine.name}
              className="wine-image"
            />
            <div className="wine-info">
              <p><strong>{wine.name}</strong></p>
              <p><strong>Country:</strong> {wine.country}</p>
              <p><strong>Grape:</strong> {wine.grape}</p>
              <p><strong>Price:</strong> ${wine.price}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Results;