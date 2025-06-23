// Page showing the detail
import { useLocation } from 'react-router';
import '../styles/WineCard.css';
import wineResults from '../config/wineSample';


function WineCard () {
  // Get URL query string
  const { search } = useLocation();

  // parse query string into key-value
  const query = new URLSearchParams(search);

  // get value of bottle key in query string, URL-encoded
  // fallback to empty string if bottle name = null
  // decode bottle name
  const bottleName = decodeURIComponent(query.get('bottle') || '');

  // Find the correct bottle within wineResults array
  const selectedBottle = wineResults.find(bottle => bottle.name === bottleName)

  if (!selectedBottle) {
    return (
      <p>Bottle Not Found</p>
    )
  }

  const { name, grape, region, country, price, image_url, description, pairingOptions} = selectedBottle;

  return (
    <div className="selectedWine-card">
      <img src={image_url} alt={name} className="selectedWine-image" />
      <h1>{name}</h1>
      <p><strong>Grape:</strong> {grape}</p>
      <p><strong>Region:</strong> {region}</p>
      <p><strong>Country:</strong> {country}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Pairing:</strong> {pairingOptions}</p>
    </div>
  );

}

export default WineCard;
