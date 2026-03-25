import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Shield, Car, CheckCircle2, ArrowRight, Stethoscope, FileText, Clock } from 'lucide-react';

export default function Solutions() {
  const navigate = useNavigate();

  const solutions = [
    {
      icon: HeartPulse, title: 'Health Insurance', tag: 'Most Popular', accent: 'var(--accent-violet)',
      desc: 'Comprehensive health coverage with cashless hospitalization across 10,000+ network hospitals.',
      features: ['Cashless at 10,000+ hospitals', 'No claim bonus up to 50%', 'Day-1 coverage for 500+ procedures', 'AI-assisted claim settlement', 'Pre & post hospitalization cover', 'Annual health check-ups'],
      stat: '92%', statLabel: 'Claim Settlement', price: '₹8,499', priceLabel: '/year onwards'
    },
    {
      icon: Shield, title: 'Term Life Insurance', tag: 'High Coverage', accent: 'var(--accent-sky)',
      desc: 'Protect your family\'s financial future with industry-leading term plans at affordable premiums.',
      features: ['Coverage up to ₹2 Crore', 'Premium starting ₹490/month', 'No medical exam under 45', 'Tax benefits under 80C & 80D', 'Flexible payout options', 'Accidental death benefit'],
      stat: '₹490', statLabel: 'Per Month', price: '₹5,880', priceLabel: '/year onwards'
    },
    {
      icon: Car, title: 'Motor Insurance', tag: 'Instant Issue', accent: 'var(--accent-emerald)',
      desc: 'Comprehensive & third-party motor insurance with instant digital policy issuance.',
      features: ['Instant policy in 2 minutes', 'Cashless repairs at 5,000+ garages', 'Zero depreciation cover', '24/7 roadside assistance', 'Engine & gearbox protection', 'NCB transfer available'],
      stat: '2 min', statLabel: 'Policy Issuance', price: '₹3,299', priceLabel: '/year onwards'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-[var(--border)] mesh-gradient relative">
        <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-10">
          <p className="section-label mb-3">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 max-w-2xl">Insurance products designed<br/>for <span className="text-gradient">modern life</span></h1>
          <p className="text-[17px] text-[var(--text-secondary)] max-w-xl">AI-powered plan matching across health, life, and motor — with real-time underwriting.</p>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-5 relative z-10">
        <div className="glass-card p-5 flex flex-wrap gap-8">
          {[
            { icon: Stethoscope, label: '10,000+ Network Hospitals', color: 'var(--accent-violet)' },
            { icon: FileText, label: '2M+ Policies Issued', color: 'var(--accent-sky)' },
            { icon: Clock, label: '<60s Average Quote Time', color: 'var(--accent-emerald)' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 text-[13px]">
              <s.icon size={16} style={{ color: s.color }} />
              <span className="text-[var(--text-secondary)] font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Cards */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 space-y-5">
          {solutions.map((sol, i) => (
            <motion.div key={sol.title} className="glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `rgba(${sol.accent === 'var(--accent-violet)' ? '139,92,246' : sol.accent === 'var(--accent-sky)' ? '56,189,248' : '52,211,153'},0.15)` }}>
                      <sol.icon size={20} style={{ color: sol.accent }} />
                    </div>
                    <div>
                      <h2 className="text-[19px] font-bold text-white">{sol.title}</h2>
                      <span className="badge badge-violet text-[10px] mt-0.5">{sol.tag}</span>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{sol.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                    {sol.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                        <CheckCircle2 size={14} className="text-[var(--accent-emerald)] shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => navigate('/quote')} className="btn-primary px-6 py-2.5 text-[14px] flex items-center gap-2">Get Quote <ArrowRight size={14} /></button>
                </div>
                <div className="lg:w-56 border-t lg:border-t-0 lg:border-l border-[var(--border)] p-8 flex flex-col items-center justify-center text-center gap-4" style={{ background: `rgba(${sol.accent === 'var(--accent-violet)' ? '139,92,246' : sol.accent === 'var(--accent-sky)' ? '56,189,248' : '52,211,153'},0.05)` }}>
                  <div>
                    <p className="text-[32px] font-bold text-white">{sol.stat}</p>
                    <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)]">{sol.statLabel}</p>
                  </div>
                  <div className="w-full h-px bg-[var(--border)]"></div>
                  <div>
                    <p className="text-[20px] font-bold" style={{ color: sol.accent }}>{sol.price}</p>
                    <p className="text-[11px] text-[var(--text-tertiary)]">{sol.priceLabel}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
