'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <div ref={textRef} className="space-y-12 md:space-y-16">

                    <div className="flex flex-col gap-4">
                        <span className="text-brand-gray text-sm uppercase tracking-widest about-text">01. Profile</span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight about-text">
                            Rapid Web Development <br />
                            <span className="text-brand-gray">with AI-driven workflows.</span>
                        </h2>
                    </div>

                    <p className="text-lg md:text-2xl text-brand-gray leading-relaxed about-text font-medium max-w-2xl">
                        I am a highly adaptable quick learner with a proven ability to master new technologies
                        and implement them immediately into production. I focus on both frontend and backend
                        integration to deliver exceptional results.
                    </p>

                    {/* Experience & Education Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10 about-text">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Education</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-medium">B.Sc in CSE</h4>
                                    <p className="text-brand-gray">Southeast University</p>
                                    <p className="text-sm text-brand-gray/60">2024 – 2027 (Expected)</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-6">Experience</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-medium">Customer Support Executive</h4>
                                    <p className="text-brand-gray">Steadfast Courier Limited</p>
                                    <p className="text-sm text-brand-gray/60">May 2024 – July 2024</p>
                                    <p className="text-sm text-brand-gray mt-2">
                                        Managed high-volume inquiries and collaborated with logistics teams to improve service workflow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/10 about-text">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-4xl font-bold font-heading mb-2">Expert</h3>
                                <span className="text-sm text-brand-gray">Rapid Prototyping</span>
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold font-heading mb-2">Native</h3>
                                <span className="text-sm text-brand-gray">Bengali</span>
                            </div>
                            <div>
                                <h3 className="text-4xl font-bold font-heading mb-2">Pro</h3>
                                <span className="text-sm text-brand-gray">English</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
