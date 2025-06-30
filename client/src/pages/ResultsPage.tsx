import Results from '../components/Results';

function ResultsPage({ favourites = false }: { favourites?: boolean }) {
  return (
    <div>
      <Results favourites={favourites}/>
    </div>
  );
}

export default ResultsPage;