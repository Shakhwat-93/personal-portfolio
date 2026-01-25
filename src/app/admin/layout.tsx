'use client';

import Link from 'next/link';
import { LayoutDashboard, User, Image, List, Settings, LogOut, Code, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/profile', label: 'Profile', icon: User },
    { href: '/admin/hero', label: 'Hero Section', icon: Image },
    { href: '/admin/about', label: 'About', icon: MessageCircle },
    { href: '/admin/skills', label: 'Skills', icon: Code },
    { href: '/admin/projects', label: 'Projects', icon: List },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-[#050505] text-white font-sans">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50">
                <div className="p-8 border-b border-white/5">
                    <h1 className="text-xl font-bold tracking-tight">Admin <span className="text-brand-gray">Panel</span></h1>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-white text-black font-bold'
                                        : 'text-brand-gray hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'group-hover:scale-110 transition-transform'}`} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/5">
                    <button className="flex items-center gap-3 text-red-500 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-10">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
