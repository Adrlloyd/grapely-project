import { useLocation, useNavigate } from 'react-router';
import '../styles/WineCard.css';
import type { Wine } from '../types/wine';

/* could probably just use the wine interface here or clean up
 the whole thing to use just props */
interface WineCardProps {
  wine?: Wine;
}

//it now takes a wine prop OR uses the query params
function WineCard({ wine }: WineCardProps) {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);

  // if wine prop is passed use it, otherwise use the query params
  let selectedBottle = wine;
  if (!selectedBottle) {
    const bottleName = decodeURIComponent(query.get('bottle') || '');
    const storedWines = localStorage.getItem('filteredWines');
    const wineList: Wine[] = storedWines ? JSON.parse(storedWines) : [];
    selectedBottle = wineList.find((bottle) => bottle.name === bottleName);
  }

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  const handleBackClick = () => {
    navigate(-1);
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
          <img src={`${IMAGE_BASE_URL}/${image_url}`} alt={name} className="winecard-image" />
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