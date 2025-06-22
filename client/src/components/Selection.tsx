import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import PairingSelection from '../components/PairingSelection';
import PriceSelection from '../components/PriceSelection';


function SelectionPage () {
  const [pairing, setPairing] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const region = query.get('region');
  const country = query.get('country');

  useEffect(() => {

    // early return for safety & keep TS happy
    if (!region || !country) return;

    // navigate to ResultsPage once both pairing and price are selected
    if (pairing && price) {
      const encodedPairing = encodeURIComponent(pairing);
      const encodedPrice = encodeURIComponent(price);
      const encodedRegion = encodeURIComponent(region);
      const encodedCountry = encodeURIComponent(country);

      navigate(`/results?country=${encodedCountry}&region=${encodedRegion}&pairing=${encodedPairing}&price=${encodedPrice}`);
    }
  },
    [country, region, pairing, price, navigate]
  );



  return (
    <>
      {/* Show Select Pairing  */}
      {!pairing && (
        <div>
          <PairingSelection onSelect={setPairing} />
        </div>
      )}

      {/* Show Select Price  */}
      {pairing && !price && (
        <div>
          <PriceSelection onSelect={setPrice} />
        </div>
      )}




    </>
  )
}

export default SelectionPage;