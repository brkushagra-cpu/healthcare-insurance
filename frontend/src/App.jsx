import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quote from './pages/Quote';
import Results from './pages/Results';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative text-slate-100 selection:bg-cyan-500/30">
        
        {/* Background Ambient Orbs */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none z-0"></div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/results/:quoteId" element={<Results />} />
              <Route path="/checkout/:leadId" element={<Checkout />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          <Chatbot />
        </div>
      </div>
    </Router>
  );
}
