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
                if (eduData && eduData.length > 0) setEducation(eduData);
                if (expData && expData.length > 0) setExperience(expData);
            } catch (err) {
                console.error('About fetch error:', err);
            }
        }
        fetchAbout();

        gsap.registerPlugin(ScrollTrigger);

        const textElements = textRef.current?.querySelectorAll('.about-text');

        textElements?.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0.2, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: true
                    }
                }
            );
        });

    }, []);

    return (
        <section id="about" ref={containerRef} className="py-24 md:py-40 bg-black text-white relative">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                <div ref={textRef} className="space-y-12 md:space-y-16 text-center md:text-left flex flex-col items-center md:items-start">

                    <div className="flex flex-col gap-4 items-center md:items-start">
                        <span className="text-brand-gray text-xs md:text-sm uppercase tracking-widest about-text text-balance">01. Profile</span>
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-medium leading-tight about-text text-balance">
                            {content?.title || 'Rapid Web Development'} <span className="text-brand-gray">{content?.subtitle || 'with AI-driven workflows.'}</span>
                        </h2>
                    </div>

                    <p className="text-base md:text-2xl text-brand-gray leading-relaxed about-text font-medium max-w-2xl mx-auto md:mx-0">
                        {content?.description || 'I am a highly adaptable quick learner with a proven ability to master new technologies and implement them immediately into production. I focus on both frontend and backend integration to deliver exceptional results.'}
                    </p>

                    {/* Experience & Education Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10 about-text">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className="text-xl font-bold text-white mb-6">Education</h3>
                            <div className="space-y-4">
                                {(education.length > 0 ? education : [
                                    { degree: 'B.Sc in CSE', institution: 'Southeast University', duration: '2024 – 2027 (Expected)' }
                                ]).map((edu, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-lg font-medium">{edu.degree}</h4>
                                        <p className="text-brand-gray">{edu.institution}</p>
                                        <p className="text-sm text-brand-gray/60">{edu.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className="text-xl font-bold text-white mb-6">Experience</h3>
                            <div className="space-y-4">
                                {(experience.length > 0 ? experience : [
                                    { role: 'Customer Support Executive', company: 'Steadfast Courier Limited', duration: 'May 2024 – July 2024', description: 'Managed high-volume inquiries and collaborated with logistics teams to improve service workflow.' }
                                ]).map((exp, idx) => (
                                    <div key={idx}>
                                        <h4 className="text-lg font-medium">{exp.role}</h4>
                                        <p className="text-brand-gray">{exp.company}</p>
                                        <p className="text-sm text-brand-gray/60">{exp.duration}</p>
                                        {exp.description && <p className="text-sm text-brand-gray mt-2 max-w-sm">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full pt-12 border-t border-white/10 about-text">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="flex flex-col items-center md:items-start">
                                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-2 italic">Expert</h3>
                                <span className="text-sm text-brand-gray">Rapid Prototyping</span>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-2 italic">Native</h3>
                                <span className="text-sm text-brand-gray">Bengali</span>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <h3 className="text-3xl md:text-4xl font-bold font-heading mb-2 italic">Pro</h3>
                                <span className="text-sm text-brand-gray">English</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
