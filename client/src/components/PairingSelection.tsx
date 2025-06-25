import '../styles/PairingSelection.css';

interface PairingSelectionProps {
  onSelect: (pairing: string) => void;
  availableOptions: string[];
}

function PairingSelection({ onSelect, availableOptions }: PairingSelectionProps) {
  return (
    <div className="pairing-selection">
      <h2 className="pairing-title">What do you fancy eating?</h2>
      <div className="pairing-options">
        {availableOptions.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="pairing-button"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PairingSelection;