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
                const { data, error } = await supabase
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
            defaults: { ease: 'power3.out' }
        });

        // Initial Reveal
        tl.fromTo('.hero-text-line',
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, delay: 0.5 }
        )
            .fromTo('.stat-item',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
                '-=0.5'
            )
            .fromTo('.scroll-indicator',
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                '-=0.5'
            );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
        >
            <div className="max-w-5xl mx-auto px-6 md:px-8 w-full">

                {/* Text Content */}
                <div ref={textRef} className="flex flex-col justify-center items-center xl:items-start text-center xl:text-left">
                    <div className="overflow-hidden mb-8">
                        <div className="flex items-center justify-center xl:justify-start gap-2 hero-text-line">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            <h2 className="text-sm font-medium uppercase tracking-widest text-brand-gray">
                                AI-augmented Web Developer
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-hidden mb-2">
                        <h1 className="hero-text-line text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold font-heading leading-[0.9] tracking-tighter text-balance">
                            {content?.heading_line1 || 'Focus on'}
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-6">
                        <h1 className="hero-text-line text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold font-heading leading-[0.9] tracking-tighter text-brand-gray text-balance">
                            {content?.heading_line2 || 'Performance &'} <span className="text-white">{content?.highlight_text || 'Visuals.'}</span>
                        </h1>
                    </div>

                    <div className="overflow-hidden mb-12">
                        <p className="hero-text-line text-base md:text-xl text-brand-gray max-w-2xl leading-relaxed mx-auto xl:mx-0">
                            {content?.subtext || 'I am a Full-Stack Developer specializing in building high-performance web applications with a focus on clean code and exceptional user experience.'}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="hero-text-line flex flex-wrap items-center justify-center xl:justify-start gap-6 mb-24">
                        <a href="#work" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                            My Portfolio
                        </a>
                        <a href="#contact" className="text-white flex items-center gap-2 hover:text-brand-gray transition-colors">
                            Let's Talk →
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-12">
                        <div className="stat-item">
                            <span className="text-xs text-brand-gray uppercase tracking-widest block mb-2">Experience</span>
                            <span className="text-2xl sm:text-3xl font-heading font-bold text-white italic">
                                {content?.experience_stat || '+03 Years'}
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="text-xs text-brand-gray uppercase tracking-widest block mb-2">Projects</span>
                            <span className="text-2xl sm:text-3xl font-heading font-bold text-white italic">
                                {content?.projects_stat || '20+ Done'}
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="text-xs text-brand-gray uppercase tracking-widest block mb-2">Tech Stack</span>
                            <span className="text-2xl sm:text-3xl font-heading font-bold text-white italic">
                                {content?.tech_stack_stat || 'MERN'}
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator flex flex-col items-center gap-2">
                <ArrowDown className="w-5 h-5 text-brand-gray animate-bounce" />
            </div>
        </section>
    );
}
