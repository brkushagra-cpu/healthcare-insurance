import React from 'react';
import { CheckCircle2, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function PlanCard({ plan, rank, quoteId }) {
  const navigate = useNavigate();

  const handleSelect = async () => {
    try {
      const res = await fetch(`${API_URL}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId,
          user: { name: "Agentic Output", phone: "9876543210", email: "demo@eptain.com" },
          selectedPlanId: plan.planId
        })
      });
      const data = await res.json();
      if(data.status === 'success') {
        navigate(`/checkout/${data.data.leadId}`);
      }
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className={`glass-card p-8 rounded-3xl flex flex-col relative transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.2)] group hover:border-cyan-500/30 ${rank === 0 ? 'border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.1)]' : ''}`}>
      
      {rank === 0 && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-6 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.5)] border border-pink-400 z-10">
          Neural Recommended
        </div>
      )}
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-100 tracking-tight leading-none group-hover:text-cyan-400 transition-colors">{plan.name}</h3>
          <p className="text-slate-500 font-bold text-[10px] mt-2 uppercase tracking-[0.2em]">{plan.insurer}</p>
        </div>
        <div className="glass px-2 py-1 rounded-md border border-white/5 flex items-center gap-1 text-xs font-black text-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]">
          ★ {plan.score?.finalScore || 9.0}
        </div>
      </div>
      
      <div className="text-5xl font-black text-slate-100 my-2 tracking-tighter tabular-nums drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        <span className="text-2xl text-slate-500 font-normal">₹</span>{plan.premium}<span className="text-sm font-bold text-slate-600 tracking-widest uppercase">/mo</span>
      </div>
      
      {plan.whyRecommended && plan.whyRecommended.length > 0 && (
        <div className="bg-slate-900/60 border border-purple-500/20 rounded-2xl p-4 my-6 shadow-inner relative overflow-hidden group-hover:border-purple-500/40 transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500"></div>
          <div className="flex items-center gap-2 mb-1.5">
             <Cpu size={14} className="text-purple-400" />
             <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">AI Reasoning Layer</p>
          </div>
          <p className="text-sm font-semibold text-slate-300 leading-snug">{plan.whyRecommended[0]}</p>
        </div>
      )}

      <div className="flex-1 mb-8 space-y-4">
        {plan.features.map((f, j) => (
          <div key={j} className="flex gap-3 text-slate-300 text-sm items-start font-medium">
            <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" /> 
            <span className="leading-tight">{f}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleSelect} 
        className={`w-full py-4 rounded-2xl font-black tracking-widest uppercase text-xs transition-all shadow-lg active:scale-95 ${
          rank === 0 
          ? 'btn-glow text-white' 
          : 'glass bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400'
        }`}
      >
        Execute Contract
      </button>
    </div>
  );
}
