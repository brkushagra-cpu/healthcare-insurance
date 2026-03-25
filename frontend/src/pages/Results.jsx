import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';
import { Cpu } from 'lucide-react';

export default function Results() {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem(`eptain_quote_${quoteId}`);
    if(saved) {
      setPlans(JSON.parse(saved));
    } else {
      navigate('/quote');
    }
  }, [quoteId, navigate]);

  return (
    <div className="animate-fade-in py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 max-w-6xl mx-auto gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-black tracking-widest uppercase">
             <Cpu size={14}/> Actuarial Scan Complete
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-100 mb-2 tracking-tighter">AI Curated <span className="text-gradient">Matches</span></h1>
          <p className="text-slate-400 font-medium tracking-wide">
             Algorithms filtered <span className="text-cyan-400 font-bold">140+ variables</span> to rank these options for Contract <code className="bg-slate-800 px-2 py-0.5 rounded text-cyan-300">#{quoteId.slice(0, 6)}</code>
          </p>
        </div>
        <button onClick={() => navigate('/quote')} className="text-cyan-400 text-sm font-bold tracking-widest uppercase hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          ← Re-run Engine
        </button>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 max-w-[85rem] mx-auto">
        {plans.map((p, i) => (
           <PlanCard key={p.planId} plan={p} rank={i} quoteId={quoteId} />
        ))}
      </div>
    </div>
  );
}
