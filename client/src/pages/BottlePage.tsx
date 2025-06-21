// Page showing the detail
import { useLocation } from 'react-router';


function BottlePage () {
  // Get current URL info & destructure the query string part (after '?')
  const { search } = useLocation();

  // parse query string into key-value (key=bottle, value=bottle name)
  const query = new URLSearchParams(search);

  // get value of bottle key in query string, URL-encoded
  const bottleName = query.get('bottle');

  return(
    <>
      {/* decode bottle name and fallback to empty string if bottle name = null */}
      <h1>{decodeURIComponent(bottleName || '')}</h1>
      <p>BOTTLE DETAILS...</p>
    </>
  )

}

export default BottlePage;
