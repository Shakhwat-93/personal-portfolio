'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
            <div className="max-w-5xl mx-auto px-4 md:px-8 w-full">

                {/* Text Content */}
                <div ref={textRef} className="flex flex-col justify-center">
                    <div className="overflow-hidden mb-8">
                        <div className="flex items-center gap-2 hero-text-line">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            <h2 className="text-sm font-medium uppercase tracking-widest text-brand-gray">
                                AI-augmented Web Developer
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-hidden mb-2">
                        <h1 className="hero-text-line text-6xl md:text-8xl lg:text-[7rem] font-bold font-heading leading-[0.9] tracking-tighter">
                            Focus on
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-6">
                        <h1 className="hero-text-line text-6xl md:text-8xl lg:text-[7rem] font-bold font-heading leading-[0.9] tracking-tighter text-brand-gray">
                            Performance & <br /> <span className="text-white">Visuals.</span>
                        </h1>
                    </div>

                    <div className="overflow-hidden mb-12">
                        <p className="hero-text-line text-lg md:text-xl text-brand-gray max-w-2xl leading-relaxed">
                            I am a Full-Stack Developer specializing in building high-performance
                            web applications with a focus on clean code and exceptional user experience.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="hero-text-line flex items-center gap-6 mb-24">
                        <a href="#work" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                            My Portfolio
                        </a>
                        <a href="#contact" className="text-white flex items-center gap-2 hover:text-brand-gray transition-colors">
                            Let's Talk →
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                        <div className="stat-item">
                            <span className="text-xs text-brand-gray uppercase tracking-widest block mb-2">Experience</span>
                            <span className="text-3xl font-heading font-bold text-white italic">+03 Years</span>
                        </div>
                        <div className="stat-item">
                            <span className="text-xs text-brand-gray uppercase tracking-widest block mb-2">Projects</span>
                            <span className="text-3xl font-heading font-bold text-white italic">20+ Done</span>
                        </div>
                        <div className="stat-item">
                            <span className="text-xs text-brand-gray uppercase tracking-widest block mb-2">Tech Stack</span>
                            <span className="text-3xl font-heading font-bold text-white italic">MERN</span>
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
