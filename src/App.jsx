import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import SingleMapPreviewPage from './pages/SingleMapPreviewPage';
import DashboardPage from './pages/Dashboard';
import { LoadScript } from '@react-google-maps/api';

function App() {
  return (
    <BrowserRouter>
      <LoadScript googleMapsApiKey="AIzaSyAXRm_3-JRyeQt-4oaYuNut4dfAE3ZUz_M">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/single-map-preview" element={<SingleMapPreviewPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LandingPage />} />
        </Routes>
      </LoadScript>
    </BrowserRouter>
  );
}

export default App;