import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import WineBottle from '../components/WineBottle';
import '../styles/PriceSelection.css';

interface PriceSelectionProps {
  minPrice: number;
  maxPrice: number;
  onConfirm: (range: { min: number; max: number }) => void;
}

function PriceSelection({ minPrice, maxPrice, onConfirm }: PriceSelectionProps) {
  // Add buffer range
  const sliderMin = Math.floor(minPrice) - 1;
  const sliderMax = Math.ceil(maxPrice) + 1;

  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  const navigate = useNavigate();

  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  const handleConfirm = () => {
    onConfirm({ min: minValue, max: maxValue });
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleMinChange = (newMinValue: number) => {
    if (newMinValue > maxValue) {
      setMaxValue(newMinValue);
    }
    setMinValue(newMinValue);
  };

  const handleMaxChange = (newMaxValue: number) => {
    if (newMaxValue < minValue) {
      setMinValue(newMaxValue);
    }
    setMaxValue(newMaxValue);
  };

  const getFill = (value: number) =>
    ((value - sliderMin) / (sliderMax - sliderMin)) * 100;

  return (
    <div className="price-selection">
      <div className="price-header">
        <button onClick={handleBack} className="back-button">← Back</button>
      </div>

      <h2 className="price-selection-title">Set Your Budget</h2>

      <div className="bottle-slider-frame">
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step="0.01"
          value={minValue}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="bottle-slider-vertical"
        />

        <div className="bottle-center-pair">
          <div className="bottle-block">
            <WineBottle fillPercentage={getFill(minValue)} />
            <span className="price-label">Min: ${minValue.toFixed(2)}</span>
          </div>

          <div className="bottle-block">
            <WineBottle fillPercentage={getFill(maxValue)} />
            <span className="price-label">Max: ${maxValue.toFixed(2)}</span>
          </div>
        </div>

        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          step="0.01"
          value={maxValue}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="bottle-slider-vertical"
        />
      </div>

      <button onClick={handleConfirm} className="price-button">
        Confirm Price Range
      </button>
    </div>
  );
}


export default PriceSelection;