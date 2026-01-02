'use client';

import Link from 'next/link';
import { Home, User, Layers, Mail, Code } from 'lucide-react';

export default function NavigationDock() {
    return (
        <aside className="fixed right-0 top-0 h-screen w-[100px] hidden xl:flex flex-col items-center justify-center z-50">
            <div className="bg-[#111] border border-white/5 rounded-full py-8 px-3 flex flex-col gap-6 backdrop-blur-md">
                <NavLink href="/" icon={<Home className="w-5 h-5" />} label="Home" />
                <NavLink href="#about" icon={<User className="w-5 h-5" />} label="About" />
                <NavLink href="#skills" icon={<Code className="w-5 h-5" />} label="Skills" />
                <NavLink href="#work" icon={<Layers className="w-5 h-5" />} label="Work" />
                <NavLink href="#contact" icon={<Mail className="w-5 h-5" />} label="Contact" />
            </div>
        </aside>
    );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 text-brand-gray hover:text-white transition-colors"
        >
            {icon}

            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-2 py-1 bg-white text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
            </span>
        </Link>
    );
}
