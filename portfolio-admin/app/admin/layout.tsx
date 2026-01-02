'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // If on login page, just render children without sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: 'fa-gauge' },
        { name: 'Hero Section', href: '/admin/hero', icon: 'fa-house' },
        { name: 'About Me', href: '/admin/about', icon: 'fa-user' },
        { name: 'Skills', href: '/admin/skills', icon: 'fa-code' },
        { name: 'Services', href: '/admin/services', icon: 'fa-briefcase' },
        { name: 'Projects', href: '/admin/projects', icon: 'fa-folder-open' },
        { name: 'Soft Skills', href: '/admin/soft-skills', icon: 'fa-comments' },
        { name: 'Stats', href: '/admin/stats', icon: 'fa-chart-simple' },
        { name: 'Contact', href: '/admin/contact', icon: 'fa-envelope' },
        { name: 'Settings', href: '/admin/settings', icon: 'fa-gear' },
    ];

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                        <span className="text-xl font-bold tracking-tight">Portfolio Admin</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? 'bg-[#D4F954] text-black'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
                        >
                            <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600">
                        <i className="fa-solid fa-bars text-xl"></i>
                    </button>
                    <span className="font-bold">Admin Panel</span>
                    <div className="w-6"></div> {/* Spacer */}
                </div>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
