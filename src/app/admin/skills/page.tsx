'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Code, RefreshCw, Save } from 'lucide-react';

export default function AdminSkills() {
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState<any[]>([]);

    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills() {
        setLoading(true);
        const { data } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
        if (data) setSkills(data);
        setLoading(false);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold font-heading text-balance">Tech Stack & Skills</h1>
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all">
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            {loading ? (
                <div className="flex items-center gap-2 text-brand-gray text-balance"><RefreshCw className="w-5 h-5 animate-spin" /> Fetching Skills...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skill) => (
                        <div key={skill.id} className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 space-y-6">
                            <div className="flex justify-between items-center text-balance">
                                <input type="text" value={skill.category} className="bg-transparent border-none outline-none font-bold text-xl w-full" />
                                <button className="p-2 text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item: string, idx: number) => (
                                    <span key={idx} className="bg-black border border-white/5 px-4 py-2 rounded-xl text-sm text-brand-gray flex items-center gap-2">
                                        {item}
                                        <button className="hover:text-white">×</button>
                                    </span>
                                ))}
                                <button className="px-4 py-2 rounded-xl border border-dashed border-white/10 text-xs text-brand-gray hover:border-white/20 transition-colors">+ Add</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
