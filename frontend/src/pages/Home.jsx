import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Activity } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col pt-8 pb-20 animate-fade-in text-slate-100">
      
      {/* Dynamic Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 min-h-[70vh]">
        
        {/* Left Copy Layer */}
        <div className="flex-1 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-cyan-500/30 text-cyan-400 text-sm font-bold tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span>
            NEURAL ENGINE ONLINE
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
            AI-Powered <br/>
            <span className="text-gradient">Health Protection</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-medium max-w-xl leading-relaxed">
            Smarter Plans. Faster Decisions. Let our deterministic AI map your risk profile against thousands of policies in exactly 60 seconds.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-6">
            <button 
              onClick={() => navigate('/quote')} 
              className="btn-glow text-white font-black py-5 px-10 rounded-2xl text-lg flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Generate Smart Quote <Zap className="fill-white" size={20} />
            </button>
            <button 
              className="glass px-8 py-5 rounded-2xl text-slate-300 font-bold hover:text-white hover:bg-white/10 transition w-full sm:w-auto text-center border border-white/10"
            >
              How it works
            </button>
          </div>
          
          {/* Trust Hooks */}
          <div className="pt-8 flex items-center gap-6 text-sm font-semibold text-slate-400">
             <div className="flex items-center gap-2"><ShieldCheck className="text-green-400" size={18}/> 95% Claim Success</div>
             <div className="flex items-center gap-2"><Activity className="text-purple-400" size={18}/> IRDAI Approved Algorithms</div>
          </div>
        </div>
        
        {/* Right 3D Visual Layer */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-xl animate-float">
          {/* Main Floating Glass Panel */}
          <div className="glass-card p-8 rounded-3xl w-full border border-white/20 shadow-[-20px_20px_60px_rgba(0,0,0,0.5)] relative z-20">
             <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
               <h3 className="text-xl font-bold text-slate-200 tracking-wide">Risk Assessment</h3>
               <div className="w-12 h-6 bg-cyan-500/20 rounded-full flex items-center p-1 border border-cyan-500/50">
                 <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
               </div>
             </div>
             
             <div className="space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-sm font-medium"><span className="text-slate-400">Profile Confidence</span><span className="text-cyan-400">98.4%</span></div>
                 <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[98%]"></div></div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-sm font-medium"><span className="text-slate-400">Actuarial Match</span><span className="text-purple-400">Elite Tier</span></div>
                 <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[85%] animate-pulse"></div></div>
               </div>
             </div>
             
             <div className="mt-10 p-4 bg-slate-900/50 rounded-xl border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center border-2 border-slate-900 shadow-lg"><ShieldCheck size={20} className="text-white"/></div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status</div>
                  <div className="text-lg font-black text-white">Coverage Verified</div>
                </div>
             </div>
          </div>
          
          {/* Decorative BackPanels */}
          <div className="absolute top-10 -right-8 w-full h-full glass rounded-3xl z-10 border border-purple-500/20 bg-purple-900/10 rotate-3"></div>
          <div className="absolute top-20 -left-6 w-full h-full glass rounded-3xl z-0 border border-blue-500/20 bg-blue-900/10 -rotate-3 blur-[2px]"></div>
        </div>
        
      </div>
      
    </div>
  );
}
