import { useState } from 'react';
import PairingSelection from './PairingSelection';
import PriceSelection from './PriceSelection';
import BottlesSuggestions from './BottlesSuggestions';



function WineSelection () {
  const [pairing, setPairing] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [bottle, setBottle] = useState<string | null>(null);


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

      {/* Show Select Bottle */}
      {pairing && price && !bottle && (
        <div>
          <BottlesSuggestions onSelect={setBottle} />
        </div>
      )}

      {/* Show Choices */}
      {pairing && price && bottle && (
        <div>
          <p>Pairing: {pairing}</p>
          <p>Price: {price}</p>
          <p>Bottle Choice: {bottle}</p>
        </div>
      )}

    </>
  )
}

export default WineSelection;