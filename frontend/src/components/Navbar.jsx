import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const [showMore, setShowMore] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mainLinks = [
    { to: '/compare', label: 'Compare' },
    { to: '/hospitals', label: 'Hospitals' },
    { to: '/calculators', label: 'Calculators' },
    { to: '/my-policies', label: 'Portal' },
  ];

  const moreLinks = [
    { to: '/member', label: 'Member App' },
    { to: '/provider', label: 'Provider Assistant' },
    { to: '/admin', label: 'Dashboard' },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-50 transition-all duration-500">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-black text-white text-[17px] tracking-tighter">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-emerald)] to-[var(--accent-violet)] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
            <Shield size={18} className="text-[var(--bg-primary)] fill-current" />
          </div>
          Eptain<span className="text-[var(--accent-emerald)]">.ai</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em]">
          {mainLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className={`px-4 py-1.5 rounded-full transition-all ${
                path === link.to ? 'text-[var(--accent-emerald)] bg-white/[0.05]' : 'text-slate-500 hover:text-white'
              }`}
            >{link.label}</Link>
          ))}
          {/* More dropdown */}
          <div className="relative">
            <button onClick={() => setShowMore(!showMore)} className="flex items-center gap-1 px-4 py-1.5 rounded-full text-slate-500 hover:text-white transition-all">
              More <ChevronDown size={12} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
            </button>
            {showMore && (
              <>
                <div className="fixed inset-0" onClick={() => setShowMore(false)}></div>
                <div className="absolute top-full right-0 mt-3 bg-[var(--bg-secondary)] border border-white/10 rounded-2xl p-2 min-w-[200px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
                  {moreLinks.map((link) => (
                    <Link key={link.to} to={link.to} onClick={() => setShowMore(false)}
                      className={`block px-5 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                        path === link.to ? 'text-[var(--accent-emerald)] bg-white/[0.08]' : 'text-slate-500 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >{link.label}</Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/quote" className="btn-primary py-2.5 px-6 text-[11px] shadow-none">Initialize</Link>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-1">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[var(--bg-primary)] px-6 py-6 space-y-2 shadow-2xl">
          {[...mainLinks, ...moreLinks].map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
              className={`block px-5 py-4 rounded-2xl text-[12px] font-black tracking-widest ${path === link.to ? 'text-[var(--accent-emerald)] bg-white/[0.05]' : 'text-slate-500'}`}
            >{link.label}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
