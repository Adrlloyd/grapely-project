import {Routes, Route} from 'react-router';
import './App.css';
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import ResultsPage from './pages/ResultsPage';

function App () {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/selection" element={<SelectionPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  )
}

export default App;

import './App.css'
