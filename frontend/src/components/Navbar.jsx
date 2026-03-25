import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, BarChart3 } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  return (
    <nav className="p-5 flex justify-between items-center glass sticky top-0 z-50 border-b border-white/10">
      <Link 
        to="/" 
        className="text-2xl font-black flex items-center gap-3 text-slate-100 hover:text-cyan-400 transition-colors tracking-tight"
      >
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30">
           <ShieldAlert className="text-white" size={24} />
        </div>
        Eptain<span className="font-light text-slate-400">AI</span>
      </Link>
      
      <div className="flex items-center gap-8">
        <Link 
          to="/admin" 
          className={`flex items-center gap-2 font-semibold transition-colors duration-300 ${isAdmin ? 'text-cyan-400' : 'text-slate-400 hover:text-purple-400'}`}
        >
          <BarChart3 size={18} /> 
          <span className="hidden sm:inline">Mission Control</span>
        </Link>
        <div className="font-bold text-slate-300 hidden sm:block px-4 py-2 glass-card rounded-full border border-white/5 shadow-inner">
          <span className="text-cyan-400 mr-2">✦</span> Support: 1800-266-9999
        </div>
      </div>
    </nav>
  );
}
