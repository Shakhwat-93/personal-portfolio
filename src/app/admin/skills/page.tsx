'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Code, RefreshCw, Save, Terminal, Layers, X } from 'lucide-react';

export default function AdminSkills() {
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState<any[]>([]);

    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills() {
        setLoading(true);
        try {
            const { data } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
            if (data) setSkills(data);
        } catch (err) {
            console.error('Fetch skills error:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleAddCategory() {
        const { data } = await supabase.from('skills').insert([{
            category: 'New Category',
            items: [],
            display_order: skills.length
        }]).select();
        if (data) setSkills([...skills, data[0]]);
    }

    async function handleUpdateCategory(id: string, name: string) {
        setSkills(prev => prev.map(s => s.id === id ? { ...s, category: name } : s));
    }

    async function handleCommitCategory(skill: any) {
        const { error } = await supabase.from('skills').update({
            category: skill.category,
            items: skill.items
        }).eq('id', skill.id);
        if (!error) alert('Category synced successfully!');
    }

    async function handleDeleteCategory(id: string) {
        if (!confirm('Delete this technical node?')) return;
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (!error) setSkills(prev => prev.filter(s => s.id !== id));
    }

    async function handleAddItem(id: string) {
        const skill = skills.find(s => s.id === id);
        if (!skill) return;
        const newItem = prompt('Enter skill name:');
        if (newItem) {
            const updatedItems = [...skill.items, newItem];
            setSkills(prev => prev.map(s => s.id === id ? { ...s, items: updatedItems } : s));
            await supabase.from('skills').update({ items: updatedItems }).eq('id', id);
        }
    }

    async function handleRemoveItem(id: string, idx: number) {
        const skill = skills.find(s => s.id === id);
        if (!skill) return;
        const updatedItems = skill.items.filter((_: any, i: number) => i !== idx);
        setSkills(prev => prev.map(s => s.id === id ? { ...s, items: updatedItems } : s));
        await supabase.from('skills').update({ items: updatedItems }).eq('id', id);
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 text-brand-gray gap-5">
            <RefreshCw className="w-12 h-12 animate-spin text-white opacity-20" />
            <p className="text-xs uppercase tracking-[0.3em] font-bold animate-pulse">Syncing Technical Node...</p>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase italic">Technical Arsenal</h1>
                    <p className="text-brand-gray text-sm md:text-base font-medium">Manage your technical ecosystem and specialized skillsets.</p>
                </div>
                <button
                    onClick={handleAddCategory}
                    className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>Initialize Category</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {skills.map((skill) => (
                    <div key={skill.id} className="bg-[#0c0c0e] p-8 md:p-10 rounded-[2.5rem] border border-white/5 space-y-8 group hover:border-white/10 transition-all duration-500">
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                                    <Layers className="w-5 h-5 text-zinc-400" />
                                </div>
                                <input
                                    type="text"
                                    value={skill.category}
                                    onChange={(e) => handleUpdateCategory(skill.id, e.target.value)}
                                    className="bg-transparent border-none outline-none font-bold text-xl md:text-2xl italic uppercase w-full focus:text-blue-400 transition-colors"
                                    placeholder="Category Name"
                                />
                            </div>
                            <button
                                onClick={() => handleDeleteCategory(skill.id)}
                                className="p-3 text-red-500/30 hover:text-red-500 transition-colors hover:bg-red-500/5 rounded-full"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {skill.items.map((item: string, idx: number) => (
                                <div key={idx} className="bg-black border border-white/5 px-5 py-3 rounded-2xl text-sm font-medium text-brand-gray flex items-center gap-3 group/item hover:border-white/20 transition-all">
                                    <span>{item}</span>
                                    <button
                                        onClick={() => handleRemoveItem(skill.id, idx)}
                                        className="text-zinc-600 hover:text-red-400 p-0.5 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => handleAddItem(skill.id)}
                                className="px-6 py-3 rounded-2xl border-2 border-dashed border-white/5 text-xs font-bold uppercase tracking-widest text-brand-gray hover:border-white/20 hover:text-white transition-all flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Logic
                            </button>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={() => handleCommitCategory(skill)}
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-blue-400 transition-colors flex items-center gap-2"
                            >
                                <Save className="w-3 h-3" /> Push Node Updates
                            </button>
                        </div>
                    </div>
                ))}

                {skills.length === 0 && (
                    <div className="col-span-full py-32 border-2 border-dashed border-white/5 rounded-[3rem] text-center flex flex-col items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                            <Code className="w-8 h-8 text-brand-gray" />
                        </div>
                        <div>
                            <p className="text-brand-gray font-medium text-lg">No Skills Mapped</p>
                            <p className="text-brand-gray/50 text-xs uppercase tracking-widest mt-1">Start defining your technical stack</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
