// Page showing the detail
import { useLocation } from 'react-router';
import '../styles/WineCard.css';
import type { Wine } from '../types/wine';

function WineCard() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const bottleName = decodeURIComponent(query.get('bottle') || '');

  // Retrieve wines from localStorage
  const storedWines = localStorage.getItem('filteredWines');
  const wineList: Wine[] = storedWines ? JSON.parse(storedWines) : [];

  const selectedBottle = wineList.find((bottle) => bottle.name === bottleName);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!selectedBottle) {
    return <p>Bottle Not Found</p>;
  }

  const {
    name,
    grape,
    region,
    country,
    price,
    image_url,
    description,
    pairingOptions,
  } = selectedBottle;

  return (
    <div className="selectedWine-card">
      <img src={`${BASE_URL}/${image_url}`} alt={name} className="selectedWine-image" />
      <h1>{name}</h1>
      <p><strong>Grape:</strong> {grape}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Country:</strong> {country}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Pairing:</strong> {pairingOptions.join(', ')}</p>
    </div>
  );
}

export default WineCard;