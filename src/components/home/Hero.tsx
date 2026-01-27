'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHero() {
            try {
                const { data } = await supabase
                    .from('hero_content')
                    .select('*')
                    .single();

                if (data) setContent(data);
            } catch (err) {
                console.error('Failed to fetch hero content:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchHero();

        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            defaults: { ease: 'power4.out' }
        });

        tl.fromTo('.hero-text-line',
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, delay: 0.2 }
        )
            .fromTo('.stat-item',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
                '-=0.8'
            )
            .fromTo('.scroll-indicator',
                { opacity: 0 },
                { opacity: 1, duration: 1 },
                '-=0.5'
            );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex items-center pt-24 pb-12 xl:pt-32 xl:pb-20 overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">

                {/* Text Content */}
                <div ref={textRef} className="flex flex-col justify-center items-center xl:items-start text-center xl:text-left">
                    <div className="overflow-hidden mb-6 xl:mb-8">
                        <div className="flex items-center justify-center xl:justify-start gap-2.5 hero-text-line">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse ring-4 ring-blue-500/20"></span>
                            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gray">
                                AI Solutions Architect & Virtual Assistant
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-hidden mb-1">
                        <h1 className="hero-text-line text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-heading leading-tight md:leading-[0.85] tracking-tighter text-balance">
                            {content?.heading_line1 || 'Elevating'}
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-8 xl:mb-10">
                        <h1 className="hero-text-line text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-heading leading-tight md:leading-[0.85] tracking-tighter text-brand-gray text-balance">
                            {content?.heading_line2 || 'Digital Systems'} <span className="text-white italic">{content?.highlight_text || 'with AI.'}</span>
                        </h1>
                    </div>

                    <div className="overflow-hidden mb-10 xl:mb-14">
                        <p className="hero-text-line text-base md:text-xl text-brand-gray max-w-2xl leading-relaxed mx-auto xl:mx-0">
                            {content?.subtext || 'I bridge technical excellence with AI-driven efficiency. A quick learner dedicated to building high-performance systems and managing seamless digital operations.'}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="hero-text-line flex flex-wrap items-center justify-center xl:justify-start gap-4 xl:gap-6 mb-16 xl:mb-24">
                        <a href="#work" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
                            View Showcase
                        </a>
                        <a href="#contact" className="group text-white flex items-center gap-2 hover:text-brand-gray transition-colors font-medium">
                            Let's Collaborate <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-12 border-t border-white/5 pt-10 xl:pt-12">
                        <StatItem label="Expertise" value={content?.experience_stat || 'Advanced Web'} />
                        <StatItem label="AI Capability" value="Automation Pro" />
                        <StatItem label="Projects" value={content?.projects_stat || '25+ Systems'} />
                        <StatItem label="Learning" value="Ultra Fast" />
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator hidden md:flex flex-col items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-brand-gray/50">Explore</span>
                <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
            </div>
        </section>
    );
}

function StatItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="stat-item flex flex-col items-center xl:items-start">
            <span className="text-[10px] text-brand-gray uppercase tracking-widest block mb-2">{label}</span>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {value}
            </span>
        </div>
    );
}

