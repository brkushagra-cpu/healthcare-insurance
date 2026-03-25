import React from 'react';

export default function ProviderPortal() {
  return (
    <div className="bg-[#0b1120] min-h-screen text-slate-300 font-sans selection:bg-indigo-500/30 pt-16">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center fixed top-0 w-full z-50">
        <h1 className="text-2xl font-black text-white flex items-center gap-3">
          <span className="text-indigo-400">⚕️ DoctorConnect</span> Ambient Assistant
        </h1>
        <div className="flex gap-4">
          <div className="bg-emerald-900/30 text-emerald-400 border border-emerald-800/50 px-4 py-2 rounded-lg font-bold text-xs tracking-widest uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            FHIR SMART on API: Live
          </div>
        </div>
      </header>

      <main className="p-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        
        {/* Left Column: Ambient Scribe */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px] ring-1 ring-white/5">
            <div className="bg-slate-800/50 px-6 py-5 border-b border-slate-700/50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Active Room Audio Capture (Gemini Speech-to-Text)
              </h2>
              <span className="text-sm font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-md">00:14:32</span>
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto font-mono text-[15px] leading-relaxed text-slate-300">
              <p className="mb-6"><span className="text-indigo-400 font-bold uppercase tracking-wider text-xs block mb-1">Dr. Patel</span> How long have you had this lower back pain, John?</p>
              <p className="mb-6 ml-8 border-l-2 border-emerald-500 pl-4"><span className="text-emerald-400 font-bold uppercase tracking-wider text-xs block mb-1">Patient</span> It started about three weeks ago, mostly after lifting some heavy boxes in the garage.</p>
              <p className="mb-6"><span className="text-indigo-400 font-bold uppercase tracking-wider text-xs block mb-1">Dr. Patel</span> Any numbness or tingling radiating down your legs?</p>
              <p className="mb-6 ml-8 border-l-2 border-emerald-500 pl-4"><span className="text-emerald-400 font-bold uppercase tracking-wider text-xs block mb-1">Patient</span> Yeah, occasionally down my left thigh.</p>
              
              <div className="mt-12 flex items-center justify-center gap-3 text-slate-500 italic text-sm">
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                 <span className="ml-2 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700/50 text-indigo-300/80">AI Scribe is parsing SOAP notes...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Extracted Data */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-indigo-950/20 rounded-3xl border border-indigo-500/20 p-8 shadow-xl relative overflow-hidden holographic-shine">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm">AI Output</div>
            <h3 className="text-indigo-300 font-bold text-xs tracking-widest uppercase mb-5 flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-indigo-500/20 border border-indigo-500/50 flex justify-center items-center text-[8px]">✨</div> Auto-Generated Diagnoses</h3>
            <div className="flex flex-col gap-3">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 font-mono text-emerald-400 font-bold flex justify-between items-center group cursor-pointer hover:border-emerald-500/50 transition-colors">
                M54.50 (Low Back Pain)
                <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">Add ➔</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 font-mono text-emerald-400 font-bold flex justify-between items-center group cursor-pointer hover:border-emerald-500/50 transition-colors">
                M54.16 (Radiculopathy)
                <span className="text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">Add ➔</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-xl">
            <h3 className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-slate-800 border border-slate-700 flex justify-center items-center text-[10px]">⚖️</div> Real-Time Eligibility & Auth</h3>
            <div className="bg-emerald-950/30 border border-emerald-900/50 p-4 rounded-xl mb-6">
              <p className="text-sm text-slate-300 leading-relaxed"><strong className="text-white">John's Eptain Policy:</strong> Active. Covers MRI of the lumbar spine without pre-authorization due to "Straight-Through Processing" rules for ICD-10 <span className="text-emerald-400 font-mono">M54.16</span>.</p>
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_30px_rgba(5,150,105,0.5)] uppercase tracking-wide text-sm">
              Push Order to EHR (Auto-Approved)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
