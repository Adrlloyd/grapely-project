import { useState, useEffect } from 'react';
import WineBottle from './WineBottle';
import '../../styles/PriceSelection.css';
import { Box, Button, Text } from '@chakra-ui/react';

interface PriceSelectionProps {
  minPrice: number;
  maxPrice: number;
  onConfirm: (range: { min: number; max: number }) => void;
}

function PriceSelection({ minPrice, maxPrice, onConfirm }: PriceSelectionProps) {
  const sliderMin = Math.floor(minPrice) - 1;
  const sliderMax = Math.ceil(maxPrice) + 1;

  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);

  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  const handleConfirm = () => {
    onConfirm({ min: minValue, max: maxValue });
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
    <Box className="price-selection">
      <Text fontSize="2.3rem" className="price-selection-title" fontFamily="heading">
        Set Your Budget
      </Text>

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
            <span className="price-label">Min<br />${minValue.toFixed(2)}</span>
          </div>

          <div className="bottle-block">
            <WineBottle fillPercentage={getFill(maxValue)} />
            <span className="price-label">Max<br />${maxValue.toFixed(2)}</span>
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

      <Button
        onClick={handleConfirm}
        className="price-button"
        bg="brand.primary"
        color="white"
        borderRadius="full"
        fontSize="lg"
        mt={8}
        px={8}
        py={4}
        boxShadow="lg"
        fontFamily="body"
        _hover={{
          bg: '#5e2347',
          transform: 'translateY(-2px)',
          boxShadow: 'xl',
        }}
      >
        Confirm Price Range
      </Button>
    </Box>
  );
}

export default PriceSelection;