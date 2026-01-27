'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw, Plus, Trash2, GraduationCap, Briefcase, Info } from 'lucide-react';

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
        try {
            const { data: aboutData } = await supabase.from('about_content').select('*').single();
            const { data: eduData } = await supabase.from('education').select('*').order('display_order', { ascending: true });
            const { data: expData } = await supabase.from('experience').select('*').order('display_order', { ascending: true });

            if (aboutData) setAbout(aboutData);
            if (eduData) setEducation(eduData);
            if (expData) setExperience(expData);
        } catch (err) {
            console.error('Fetch about error:', err);
        } finally {
            setLoading(false);
        }
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
        const { data } = await supabase.from('education').insert([{
            degree: 'New Degree',
            institution: 'University Name',
            duration: '2024 - 2025',
            display_order: education.length
        }]).select();
        if (data) setEducation([...education, data[0]]);
    }

    async function handleUpdateEducation(id: string, field: string, value: string) {
        setEducation(prev => prev.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
        await supabase.from('education').update({ [field]: value }).eq('id', id);
    }

    async function handleDeleteEducation(id: string) {
        if (!confirm('Delete this education entry?')) return;
        const { error } = await supabase.from('education').delete().eq('id', id);
        if (!error) setEducation(prev => prev.filter(edu => edu.id !== id));
    }

    async function addExperience() {
        const { data } = await supabase.from('experience').insert([{
            role: 'New Role',
            company: 'Company Name',
            duration: '2024 - 2025',
            description: 'Role description...',
            display_order: experience.length
        }]).select();
        if (data) setExperience([...experience, data[0]]);
    }

    async function handleUpdateExperience(id: string, field: string, value: string) {
        setExperience(prev => prev.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
        await supabase.from('experience').update({ [field]: value }).eq('id', id);
    }

    async function handleDeleteExperience(id: string) {
        if (!confirm('Delete this experience entry?')) return;
        const { error } = await supabase.from('experience').delete().eq('id', id);
        if (!error) setExperience(prev => prev.filter(exp => exp.id !== id));
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 text-brand-gray gap-5">
            <RefreshCw className="w-12 h-12 animate-spin text-white opacity-20" />
            <p className="text-xs uppercase tracking-[0.3em] font-bold animate-pulse">Gathering Wisdom...</p>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase italic">Persona Journey</h1>
                    <p className="text-brand-gray text-sm md:text-base font-medium">Chronicle your technical evolution and academic foundations.</p>
                </div>
                <button
                    onClick={handleSaveAbout}
                    disabled={saving}
                    className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50 shadow-xl active:scale-95"
                >
                    {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    <span>{saving ? 'Syncing...' : 'Push Updates'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div className="bg-[#0c0c0e] p-8 md:p-12 rounded-[3.5rem] border border-white/5 space-y-10 group hover:border-white/10 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                            <h3 className="text-sm font-bold uppercase tracking-widest italic">Core Narrative</h3>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-xs text-brand-gray uppercase tracking-widest font-bold ml-2">Headline</label>
                                <input
                                    type="text"
                                    value={about.title}
                                    onChange={(e) => setAbout({ ...about, title: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium text-lg italic"
                                    placeholder="The Architect"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs text-brand-gray uppercase tracking-widest font-bold ml-2">Contextual Label</label>
                                <input
                                    type="text"
                                    value={about.subtitle}
                                    onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium text-blue-400"
                                    placeholder="Innovation & Precision"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs text-brand-gray uppercase tracking-widest font-bold ml-2">Full Manifesto</label>
                                <textarea
                                    rows={8}
                                    value={about.description}
                                    onChange={(e) => setAbout({ ...about, description: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-8 py-6 outline-none focus:border-white/20 transition-all font-medium leading-relaxed"
                                    placeholder="Document your journey..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* Education Node */}
                    <div className="bg-[#0c0c0e] p-8 md:p-10 rounded-[3rem] border border-white/5 space-y-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-zinc-400" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest italic">Academic Found</h3>
                            </div>
                            <button onClick={addEducation} className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-4">
                            {education.map((edu) => (
                                <div key={edu.id} className="p-6 bg-black/20 border border-white/5 rounded-[2rem] space-y-3 hover:border-white/10 transition-all">
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                                        className="bg-transparent border-none outline-none font-bold text-lg w-full"
                                        placeholder="Degree"
                                    />
                                    <div className="flex items-center justify-between gap-4">
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e) => handleUpdateEducation(edu.id, 'institution', e.target.value)}
                                            className="bg-transparent border-none outline-none text-brand-gray text-sm w-full font-medium"
                                            placeholder="Institution"
                                        />
                                        <button onClick={() => handleDeleteEducation(edu.id)} className="text-zinc-600 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience Node */}
                    <div className="bg-[#0c0c0e] p-8 md:p-10 rounded-[3rem] border border-white/5 space-y-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-zinc-400" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest italic text-balance">Professional Nodes</h3>
                            </div>
                            <button onClick={addExperience} className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition-all"><Plus className="w-4 h-4" /></button>
                        </div>
                        <div className="space-y-4">
                            {experience.map((exp) => (
                                <div key={exp.id} className="p-6 bg-black/20 border border-white/5 rounded-[2rem] space-y-3 hover:border-white/10 transition-all">
                                    <input
                                        type="text"
                                        value={exp.role}
                                        onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                                        className="bg-transparent border-none outline-none font-bold text-lg w-full text-balance"
                                        placeholder="Role"
                                    />
                                    <div className="flex items-center justify-between gap-4">
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                                            className="bg-transparent border-none outline-none text-brand-gray text-sm w-full font-medium"
                                            placeholder="Company"
                                        />
                                        <button onClick={() => handleDeleteExperience(exp.id)} className="text-zinc-600 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
