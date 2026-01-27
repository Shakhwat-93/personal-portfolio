'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Globe, Layers, Database, Sparkles, Terminal, Cpu, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';


const skillCategories = [
    {
        title: 'Technical Systems',
        items: [
            { name: 'Next.js 15+', icon: <Globe className="w-5 h-5" /> },
            { name: 'React Architecture', icon: <Code2 className="w-5 h-5" /> },
            { name: 'Full-Stack Integration', icon: <Layers className="w-5 h-5" /> },
            { name: 'Cloud Databases', icon: <Database className="w-5 h-5" /> },
        ]
    },
    {
        title: 'AI & Automation',
        items: [
            { name: 'LLM Prompting', icon: <Sparkles className="w-5 h-5" /> },
            { name: 'Agentic Workflows', icon: <Cpu className="w-5 h-5" /> },
            { name: 'Automated Scripts', icon: <Terminal className="w-5 h-5" /> },
            { name: 'Process Optimization', icon: <RefreshCw className="w-5 h-5" /> },
        ]
    },
    {
        title: 'Premium Operations',
        items: [
            { name: 'Virtual Assistance', icon: <Layers className="w-5 h-5" /> },
            { name: 'Service Excellence', icon: <Palette className="w-5 h-5" /> },
            { name: 'Rapid Troubleshooting', icon: <Terminal className="w-5 h-5" /> },
            { name: 'Digital Management', icon: <Globe className="w-5 h-5" /> },
        ]
    }
];

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchSkills() {
        try {
            const { data } = await supabase
                .from('skills')
                .select('*')
                .order('display_order', { ascending: true });
            if (data) setSkills(data);
        } catch (err) {
            console.error('Failed to fetch skills:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSkills();

        const channel = supabase
            .channel('skills-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'skills' },
                () => fetchSkills()
            )
            .subscribe();

        gsap.registerPlugin(ScrollTrigger);

        const categories = gsap.utils.toArray('.skill-category');
        categories.forEach((cat: any) => {
            gsap.fromTo(cat,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cat,
                        start: 'top 90%',
                    }
                }
            );
        });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Helper to map DB icons (text) to Lucide components
    const getIcon = (name: string) => {
        const icons: any = {
            'Globe': <Globe className="w-5 h-5" />,
            'Code2': <Code2 className="w-5 h-5" />,
            'Layers': <Layers className="w-5 h-5" />,
            'Database': <Database className="w-5 h-5" />,
            'Sparkles': <Sparkles className="w-5 h-5" />,
            'Cpu': <Cpu className="w-5 h-5" />,
            'Terminal': <Terminal className="w-5 h-5" />,
            'RefreshCw': <RefreshCw className="w-5 h-5" />,
            'Palette': <Palette className="w-5 h-5" />
        };
        return icons[name] || <Layers className="w-5 h-5" />;
    };


    return (
        <section id="skills" ref={containerRef} className="py-24 md:py-48 bg-black text-white relative border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                <div className="mb-20 xl:mb-32 flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6 block">02. Capabilities</span>
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-balance">Specialized Skillset</h2>
                </div>

                <div className="space-y-24">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-brand-gray gap-5">
                            <RefreshCw className="w-10 h-10 animate-spin opacity-20" />
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Synchronizing Tech Stack...</p>
                        </div>
                    ) : skills.map((category, idx) => (
                        <div key={category.id || idx} className="skill-category">
                            <h3 className="text-xs text-brand-gray uppercase tracking-widest mb-10 flex items-center gap-4">
                                <span className="text-white/20">0{idx + 1}</span>
                                <span className="w-8 h-px bg-white/10" />
                                {category.category}
                            </h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                {category.items.map((skillName: string) => (
                                    <div
                                        key={skillName}
                                        className="group relative p-6 md:p-8 rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-500 backdrop-blur-sm overflow-hidden"
                                    >
                                        <div className="text-brand-gray group-hover:text-blue-400 transition-colors duration-300 mb-6 group-hover:scale-110 origin-left transition-transform">
                                            {/* Defaulting to Layers since we don't store icon mapping for simple strings yet, 
                                                future improvement: store items as objects with icons */}
                                            <Layers className="w-5 h-5" />
                                        </div>

                                        <h3 className="text-base md:text-lg font-bold leading-tight uppercase tracking-tight">
                                            {skillName}
                                        </h3>

                                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-[3] transition-transform duration-700" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

