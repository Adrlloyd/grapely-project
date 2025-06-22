import { useNavigate, useLocation } from 'react-router';

function ResultsPage () {

  // Get URL query string
  const { search } = useLocation();

  // parse query string into key-value
  const query = new URLSearchParams(search);

  // get values of all the keys (previous user's selections)
  const region = query.get('region') || '';
  const country = query.get('country') || '';
  const pairing = query.get('pairing') || '';
  const price = query.get('price') || '';

  // TO BE UDPATED: Fetch call to Back end
  const options = ['Bottle 1', 'Bottle 2', 'Bottle 3'];

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
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
        >
          {option}
        </button>
      )
      )}
    </div>
  )
}

export default ResultsPage;