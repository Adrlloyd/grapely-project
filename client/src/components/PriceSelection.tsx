
interface PriceSelectionProps {
  onSelect: (price: string) => void
}

// onSelect props is a function from the parent component
function PriceSelection ({ onSelect }: PriceSelectionProps) {

  // price options
  const options = ['Affordable', 'Average', 'Expensive'];

  return (
    <div>
      <h2>Choose a price</h2>
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