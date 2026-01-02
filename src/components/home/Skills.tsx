'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Globe, Layers, Database, Sparkles, Terminal, Cpu } from 'lucide-react';

const skills = [
    { name: 'Next.js', category: 'Web Dev', icon: <Globe className="w-6 h-6" /> },
    { name: 'React.js', category: 'Web Dev', icon: <Code2 className="w-6 h-6" /> },
    { name: 'HTML5 / CSS3', category: 'Web Dev', icon: <Palette className="w-6 h-6" /> },
    { name: 'JavaScript (ES6)', category: 'Language', icon: <Code2 className="w-6 h-6" /> },
    { name: 'API Integration', category: 'Backend', icon: <Layers className="w-6 h-6" /> },
    { name: 'WordPress', category: 'CMS', icon: <Database className="w-6 h-6" /> },
    { name: 'Networking', category: 'IT', icon: <Cpu className="w-6 h-6" /> },
    { name: 'Troubleshooting', category: 'IT', icon: <Terminal className="w-6 h-6" /> },
];

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray('.skill-card');

        gsap.fromTo(cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    return (
        <section id="skills" ref={containerRef} className="py-24 md:py-32 bg-black text-white relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-16 md:mb-24">
                    <span className="text-brand-gray text-sm uppercase tracking-widest mb-4 block">02. Capabilities</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-bold">Technical Skills</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="skill-card group relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-brand-gray">
                                {skill.icon}
                            </div>

                            <div className="flex flex-col h-full justify-between">
                                <span className="text-xs text-brand-gray uppercase tracking-wider mb-8">{skill.category}</span>
                                <h3 className="text-2xl md:text-3xl font-heading font-bold group-hover:translate-x-2 transition-transform duration-300">
                                    {skill.name}
                                </h3>
                            </div>

                            {/* Hover Line */}
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-500 ease-in-out" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
