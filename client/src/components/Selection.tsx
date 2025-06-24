import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import PairingSelection from '../components/PairingSelection';
import PriceSelection from '../components/PriceSelection';
import { fetchFilteredWines } from '../services/wineService';
import type { Wine } from '../types/wine';
import { getCountryRegion } from '../utils/geo';

function Selection() {
  const [pairing, setPairing] = useState<string | null>(null);
  const [price, setPrice] = useState<{ min: number; max: number } | null>(null);
  const [countryWines, setCountryWines] = useState<Wine[]>([]);
  const [availablePairings, setAvailablePairings] = useState<string[]>([]);
  const [sliderBounds, setSliderBounds] = useState<{ min: number; max: number }>({ min: 0, max: 100 });

  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const country = query.get('country');
  let region = query.get('region');

  if (!region && country) {
    region = getCountryRegion(country);
  }

  const handleBack = () => {
    if (pairing) {
      setPairing(null);
    } else {
      navigate(`/selection?country=${country}&region=${region}`);
    }
  };

  useEffect(() => {
    if (!country) return;

    fetchFilteredWines({ country, priceBracket: undefined })
      .then((response) => {
        console.log('Initial response for country fetch:', response);
        if ('wines' in response) {
          console.log(`Fetched ${response.count} wines for ${country}`);
          setCountryWines(response.wines);
        }

        if ('availablePairings' in response && 'overallPriceBracket' in response) {
          setAvailablePairings(response.availablePairings);
          setSliderBounds({
            min: Math.floor(response.overallPriceBracket[0]),
            max: Math.ceil(response.overallPriceBracket[1]),
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching wines for country:', error);
        setCountryWines([]);
      });
  }, [country]);

  useEffect(() => {
    if (!country || !price) return;

    fetchFilteredWines({ country, priceBracket: price })
      .then((response) => {
        if ('wines' in response) {
          setCountryWines(response.wines);
        }

        if ('availablePairings' in response) {
          setAvailablePairings(response.availablePairings);
        }
      })
      .catch((error) => {
        console.error('Error fetching wines after price:', error);
      });
  }, [country, price]);

  useEffect(() => {
    if (!region || !country || !pairing || !price) return;

    const params = new URLSearchParams({
      region,
      country,
      pairing,
      min: price.min.toString(),
      max: price.max.toString(),
    });

    navigate(`/results?${params.toString()}`);
  }, [region, country, pairing, price, navigate]);

  return (
    <>
      <button onClick={handleBack} className="back-button">
        ← Back
      </button>

      {!price && (
        <PriceSelection
          minPrice={sliderBounds.min}
          maxPrice={sliderBounds.max}
          onConfirm={setPrice}
        />
      )}

      {price && !pairing && (
        <PairingSelection
          onSelect={setPairing}
          availableOptions={availablePairings}
        />
      )}
    </>
  );
}

export default Selection;