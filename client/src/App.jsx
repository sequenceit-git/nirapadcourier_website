import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import TrackResult from './pages/TrackResult';
import Register from './pages/Register';
import Login from './pages/Login';
import MerchantDashboard from './pages/MerchantDashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-light text-slate-800">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track/:code" element={<TrackResult />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/merchant" element={<MerchantDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

