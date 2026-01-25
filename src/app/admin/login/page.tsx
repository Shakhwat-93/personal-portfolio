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
        <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-gradient-to-br from-black via-[#050505] to-[#111]">
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] shadow-2xl">
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold font-heading italic">Access Dashboard</h1>
                    <p className="text-brand-gray text-sm mt-2">Enter your password to manage your site</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/30 transition-all text-center tracking-widest"
                        placeholder="••••••••"
                        required
                    />
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                    <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all transform active:scale-95">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
