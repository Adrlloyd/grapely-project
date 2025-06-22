import { useNavigate, useLocation } from 'react-router';
import '../styles/Results.css';
import wineResults from '../config/wineSample.ts';

// TO BE UDPATED: Fetch call to Back end
const options = wineResults;

function Results () {

  // Get URL query string
  const { search } = useLocation();

  // parse query string into key-value
  const query = new URLSearchParams(search);

  // get values of all the keys (previous user's selections)
  const region = query.get('region') || '';
  const country = query.get('country') || '';
  const pairing = query.get('pairing') || '';
  const price = query.get('price') || '';

  const navigate = useNavigate();

  // navigate to BottlePage once bottle is selected
  const handleSelect = (bottle: string) => {
    const encodedBottle = encodeURIComponent(bottle);
    const encodedPairing = encodeURIComponent(pairing);
    const encodedPrice = encodeURIComponent(price);
    const encodedRegion = encodeURIComponent(region);
    const encodedCountry = encodeURIComponent(country);
    navigate(`/summary?country=${encodedCountry}&region=${encodedRegion}&pairing=${encodedPairing}&price=${encodedPrice}&bottle=${encodedBottle}`);
  };

  return (
    <div>
      <h2>Choose a bottle</h2>
      <div className="wine-list">
        {options.map((wine) => (
          <div key={wine.name} className="wine-card" onClick={() => handleSelect(wine.name)}>
            <img src={wine.image_url} alt={wine.name} className="wine-image" />
            <div className="wine-info">
              <h3>{wine.name}</h3>
              <p><strong>Grape: </strong>{wine.grape}</p>
              <p><strong>Region: </strong>{wine.region}</p>
              <p><strong>Price: </strong>{wine.price}</p>
            </div>
          </div>))
        }
      </div>
    </div>
  )
}

export default Results;