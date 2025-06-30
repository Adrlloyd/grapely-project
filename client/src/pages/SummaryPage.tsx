import WineCard from '../components/WineCard';
import { useLocation } from 'react-router';

function SummaryPage() {
  const location = useLocation();
  const wine = location.state?.wine;

  return (
    <div>
      <WineCard wine={wine} />
    </div>
  );
}

export default SummaryPage;