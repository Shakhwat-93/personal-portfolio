'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw, Zap, Sparkles, BarChart3 } from 'lucide-react';

export default function AdminHero() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({
        heading_line1: '',
        heading_line2: '',
        highlight_text: '',
        subtext: '',
        experience_stat: '',
        projects_stat: '',
        tech_stack_stat: '',
    });

    useEffect(() => {
        fetchHeroData();
    }, []);

    async function fetchHeroData() {
        setLoading(true);
        try {
            const { data: heroData, error } = await supabase
                .from('hero_content')
                .select('*')
                .single();

            if (heroData) {
                setData(heroData);
            }
        } catch (err) {
            console.error('Fetch hero error:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const { error } = await supabase
            .from('hero_content')
            .upsert({ ...data, updated_at: new Date() });

        if (error) {
            alert('Error saving data: ' + error.message);
        } else {
            alert('Hero section updated successfully!');
        }
        setSaving(false);
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 text-brand-gray gap-5">
            <RefreshCw className="w-12 h-12 animate-spin text-white opacity-20" />
            <p className="text-xs uppercase tracking-[0.3em] font-bold animate-pulse">Syncing Hero Data...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase italic">Hero Narrative</h1>
                    <p className="text-brand-gray text-sm md:text-base font-medium">Define your first impression with high-impact messaging.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50 shadow-xl active:scale-95"
                >
                    {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    <span>{saving ? 'Syncing...' : 'Push Updates'}</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12 max-w-5xl">
                <div className="bg-[#0c0c0e] p-8 md:p-12 rounded-[3.5rem] border border-white/5 space-y-10">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                        <h3 className="text-sm font-bold uppercase tracking-widest italic">Headline Configuration</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="text-xs text-brand-gray uppercase tracking-widest font-bold flex items-center gap-2">
                                <Zap className="w-3 h-3 text-yellow-500" /> Heading Line 1
                            </label>
                            <input
                                type="text"
                                value={data.heading_line1}
                                onChange={(e) => setData({ ...data, heading_line1: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium text-lg italic"
                                placeholder="Elevating"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs text-brand-gray uppercase tracking-widest font-bold flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-purple-500" /> Heading Line 2
                            </label>
                            <input
                                type="text"
                                value={data.heading_line2}
                                onChange={(e) => setData({ ...data, heading_line2: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium text-lg italic"
                                placeholder="Digital Systems"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs text-brand-gray uppercase tracking-widest font-bold">Highlight / Pivot Text</label>
                        <input
                            type="text"
                            value={data.highlight_text}
                            onChange={(e) => setData({ ...data, highlight_text: e.target.value })}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium text-blue-400"
                            placeholder="with AI."
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs text-brand-gray uppercase tracking-widest font-bold">Subtext / Elevator Pitch</label>
                        <textarea
                            rows={4}
                            value={data.subtext}
                            onChange={(e) => setData({ ...data, subtext: e.target.value })}
                            className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-8 py-6 outline-none focus:border-white/20 transition-all font-medium leading-relaxed"
                            placeholder="I bridge technical excellence with AI-driven efficiency..."
                        />
                    </div>
                </div>

                <div className="bg-[#0c0c0e] p-8 md:p-12 rounded-[3.5rem] border border-white/5 space-y-10">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-zinc-800 rounded-full" />
                        <h3 className="text-sm font-bold uppercase tracking-widest italic text-zinc-400">Impact Metrics</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <label className="text-xs text-brand-gray uppercase tracking-widest font-bold">Expertise Stat</label>
                            <input
                                type="text"
                                value={data.experience_stat}
                                onChange={(e) => setData({ ...data, experience_stat: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium"
                                placeholder="Advanced Web"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs text-brand-gray uppercase tracking-widest font-bold">Project Velocity</label>
                            <input
                                type="text"
                                value={data.projects_stat}
                                onChange={(e) => setData({ ...data, projects_stat: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium"
                                placeholder="25+ Systems"
                            />
                        </div>
                        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                            <label className="text-xs text-brand-gray uppercase tracking-widest font-bold">Stack Diversity</label>
                            <input
                                type="text"
                                value={data.tech_stack_stat}
                                onChange={(e) => setData({ ...data, tech_stack_stat: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium"
                                placeholder="MERN + AI"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

