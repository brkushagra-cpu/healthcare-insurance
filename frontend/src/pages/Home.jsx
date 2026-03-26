import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, Clock, ChevronRight, Activity, Zap, BarChart3, Globe, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const baseUrl = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="w-full bg-prism-dark overflow-hidden min-h-screen relative text-white">
      {/* Background Matrix Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none matrix-grid opacity-15"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center min-h-screen px-6 overflow-hidden">
        <div className="max-w-[1200px] w-full relative z-10 flex flex-col items-center text-center">
          
          {/* Main 3D Asset - Liquid Glass Heart */}
          <motion.div 
            animate={{ 
              x: mousePos.x, 
              y: mousePos.y, 
              rotateX: -mousePos.y * 0.4, 
              rotateY: mousePos.x * 0.4 
            }}
            transition={{ type: "spring", stiffness: 80, damping: 25 }}
            className="absolute z-0 opacity-40 grayscale-[0.2] hover:grayscale-0 transition-opacity duration-1000 top-[-20%] md:top-[-40%]"
          >
            <img 
              src={`${baseUrl}assets/liquid_heart.png`} 
              className="w-[350px] md:w-[850px] h-auto pointer-events-none float-slow shadow-2xl" 
              alt="Liquid Heart 3D" 
            />
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="prismatic-glass p-8 md:p-24 max-w-[950px] w-full text-center relative z-20 shadow-[0_0_150px_rgba(0,0,0,0.8)] border-white/10 holographic-shine"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/20 text-[var(--accent-emerald)] text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-8 md:mb-12 shadow-glow">
               <Activity size={16} className="animate-pulse" /> VENTURE-GRADE AUTONOMY
            </div>
            
            <h1 className="text-5xl md:text-[140px] font-black text-white leading-[0.8] tracking-tighter mb-8 md:mb-12">
              Human <br />
              <span className="text-gradient">Autonomy.</span>
            </h1>
            
            <p className="text-[16px] md:text-[22px] text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed mb-12 md:mb-16 px-4 font-body">
              The first <span className="text-white font-black">Deterministic Underwriting Engine</span>. Delivering clinical-grade precision for institutional healthcare.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 px-6">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(16,185,129,0.5)" }}
                onClick={() => navigate('/my-policies')}
                className="btn-primary w-full sm:w-auto px-12 py-5 md:px-16 md:py-7 text-[15px] md:text-[17px]"
              >
                INITIALIZE PORTAL
              </motion.button>
              <button 
                onClick={() => navigate('/calculators')} 
                className="btn-secondary w-full sm:w-auto px-10 py-5 md:px-12 md:py-7 text-[14px] md:text-[16px] backdrop-blur-md"
              >
                MARKET AUDIT
              </button>
            </div>
          </motion.div>

          {/* Stats Section */}
          <div className="mt-20 md:mt-32 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/5 pt-12 md:pt-16 relative z-10">
            {[
              { label: 'Latency', val: '42ms', icon: Zap },
              { label: 'Risk Coverage', val: '100%', icon: Shield },
              { label: 'Partners', val: '800+', icon: Globe },
              { label: 'Growth', val: '4.2x', icon: BarChart3 }
            ].map((s, i) => (
              <div key={i} className="text-center group cursor-pointer hover:scale-105 transition-transform">
                <s.icon size={18} className="mx-auto mb-3 text-[var(--accent-emerald)] opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-xl md:text-2xl font-black text-white">{s.val}</p>
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Physical Asset Section - Family Wellness */}
      <section className="relative py-32 px-6 border-t border-white/5 bg-black/40 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -40 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1 }}
           >
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 italic">FAMILY <span className="text-gradient">SYNTHESIS.</span></h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
                Eptain doesn't just manage policies; it synthesizes protection. Our 3D Family Matrix monitors wellness nodes in real-time, providing an invisible layer of enterprise-grade security for your loved ones.
              </p>
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-3xl font-black text-white italic tracking-tighter">04</p>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mt-1">SECURED NODES</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-3xl font-black text-white italic tracking-tighter">LEER</p>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mt-1">PROTECTION TIER</p>
                 </div>
              </div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2 }}
             className="relative"
           >
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-emerald)]/10 to-transparent blur-[80px]"></div>
              <img 
                src={`${baseUrl}assets/family_luxe.png`} 
                className="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] float-slow" 
                alt="Family Luxe 3D" 
              />
           </motion.div>
        </div>
      </section>

      {/* Market Ticker */}
      <div className="w-full bg-white/5 border-y border-white/10 py-10 overflow-hidden relative z-20 backdrop-blur-3xl">
        <div className="flex whitespace-nowrap animate-[marquee_50s_linear_infinite] gap-24 items-center opacity-30">
          {['APOLLO CLINICAL', 'VENTURE CAPITAL PARTNERS', 'IRDAI COMPLIANT', 'ZERO-TRUST ARCHITECTURE', '99.9% ACCURACY'].map((t, i) => (
            <div key={i} className="flex items-center gap-4 text-2xl font-black tracking-widest text-white italic">
               <Sparkles size={16} /> {t}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {['APOLLO CLINICAL', 'VENTURE CAPITAL PARTNERS', 'IRDAI COMPLIANT', 'ZERO-TRUST ARCHITECTURE', '99.9% ACCURACY'].map((t, i) => (
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
