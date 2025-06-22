// Page showing the detail
import { useLocation } from 'react-router';



function BottlePage () {
  // Get URL query string
  const { search } = useLocation();

  // parse query string into key-value
  const query = new URLSearchParams(search);

  // get value of bottle key in query string, URL-encoded
  // fallback to empty string if bottle name = null
  const bottleName = query.get('bottle') || '';

  return(
    <>
      {/* decode bottle name*/}
      <h1>{decodeURIComponent(bottleName)}</h1>
      <p>BOTTLE DETAILS...</p>
    </>
  )

}

export default BottlePage;
