'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '@/lib/supabase';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<any>(null);
    const [education, setEducation] = useState<any[]>([]);
    const [experience, setExperience] = useState<any[]>([]);

    useEffect(() => {
        async function fetchAbout() {
            try {
                const { data: aboutData } = await supabase.from('about_content').select('*').single();
                const { data: eduData } = await supabase.from('education').select('*').order('display_order', { ascending: true });
                const { data: expData } = await supabase.from('experience').select('*').order('display_order', { ascending: true });

                if (aboutData) setContent(aboutData);
                if (eduData) setEducation(eduData);
                if (expData) setExperience(expData);
            } catch (err) {
                console.error('About fetch error:', err);
            }
        }
        fetchAbout();

        // Realtime Subscriptions
        const channels = [
            supabase.channel('about-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'about_content' }, () => fetchAbout()).subscribe(),
            supabase.channel('edu-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'education' }, () => fetchAbout()).subscribe(),
            supabase.channel('exp-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'experience' }, () => fetchAbout()).subscribe()
        ];

        gsap.registerPlugin(ScrollTrigger);

        const textElements = textRef.current?.querySelectorAll('.about-text');

        textElements?.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0.2, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'top 60%',
                        scrub: true
                    }
                }
            );
        });

        return () => {
            channels.forEach(ch => supabase.removeChannel(ch));
        };
    }, []);

    return (
        <section id="about" ref={containerRef} className="py-24 md:py-48 bg-black text-white relative border-t border-white/5">
            <div className="max-w-5xl mx-auto px-6 md:px-8">
                <div ref={textRef} className="space-y-16 md:space-y-24">

                    <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
                        <span className="text-blue-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] about-text">01. Profile</span>
                        <h2 className="text-3xl md:text-6xl font-bold leading-[1.1] about-text text-balance">
                            {content?.title || 'Hyper-Growth Learner'} <span className="text-brand-gray">{content?.subtitle || 'Mastering AI & Technical Systems.'}</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-brand-gray leading-relaxed about-text font-medium max-w-3xl">
                            {content?.description || 'I specialize in rapid adaptation. Whether it is mastering advanced AI automation or building complex full-stack architectures, I deliver high-quality results at scale by leveraging modern agentic workflows and professional technical expertise.'}
                        </p>
                    </div>

                    {/* Timeline Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 pt-16 border-t border-white/5 about-text">
                        <div className="space-y-10">
                            <h3 className="text-xs text-brand-gray uppercase tracking-widest flex items-center gap-3">
                                <span className="w-8 h-px bg-white/20" /> Academic Foundation
                            </h3>
                            <div className="space-y-8">
                                {(education.length > 0 ? education : [
                                    { degree: 'B.Sc in CSE', institution: 'Southeast University', duration: '2024 – 2027 (Ongoing)' }
                                ]).map((edu, idx) => (
                                    <div key={idx} className="group">
                                        <h4 className="text-xl font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">{edu.degree}</h4>
                                        <p className="text-white/80 font-medium text-sm mt-1">{edu.institution}</p>
                                        <p className="text-xs text-brand-gray mt-1 font-bold">{edu.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-10">
                            <h3 className="text-xs text-brand-gray uppercase tracking-widest flex items-center gap-3">
                                <span className="w-8 h-px bg-white/20" /> Professional Trajectory
                            </h3>
                            <div className="space-y-8">
                                {(experience.length > 0 ? experience : [
                                    { role: 'Service Excellence Executive', company: 'Steadfast Courier', duration: 'May 2024 – July 2024', description: 'Optimized high-volume logistics inquiries through systematic workflow improvements and data-driven coordination.' }
                                ]).map((exp, idx) => (
                                    <div key={idx} className="group">
                                        <h4 className="text-xl font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">{exp.role}</h4>
                                        <p className="text-white/80 font-medium text-sm mt-1">{exp.company}</p>
                                        <p className="text-xs text-brand-gray mt-1 font-bold">{exp.duration}</p>
                                        {exp.description && <p className="text-sm text-brand-gray mt-3 max-w-sm leading-relaxed">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Capabilities Summary */}
                    <div className="w-full pt-16 border-t border-white/5 about-text">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            <Achievement value="Expert" label="AI Systems Integration" />
                            <Achievement value="Native" label="Bilingual Fluency" />
                            <Achievement value="Professional" label="Virtual Assistance" />
                            <Achievement value="Rapid" label="Technical Learning" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function Achievement({ value, label }: { value: string, label: string }) {
    return (
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-1 italic tracking-tighter">{value}</h3>
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gray">{label}</span>
        </div>
    );
}

