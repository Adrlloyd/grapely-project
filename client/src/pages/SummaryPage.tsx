import WineCard from '../components/WineCard';
import { useLocation } from 'react-router';
import RandomButton from '../components/RandomButton';

function SummaryPage() {
  const location = useLocation();
  const wine = location.state?.wine;

  // it now takes a wine prop but will default to the url params if no wine prop is passed
  return (
    <div>
      <h1>Grapely</h1>
      {/* uncomment this to show the random button, this is for testing purposes */}
      {/* <RandomButton /> */}
      <WineCard wine={wine} />
    </div>
  );
}

export default SummaryPage;