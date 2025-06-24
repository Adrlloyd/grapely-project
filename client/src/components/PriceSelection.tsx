import { useState, useEffect } from 'react';
import '../styles/PriceSelection.css';

interface PriceSelectionProps {
  minPrice: number;
  maxPrice: number;
  onConfirm: (range: { min: number; max: number }) => void;
}

function PriceSelection({ minPrice, maxPrice, onConfirm }: PriceSelectionProps) {
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  // Update local slider values if new props are passed
  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  const handleConfirm = () => {
    onConfirm({ min: minValue, max: maxValue });
  };

  return (
    <div className="price-selection">
      <h2>Set Your Budget</h2>

      <div className="price-range">
        <label>
          Min: ${minValue}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
          />
        </label>

        <label>
          Max: ${maxValue}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
          />
        </label>
      </div>

      <button onClick={handleConfirm} className="price-button">
        Confirm Price Range
      </button>
    </div>
  );
}

export default PriceSelection;