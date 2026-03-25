import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! 👋 I\'m your Eptain AI advisor. Ask me anything about insurance plans, coverage, or pricing.' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);
    try {
      const res = await fetch(`${API_URL}/ai/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.data?.reply || 'Let me look into that for you.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: 'I\'m having trouble connecting. Please try again.' }]);
    }
    setTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-indigo)] text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            style={{ boxShadow: '0 0 25px rgba(139,92,246,0.3)' }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
          >
            <MessageCircle size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed bottom-5 right-5 z-50 w-[360px] max-h-[480px] bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border)] flex flex-col overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-indigo)] flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white">Eptain AI</p>
                  <p className="text-[11px] text-[var(--accent-emerald)] font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)]"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-[var(--text-tertiary)] hover:text-white transition p-1 rounded-lg hover:bg-[var(--bg-tertiary)]"><X size={16} /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 min-h-[280px]">
              {messages.map((msg, i) => (
                <motion.div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                  <div className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-indigo)] text-white rounded-[16px] rounded-br-[4px]'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border)] rounded-[16px] rounded-bl-[4px]'
                  }`}>{msg.text}</div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-tertiary)] border border-[var(--border)] px-3.5 py-3 rounded-[16px] rounded-bl-[4px] flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={bottomRef}></div>
            </div>

            <div className="px-3 py-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 bg-[var(--bg-tertiary)] rounded-full px-4 py-2 border border-[var(--border)] focus-within:border-[var(--accent-violet)] transition">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask anything..." className="flex-1 bg-transparent text-[13px] text-white placeholder-[var(--text-tertiary)] outline-none" />
                <button onClick={sendMessage} className="text-[var(--accent-violet)] hover:text-white transition" disabled={!input.trim()}><Send size={16} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
