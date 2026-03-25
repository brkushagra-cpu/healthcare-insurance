import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Zap, User, Heart, Shield } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export default function Quote() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [riskData, setRiskData] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Health', age: 30, coverage: 500000, members: 1, city: '',
    smoking: 'never', bmi: 22, familyHistory: 'none', preExisting: 'none', occupation: 'desk'
  });

  const steps = [
    { id: 1, label: 'Profile', icon: User },
    { id: 2, label: 'Health', icon: Heart },
    { id: 3, label: 'Coverage', icon: Shield },
    { id: 4, label: 'Review', icon: Check },
  ];

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));
  const goNext = async () => {
    if (step === 3) {
      try {
        const res = await fetch(`${API_URL}/risk/assess`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const d = await res.json();
        if (d.status === 'success') setRiskData(d.data);
      } catch {
        setRiskData({
          risk: { score: 15, tier: 'Preferred Low Risk', recommendation: 'Eligible for Instant 1-Hour STP Issuance.' }
        });
      }
    }
    setDirection(1); setStep(s => Math.min(s + 1, 4));
  };
  const goBack = () => { setDirection(-1); setStep(s => Math.max(s - 1, 1)); };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quote`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: formData })
      });
      const data = await res.json();
      if (data.status === 'success') {
        sessionStorage.setItem(`eptain_quote_${data.data.quoteId}`, JSON.stringify(data.data.plans));
        navigate(`/results/${data.data.quoteId}`);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[640px] mx-auto px-4">
        
        {/* Progress */}
        <div className="flex items-center justify-between mb-8 px-2">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  step > s.id ? 'bg-[var(--accent-violet)] text-white' :
                  step === s.id ? 'bg-[rgba(139,92,246,0.15)] text-[var(--accent-violet)] ring-2 ring-[var(--accent-violet)]' :
                  'bg-[var(--bg-card)] text-[var(--text-tertiary)] border border-[var(--border)]'
                }`}>
                  {step > s.id ? <Check size={16} strokeWidth={3} /> : <s.icon size={16} />}
                </div>
                <span className={`text-[11px] font-semibold ${step >= s.id ? 'text-white' : 'text-[var(--text-tertiary)]'}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-[2px] mx-3 mb-5 rounded-full transition-colors ${step > s.id ? 'bg-[var(--accent-violet)]' : 'bg-[var(--border)]'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="glass-card p-8 md:p-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction}
              initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 40 : -40, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div><h2 className="text-xl font-bold text-white">Personal Information</h2><p className="text-sm text-[var(--text-secondary)] mt-1">Basic details for your insurance profile</p></div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Insurance Type</label>
                    <select value={formData.type} onChange={e => set('type', e.target.value)} className="w-full p-3.5 input-field font-medium">
                      <option value="Health">🏥 Health Insurance</option><option value="Motor">🚗 Motor Insurance</option><option value="Life">🛡️ Term Life Insurance</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Age</label><input type="number" value={formData.age} onChange={e => set('age', +e.target.value)} className="w-full p-3.5 input-field font-semibold" /></div>
                    <div><label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Members</label><input type="number" value={formData.members} onChange={e => set('members', +e.target.value)} className="w-full p-3.5 input-field font-semibold" /></div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <div><h2 className="text-xl font-bold text-white">Health Assessment</h2><p className="text-sm text-[var(--text-secondary)] mt-1">For accurate risk scoring</p></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Smoking</label><select value={formData.smoking} onChange={e => set('smoking', e.target.value)} className="w-full p-3.5 input-field"><option value="never">Never</option><option value="former">Former</option><option value="current">Current</option></select></div>
                    <div><label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">BMI</label><input type="number" value={formData.bmi} onChange={e => set('bmi', +e.target.value)} className="w-full p-3.5 input-field font-semibold" /></div>
                  </div>
                  <div><label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Family History</label><select value={formData.familyHistory} onChange={e => set('familyHistory', e.target.value)} className="w-full p-3.5 input-field"><option value="none">None</option><option value="minor">Minor</option><option value="major">Major</option></select></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Pre-existing</label><select value={formData.preExisting} onChange={e => set('preExisting', e.target.value)} className="w-full p-3.5 input-field"><option value="none">None</option><option value="managed">Managed</option><option value="active">Active</option></select></div>
                    <div><label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Occupation</label><select value={formData.occupation} onChange={e => set('occupation', e.target.value)} className="w-full p-3.5 input-field"><option value="desk">Office</option><option value="field">Fieldwork</option><option value="hazardous">Hazardous</option></select></div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <div><h2 className="text-xl font-bold text-white">Coverage Selection</h2></div>
                  <div><label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Sum Insured</label><select value={formData.coverage} onChange={e => set('coverage', +e.target.value)} className="w-full p-3.5 input-field"><option value={500000}>₹5 Lakhs — Essential</option><option value={1000000}>₹10 Lakhs — Comprehensive</option><option value={2500000}>₹25 Lakhs — Premium</option><option value={5000000}>₹50 Lakhs — Enterprise</option></select></div>
                  <div className="bg-[var(--bg-tertiary)] rounded-xl p-5 border border-[var(--border)]">
                    <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">Estimated Premium</p>
                    <p className="text-3xl font-extrabold text-white">₹{Math.round(12000 * (formData.coverage/500000) * (formData.age/30)).toLocaleString()}<span className="text-sm text-[var(--text-tertiary)] font-medium">/year</span></p>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <div><h2 className="text-xl font-bold text-white">Review & Submit</h2></div>
                  {riskData && (
                    <div className="bg-[var(--bg-tertiary)] rounded-xl p-5 border border-[var(--border)] relative overflow-hidden group">
                      <div className="neural-scan-beam opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <p className="text-sm font-bold text-white flex items-center gap-2">
                          <Activity size={14} className="text-[var(--accent-emerald)]" />
                          AI Risk Core Assessment
                        </p>
                        <span className="badge badge-emerald text-[10px] font-black uppercase tracking-widest">{riskData.risk.tier}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden mb-3 relative z-10">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-[var(--accent-emerald)] to-[var(--accent-blue)]" initial={{ width: 0 }} animate={{ width: `${riskData.risk.score}%` }} transition={{ duration: 1.5, ease: "easeOut" }} />
                      </div>
                      <p className="text-[11px] text-[var(--text-tertiary)] font-medium leading-relaxed relative z-10">
                        <span className="text-white font-bold italic">Recommendation:</span> {riskData.risk.recommendation}
                      </p>
                    </div>
                  )}
                  <div className="space-y-2 text-sm">
                    {[['Type', formData.type], ['Age', `${formData.age} years`], ['Sum', `₹${(formData.coverage/100000).toFixed(0)} Lakhs`]].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-[var(--border)]">
                        <span className="text-[var(--text-secondary)]">{k}</span>
                        <span className="font-semibold text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
            <button onClick={goBack} className={`btn-secondary px-5 py-2.5 text-sm flex items-center gap-2 ${step === 1 ? 'invisible' : ''}`}><ArrowLeft size={14} /> Back</button>
            {step < 4 ? (
              <button onClick={goNext} className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2">Continue <ArrowRight size={14} /></button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="btn-primary px-8 py-3 text-sm flex items-center gap-2 disabled:opacity-50">
                {loading ? 'Generating...' : <><Zap size={14} /> Get My Plans</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
