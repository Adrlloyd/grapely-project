import pairingOptions from '../config/pairingOptions';
import '../styles/PairingSelection.css';

interface PairingSelectionProps {
  onSelect: (pairing: string) => void
}

// onSelect props is a function from the parent component
function PairingSelection ({ onSelect }: PairingSelectionProps) {

  // pairing options
  const options = pairingOptions;

  return (
    <div>
      <h2>What do you fancy eating?</h2>
      {options.map((option) => (
        <button
          key={option}
          onClick={ () => onSelect(option)}
          className = "pairing-button"
        >
          {option}
        </button>
      )
      )}
    </div>
  )
}

export default PairingSelection;