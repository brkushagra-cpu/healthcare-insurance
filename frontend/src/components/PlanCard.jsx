import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function PlanCard({ plan, index = 0 }) {
  return (
    <motion.div
      className="glass-card p-6 flex flex-col"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      {plan.recommended && (
        <div className="badge badge-brand text-[10px] self-start mb-3">AI Recommended</div>
      )}

      <h3 className="text-[15px] font-bold text-[var(--text-primary)] mb-0.5">{plan.name}</h3>
      <p className="text-[12px] text-[var(--text-tertiary)] mb-4">{plan.insurer || 'Eptain Network'}</p>

      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-[13px] text-[var(--text-tertiary)]">₹</span>
        <span className="text-[28px] font-bold text-[var(--text-primary)] tracking-tight">{plan.premium?.toLocaleString()}</span>
        <span className="text-[12px] text-[var(--text-tertiary)]">/yr</span>
      </div>

      <div className="space-y-2 mb-5 flex-1">
        {plan.features?.slice(0, 4).map((f, i) => (
          <div key={i} className="flex items-start gap-2 text-[12px] text-[var(--text-secondary)]">
            <CheckCircle2 size={13} className="text-[var(--accent-green)] shrink-0 mt-0.5" />
            <span>{f}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[12px] text-[var(--text-tertiary)] mb-4 pt-3 border-t border-[var(--border)]">
        <span>Claim Ratio</span>
        <span className="font-bold text-[var(--text-primary)]">{plan.claimRatio}%</span>
      </div>

      <button className="btn-primary w-full py-2.5 text-[13px]">Select Plan</button>
    </motion.div>
  );
}
