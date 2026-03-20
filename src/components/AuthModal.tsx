'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import useAppStore from '@/store/useAppStore';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAppStore(state => state.setUser);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="glassmorphism p-6 rounded-md w-96 border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        <h2 className="text-xl font-bold text-cyan-500 mb-4 uppercase tracking-widest text-shadow-cyan">System Auth</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
             type="email" 
             placeholder="OPERATOR EMAIL" 
             value={email}
             onChange={e => setEmail(e.target.value)}
             className="bg-black/50 border border-[#333] p-2 text-cyan-300 font-mono outline-none focus:border-cyan-500" 
             required
          />
          <input 
             type="password" 
             placeholder="SECURE PASSCODE" 
             value={password}
             onChange={e => setPassword(e.target.value)}
             className="bg-black/50 border border-[#333] p-2 text-cyan-300 font-mono outline-none focus:border-cyan-500" 
             required
          />
          <button 
             type="submit" 
             disabled={loading}
             className="mt-2 bg-cyan-900/40 text-cyan-400 border border-cyan-500 p-2 font-bold hover:bg-cyan-500 hover:text-black transition-colors"
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN_EXEC()'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-xs text-gray-500 hover:text-gray-300 underline w-full text-center">ABORT</button>
      </div>
    </div>
  );
}
