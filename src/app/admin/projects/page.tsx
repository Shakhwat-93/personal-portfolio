'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, ExternalLink, RefreshCw, Save, Edit3, X } from 'lucide-react';

export default function AdminProjects() {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProject, setEditingProject] = useState<any | null>(null);
    const [newProject, setNewProject] = useState({
        title: '',
        category: '',
        image_url: '',
        link: '',
        year: new Date().getFullYear().toString(),
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('display_order', { ascending: true });

        if (data) setProjects(data);
        setLoading(false);
    }

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        const { data, error } = await supabase
            .from('projects')
            .insert([{ ...newProject, display_order: projects.length }]);

        if (!error) {
            setIsAdding(false);
            setNewProject({ title: '', category: '', image_url: '', link: '', year: new Date().getFullYear().toString() });
            fetchProjects();
        } else {
            alert(error.message);
        }
    }

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!editingProject) return;

        const { error } = await supabase
            .from('projects')
            .update({
                title: editingProject.title,
                category: editingProject.category,
                image_url: editingProject.image_url,
                link: editingProject.link,
                year: editingProject.year
            })
            .eq('id', editingProject.id);

        if (!error) {
            setEditingProject(null);
            fetchProjects();
        } else {
            alert(error.message);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this project?')) return;
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) fetchProjects();
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-bold font-heading mb-2">Manage Projects</h1>
                    <p className="text-brand-gray">Add, edit, or remove projects from your portfolio showcase.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/10"
                >
                    {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {isAdding ? 'Cancel' : 'Add New Project'}
                </button>
            </div>

            {/* Add Project Form */}
            {isAdding && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleAdd} className="bg-[#0a0a0a] w-full max-w-2xl p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Add New Project</h2>
                            <button type="button" onClick={() => setIsAdding(false)} className="p-2 hover:bg-white/5 rounded-full"><X /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-brand-gray uppercase tracking-widest">Project Title</label>
                                <input
                                    required
                                    type="text"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                    placeholder="My Awesome App"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-brand-gray uppercase tracking-widest">Category</label>
                                <input
                                    required
                                    type="text"
                                    value={newProject.category}
                                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                    placeholder="Next.js & React"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-brand-gray uppercase tracking-widest">Live Link (URL)</label>
                                <input
                                    required
                                    type="url"
                                    value={newProject.link}
                                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-brand-gray uppercase tracking-widest">Year</label>
                                <input
                                    required
                                    type="text"
                                    value={newProject.year}
                                    onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                    placeholder="2025"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-brand-gray uppercase tracking-widest">Image URL</label>
                            <input
                                required
                                type="text"
                                value={newProject.image_url}
                                onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                placeholder="/projects/demo.png"
                            />
                        </div>
                        <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg">
                            Create Project
                        </button>
                    </form>
                </div>
            )}

            {/* Edit Project Modal */}
            {editingProject && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleUpdate} className="bg-[#0a0a0a] w-full max-w-2xl p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Edit Project</h2>
                            <button type="button" onClick={() => setEditingProject(null)} className="p-2 hover:bg-white/5 rounded-full"><X /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-brand-gray uppercase tracking-widest">Project Title</label>
                                <input
                                    required
                                    type="text"
                                    value={editingProject.title}
                                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-brand-gray uppercase tracking-widest">Category</label>
                                <input
                                    required
                                    type="text"
                                    value={editingProject.category}
                                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-brand-gray uppercase tracking-widest">Live Link (URL)</label>
                                <input
                                    required
                                    type="url"
                                    value={editingProject.link}
                                    onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-brand-gray uppercase tracking-widest">Year</label>
                                <input
                                    required
                                    type="text"
                                    value={editingProject.year}
                                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-brand-gray uppercase tracking-widest">Image URL</label>
                            <input
                                required
                                type="text"
                                value={editingProject.image_url}
                                onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-colors"
                            />
                        </div>
                        <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg flex items-center justify-center gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-brand-gray gap-4">
                    <RefreshCw className="w-10 h-10 animate-spin text-white" />
                    <p className="animate-pulse">Loading Projects...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.length > 0 ? projects.map((project) => (
                        <div key={project.id} className="bg-[#0a0a0a] p-6 rounded-3xl border border-white/5 flex flex-col group hover:border-white/20 transition-all duration-500 shadow-xl">
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-white/5 border border-white/10">
                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => setEditingProject(project)}
                                        className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                                        title="Edit Project"
                                    >
                                        <Edit3 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform shadow-xl"
                                        title="Delete Project"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold font-heading">{project.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-brand-gray text-sm">{project.category}</span>
                                        <span className="w-1 h-1 bg-brand-gray/30 rounded-full" />
                                        <span className="text-brand-gray text-xs px-2 py-0.5 border border-white/10 rounded-full">{project.year}</span>
                                    </div>
                                </div>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    className="p-2 bg-white/5 text-brand-gray rounded-full hover:bg-white/10 hover:text-white transition-all"
                                    title="View Live"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-20 border border-dashed border-white/10 rounded-3xl text-center">
                            <p className="text-brand-gray">No projects found. Start by adding your first project!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

