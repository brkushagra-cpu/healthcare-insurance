import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Clock, ChevronRight, RefreshCw, Activity, Zap, CheckCircle2, Download, BarChart3, Globe } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export default function MyPolicies() {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [summary, setSummary] = useState(null);
  const [tab, setTab] = useState('policies');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/user/policies`)
      .then(r => r.json())
      .then(d => { 
        if (d.status === 'success' && d.data) { 
          setPolicies(Array.isArray(d.data.policies) ? d.data.policies : []); 
          setSummary(d.data.summary || null); 
        } 
      })
      .catch((err) => {
        console.error("Portal Data Fetch Error:", err);
      });
  }, []);

  // Safe formatting helpers
  const formatINR = (val) => {
    if (val === undefined || val === null) return "0";
    return Number(val).toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-prism-dark pt-32 pb-20 px-6 matrix-grid text-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Command Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/20 text-[var(--accent-emerald)] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
               <Activity size={12} className="animate-pulse" /> SYSTEM STATUS: OPERATIONAL
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Mission <span className="text-gradient">Control.</span></h1>
          </motion.div>
          <div className="flex gap-4">
             <button className="btn-secondary px-6 py-3 text-[11px] border-[var(--accent-emerald)]/30 text-[var(--accent-emerald)] hover:bg-[var(--accent-emerald)]/10 transition-colors">
               <RefreshCw size={14} className="mr-2 inline" /> FORCE RESYNC
             </button>
             <button className="btn-primary px-8 py-3 text-[11px] shadow-none">EXPORT AUDIT</button>
          </div>
        </div>

        {/* High-Density Command Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          
          {/* Circular Protection Gauge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 prismatic-glass p-10 border-white/10 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[var(--accent-emerald)]/30 transition-all"
          >
             <div className="absolute top-4 left-6 text-[11px] font-black text-slate-500 tracking-[0.3em] uppercase opacity-40">Portfolio Synthesis x85</div>
             <div className="relative w-64 h-64 mb-6">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                 <motion.circle 
                  cx="128" cy="128" r="110" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray="690" strokeDashoffset="103"
                  className="text-[var(--accent-emerald)] glow-emerald" 
                  initial={{ strokeDashoffset: 690 }} 
                  animate={{ strokeDashoffset: 103 }} 
                  transition={{ duration: 2.5, ease: "easeOut" }}
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-7xl font-black text-white leading-none">85<span className="text-2xl opacity-40">%</span></span>
                 <span className="text-[10px] font-black tracking-widest text-[var(--accent-emerald)] mt-2">SECURED</span>
               </div>
             </div>
             <p className="text-[11px] text-slate-500 font-bold text-center max-w-xs uppercase tracking-widest opacity-60 px-4">Clinical matrix synchronized to 800+ Global Nodes</p>
             <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-20 transition-opacity">
                <Shield size={200} />
             </div>
          </motion.div>

          {/* Claim Velocity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prismatic-glass p-8 border-white/10 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="text-[11px] font-black text-slate-500 tracking-[0.3em] uppercase mb-8 text-center opacity-40">CLAIM VELOCITY</div>
            <div className="flex-1 flex flex-col justify-center gap-6 relative px-2">
              {[80, 45, 95].map((w, i) => (
                <div key={i} className="h-4 bg-white/5 rounded-full relative overflow-hidden ring-1 ring-white/5">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${w}%` }} 
                    transition={{ delay: 1 + (i * 0.2), duration: 1.5 }}
                    className="h-full bg-gradient-to-r from-[var(--accent-emerald)] to-[var(--accent-violet)] relative"
                  >
                  </motion.div>
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <Zap size={48} className="text-white opacity-5 animate-pulse" />
              </div>
            </div>
            <div className="text-center mt-6">
               <p className="text-3xl font-black text-white italic tracking-tighter uppercase">02 Active</p>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-60">Live Adjudication State</p>
            </div>
          </motion.div>

          {/* Stats Cluster */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="flex-1 prismatic-glass p-6 border-white/10 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors group"
            >
               <Clock size={24} className="text-[var(--accent-violet)] mb-3 group-hover:scale-110 transition-transform" />
               <p className="text-2xl font-black text-white tracking-tighter">APRIL 14</p>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-60">NEXT SYNC CYCLE</p>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
               className="flex-1 prismatic-glass p-6 border-white/10 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors group"
            >
               <Shield size={24} className="text-[var(--accent-emerald)] mb-3 group-hover:scale-110 transition-transform" />
               <p className="text-2xl font-black text-white tracking-tighter uppercase">Elite</p>
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-60">COVERAGE TIER</p>
            </motion.div>
          </div>

        </div>

        {/* Audit Matrix */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="prismatic-glass border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
        >
          <div className="bg-white/[0.03] p-8 border-b border-white/10 flex justify-between items-center px-10">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-emerald)] to-cyan-500 flex items-center justify-center">
                   <BarChart3 size={20} className="text-[var(--bg-primary)]" />
                </div>
                <h3 className="text-[14px] font-black text-white tracking-[0.3em] uppercase">Enterprise Policy Matrix</h3>
             </div>
             <div className="flex gap-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[var(--accent-emerald)]"></div> ACTIVE: 04</span>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.01] border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                  <th className="px-10 py-8">Policy Identification</th>
                  <th className="px-10 py-8">Risk Profile</th>
                  <th className="px-10 py-8">Financial Impact</th>
                  <th className="px-10 py-8">Status</th>
                  <th className="px-10 py-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(!policies || policies.length === 0) ? (
                  <tr><td colSpan="5" className="px-10 py-32 text-center text-slate-600 font-bold uppercase tracking-[0.5em] italic">No Matrix Data Synchronized</td></tr>
                ) : policies.map((p, idx) => (
                  <tr key={p._id || idx} className="hover:bg-white/[0.03] transition-all group">
                    <td className="px-10 py-10">
                       <p className="text-white font-black text-xl tracking-tight mb-2 group-hover:text-[var(--accent-emerald)] transition-colors uppercase">{p.policyName || 'Standard Plan'}</p>
                       <div className="flex items-center gap-2 opacity-40">
                          <Globe size={12} className="text-white" />
                          <p className="text-[10px] text-white font-black tracking-widest uppercase">{p.policyNumber || 'EP-882-99'}</p>
                       </div>
                    </td>
                    <td className="px-10 py-10">
                       <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white group-hover:border-[var(--accent-emerald)]/30 transition-all uppercase">
                         <div className={`w-2 h-2 rounded-full ${p.status === 'Active' ? 'bg-[var(--accent-emerald)] glow-emerald animate-pulse' : 'bg-slate-500'}`}></div>
                         {String(p.status || 'Active').toUpperCase()}
                       </div>
                    </td>
                    <td className="px-10 py-10">
                       <p className="text-white font-black text-xl tracking-tighter">₹{formatINR(p.premium)}</p>
                       <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Sum: ₹{formatINR(p.sumInsured)}</p>
                    </td>
                    <td className="px-10 py-10">
                       <p className="text-white font-black text-[13px] tracking-widest">{p.expiryDate ? new Date(p.expiryDate).toLocaleDateString() : 'Active'}</p>
                       <p className="text-[10px] text-[var(--accent-violet)] font-black uppercase tracking-widest mt-1">AUTO-SYNC</p>
                    </td>
                    <td className="px-10 py-10 text-right">
                       <motion.button 
                         whileHover={{ scale: 1.1, x: 5 }}
                         className="p-4 rounded-2xl border border-white/10 text-white hover:bg-[var(--accent-emerald)] hover:border-[var(--accent-emerald)] hover:text-[var(--bg-primary)] transition-all"
                       >
                         <ChevronRight size={24} />
                       </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white/[0.02] p-8 text-center">
             <button className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] hover:text-white transition-colors">Load Extended Historical Audit Logs</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
