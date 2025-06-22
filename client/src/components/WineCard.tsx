// Page showing the detail
import { useLocation } from 'react-router';
import '../styles/WineCard.css';
// import wineBottle from '../config/WineSample.ts';

// TO BE UDPATED: using sample bottle data located in config file
// const {name, grap, color, sparkling, region, country, price, image_url, description, pairingOptions} = wineBottle;



function WineCard () {
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

export default WineCard;
