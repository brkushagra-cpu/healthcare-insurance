import React from 'react';
import { motion } from 'framer-motion';

export default function MemberPortal() {
  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-indigo-100">
      {/* Dynamic Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">O</div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">Oswell Health Super App</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
          <span className="text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">Find Care</span>
          <span className="text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">Claims & Bills</span>
          <span className="text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors">My ID Card</span>
          <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-slate-200 overflow-hidden cursor-pointer" />
        </div>
      </header>

      {/* Hero Welcome */}
      <main className="pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
        >
          Hi Sarah. How are you feeling today?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed"
        >
          Your personal AI Health Coach is here to help you navigate your benefits, untangle medical jargon, or find the best specialist near you.
        </motion.p>

        {/* AI Input Area */}
        <div className="w-full max-w-3xl relative mb-20 group">
          <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white border border-indigo-100 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center p-3 focus-within:border-indigo-400 transition-colors gap-4">
            <span className="text-3xl ml-4 hidden sm:block">✨</span>
            <input 
              type="text" 
              placeholder="e.g., Explain my recent lab results or find an in-network physical therapist..." 
              className="w-full text-lg py-4 px-2 outline-none text-slate-700 placeholder-slate-400 font-medium bg-transparent"
            />
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-transform hover:-translate-y-0.5 shadow-md">
              Ask Oswell
            </button>
          </div>
        </div>

        {/* 3 Pillar Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {/* Pillar 1 */}
          <div className="bg-slate-50 p-8 flex flex-col rounded-3xl border border-slate-200 text-left hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
             <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-rose-200 pb-1">💊</div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">Medication Sync</h3>
             <p className="text-slate-500 font-medium leading-relaxed flex-1">Your Lisinopril prescription is ready for auto-refill based on your wearable data. Want me to schedule delivery?</p>
             <button className="mt-8 text-rose-600 font-bold hover:underline flex items-center justify-between group">
               Manage Prescriptions <span className="text-xl group-hover:translate-x-1 transition-transform">➔</span>
             </button>
          </div>
          
          {/* Pillar 2 */}
          <div className="bg-indigo-50 p-8 flex flex-col rounded-3xl border border-indigo-100 text-left hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden ring-4 ring-indigo-50/50">
             <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm">Goal Reached</div>
             <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-emerald-200 pb-1">🏆</div>
             <h3 className="text-2xl font-bold text-indigo-900 mb-3">Wellness Rewards</h3>
             <p className="text-indigo-600/80 font-medium leading-relaxed flex-1">You hit 10,000 steps for 5 days straight! Your next month's premium has been autonomously discounted by ₹500.</p>
             <button className="mt-8 text-emerald-600 font-bold hover:underline flex items-center justify-between group">
               Claim Reward Value <span className="text-xl group-hover:translate-x-1 transition-transform">➔</span>
             </button>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-50 p-8 flex flex-col rounded-3xl border border-slate-200 text-left hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
             <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-blue-200 pb-1">🏥</div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">Care Navigation</h3>
             <p className="text-slate-500 font-medium leading-relaxed flex-1">Connect to an in-network physician instantly with zero copay via our high-definition virtual clinic portal.</p>
             <button className="mt-8 text-blue-600 font-bold hover:underline flex items-center justify-between group">
               Start Telehealth Visit <span className="text-xl group-hover:translate-x-1 transition-transform">➔</span>
             </button>
          </div>
        </div>
      </main>
    </div>
  );
}
