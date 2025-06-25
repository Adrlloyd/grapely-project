import { useLocation, useNavigate } from 'react-router';
import '../styles/WineCard.css';
import type { Wine } from '../types/wine';

function WineCard() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);

  const bottleName = decodeURIComponent(query.get('bottle') || '');
  const storedWines = localStorage.getItem('filteredWines');
  const wineList: Wine[] = storedWines ? JSON.parse(storedWines) : [];
  const selectedBottle = wineList.find((bottle) => bottle.name === bottleName);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleBackClick = () => {
    navigate(-1); // You can change this to navigate('/results') if needed
  };

  if (!selectedBottle) {
    return <p className="winecard-error">Bottle Not Found</p>;
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
    <div className="winecard-container">
      <div className="winecard-header">
        <button className="back-button" onClick={handleBackClick}>← Back</button>
      </div>

      <div className="winecard-card">
        <div className="winecard-image-wrapper">
          <img src={`${BASE_URL}/${image_url}`} alt={name} className="winecard-image" />
        </div>

        <div className="winecard-info">
          <h1 className="winecard-title">{name}</h1>
          <p><strong>Grape:</strong> {grape}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Country:</strong> {country}</p>
          <p><strong>Price:</strong> ${price}</p>
          <p className="winecard-description"><strong>Description:</strong> {description}</p>
          <p><strong>Pairing:</strong> {pairingOptions.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default WineCard;