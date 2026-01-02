'use client';

import Link from 'next/link';

export default function AdminDashboard() {
    const sections = [
        { name: 'Hero Section', href: '/admin/hero', icon: 'fa-house', color: 'bg-blue-500' },
        { name: 'About Me', href: '/admin/about', icon: 'fa-user', color: 'bg-purple-500' },
        { name: 'Skills', href: '/admin/skills', icon: 'fa-code', color: 'bg-green-500' },
        { name: 'Projects', href: '/admin/projects', icon: 'fa-folder-open', color: 'bg-orange-500' },
        { name: 'Services', href: '/admin/services', icon: 'fa-briefcase', color: 'bg-pink-500' },
        { name: 'Stats', href: '/admin/stats', icon: 'fa-chart-simple', color: 'bg-indigo-500' },
        { name: 'Contact', href: '/admin/contact', icon: 'fa-envelope', color: 'bg-red-500' },
        { name: 'Settings', href: '/admin/settings', icon: 'fa-gear', color: 'bg-gray-600' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sections.map((section) => (
                    <Link
                        key={section.href}
                        href={section.href}
                        className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
                    >
                        <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                            <i className={`fa-solid ${section.icon} text-xl`}></i>
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {section.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Manage content</p>
                    </Link>
                ))}
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Tips</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Changes made here reflect immediately on the live site.</li>
                    <li>Use high-quality images for the carousel and projects.</li>
                    <li>Keep your "About" section concise and engaging.</li>
                    <li>Regularly update your stats to show progress.</li>
                </ul>
            </div>
        </div>
    );
}
