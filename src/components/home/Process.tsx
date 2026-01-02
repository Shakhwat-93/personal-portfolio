'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
    {
        number: '01',
        title: 'Discovery',
        description: 'Understanding the core problem, user needs, and business goals. I ask the right questions to uncover the real challenge.'
    },
    {
        number: '02',
        title: 'Strategy',
        description: 'Defining the creative direction and technical approach. This is where we plan the narrative, user flow, and technology stack.'
    },
    {
        number: '03',
        title: 'Design',
        description: 'Crafting the visual language. I focus on hierarchy, typography, and interaction to create a premium feel.'
    },
    {
        number: '04',
        title: 'Development',
        description: 'Writing clean, scalable code. I bring designs to life with smooth animations and robust performance.'
    },
    {
        number: '05',
        title: 'Launch',
        description: 'Deploying with confidence. I ensure everything is optimized for speed, SEO, and accessibility before going live.'
    }
];

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const stepElements = gsap.utils.toArray('.process-step');

        stepElements.forEach((step: any, i) => {
            gsap.fromTo(step,
                { opacity: 0.2, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 70%',
                        end: 'top 40%',
                        scrub: true,
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );
        });

    }, []);

    return (
        <section id="process" ref={containerRef} className="py-24 md:py-40 bg-black text-white relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Sticky Title */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-32">
                            <span className="text-brand-gray text-sm uppercase tracking-widest mb-4 block">04. Methodology</span>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">How I Work</h2>
                            <p className="text-brand-gray text-lg max-w-sm">
                                A systematic approach to solving complex problems with elegance.
                            </p>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="lg:col-span-8 flex flex-col gap-16 md:gap-24">
                        {steps.map((step) => (
                            <div key={step.number} className="process-step group flex flex-col md:flex-row gap-6 md:gap-12 pb-12 border-b border-white/10 last:border-none">
                                <span className="text-4xl md:text-6xl font-heading font-bold text-white/10 group-hover:text-white/30 transition-colors duration-500">
                                    {step.number}
                                </span>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-brand-gray text-lg leading-relaxed max-w-xl">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
