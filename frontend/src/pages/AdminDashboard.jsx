import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, ShieldCheck, HeartPulse } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/analytics`)
      .then(res => res.json())
      .then(d => { if (d.status === 'success') setData(d.data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="w-8 h-8 border-2 border-[var(--accent-violet)]/20 border-t-[var(--accent-violet)] animate-spin rounded-full"></div>
    </div>
  );

  const kpis = [
    { icon: Activity, label: 'Claims STP Rate', value: '94.2%', change: 'IRDAI Target: 90%+', color: 'var(--accent-emerald)', rgb: '52,211,153' },
    { icon: Users, label: 'Live Risk Evaluations', value: data?.metrics.totalLeads || 124, change: '+8.3%', color: 'var(--accent-sky)', rgb: '56,189,248' },
    { icon: HeartPulse, label: 'Age 65+ Policies', value: '1,204', change: 'Zero Entry Barrier', color: 'var(--accent-violet)', rgb: '139,92,246' },
    { icon: ShieldCheck, label: 'Fraud Detection Rate', value: '99.8%', change: 'Zero-Trust Active', color: 'var(--accent-rose)', rgb: '244,63,94' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Mission Control</h1>
              <p className="text-[14px] text-[var(--text-secondary)]">Real-time platform analytics</p>
            </div>
            <span className="badge badge-emerald text-xs">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-[var(--accent-emerald)] opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-[var(--accent-emerald)]"></span></span>
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} className="glass-card p-6 relative overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${kpi.rgb},0.5), transparent)` }}></div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `rgba(${kpi.rgb},0.12)` }}>
                  <kpi.icon size={16} style={{ color: kpi.color }} />
                </div>
                <span className="text-[12px] font-semibold text-[var(--accent-emerald)]">{kpi.change}</span>
              </div>
              <p className="text-[26px] font-bold text-white mb-0.5">{kpi.value}</p>
              <p className="text-[12px] text-[var(--text-tertiary)]">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-bold text-white">Revenue Pipeline</h3>
                <p className="text-[12px] text-[var(--text-tertiary)]">Last 30 days</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">₹4,52,300</p>
                <p className="text-[12px] text-[var(--accent-emerald)] font-semibold">+18.2%</p>
              </div>
            </div>
            <svg viewBox="0 0 400 100" width="100%" height="140" className="overflow-visible">
              <defs>
                <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-violet)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="revLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-violet)" />
                  <stop offset="100%" stopColor="var(--accent-rose)" />
                </linearGradient>
              </defs>
              <motion.path d="M0,80 L30,72 L60,75 L90,55 L120,60 L150,40 L180,45 L210,30 L240,35 L270,20 L300,25 L330,15 L360,18 L400,10 L400,100 L0,100Z" fill="url(#revFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
              <motion.path d="M0,80 L30,72 L60,75 L90,55 L120,60 L150,40 L180,45 L210,30 L240,35 L270,20 L300,25 L330,15 L360,18 L400,10" fill="none" stroke="url(#revLine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 1.5 }} />
              {[[270,20],[330,15],[400,10]].map(([cx,cy],j) => (
                <motion.circle key={j} cx={cx} cy={cy} r="4" fill="var(--bg-card)" stroke="var(--accent-violet)" strokeWidth="2.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + j*0.15 }} />
              ))}
            </svg>
          </div>

          {/* Product Mix */}
          <div className="glass-card p-6">
            <h3 className="text-[15px] font-bold text-white mb-5">Product Mix</h3>
            <div className="space-y-5">
              {[
                { label: 'Health', pct: 58, color: 'var(--accent-violet)' },
                { label: 'Term Life', pct: 24, color: 'var(--accent-sky)' },
                { label: 'Motor', pct: 18, color: 'var(--accent-emerald)' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[13px] mb-1.5">
                    <span className="text-[var(--text-secondary)]">{item.label}</span>
                    <span className="text-white font-bold">{item.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: item.color }} initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ delay: 0.5, duration: 0.8 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-[var(--border)]">
              <p className="text-[11px] text-[var(--text-tertiary)] font-semibold uppercase tracking-wider mb-1">Total Premium Value</p>
              <p className="text-2xl font-bold text-white">₹61,40,937</p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-[15px] font-bold text-white mb-5">Recent Activity</h3>
          <div className="space-y-3">
            {(data?.recentActivity || [
              { type: 'Quote', detail: 'Health Insurance — ₹10L, Age 28', id: 'Q-7842', time: '2 min ago' },
              { type: 'Lead', detail: 'AI advisor lead captured', id: 'L-3291', time: '5 min ago' },
              { type: 'Quote', detail: 'Motor — Comprehensive, Delhi', id: 'Q-7841', time: '8 min ago' },
              { type: 'Lead', detail: 'Enterprise demo — Bajaj Allianz', id: 'L-3290', time: '12 min ago' },
            ]).map((act, i) => (
              <motion.div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.05 }}>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${act.type === 'Lead' ? 'bg-[rgba(139,92,246,0.15)] text-[var(--accent-violet)]' : 'bg-[rgba(52,211,153,0.15)] text-[var(--accent-emerald)]'}`}>{act.type}</span>
                  <p className="text-[13px] text-[var(--text-secondary)]">{act.detail}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 sm:mt-0 text-[11px] text-[var(--text-tertiary)]">
                  <code className="bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border)] font-mono text-[10px]">{act.id}</code>
                  <span>{act.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
