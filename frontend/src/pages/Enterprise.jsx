import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Cpu, Lock, BarChart3, Globe, Layers, Users, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export default function Enterprise() {
  const navigate = useNavigate();

  const capabilities = [
    { icon: Cpu, title: 'AI Underwriting', desc: 'Proprietary ML models. Sub-second risk assessment with 99.2% accuracy.', color: 'var(--accent-violet)' },
    { icon: Lock, title: 'Zero-Trust Security', desc: 'HIPAA & GDPR compliant. SOC2 Type II. End-to-end encryption.', color: 'var(--accent-sky)' },
    { icon: BarChart3, title: 'Analytics Engine', desc: 'Live dashboards, cohort analysis, LTV prediction, conversion optimization.', color: 'var(--accent-emerald)' },
    { icon: Globe, title: 'Multi-Region', desc: '3 availability zones. 99.99% uptime SLA with auto-failover.', color: 'var(--accent-rose)' },
    { icon: Layers, title: 'API-First', desc: 'REST + GraphQL APIs with full OpenAPI docs. Webhook event streams.', color: 'var(--accent-amber)' },
    { icon: Users, title: 'White-Label', desc: 'Custom branding, domain mapping, SSO. Deploy as your own product.', color: 'var(--accent-indigo)' },
  ];

  const getColorRGB = (c) => {
    const map = { 'var(--accent-violet)': '139,92,246', 'var(--accent-sky)': '56,189,248', 'var(--accent-emerald)': '52,211,153', 'var(--accent-rose)': '244,63,94', 'var(--accent-amber)': '251,191,36', 'var(--accent-indigo)': '99,102,241' };
    return map[c] || '139,92,246';
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="mesh-gradient relative border-b border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 lg:py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="badge badge-violet mb-5"><Building2 size={12} /> Enterprise Platform</div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
              <span className="text-gradient">Infrastructure built for</span><br/>
              <span className="text-white">insurance at scale.</span>
            </h1>
            <p className="text-[17px] text-[var(--text-secondary)] mb-8 max-w-xl">Eptain powers operations for carriers, brokers, and insurtechs. 50,000+ quotes daily with sub-200ms response times.</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={() => navigate('/quote')} className="btn-primary px-7 py-3 text-[15px] flex items-center gap-2">Request Demo <ArrowRight size={14} /></button>
              <button onClick={() => navigate('/admin')} className="btn-secondary px-7 py-3 text-[15px]">View Dashboard</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-[var(--border)] py-5">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {['HDFC Ergo', 'ICICI Lombard', 'Star Health', 'Bajaj Allianz', 'Max Bupa', 'Tata AIG'].map(n => (
            <span key={n} className="text-[14px] font-bold text-[var(--text-tertiary)]">{n}</span>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className="section-label mb-3">Capabilities</p>
            <h2 className="text-[32px] font-bold text-white tracking-tight mb-3">Enterprise-grade tooling</h2>
            <p className="text-[var(--text-secondary)]">Built by insurance engineers for production reliability.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div key={cap.title} className="glass-card p-7 group relative overflow-hidden" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${getColorRGB(cap.color)},0.5), transparent)` }}></div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `rgba(${getColorRGB(cap.color)},0.12)` }}>
                  <cap.icon size={18} style={{ color: cap.color }} />
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="border-y border-[var(--border)] py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">Architecture</p>
              <h2 className="text-[32px] font-bold text-white tracking-tight mb-4">Production-ready stack</h2>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">Microservices with independently scalable engines for quoting, pricing, AI advisory, and claims.</p>
              <div className="space-y-3">
                {['Deterministic Quote & Pricing Engine', 'Multi-factor Risk Scoring (6 dimensions)', 'AI Recommendation Ranker (Gemini)', 'RAG-Powered Conversational Advisor', 'Real-time Analytics Pipeline', 'Automated Compliance Monitoring'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-[14px] text-[var(--text-secondary)]">
                    <CheckCircle2 size={15} className="text-[var(--accent-emerald)] shrink-0" />{item}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 space-y-2.5 font-mono text-[13px]">
              {[
                { label: 'Frontend', tech: 'React 18 + Vite + Tailwind', color: 'var(--accent-violet)' },
                { label: 'Backend', tech: 'Node.js + Express (ES6)', color: 'var(--accent-sky)' },
                { label: 'AI Engine', tech: 'Google Gemini 2.0 Flash', color: 'var(--accent-emerald)' },
                { label: 'Risk Engine', tech: 'Custom 6-Factor Scoring', color: 'var(--accent-rose)' },
                { label: 'Database', tech: 'MongoDB + Mongoose', color: 'var(--accent-amber)' },
                { label: 'Infra', tech: 'Docker + CI/CD Pipeline', color: 'var(--accent-indigo)' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border)]">
                  <span className="text-[var(--text-tertiary)]">{r.label}</span>
                  <span className="text-white font-semibold text-[12px]">{r.tech}</span>
                  <span className="w-2 h-2 rounded-full" style={{ background: r.color }}></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 mesh-gradient relative">
        <div className="max-w-[980px] mx-auto px-6 text-center relative z-10">
          <h2 className="text-[32px] font-bold text-white tracking-tight mb-3">Ready to transform your operations?</h2>
          <p className="text-[var(--text-secondary)] mb-8">Join 50+ enterprise partners processing millions through Eptain.</p>
          <button onClick={() => navigate('/quote')} className="btn-primary px-8 py-3.5 text-[15px] flex items-center gap-2 mx-auto"><Zap size={16} /> Start Free Pilot</button>
        </div>
      </section>
    </div>
  );
}
