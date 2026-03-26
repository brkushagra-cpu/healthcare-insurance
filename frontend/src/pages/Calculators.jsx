import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sliders, IndianRupee, Heart, Users, Shield, ChevronDown, TrendingDown, Lock, Activity } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export default function Calculators() {
  const [tab, setTab] = useState('premium');
  const [isScanning, setIsScanning] = useState(false);
  const [pForm, setPForm] = useState({ age: 30, coverage: 1000000, members: 1, type: 'Health', tenure: 1 });
  const [pResult, setPResult] = useState(null);
  const baseUrl = import.meta.env.BASE_URL || '/';

  // Tax calc state
  const [tForm, setTForm] = useState({ premium: 12000, age: 30, parentsPremium: 0, parentsAge: 55, regime: 'old' });
  const [tResult, setTResult] = useState(null);

  const calcPremium = async () => {
    setIsScanning(true);
    setPResult(null);
    // Simulate high-fidelity AI processing
    await new Promise(r => setTimeout(r, 2500));
    
    const res = await fetch(`${API_URL}/user/calculator/premium`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pForm)
    });
    const d = await res.json();
    if (d.status === 'success') {
      setPResult(d.data);
      setIsScanning(false);
    }
  };

  const calcTax = async () => {
    const res = await fetch(`${API_URL}/user/calculator/tax`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tForm)
    });
    const d = await res.json();
    if (d.status === 'success') setTResult(d.data);
  };

  return (
    <div className="min-h-screen bg-prism-dark pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4 italic">
            Precision <span className="text-gradient">Diagnostics.</span>
          </h1>
          <p className="text-[17px] text-[var(--text-secondary)] font-medium max-w-xl">
            Deterministic risk modeling for enterprise-grade financial protection.
          </p>
        </div>

        {/* Diagnostic Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl w-fit mb-12">
          {[{ id: 'premium', label: 'PREMIUM FORECAST', icon: Calculator }, { id: 'tax', label: 'TAX OPTIMIZATION', icon: TrendingDown }].map(t => (
            <button 
              key={t.id} 
              onClick={() => setTab(t.id)} 
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-[11px] font-black tracking-[0.2em] transition-all ${tab === t.id ? 'bg-[var(--accent-emerald)] text-[var(--bg-primary)] shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              <t.icon size={14} />{t.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Console Area */}
          <div className="lg:col-span-12 prismatic-glass p-12 border-white/20 relative overflow-hidden flex flex-col lg:flex-row gap-16">
            
            {/* 3D Console Graphic */}
            <div className="hidden lg:block absolute top-[-10%] right-[-10%] w-[450px] opacity-20 pointer-events-none">
              <img src={`${baseUrl}assets/clinical_matrix.png`} alt="Diagnostic Console" className="float-slow" />
            </div>

            {/* Input Panel */}
            <div className="lg:w-1/2 relative z-10">
              <h2 className="text-[13px] font-black text-[var(--accent-emerald)] uppercase tracking-[0.4em] mb-10 flex items-center gap-3">
                <Activity size={18} className="animate-pulse" /> INPUT PARAMETERS
              </h2>
              
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="col-span-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Asset Verification</label>
                   <select value={pForm.type} onChange={e => setPForm(p => ({ ...p, type: e.target.value }))} className="w-full input-field py-4 font-black">
                     <option value="Health">Human Health Matrix</option>
                     <option value="Life">Term Life Protocol</option>
                   </select>
                </div>
                
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Age Matrix: <span className="text-[var(--accent-emerald)]">{pForm.age}y</span></label>
                   <input type="range" min="18" max="65" value={pForm.age} onChange={e => setPForm(p => ({ ...p, age: +e.target.value }))} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-[var(--accent-emerald)] cursor-pointer" />
                </div>

                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Entity Count: <span className="text-[var(--accent-emerald)]">{pForm.members}</span></label>
                   <input type="range" min="1" max="6" value={pForm.members} onChange={e => setPForm(p => ({ ...p, members: +e.target.value }))} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-[var(--accent-emerald)] cursor-pointer" />
                </div>

                <div className="col-span-2">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Protection Depth</label>
                   <div className="grid grid-cols-3 gap-3">
                     {[500000, 1000000, 5000000].map(v => (
                       <button 
                        key={v}
                        onClick={() => setPForm(p => ({ ...p, coverage: v }))}
                        className={`py-3 rounded-xl border text-[11px] font-black transition-all ${pForm.coverage === v ? 'bg-[var(--accent-emerald)] text-[var(--bg-primary)] border-[var(--accent-emerald)]' : 'bg-white/5 border-white/10 text-slate-400'}`}
                       >
                         ₹{v/100000}L
                       </button>
                     ))}
                   </div>
                </div>
              </div>

              <button onClick={calcPremium} className="btn-primary w-full py-6 text-[15px] shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                PROCESS ESTIMATION
              </button>
            </div>

            {/* Results Display Panel */}
            <div className="lg:w-1/2 flex flex-col justify-center items-center text-center relative z-10 border-l border-white/10 pl-16 min-h-[500px]">
              {isScanning && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg-primary)]/40 backdrop-blur-md rounded-[var(--radius-lg)]">
                  <div className="neural-scan-beam"></div>
                  <img src={`${baseUrl}assets/liquid_heart.png`} className="w-16 h-16 md:w-20 md:h-20 mb-6 animate-pulse" alt="Liquid Heart" />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-[var(--accent-emerald)] font-black text-[12px] tracking-[0.5em] mt-8"
                  >
                    NEURAL MATRIX SCANNING...
                  </motion.div>
                   <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-[0.2em]">Adjudicating Clinical Matrix</p>
                </div>
              )}

              {!pResult && !isScanning ? (
                <div className="opacity-20 flex flex-col items-center">
                  <Activity size={64} className="mb-6 stroke-[1]" />
                  <p className="text-[11px] font-black tracking-widest uppercase">Awaiting Matrix Synthesis...</p>
                </div>
              ) : pResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <p className="text-[11px] font-black text-[var(--accent-emerald)] uppercase tracking-[0.5em] mb-4">OPTIMIZED ANNUAL PREMIUM</p>
                  <div className="text-8xl font-black text-white tracking-tighter mb-8 glow-emerald">
                    ₹{Number(pResult.totalPremium).toLocaleString()}
                  </div>
                  
                  {/* Glass Gauge Mockup */}
                  <div className="w-[300px] h-[100px] border border-white/10 rounded-[40px] relative overflow-hidden bg-white/5 mb-10 flex items-center justify-center">
                    <div className="refract-beam"></div>
                    <div className="flex gap-2 items-end">
                      {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          className="w-4 bg-[var(--accent-emerald)]/20 rounded-t-sm"
                        />
                      ))}
                    </div>
                    <p className="absolute text-[9px] font-black text-slate-400 uppercase tracking-widest">Risk Analysis: SECURE</p>
                  </div>

                  <div className="flex gap-8 justify-center">
                    <div className="text-center">
                      <p className="text-[var(--accent-emerald)] font-black text-xl">LOW</p>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Premium Score</p>
                    </div>
                    <div className="w-[1px] h-full bg-white/10"></div>
                    <div className="text-center">
                      <p className="text-white font-black text-xl">98%</p>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Savings Potential</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
