import { Routes, Route } from 'react-router';
import './App.css';
import Layout from './components/Layout';
import BeginJourney from './pages/LandingPage';
import RegionSelectPage from './pages/RegionSelectPage';
import SelectionPage from './pages/SelectionPage';
import ResultsPage from './pages/ResultsPage';
import SummaryPage from './pages/SummaryPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BeginJourney />} />

      <Route path="/region" element={<Layout><RegionSelectPage /></Layout>} />
      <Route path="/selection" element={<Layout><SelectionPage /></Layout>} />
      <Route path="/results" element={<Layout><ResultsPage /></Layout>} />
      <Route path="/summary" element={<Layout><SummaryPage /></Layout>} />
      <Route path="/login" element={<Layout><LoginPage /></Layout>} />
      <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
      <Route path="/userProfile" element={<Layout><ProtectedRoute><UserProfilePage /></ProtectedRoute></Layout>} />
      <Route path="/favourites" element={<Layout><ProtectedRoute><ResultsPage favourites={true} /></ProtectedRoute></Layout>} />
    </Routes>
  );
}

export default App;
