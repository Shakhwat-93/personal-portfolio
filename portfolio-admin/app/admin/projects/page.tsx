'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ProjectsEditor() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [orderIndex, setOrderIndex] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);

    const router = useRouter();

    const fetchProjects = () => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data.sort((a: Project, b: Project) => a.order_index - b.order_index));
                setLoading(false);
            })
            .catch(console.error);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setTitle('');
        setDescription('');
        setImageUrl('');
        setLiveUrl('');
        setGithubUrl('');
        setOrderIndex(projects.length + 1);
        setIsActive(true);
        setIsFeatured(false);
    };

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setTitle(project.title);
        setDescription(project.description);
        setImageUrl(project.image_url);
        setLiveUrl(project.live_url);
        setGithubUrl(project.github_url || '');
        setOrderIndex(project.order_index);
        setIsActive(project.is_active);
        setIsFeatured(project.is_featured);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            fetchProjects();
            router.refresh();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                title,
                description,
                image_url: imageUrl,
                live_url: liveUrl,
                github_url: githubUrl,
                order_index: orderIndex,
                is_active: isActive,
                is_featured: isFeatured
            };

            if (editingId) {
                // Update
                await fetch(`/api/projects/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                // Create
                await fetch('/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            resetForm();
            fetchProjects();
            router.refresh();
        } catch (error) {
            alert('Failed to save');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Projects</h1>

            {/* List */}
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
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3 text-sm text-gray-500">{project.order_index}</td>
                                <td className="px-6 py-3 font-medium">{project.title}</td>
                                <td className="px-6 py-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {project.is_active ? 'Active' : 'Hidden'}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No projects found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
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
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
                            <input
                                type="text"
                                value={liveUrl}
                                onChange={e => setLiveUrl(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                            <input
                                type="text"
                                value={githubUrl}
                                onChange={e => setGithubUrl(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center">
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
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isFeatured}
                                onChange={e => setIsFeatured(e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Featured (Carousel)
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            {editingId ? 'Update Project' : 'Add Project'}
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
