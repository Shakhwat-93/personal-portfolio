'use client';

import { useEffect, useState } from 'react';
import type { Service } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ServicesEditor() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [iconClass, setIconClass] = useState('fa-solid fa-code');
    const [orderIndex, setOrderIndex] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const router = useRouter();

    const fetchServices = () => {
        fetch('/api/services')
            .then(res => res.json())
            .then(data => {
                setServices(data.sort((a: Service, b: Service) => a.order_index - b.order_index));
                setLoading(false);
            })
            .catch(console.error);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setIconClass('fa-solid fa-code');
        setOrderIndex(services.length + 1);
        setIsActive(true);
    };

    const handleEdit = (service: Service) => {
        setEditingId(service.id);
        setTitle(service.title);
        setIconClass(service.icon_class);
        setOrderIndex(service.order_index);
        setIsActive(service.is_active);
    };

    // Wait, the code block below is cleaner:
    const confirmDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        // I'll try calling the ID route.
        const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchServices();
            router.refresh();
        } else {
            alert('Failed to delete. Backend might not support it yet.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = { title, icon_class: iconClass, order_index: orderIndex, is_active: isActive };

            if (editingId) {
                await fetch(`/api/services/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                await fetch('/api/services', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            resetForm();
            fetchServices();
            router.refresh();
        } catch (error) {
            alert('Failed to save');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Services</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="px-6 py-3 font-medium">Order</th>
                            <th className="px-6 py-3 font-medium">Title</th>
                            <th className="px-6 py-3 font-medium">Icon</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3 text-sm text-gray-500">{service.order_index}</td>
                                <td className="px-6 py-3 font-medium">{service.title}</td>
                                <td className="px-6 py-3 font-mono text-xs">{service.icon_class}</td>
                                <td className="px-6 py-3 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(service.id)}
                                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
                            <input
                                type="number"
                                value={orderIndex}
                                onChange={e => setOrderIndex(parseInt(e.target.value))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Class (FontAwesome)</label>
                            <input
                                type="text"
                                value={iconClass}
                                onChange={e => setIconClass(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            />
                        </div>
                        <div className="flex items-center pt-6">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={e => setIsActive(e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Visible
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            {editingId ? 'Update Service' : 'Add Service'}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
