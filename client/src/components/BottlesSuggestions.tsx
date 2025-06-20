interface BottlesSuggestionsProps {
  onSelect: (bottle: string) => void
}

// onSelect props is a function from the parent component
function BottlesSuggestions ({ onSelect }: BottlesSuggestionsProps
) {
  // pairing options
  const options = ['Bottle 1', 'Bottle 2', 'Bottle 3'];

  return (
    <div>
      <h2>Choose a bottle</h2>
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

export default BottlesSuggestions;