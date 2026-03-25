import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quote from './pages/Quote';
import Results from './pages/Results';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Solutions from './pages/Solutions';
import Enterprise from './pages/Enterprise';
import Compare from './pages/Compare';
import Hospitals from './pages/Hospitals';
import MyPolicies from './pages/MyPolicies';
import Calculators from './pages/Calculators';
import Security from './pages/Security';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)]">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/results/:quoteId" element={<Results />} />
            <Route path="/checkout/:leadId" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/my-policies" element={<MyPolicies />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/security" element={<Security />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}
