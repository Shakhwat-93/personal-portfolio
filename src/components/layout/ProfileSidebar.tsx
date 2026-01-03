'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Facebook, Download } from 'lucide-react';

export default function ProfileSidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-[400px] p-8 hidden xl:flex flex-col justify-between z-50">
            <div className="h-full w-full bg-[#111] rounded-3xl p-6 flex flex-col items-center text-center border border-white/5 relative overflow-hidden group">

                {/* Status Badge */}
                <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                        <span className="text-xs text-brand-gray font-medium">Available</span>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-8 relative border border-white/5">
                    <Image
                        src="/hero.jpg"
                        alt="Shakhwat Hossain Rasel"
                        fill
                        className="object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    <div className="absolute bottom-6 left-6 text-left">
                        <h2 className="text-3xl font-heading font-bold leading-tight">Shakhwat</h2>
                    </div>
                </div>

                {/* Details */}
                <div className="w-full mb-8">
                    <h3 className="text-xl font-bold mb-1">Shakhwat Hossain</h3>
                    <a href="mailto:shakhwat.rasel989@gmail.com" className="text-brand-gray text-sm hover:text-white transition-colors block mb-4">
                        shakhwat.rasel989@gmail.com
                    </a>
                    <p className="text-brand-gray text-xs uppercase tracking-widest">Based in Dhaka, BD</p>
                </div>

                {/* Socials */}
                <div className="w-full flex justify-center gap-4 mb-auto">
                    <SocialLink href="https://github.com/Start-with-Rasel" icon={<Github className="w-5 h-5" />} />
                    <SocialLink href="https://www.linkedin.com/in/shakhwat-hossain-rasel-46506628b" icon={<Linkedin className="w-5 h-5" />} />
                    <SocialLink href="mailto:shakhwat.rasel989@gmail.com" icon={<Mail className="w-5 h-5" />} />
                </div>

                {/* CTA */}
                <div className="w-full mt-8">
                    <Link
                        href="#contact"
                        className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        Let's Talk <span className="text-lg">→</span>
                    </Link>
                </div>

            </div>
        </aside>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-brand-gray hover:text-white hover:bg-white/5 transition-all"
        >
            {icon}
        </a>
    );
}
