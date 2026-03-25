import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, Clock, ChevronRight, Activity, Zap, BarChart3, Globe, Sparkles } from 'lucide-react';


export default function Home() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMouse = (e) => {
      // Small adjustment for parallax effect
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="w-full bg-prism-dark overflow-hidden min-h-screen relative text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none matrix-grid opacity-20"></div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 flex items-center justify-center min-h-screen px-6 overflow-hidden">
        <div className="max-w-[1200px] w-full relative z-10 flex flex-col items-center text-center">
          
          {/* Main 3D Asset - Photorealistic Heart with Mouse Tilt */}
          <motion.div 
            animate={{ 
              x: mousePos.x, 
              y: mousePos.y, 
              rotateX: -mousePos.y * 0.3, 
              rotateY: mousePos.x * 0.3 
            }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="absolute z-0 opacity-40 grayscale-[0.5] transition-opacity duration-1000"
          >
            <img src="/assets/luxe_heart.png" className="w-[850px] h-auto pointer-events-none float-slow shadow-2xl" alt="Luxe Medical 3D" />
          </motion.div>

          {/* Central Prismatic Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="prismatic-glass p-12 md:p-24 max-w-[950px] w-full text-center relative z-20 shadow-[0_0_150px_rgba(0,0,0,0.7)] border-white/10 holographic-shine"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/20 text-[var(--accent-emerald)] text-[12px] font-black uppercase tracking-[0.4em] mb-12 shadow-glow">
               <Activity size={16} className="animate-pulse" /> VENTURE-GRADE INTELLIGENCE
            </div>
            
            <h1 className="text-7xl md:text-[140px] font-black text-white leading-[0.75] tracking-tighter mb-12">
              Human <br />
              <span className="text-gradient">Autonomy.</span>
            </h1>
            
            <p className="text-[22px] text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-16 px-4">
              The world's first <span className="text-white font-black">Deterministic AI Underwriting System</span>. Achieving clinical-grade precision for enterprise risk management.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 px-6">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(16,185,129,0.5)" }}
                onClick={() => navigate('/quote')}
                className="btn-primary w-full sm:w-auto px-16 py-7 text-[17px] shadow-none"
              >
                Initialize My AI Policy
              </motion.button>
              <button 
                onClick={() => navigate('/compare')} 
                className="btn-secondary w-full sm:w-auto px-12 py-7 text-[16px] backdrop-blur-md"
              >
                MARKET AUDIT
              </button>
            </div>
          </motion.div>

          {/* Venture Stats Section */}
          <div className="mt-32 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-16 relative z-10">
            {[
              { label: 'Latency', val: '42ms', icon: Zap },
              { label: 'Risk Coverage', val: '100%', icon: Shield },
              { label: 'Enterprise Partners', val: '800+', icon: Globe },
              { label: 'Growth YoY', val: '4.2x', icon: BarChart3 }
            ].map((s, i) => (
              <div key={i} className="text-center group cursor-pointer hover:scale-105 transition-transform">
                <s.icon size={20} className="mx-auto mb-4 text-[var(--accent-emerald)] opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-2xl font-black text-white">{s.val}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venture Market Ticker */}
      <div className="w-full bg-white/5 border-y border-white/5 py-10 overflow-hidden relative z-20 backdrop-blur-3xl">
        <div className="flex whitespace-nowrap animate-[marquee_50s_linear_infinite] gap-24 items-center opacity-30">
          {['APOLLO CLINICAL', 'VENTURE CAPITAL PARTNERS', 'IRDAI COMPLIANT', 'ZERO-TRUST ARCHITECTURE', '99.9% ACCURACY', 'QUANTUM-GRADE ENCRYPTION', 'BLOCKCHAIN AUDIT READY'].map((t, i) => (
            <div key={i} className="flex items-center gap-4 text-2xl font-black tracking-widest text-white italic">
               <Sparkles size={16} /> {t}
            </div>
          ))}
          {['APOLLO CLINICAL', 'VENTURE CAPITAL PARTNERS', 'IRDAI COMPLIANT', 'ZERO-TRUST ARCHITECTURE', '99.9% ACCURACY', 'QUANTUM-GRADE ENCRYPTION', 'BLOCKCHAIN AUDIT READY'].map((t, i) => (
            <div key={i+10} className="flex items-center gap-4 text-2xl font-black tracking-widest text-white italic">
               <Sparkles size={16} /> {t}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
