'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        title: 'Project 40 (Modern Web)',
        category: 'Next.js & React',
        image: '/projects/fresh.png', // Placeholder (reusing available assets)
        link: 'https://shakhwat-93.github.io/assignment-3/',
        year: '2025'
    },
    {
        title: 'Cost Management',
        category: 'System Dashboard',
        image: '/projects/cost.png',
        link: 'https://shakhwat-93.github.io/cost-management/',
        year: '2025'
    },
    {
        title: 'SaaS Platform',
        category: 'Web Design',
        image: '/projects/saas.png',
        link: 'https://shakhwat-93.github.io/Saas-website/',
        year: '2025'
    },
    {
        title: 'Food Delivery App',
        category: 'App Experience',
        image: '/projects/Screenshot 2025-11-17 003022.png',
        link: 'https://shakhwat-93.github.io/sohan-food/',
        year: '2024'
    }
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const projectCards = gsap.utils.toArray('.project-card');

        projectCards.forEach((card: any) => {
            gsap.fromTo(card,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                }
            );
        });
    }, []);

    return (
        <section id="work" ref={containerRef} className="py-24 md:py-32 bg-black text-white relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
                    <div>
                        <span className="text-brand-gray text-sm uppercase tracking-widest mb-4 block">03. Selected Works</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold">Featured Projects</h2>
                    </div>
                    <Link href="https://github.com/Start-with-Rasel" target="_blank" className="hidden md:flex items-center gap-2 pb-1 border-b border-white hover:text-brand-gray hover:border-brand-gray transition-colors">
                        View GitHub <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-16">
                    {projects.map((project, index) => (
                        <Link
                            href={project.link}
                            key={index}
                            target="_blank"
                            className="project-card group block relative"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-white/5 border border-white/10">
                                <div className="absolute inset-0 bg-brand-gray/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-1 group-hover:text-brand-gray transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-brand-gray text-sm">{project.category}</span>
                                </div>
                                <span className="text-xs border border-white/20 px-2 py-1 rounded-full">{project.year}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 md:hidden flex justify-center">
                    <Link href="https://github.com/Start-with-Rasel" target="_blank" className="flex items-center gap-2 pb-1 border-b border-white">
                        View GitHub <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
