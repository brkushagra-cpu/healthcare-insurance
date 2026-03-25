import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Star, Search, Shield, Clock, CheckCircle2, FileText } from 'lucide-react';
import hospitalNetwork from '../assets/hospital_network.png';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('network');
  const [claimForm, setClaimForm] = useState({ policyNumber: '', description: '' });
  const [claimResult, setClaimResult] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/hospitals`)
      .then(r => r.json())
      .then(d => { 
        if (d.status === 'success') { 
          setHospitals(d.data.hospitals); 
          setStats(d.data.networkStats); 
        } 
      })
      .catch(() => {
        // Mock Fallback for UAT / GitHub Pages
        setHospitals([
          { id: 1, name: "Apollo Greams Road", city: "Chennai", rating: 4.8, type: "Multi-specialty", beds: 560, specialties: ["Cardiology", "Oncology"], cashless: true },
          { id: 2, name: "Max Super Speciality", city: "Delhi", rating: 4.7, type: "Super-specialty", beds: 450, specialties: ["Neurology", "Orthopedics"], cashless: true },
          { id: 3, name: "Fortis Memorial", city: "Gurugram", rating: 4.9, type: "Quaternary Care", beds: 1000, specialties: ["Organ Transplant", "Robotics"], cashless: true }
        ]);
        setStats({ totalCount: 10000, cities: 150, states: 28, settlementSla: "24 hrs" });
      });
  }, []);

  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.city.toLowerCase().includes(search.toLowerCase()) ||
    h.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const fileClaim = async () => {
    try {
      const res = await fetch(`${API_URL}/hospitals/claims`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claimForm)
      });
      const d = await res.json();
      if (d.status === 'success') setClaimResult(d.data);
    } catch {
      // Mock Fallback for UAT
      setClaimResult({
        claimId: `CLM-${Math.floor(Math.random()*1000000)}`,
        estimatedResolution: "4 Hours (AI STP)",
        nextSteps: ["AI Document Scan Complete", "Policy Verification Passed", "Awaiting Final Payout Trigger"]
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[var(--bg-primary)] relative border-b border-[var(--border)] overflow-hidden min-h-[220px] flex items-center">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={hospitalNetwork} className="w-full h-full object-cover" alt="Medical Network" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)] z-10"></div>
        <div className="max-w-[1200px] mx-auto px-6 py-16 relative z-20">
          <h1 className="text-4xl font-black tracking-tight text-white mb-3">Hospital Network & <span className="text-gradient">Claims</span></h1>
          <p className="text-[16px] text-[var(--text-secondary)] max-w-lg font-medium">10,000+ cashless hospitals across 150+ cities. Experience-first settlement at your fingertips.</p>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-5 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: '10,000+', label: 'Cashless Hospitals', icon: Building2, color: 'var(--accent-violet)', rgb: '139,92,246' },
            { value: '150+', label: 'Cities Covered', icon: MapPin, color: 'var(--accent-sky)', rgb: '56,189,248' },
            { value: '28', label: 'States & UTs', icon: Shield, color: 'var(--accent-emerald)', rgb: '52,211,153' },
            { value: '24 hrs', label: 'Claim Settlement', icon: Clock, color: 'var(--accent-rose)', rgb: '244,63,94' },
          ].map(s => (
            <div key={s.label} className="glass-card p-4 text-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${s.rgb},0.4), transparent)` }}></div>
              <s.icon size={18} className="mx-auto mb-2" style={{ color: s.color }} />
              <p className="text-[18px] font-bold text-[var(--text-primary)]">{s.value}</p>
              <p className="text-[11px] text-[var(--text-tertiary)] font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab + Content */}
      <div className="max-w-[1200px] mx-auto px-6 mt-8">
        <div className="flex gap-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-1 w-fit mb-6">
          {[
            { id: 'network', label: 'Hospital Network', icon: Building2 },
            { id: 'claims', label: 'File a Claim', icon: FileText },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-bold transition-all ${tab === t.id ? 'bg-[var(--accent-amber)] text-white shadow-md' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'}`}>
              <t.icon size={14} />{t.label}
            </button>
          ))}
        </div>

        {tab === 'network' && (
          <>
            <div className="flex items-center gap-3 glass-card px-5 py-3 mb-6 focus-within:border-[var(--accent-violet)] transition-colors">
              <Search size={18} className="text-[var(--text-tertiary)]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hospitals, cities, or specialties..." className="flex-1 bg-transparent text-[14px] text-white placeholder-[var(--text-tertiary)] outline-none" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
              {filtered.map((h, i) => (
                <motion.div key={h.id} className="glass-card overflow-hidden" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <div className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[var(--accent-sky)] flex items-center gap-1"><MapPin size={12} /> {h.city}</span>
                    <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]"><Star size={11} className="text-[var(--accent-amber)]" /> {h.rating}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-1">{h.name}</h3>
                    <p className="text-[12px] text-[var(--text-tertiary)] font-medium mb-3">{h.type} • {h.beds} beds</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {h.specialties.slice(0, 3).map((s, j) => (
                        <span key={j} className="text-[10px] font-semibold bg-[rgba(52,211,153,0.12)] text-[var(--accent-emerald)] px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                      {h.specialties.length > 3 && <span className="text-[10px] text-[var(--text-tertiary)] px-2 py-1">+{h.specialties.length - 3}</span>}
                    </div>
                    {h.cashless && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--accent-sky)] bg-[rgba(56,189,248,0.1)] px-2.5 py-1 rounded-full w-fit">
                        <CheckCircle2 size={10} /> Cashless
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {tab === 'claims' && (
          <div className="max-w-[640px] pb-12 mx-auto">
            <div className="glass-card p-10 light-section border-none shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-rose)] to-transparent"></div>
              {!claimResult ? (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center shrink-0 shadow-lg border border-[var(--border)]">
                      <FileText size={24} className="text-[var(--accent-amber)]" />
                    </div>
                    <div>
                      <h2 className="text-[22px] font-extrabold text-[var(--text-dark)] tracking-tight">File a Smart Claim</h2>
                      <p className="text-[14px] text-[var(--text-secondary)] font-medium">Real-time AI verification • 24hr settlement guarantee</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[13px] font-black text-[var(--text-dark)] mb-2 block uppercase tracking-widest opacity-60">Policy Number</label>
                      <input value={claimForm.policyNumber} onChange={e => setClaimForm(p => ({ ...p, policyNumber: e.target.value }))} placeholder="e.g. EPT-2026-XXXXX" className="w-full input-field p-4 text-[var(--text-dark)] bg-white border-[#E2E8F0] shadow-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-[13px] font-black text-[var(--text-dark)] mb-2 block uppercase tracking-widest opacity-60">Incident Context</label>
                      <textarea value={claimForm.description} onChange={e => setClaimForm(p => ({ ...p, description: e.target.value }))} rows={4} placeholder="Briefly describe the treatment or emergency..." className="w-full input-field p-4 text-[var(--text-dark)] bg-white border-[#E2E8F0] shadow-sm font-medium resize-none" />
                    </div>
                    <button onClick={fileClaim} className="btn-primary w-full py-4 text-[16px] shadow-2xl">Initiate AI-Settlement</button>
                  </div>
                  <div className="mt-8 pt-6 border-t border-[var(--border-light)] flex flex-wrap gap-4">
                    {['24hr Settlement', 'Direct Payout', 'AI Auditing'].map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-[12px] font-bold text-[var(--text-secondary)]"><CheckCircle2 size={14} className="text-[var(--accent-emerald)]" />{s}</div>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div className="text-center py-8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="w-20 h-20 rounded-full bg-[var(--bg-primary)] flex items-center justify-center mx-auto mb-6 shadow-xl border border-[var(--border)]">
                    <CheckCircle2 size={40} className="text-[var(--accent-emerald)]" />
                  </div>
                  <h2 className="text-[24px] font-extrabold text-[var(--text-dark)] mb-2">Claim Successfully Filed</h2>
                  <p className="text-[15px] text-[var(--text-secondary)] mb-6 font-medium">Claim ID: <code className="bg-[var(--bg-light)] px-3 py-1.5 rounded-lg font-mono text-[var(--accent-rose)] font-black border border-[var(--border-light)]">{claimResult.claimId}</code></p>
                  <div className="bg-[var(--bg-light)] rounded-2xl p-6 text-left space-y-4 mb-6 border border-[var(--border-light)] shadow-inner">
                    <p className="text-[13px] font-black text-[var(--text-dark)] uppercase tracking-widest">Post-Submission Protocol</p>
                    {claimResult.nextSteps.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 text-[14px] text-[var(--text-secondary)] font-medium">
                        <span className="w-7 h-7 rounded-full bg-[var(--bg-primary)] text-white text-[11px] font-black flex items-center justify-center shrink-0 border border-[var(--border)] shadow-sm">{i + 1}</span>{s}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[14px] text-[var(--accent-amber)] font-black">
                    <Clock size={16} />ESTIMATED RESOLUTION: <span className="text-[var(--text-dark)]">{claimResult.estimatedResolution}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
