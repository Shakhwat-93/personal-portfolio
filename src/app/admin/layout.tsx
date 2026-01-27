'use client';

import Link from 'next/link';
import { LayoutDashboard, User, Image, List, Settings, LogOut, Code, MessageCircle, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="flex min-h-screen bg-[#050505] text-white font-sans relative">

            {/* Mobile Top Bar */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-6 z-[60]">
                <h1 className="text-lg font-bold tracking-tight">Admin <span className="text-brand-gray text-sm">Panel</span></h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:sticky left-0 top-0 h-screen w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/100' : '-translate-x-full'}`}>
                <div className="p-8 border-b border-white/5 hidden lg:block">
                    <h1 className="text-xl font-bold tracking-tight">Admin <span className="text-brand-gray">Panel</span></h1>
                </div>

                <div className="lg:hidden p-8 border-b border-white/5 flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-tight">Navigation</h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto mt-16 lg:mt-0">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                    ? 'bg-white text-black font-bold shadow-lg shadow-white/5'
                                    : 'text-brand-gray hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'group-hover:scale-110 transition-transform'}`} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/5 bg-[#0a0a0a]">
                    <button className="flex items-center gap-3 text-red-500 w-full px-4 py-4 rounded-2xl hover:bg-red-500/10 transition-all font-medium">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0 pt-16 lg:pt-0">
                <div className="max-w-7xl mx-auto p-6 md:p-10 xl:p-16">
                    {children}
                </div>
            </main>
        </div>
    );
}

