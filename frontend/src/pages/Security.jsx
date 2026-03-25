import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle2, FileText, Globe, Server, Eye } from 'lucide-react';

export default function Security() {
  const badges = [
    { title: 'HIPAA Compliant', desc: 'Full compliance with Health Insurance Portability and Accountability Act', icon: Shield, color: 'var(--accent-violet)', rgb: '139,92,246' },
    { title: 'SOC 2 Type II', desc: 'Audited service organization controls for security, availability, and confidentiality', icon: Lock, color: 'var(--accent-sky)', rgb: '56,189,248' },
    { title: 'GDPR Ready', desc: 'Data processing compliant with EU General Data Protection Regulation', icon: Globe, color: 'var(--accent-emerald)', rgb: '52,211,153' },
    { title: 'IRDAI Licensed', desc: 'Licensed by Insurance Regulatory and Development Authority of India', icon: FileText, color: 'var(--accent-amber)', rgb: '251,191,36' },
    { title: 'ISO 27001', desc: 'Information security management system certification', icon: Server, color: 'var(--accent-rose)', rgb: '244,63,94' },
    { title: 'PCI DSS', desc: 'Payment Card Industry Data Security Standard for payment processing', icon: Eye, color: 'var(--accent-indigo)', rgb: '99,102,241' },
  ];

  const practices = [
    'End-to-end AES-256 encryption for all data at rest and in transit',
    'Multi-factor authentication (MFA) for all admin and agent accounts',
    'Role-based access control (RBAC) with principle of least privilege',
    'Real-time intrusion detection and prevention system (IDS/IPS)',
    'Automated vulnerability scanning and penetration testing (quarterly)',
    'Data residency in Indian data centers (Mumbai, Hyderabad)',
    'Automated audit logging with 7-year retention policy',
    'DDoS protection and Web Application Firewall (WAF)',
    'Regular third-party security audits and compliance reviews',
    'Incident response team with <1 hour SLA',
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-[var(--bg-primary)] relative border-b border-[var(--border)] overflow-hidden min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0 opacity-15">
          <img src="/assets/security_pattern.png" className="w-full h-full object-cover" alt="Security Grid" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/40 to-[var(--bg-primary)] z-10"></div>
        <div className="max-w-[1200px] mx-auto px-6 py-20 relative z-20">
          <div className="badge-amber mb-5 font-black uppercase tracking-widest"><Lock size={14} className="mr-1" /> Zero-Trust Encryption</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-5 max-w-2xl leading-[0.9]">Security layered into<br/>every <span className="text-gradient">protocol</span></h1>
          <p className="text-[18px] text-[var(--text-secondary)] max-w-xl font-medium leading-relaxed">Enterprise-grade security protecting clinical assets. Fully compliant with HIPAA, GDPR, and IRDAI standards.</p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Compliance Badges */}
        <p className="section-label mb-5">Compliance & Certifications</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {badges.map((b, i) => (
            <motion.div key={b.title} className="glass-card p-6 relative overflow-hidden shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, rgba(${b.rgb},0.4), transparent)` }}></div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `rgba(${b.rgb},0.08)` }}>
                <b.icon size={20} style={{ color: b.color }} />
              </div>
              <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-1">{b.title}</h3>
              <p className="text-[13px] text-[var(--text-secondary)] font-medium leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Security Practices */}
        <p className="section-label mb-5">Security Architecture</p>
        <div className="glass-card p-10 light-section border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-violet)] to-transparent"></div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {practices.map((p, i) => (
              <motion.div key={i} className="flex items-start gap-4 text-[14px] font-bold text-[var(--text-dark)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <div className="w-5 h-5 rounded-full bg-[var(--accent-emerald)]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-[var(--accent-emerald)]" />
                </div>
                {p}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Flow */}
        <div className="mt-16">
          <p className="section-label mb-5">Infrastructure</p>
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { label: 'Uptime SLA', value: '99.99%', sub: 'Multi-AZ deployment', color: 'var(--accent-emerald)' },
                { label: 'Encryption', value: 'AES-256', sub: 'At rest & in transit', color: 'var(--accent-sky)' },
                { label: 'Response Time', value: '<200ms', sub: 'P95 API latency', color: 'var(--accent-violet)' },
              ].map(m => (
                <div key={m.label}>
                  <p className="text-[36px] font-extrabold leading-none" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-[14px] font-bold text-[var(--text-primary)] mt-1">{m.label}</p>
                  <p className="text-[11px] text-[var(--text-tertiary)] font-medium">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
