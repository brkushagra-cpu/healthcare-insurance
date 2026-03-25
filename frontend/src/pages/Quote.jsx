import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function Quote() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ type: 'Health', age: 25, coverage: 500000, members: 1, city: '' });
  const [livePrice, setLivePrice] = useState(0);

  useEffect(() => {
    if (step === 2) {
      fetch(`${API_URL}/calculate-premium`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, planId: 'plan_001' }) 
      })
      .then(r => r.json())
      .then(d => {
        if(d.status === "success") setLivePrice(d.data.premium);
      })
      .catch(console.error);
    }
  }, [formData.age, formData.coverage, step]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: formData })
      });
      const data = await res.json();
      if(data.status === 'success') {
        const quoteId = data.data.quoteId;
        sessionStorage.setItem(`eptain_quote_${quoteId}`, JSON.stringify(data.data.plans));
        navigate(`/results/${quoteId}`);
      } else {
        alert("Error: " + data.error?.message);
      }
    } catch (err) {
       console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12 animate-fade-in relative z-10">
      
      {/* Progress Bar */}
      <div className="flex justify-center mb-10 items-center">
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_#22d3ee]' : 'glass text-slate-500'}`}>1</div>
         <div className={`w-16 h-1 ${step >= 2 ? 'bg-cyan-500 shadow-[0_0_15px_#22d3ee]' : 'bg-slate-800'}`}></div>
         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_#22d3ee]' : 'glass text-slate-500'}`}>2</div>
      </div>

      <div className="glass-card p-10 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-500">
         {/* Decorative glow */}
         <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl"></div>
         
         {step === 1 && (
           <div className="animate-slide-up relative z-10 space-y-6">
             <div className="mb-8">
               <h3 className="text-3xl font-black text-slate-100 tracking-tight">Intelligence Parameters</h3>
               <p className="text-slate-400 font-medium">Input baseline metrics for deep algorithmic scanning.</p>
             </div>
             
             <div>
                <label className="block text-xs font-bold text-cyan-400 mb-2 tracking-widest uppercase">Target Vector</label>
                <select 
                  onChange={(e) => setFormData({...formData, type: e.target.value})} 
                  className="w-full p-4 input-neon rounded-2xl appearance-none font-semibold text-lg"
                >
                  <option value="Health">🏥 Health Cover</option>
                  <option value="Motor">🚗 Motor Shield</option>
                  <option value="Life">🛡️ Term Life</option>
                </select>
             </div>
             
             <div className="flex gap-4">
                <div className="w-1/2">
                   <label className="block text-xs font-bold text-cyan-400 mb-2 tracking-widest uppercase">Eldest Member</label>
                   <input type="number" onChange={(e) => setFormData({...formData, age: Number(e.target.value)})} defaultValue={25} className="w-full p-4 input-neon rounded-2xl font-bold text-xl placeholder-slate-600" placeholder="Age" />
                </div>
                <div className="w-1/2">
                   <label className="block text-xs font-bold text-cyan-400 mb-2 tracking-widest uppercase">Family Size</label>
                   <input type="number" onChange={(e) => setFormData({...formData, members: Number(e.target.value)})} defaultValue={1} className="w-full p-4 input-neon rounded-2xl font-bold text-xl placeholder-slate-600" placeholder="Count" />
                </div>
             </div>
             
             <button onClick={() => setStep(2)} className="w-full mt-4 btn-glow p-4 rounded-2xl text-white font-black text-lg tracking-wide group flex items-center justify-center gap-2">
               Compute Risk Base <span className="group-hover:translate-x-1 transition-transform">➔</span>
             </button>
           </div>
         )}

         {step === 2 && (
           <div className="animate-slide-up relative z-10 space-y-6">
             <div className="mb-4">
               <h3 className="text-3xl font-black text-slate-100 tracking-tight">Live Actuarial Output</h3>
               <p className="text-slate-400 font-medium">Streaming pricing metrics via proprietary engines.</p>
             </div>
             
             <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl p-8 mb-6 text-center shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]">
               <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Streaming Estimate
               </div>
               <div className="text-6xl font-black text-slate-100 tabular-nums transition-all duration-300">
                 <span className="text-3xl text-slate-500 font-normal">₹</span>{livePrice || 899}
               </div>
             </div>
             
             <div>
                <label className="block text-xs font-bold text-purple-400 mb-2 tracking-widest uppercase">Required Coverage Limit</label>
                <select onChange={(e) => setFormData({...formData, coverage: Number(e.target.value)})} className="w-full p-4 input-neon rounded-2xl font-bold text-lg text-slate-200">
                  <option value="500000">₹5 Lakhs Base Matrix</option>
                  <option value="1000000">₹10 Lakhs Advanced</option>
                  <option value="2500000" className="text-purple-400">₹25 Lakhs Elite Protection</option>
                </select>
             </div>
             
             <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="w-1/3 glass p-4 rounded-2xl font-bold text-slate-400 hover:text-white transition-colors">Abort</button>
                <button 
                  onClick={handleSubmit} disabled={loading} 
                  className="w-2/3 btn-glow rounded-2xl text-white font-black text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <span className="animate-pulse">Parsing...</span> : <>Full Scan <Zap size={18} className="fill-white"/></>}
                </button>
             </div>
           </div>
         )}
      </div>
    </div>
  );
}
