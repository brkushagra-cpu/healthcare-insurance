import React, { useEffect, useState } from 'react';
import { Activity, Users, ShieldCheck, HeartPulse } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/analytics`)
      .then(res => res.json())
      .then(d => {
        if(d.status === "success") setData(d.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent animate-spin rounded-full"></div>
    </div>
  );

  return (
    <div className="animate-fade-in py-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight">Mission Control</h1>
          <p className="text-gray-500 font-medium tracking-wide">AI-Powered Eptain Analytics Funnel</p>
        </div>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-black flex items-center gap-2 shadow-sm">
          <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
          Live Environment
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* KPI Cards */}
        <div className="glass p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col hover:-translate-y-1 transition">
          <div className="flex items-center gap-4 mb-4 text-orange-500"><Activity size={32} /></div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Total Quotes Hit</p>
          <p className="text-4xl font-black text-blue-900">{data?.metrics.totalQuotes || '--'}</p>
        </div>
        
        <div className="glass p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col hover:-translate-y-1 transition">
          <div className="flex items-center gap-4 mb-4 text-blue-500"><Users size={32} /></div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Captured Leads</p>
          <p className="text-4xl font-black text-blue-900">{data?.metrics.totalLeads || '--'}</p>
        </div>

        <div className="glass p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col hover:-translate-y-1 transition bg-gradient-to-br from-blue-900 to-indigo-900 !border-0 group">
          <div className="flex items-center gap-4 mb-4 text-white"><HeartPulse size={32} className="group-hover:animate-pulse" /></div>
          <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-1">AI Interactions</p>
          <p className="text-4xl font-black text-white">{data?.metrics.aiConversations || '--'}</p>
        </div>

        <div className="glass p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col hover:-translate-y-1 transition">
          <div className="flex items-center gap-4 mb-4 text-green-500"><ShieldCheck size={32} /></div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-1">Funnel Conv. Rate</p>
          <p className="text-4xl font-black text-blue-900">{data?.metrics.conversionRate || '--'}%</p>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-black text-blue-900 mb-6">Real-Time Event Stream</h3>
        <div className="space-y-4">
          {data?.recentActivity?.map((act, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white transition cursor-default group">
              <div className="flex items-center gap-4">
                 <div className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-md ${act.type === 'Lead' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                   {act.type}
                 </div>
                 <p className="font-bold text-gray-800 group-hover:text-blue-900 transition">{act.detail}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-gray-400 font-medium text-sm flex items-center gap-3">
                 <span>ID: <code className="bg-gray-200 text-gray-600 px-1 py-0.5 rounded text-xs">{act.id}</code></span>
                 <span className="pl-3 border-l">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
