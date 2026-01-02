'use client';

import { useEffect, useState } from 'react';
import type { Skill } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SkillsEditor() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [name, setName] = useState('');
    const [orderIndex, setOrderIndex] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const router = useRouter();

    const fetchSkills = () => {
        fetch('/api/skills')
            .then(res => res.json())
            .then(data => {
                setSkills(data.sort((a: Skill, b: Skill) => a.order_index - b.order_index));
                setLoading(false);
            })
            .catch(console.error);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setOrderIndex(skills.length + 1);
        setIsActive(true);
    };

    const handleEdit = (skill: Skill) => {
        setEditingId(skill.id);
        setName(skill.name);
        setOrderIndex(skill.order_index);
        setIsActive(skill.is_active);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;
        try {
            await fetch(`/api/skills/${id}`, { method: 'DELETE' });
            fetchSkills();
            router.refresh();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = { name, order_index: orderIndex, is_active: isActive };

            if (editingId) {
                // Update
                await fetch(`/api/skills/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                // Create
                await fetch('/api/skills', {
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
            <h1 className="text-2xl font-bold mb-6">Manage Skills</h1>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="px-6 py-3 font-medium">Order</th>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {skills.map((skill) => (
                            <tr key={skill.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3 text-sm text-gray-500">{skill.order_index}</td>
                                <td className="px-6 py-3 font-medium">{skill.name}</td>
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
                        {skills.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No skills found. Add one below.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
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

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={e => setIsActive(e.target.checked)}
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Visible on website
                        </label>
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
