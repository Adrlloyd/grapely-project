import { Routes, Route } from 'react-router';
import './App.css';
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import ResultsPage from './pages/ResultsPage';
import BottlePage from './pages/BottlePage';

function App () {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/summary" element={<BottlePage />} />
      </Routes>
    </div>
  )
}

export default App;
