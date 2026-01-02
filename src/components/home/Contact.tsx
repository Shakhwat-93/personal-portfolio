'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo('.contact-reveal',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section id="contact" ref={containerRef} className="py-24 md:py-40 bg-black text-white relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">

                <div className="mb-12">
                    <h2 className="contact-reveal text-5xl md:text-8xl lg:text-[9rem] font-heading font-bold tracking-tighter leading-[0.9] mb-6">
                        LET'S TALK
                    </h2>
                    <p className="contact-reveal text-xl md:text-2xl text-brand-gray max-w-2xl mx-auto">
                        Ready to build something that matters? <br />
                        I'm currently available for select projects.
                    </p>
                </div>

                <div className="contact-reveal flex justify-center mt-12">
                    <MagneticButton className="group bg-white text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-200 transition-colors">
                        <Link href="mailto:shakhwat.rasel989@gmail.com" className="flex items-center gap-3">
                            Say Hello <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" />
                        </Link>
                    </MagneticButton>
                </div>

            </div>
        </section>
    );
}
