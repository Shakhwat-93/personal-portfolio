'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // Optional: Hide/Show on scroll or change opacity
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Work', href: '#work' },
        { name: 'Process', href: '#process' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 mix-blend-difference text-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold font-heading tracking-tight relative z-50">
                    RASEL<span className="text-brand-gray">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-brand-gray transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:block">
                    <MagneticButton className="group px-5 py-2 rounded-full border border-white/20 hover:border-white transition-colors bg-white/5 backdrop-blur-sm">
                        <Link href="#contact" className="flex items-center gap-2 text-sm font-medium">
                            Let's Talk <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
                        </Link>
                    </MagneticButton>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden relative z-50 p-2"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-expo ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {navLinks.map((link, i) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-heading font-bold hover:text-brand-gray transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
                <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold text-lg"
                >
                    Contact Me
                </Link>
            </div>
        </header>
    );
}
