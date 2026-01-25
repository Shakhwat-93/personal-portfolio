'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw } from 'lucide-react';

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
        const { data: heroData, error } = await supabase
            .from('hero_content')
            .select('*')
            .single();

        if (heroData) {
            setData(heroData);
        }
        setLoading(false);
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

    if (loading) return <div className="flex items-center gap-2 text-brand-gray"><RefreshCw className="w-5 h-5 animate-spin" /> Loading Hero Data...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold font-heading">Hero Section</h1>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm text-brand-gray uppercase tracking-widest">Heading Line 1</label>
                        <input
                            type="text"
                            value={data.heading_line1}
                            onChange={(e) => setData({ ...data, heading_line1: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                            placeholder="Focus on"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-brand-gray uppercase tracking-widest">Heading Line 2</label>
                        <input
                            type="text"
                            value={data.heading_line2}
                            onChange={(e) => setData({ ...data, heading_line2: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                            placeholder="Performance &"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-brand-gray uppercase tracking-widest">Highlight Text</label>
                    <input
                        type="text"
                        value={data.highlight_text}
                        onChange={(e) => setData({ ...data, highlight_text: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                        placeholder="Visuals."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-brand-gray uppercase tracking-widest">Subtext (Description)</label>
                    <textarea
                        rows={4}
                        value={data.subtext}
                        onChange={(e) => setData({ ...data, subtext: e.target.value })}
                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                        placeholder="I am a Full-Stack Developer..."
                    />
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                    <div className="space-y-2">
                        <label className="text-sm text-brand-gray uppercase tracking-widest">Exp Stat</label>
                        <input
                            type="text"
                            value={data.experience_stat}
                            onChange={(e) => setData({ ...data, experience_stat: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                            placeholder="+03 Years"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-brand-gray uppercase tracking-widest">Projects Stat</label>
                        <input
                            type="text"
                            value={data.projects_stat}
                            onChange={(e) => setData({ ...data, projects_stat: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                            placeholder="20+ Done"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-brand-gray uppercase tracking-widest">Stack Stat</label>
                        <input
                            type="text"
                            value={data.tech_stack_stat}
                            onChange={(e) => setData({ ...data, tech_stack_stat: e.target.value })}
                            className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                            placeholder="MERN"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
