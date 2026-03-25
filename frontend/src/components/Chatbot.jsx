import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Cpu } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'ai',
    content: "Neural network initialized. I am your Eptain Copilot—how can I optimize your risk exposure today?"
  }]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!inputMsg.trim()) return;

    const userMsg = inputMsg.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputMsg('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      
      if(data.status === "success") {
         setMessages(prev => [...prev, { role: 'ai', content: data.data.reply }]);
      } else {
         setMessages(prev => [...prev, { role: 'ai', content: "My cognitive link failed. Retry transmission later." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Error: Neural disconnect. Cannot reach backend orchestrator." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 btn-glow text-white rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-transform z-50 flex items-center gap-3 ${isOpen ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'} duration-500`}
      >
        <MessageCircle size={24} />
        <span className="font-bold tracking-widest text-xs uppercase pr-2">Ask AI</span>
      </button>

      <div className={`fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] glass-card rounded-3xl overflow-hidden flex flex-col z-[60] border border-cyan-500/30 transition-all duration-500 shadow-[0_0_50px_rgba(34,211,238,0.15)] origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-slate-900/80 p-5 flex justify-between items-center border-b border-cyan-500/20 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
          <div className="font-black flex items-center gap-3 tracking-wide text-slate-100">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
            </div>
            Eptain <span className="text-cyan-400 font-light">Copilot</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-xl border border-white/5"><X size={18} /></button>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-950/40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              {msg.role === 'ai' && <Cpu size={20} className="text-cyan-500 mt-2 mr-3 shrink-0 opacity-80" />}
              <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed tracking-wide shadow-lg
                ${msg.role === 'user' 
                  ? 'btn-glow text-white rounded-br-sm' 
                  : 'glass-card border border-white/10 text-slate-300 rounded-bl-sm'}
              `}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <Cpu size={20} className="text-cyan-500 mt-2 mr-3 opacity-50 animate-pulse" />
               <div className="glass-card p-4 rounded-3xl rounded-bl-sm border border-cyan-500/20 flex gap-1.5 items-center shadow-[inset_0_0_15px_rgba(34,211,238,0.1)]">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_5px_#22d3ee]"></span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100 shadow-[0_0_5px_#22d3ee]"></span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-200 shadow-[0_0_5px_#22d3ee]"></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/90 border-t border-white/10 flex gap-3 backdrop-blur-xl">
          <input 
            type="text" 
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Initialize query..." 
            className="flex-1 p-4 input-neon rounded-2xl text-sm font-medium tracking-wide placeholder-slate-500"
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !inputMsg.trim()} 
            className="p-4 btn-glow text-white rounded-2xl transition disabled:opacity-50 disabled:grayscale flex items-center justify-center aspect-square"
          >
            <Send size={18} className="translate-x-0.5" />
          </button>
        </div>
      </div>
    </>
  );
}
