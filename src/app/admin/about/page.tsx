'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw, Plus, Trash2 } from 'lucide-react';

export default function AdminAbout() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [about, setAbout] = useState({
        title: '',
        subtitle: '',
        description: '',
    });
    const [education, setEducation] = useState<any[]>([]);
    const [experience, setExperience] = useState<any[]>([]);

    useEffect(() => {
        fetchAboutData();
    }, []);

    async function fetchAboutData() {
        setLoading(true);
        const { data: aboutData } = await supabase.from('about_content').select('*').single();
        const { data: eduData } = await supabase.from('education').select('*').order('display_order', { ascending: true });
        const { data: expData } = await supabase.from('experience').select('*').order('display_order', { ascending: true });

        if (aboutData) setAbout(aboutData);
        if (eduData) setEducation(eduData);
        if (expData) setExperience(expData);
        setLoading(false);
    }

    async function handleSaveAbout(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        const { error } = await supabase.from('about_content').upsert({ ...about, updated_at: new Date() });
        if (error) alert(error.message);
        else alert('About section updated!');
        setSaving(false);
    }

    async function addEducation() {
        const { data, error } = await supabase.from('education').insert([{
            degree: 'New Degree',
            institution: 'University Name',
            duration: '2024 - 2025',
            display_order: education.length
        }]).select();
        if (data) setEducation([...education, data[0]]);
    }

    async function addExperience() {
        const { data, error } = await supabase.from('experience').insert([{
            role: 'New Role',
            company: 'Company Name',
            duration: '2024 - 2025',
            description: 'Role description...',
            display_order: experience.length
        }]).select();
        if (data) setExperience([...experience, data[0]]);
    }

    if (loading) return <div className="flex items-center gap-2 text-brand-gray text-balance"><RefreshCw className="w-5 h-5 animate-spin" /> Gathering Wisdom...</div>;

    return (
        <div className="space-y-12 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold font-heading">About & Journey</h1>
                <button onClick={handleSaveAbout} disabled={saving} className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all">
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save About Content
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-6">
                        <h2 className="text-xl font-bold font-heading italic">Main Content</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-brand-gray uppercase tracking-widest text-balance">Title (Headline)</label>
                                <input type="text" value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} className="w-full bg-black border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-brand-gray uppercase tracking-widest text-balance">Subtitle (Color Text)</label>
                                <input type="text" value={about.subtitle} onChange={(e) => setAbout({ ...about, subtitle: e.target.value })} className="w-full bg-black border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-white/10" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-brand-gray uppercase tracking-widest text-balance">Main Description</label>
                                <textarea rows={6} value={about.description} onChange={(e) => setAbout({ ...about, description: e.target.value })} className="w-full bg-black border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-white/10" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* Education */}
                    <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold font-heading italic">Education</h2>
                            <button onClick={addEducation} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-4">
                            {education.map((edu, idx) => (
                                <div key={edu.id} className="p-4 border border-white/5 rounded-2xl space-y-3">
                                    <input type="text" value={edu.degree} className="bg-transparent border-none outline-none font-bold w-full" />
                                    <input type="text" value={edu.institution} className="bg-transparent border-none outline-none text-brand-gray text-sm w-full" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold font-heading italic text-balance">Work Experience</h2>
                            <button onClick={addExperience} className="p-2 bg-white/5 rounded-full hover:bg-white/10"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-4">
                            {experience.map((exp, idx) => (
                                <div key={exp.id} className="p-4 border border-white/5 rounded-2xl space-y-3">
                                    <input type="text" value={exp.role} className="bg-transparent border-none outline-none font-bold w-full text-balance" />
                                    <input type="text" value={exp.company} className="bg-transparent border-none outline-none text-brand-gray text-sm w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
