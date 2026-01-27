'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (password === 'Rasel12') { // Matches USER's .env.local ADMIN_PASSWORD
            document.cookie = "admin_session=true; path=/; max-age=86400"; // 24h
            router.push('/admin');
        } else {
            setError('Invalid password. Try again.');
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-zinc-500/5 blur-[120px] rounded-full" />

            <div className="w-full max-w-md bg-[#0c0c0e] border border-white/5 p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative z-10 transition-all hover:border-white/10 duration-700">
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-700">
                        <Lock className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter uppercase italic">Terminal Access</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-3 tracking-wide">Enter synchronization key to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-bold ml-4">Credential Sync</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-white/20 transition-all text-center tracking-[0.5em] text-lg font-bold placeholder:text-zinc-800"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && (
                        <div className="bg-red-500/5 border border-red-500/20 py-3 rounded-xl">
                            <p className="text-red-500 text-[10px] text-center uppercase font-bold tracking-widest animate-shake">{error}</p>
                        </div>
                    )}
                    <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-bold hover:bg-zinc-200 transition-all active:scale-[0.97] shadow-xl shadow-white/5 uppercase tracking-widest text-xs">
                        Initialize Session
                    </button>
                </form>
            </div>
        </div>
    );
}
