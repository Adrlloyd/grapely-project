import { useNavigate } from 'react-router';

function ResultsPage () {
  const navigate = useNavigate();

  // Bottle suggestions need to be updated and connected to database once ready
  const options = ['Bottle 1', 'Bottle 2', 'Bottle 3'];

  const handleSelect = (bottle: string) => {
    // passing the bottle name via a query param
    navigate(`/summary?bottle=${encodeURIComponent(bottle)}`);
  };

  return (
    <div>
      <h2>Choose a bottle</h2>
      {options.map((option) => (
        <button
          key={option}
          onClick={ () => handleSelect(option)}
        >
          {option}
        </button>
      )
      )}
    </div>
  )
}

export default ResultsPage;