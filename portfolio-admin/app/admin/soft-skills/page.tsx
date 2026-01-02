'use client';

import { useEffect, useState } from 'react';
import type { SoftSkill } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SoftSkillsEditor() {
    const [skills, setSkills] = useState<SoftSkill[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [iconClass, setIconClass] = useState('fa-solid fa-puzzle-piece');
    const [orderIndex, setOrderIndex] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const router = useRouter();

    const fetchSkills = () => {
        fetch('/api/soft-skills')
            .then(res => res.json())
            .then(data => {
                setSkills(data.sort((a: SoftSkill, b: SoftSkill) => a.order_index - b.order_index));
                setLoading(false);
            })
            .catch(console.error);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setDescription('');
        setIconClass('fa-solid fa-puzzle-piece');
        setOrderIndex(skills.length + 1);
        setIsActive(true);
    };

    const handleEdit = (skill: SoftSkill) => {
        setEditingId(skill.id);
        setTitle(skill.title);
        setDescription(skill.description);
        setIconClass(skill.icon_class);
        setOrderIndex(skill.order_index);
        setIsActive(skill.is_active);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const res = await fetch(`/api/soft-skills/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchSkills();
            router.refresh();
        } else {
            alert('Failed to delete. Backend might not support it yet.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = { title, description, icon_class: iconClass, order_index: orderIndex, is_active: isActive };

            if (editingId) {
                await fetch(`/api/soft-skills/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                await fetch('/api/soft-skills', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            resetForm();
            fetchSkills();
            router.refresh();
        } catch (error) {
            alert('Failed to save');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Soft Skills</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="px-6 py-3 font-medium">Order</th>
                            <th className="px-6 py-3 font-medium">Title</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {skills.map((skill) => (
                            <tr key={skill.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3 text-sm text-gray-500">{skill.order_index}</td>
                                <td className="px-6 py-3 font-medium">{skill.title}</td>
                                <td className="px-6 py-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${skill.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {skill.is_active ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(skill)}
                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(skill.id)}
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
                <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                        />
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
                            {editingId ? 'Update Skill' : 'Add Skill'}
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
