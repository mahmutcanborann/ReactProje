import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import OfferList from './pages/OfferList';
import NewOffer from './pages/NewOffer';
import ForgotPassword from './pages/ForgotPassword';
import PurchaseItems from './pages/PurchaseItems';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/offers" element={<OfferList />} /> {/* bu doğru */}
      <Route path="/new-offer" element={<NewOffer />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/purchase-items" element={<PurchaseItems />}/>
    </Routes>
  );
}

export default App;
