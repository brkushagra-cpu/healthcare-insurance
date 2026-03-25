import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, Star, CheckCircle2, X, Sparkles, Shield } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export default function Compare() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [sort, setSort] = useState('rating');
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [budget, setBudget] = useState(25000);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/compare?sort=${sort}`)
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setPlans(d.data.plans); })
      .catch(() => {});
  }, [sort]);

  useEffect(() => {
    fetch(`${API_URL}/compare/recommend`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, budget, priorities: ['high-claim-ratio', 'best-hospitals'] })
    }).then(r => r.json()).then(d => { if (d.status === 'success') setRecommendation(d.data); }).catch(() => {});
  }, [budget]);

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev);

  const accentColors = ['var(--accent-violet)', 'var(--accent-sky)', 'var(--accent-emerald)', 'var(--accent-rose)', 'var(--accent-amber)', 'var(--accent-indigo)'];
  const accentRGBs = ['139,92,246', '56,189,248', '52,211,153', '244,63,94', '251,191,36', '99,102,241'];

  const getInsurerIndex = (insurer) => {
    const map = { 'HDFC Ergo': 0, 'ICICI Lombard': 1, 'Star Health': 2, 'Bajaj Allianz': 3, 'Niva Bupa': 4, 'Tata AIG': 5 };
    return map[insurer] ?? 0;
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--bg-primary)] relative border-b border-[var(--border)] overflow-hidden min-h-[220px] flex items-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/assets/hospital_network.png" className="w-full h-full object-cover" alt="Network" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/90 to-transparent z-10"></div>
        <div className="max-w-[1200px] mx-auto px-6 py-16 relative z-20">
          <div className="flex items-center gap-2 text-[var(--accent-orange)] text-[12px] font-black uppercase tracking-widest mb-3">
            <Sparkles size={14} /> AI-POWERED BENCHMARKING
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3 leading-[1.1]">Analyze 60+ Plans. <br /><span className="text-gradient">Find Your Edge.</span></h1>
          <p className="text-[17px] text-[var(--text-secondary)] max-w-lg font-medium">Our deterministic AI parses millions of data points to find your family the perfect match with zero hidden terms.</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* AI Recommendation */}
        {recommendation?.recommended && (
          <motion.div className="light-section glass-card p-6 mb-8 flex flex-col md:flex-row items-start md:items-center gap-5 relative overflow-hidden shadow-2xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-amber)] to-transparent"></div>
            <div className="w-14 h-14 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center shrink-0 shadow-lg border border-[var(--border)]">
              <Sparkles size={24} className="text-[var(--accent-amber)]" />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-black text-[var(--accent-amber)] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Shield size={12}/> AI PRECISE RECOMMENDATION
              </p>
              <p className="text-[20px] font-black text-[var(--text-dark)]">{recommendation.recommended.name} <span className="text-[14px] font-medium text-[var(--text-tertiary)]">by {recommendation.recommended.insurer}</span></p>
              <p className="text-[14px] text-[var(--text-secondary)] font-medium">₹{recommendation.recommended.premium?.toLocaleString()}/yr • {recommendation.recommended.claimRatio}% claim ratio • {recommendation.recommended.cashlessHospitals?.toLocaleString()} hospitals</p>
            </div>
            <button onClick={() => navigate('/quote')} className="btn-primary px-7 py-3 text-[14px] shrink-0 shadow-lg">Activate Plan Now</button>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5">
            <ArrowUpDown size={14} className="text-[var(--text-tertiary)]" />
            <select value={sort} onChange={e => setSort(e.target.value)} className="text-[13px] font-medium text-white bg-transparent outline-none">
              <option value="rating">Top Rated</option>
              <option value="premium">Lowest Premium</option>
              <option value="coverage">Highest Coverage</option>
              <option value="claim">Best Claim Ratio</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5">
            <span className="text-[13px] text-[var(--text-secondary)]">Budget:</span>
            <input type="range" min="5000" max="50000" step="1000" value={budget} onChange={e => setBudget(+e.target.value)} className="w-24 accent-[var(--accent-violet)]" />
            <span className="text-[13px] font-bold text-white">₹{budget.toLocaleString()}</span>
          </div>
          {selected.length >= 2 && (
            <button onClick={() => setShowCompare(true)} className="btn-primary px-5 py-2.5 text-[13px]">Compare {selected.length} Plans</button>
          )}
        </div>

        {/* Plan Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
          {plans.map((plan, i) => {
            const idx = getInsurerIndex(plan.insurer);
            const rgb = accentRGBs[idx];
            const color = accentColors[idx];
            return (
              <motion.div key={plan.id} className={`glass-card overflow-hidden transition-colors ${selected.includes(plan.id) ? 'border-[var(--accent-violet)]' : ''}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                {/* Insurer header */}
                <div className="px-5 py-3 flex items-center justify-between border-b border-[var(--border)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.5), transparent)` }}></div>
                  <span className="text-[12px] font-bold" style={{ color }}>{plan.insurer}</span>
                  <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]"><Star size={11} className="text-[var(--accent-amber)]" /> {plan.rating}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-0.5">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-[22px] font-extrabold text-[var(--text-primary)]">₹{plan.premium.toLocaleString()}</span>
                    <span className="text-[11px] text-[var(--text-tertiary)] font-medium">/year</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
                    <div className="bg-[var(--bg-secondary)] rounded-lg px-3 py-2 border border-[var(--border)]"><span className="text-[var(--text-tertiary)]">Coverage</span><p className="font-bold text-[var(--text-primary)]">₹{(plan.coverage/100000).toFixed(0)}L</p></div>
                    <div className="bg-[var(--bg-secondary)] rounded-lg px-3 py-2 border border-[var(--border)]"><span className="text-[var(--text-tertiary)]">Claim Ratio</span><p className="font-bold text-[var(--text-primary)]">{plan.claimRatio}%</p></div>
                    <div className="bg-[var(--bg-secondary)] rounded-lg px-3 py-2 border border-[var(--border)]"><span className="text-[var(--text-tertiary)]">Hospitals</span><p className="font-bold text-[var(--text-primary)]">{plan.cashlessHospitals.toLocaleString()}</p></div>
                    <div className="bg-[var(--bg-secondary)] rounded-lg px-3 py-2 border border-[var(--border)]"><span className="text-[var(--text-tertiary)]">NCB</span><p className="font-bold text-[var(--text-primary)]">{plan.renewalBonus}</p></div>
                  </div>
                  <div className="space-y-1.5 mb-4">
                    {plan.features.slice(0, 3).map((f, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]"><CheckCircle2 size={11} className="text-[var(--accent-emerald)] shrink-0" />{f}</div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggle(plan.id)} className={`flex-1 py-2 rounded-xl text-[12px] font-semibold transition-colors ${selected.includes(plan.id) ? 'bg-[var(--accent-violet)] text-white' : 'bg-[var(--bg-tertiary)] text-white hover:bg-[var(--border-hover)]'}`}>
                      {selected.includes(plan.id) ? '✓ Selected' : 'Compare'}
                    </button>
                    <button onClick={() => navigate('/quote')} className="btn-primary px-4 py-2 text-[12px]">Buy</button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Modal */}
      <AnimatePresence>
        {showCompare && (
          <motion.div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCompare(false)}>
            <motion.div className="bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] w-full max-w-4xl max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()} initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Side-by-Side Comparison</h2>
                <button onClick={() => setShowCompare(false)} className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg text-[var(--text-secondary)]"><X size={18} /></button>
              </div>
              <div className="grid" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
                {selected.map(id => {
                  const p = plans.find(pl => pl.id === id);
                  if (!p) return null;
                  const idx = getInsurerIndex(p.insurer);
                  return (
                    <div key={id} className="border-r last:border-r-0 border-[var(--border)] px-4">
                      <div className="glass-card p-3 text-center mb-4">
                        <p className="text-[11px]" style={{ color: accentColors[idx] }}>{p.insurer}</p>
                        <p className="font-bold text-white">{p.name}</p>
                      </div>
                      {[['Premium', `₹${p.premium.toLocaleString()}/yr`], ['Coverage', `₹${(p.coverage/100000)}L`], ['Claim Ratio', `${p.claimRatio}%`], ['Hospitals', p.cashlessHospitals.toLocaleString()], ['Waiting', p.waitingPeriod], ['NCB', p.renewalBonus], ['Rating', `⭐ ${p.rating}`]].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-[12px] py-2 border-b border-[var(--border)]">
                          <span className="text-[var(--text-tertiary)]">{k}</span>
                          <span className="font-semibold text-white">{v}</span>
                        </div>
                      ))}
                      <button onClick={() => navigate('/quote')} className="btn-primary w-full py-2.5 text-[12px] mt-4">Select Plan</button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
