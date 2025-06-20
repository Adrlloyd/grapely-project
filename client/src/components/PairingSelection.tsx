
interface PairingSelectionProps {
  onSelect: (pairing: string) => void
}

// onSelect props is a function from the parent component
function PairingSelection ({ onSelect }: PairingSelectionProps) {

  // pairing options
  const options = ['No pairing', 'Red Meat', 'Fish', 'Cheese'];

  return (
    <div>
      <h2>Choose a pairing</h2>
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

export default PairingSelection;