import priceOptions from '../config/priceOptions';
import '../styles/PriceSelection.css';


interface PriceSelectionProps {
  onSelect: (price: string) => void
}

// onSelect props is a function from the parent component
function PriceSelection ({ onSelect }: PriceSelectionProps) {

  // price options
  const options = priceOptions;

  return (
    <div>
      <h2>What is your budget?</h2>
      {options.map((option) => (
        <button
          key={option}
          onClick={ () => onSelect(option)}
        >
          {option}
        </button>
      )
      )}
    </div>
  )
}

export default PriceSelection;