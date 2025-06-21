import { useState } from 'react';
import PairingSelection from '../components/PairingSelection';
import PriceSelection from '../components/PriceSelection';
import ResultsPage from './ResultsPage';



function SelectionPage () {
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
          <ResultsPage onSelect={setBottle} />
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

export default SelectionPage;