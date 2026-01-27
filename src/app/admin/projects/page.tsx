'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, ExternalLink, RefreshCw, Save, Edit3, X, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

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
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('display_order', { ascending: true });

            if (data) setProjects(data);
        } catch (err) {
            console.error('Fetch projects error:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        const { error } = await supabase
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
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase italic">Projects Showcase</h1>
                    <p className="text-brand-gray text-sm md:text-base font-medium">Manage your professional technical portfolio artifacts.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create Project</span>
                </button>
            </div>

            {/* Add Project Modal */}
            {isAdding && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-0 sm:p-6 overflow-y-auto">
                    <div className="bg-[#0c0c0e] w-full max-w-3xl min-h-screen sm:min-h-0 sm:rounded-[2.5rem] border border-white/5 flex flex-col shadow-2xl">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#0c0c0e] z-10">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight italic uppercase">New Project</h2>
                                <p className="text-xs text-brand-gray uppercase tracking-widest mt-1">Add a new artifact to your showcase</p>
                            </div>
                            <button onClick={() => setIsAdding(false)} className="p-3 hover:bg-white/5 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                        </div>

                        <form onSubmit={handleAdd} className="p-8 space-y-8 flex-1 overflow-y-auto">
                            <ImageUpload
                                label="Project Thumbnail"
                                defaultValue={newProject.image_url}
                                onUpload={(url) => setNewProject({ ...newProject, image_url: url })}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm text-brand-gray uppercase tracking-widest font-bold">Project Title</label>
                                    <input
                                        required
                                        type="text"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all font-medium"
                                        placeholder="e.g. AI Workflow Engine"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm text-brand-gray uppercase tracking-widest font-bold">Stack / Category</label>
                                    <input
                                        required
                                        type="text"
                                        value={newProject.category}
                                        onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all font-medium"
                                        placeholder="e.g. Next.js & Supabase"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm text-brand-gray uppercase tracking-widest font-bold">Launch URL</label>
                                    <input
                                        required
                                        type="url"
                                        value={newProject.link}
                                        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all font-medium"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm text-brand-gray uppercase tracking-widest font-bold">Release Year</label>
                                    <input
                                        required
                                        type="text"
                                        value={newProject.year}
                                        onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all font-medium"
                                        placeholder="2025"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-bold hover:bg-zinc-200 transition-all shadow-xl active:scale-[0.98]">
                                    Initialize Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {editingProject && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-0 sm:p-6 overflow-y-auto">
                    <div className="bg-[#0c0c0e] w-full max-w-3xl min-h-screen sm:min-h-0 sm:rounded-[2.5rem] border border-white/5 flex flex-col shadow-2xl">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center sticky top-0 bg-[#0c0c0e] z-10">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight italic uppercase text-blue-400">Edit Artifact</h2>
                                <p className="text-xs text-brand-gray uppercase tracking-widest mt-1">Refining: {editingProject.title}</p>
                            </div>
                            <button onClick={() => setEditingProject(null)} className="p-3 hover:bg-white/5 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-8 space-y-8 flex-1 overflow-y-auto">
                            <ImageUpload
                                label="Update Thumbnail"
                                defaultValue={editingProject.image_url}
                                onUpload={(url) => setEditingProject({ ...editingProject, image_url: url })}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm text-brand-gray uppercase tracking-widest font-bold">Project Title</label>
                                    <input
                                        required
                                        type="text"
                                        value={editingProject.title}
                                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm text-brand-gray uppercase tracking-widest font-bold">Stack / Category</label>
                                    <input
                                        required
                                        type="text"
                                        value={editingProject.category}
                                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm text-brand-gray uppercase tracking-widest font-bold">Live Link</label>
                                    <input
                                        required
                                        type="url"
                                        value={editingProject.link}
                                        onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm text-brand-gray uppercase tracking-widest font-bold">Year</label>
                                    <input
                                        required
                                        type="text"
                                        value={editingProject.year}
                                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button type="submit" className="w-full bg-blue-500 text-white py-5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2">
                                    <Save className="w-5 h-5" /> Commit Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 text-brand-gray gap-5">
                    <RefreshCw className="w-12 h-12 animate-spin text-white opacity-20" />
                    <p className="text-xs uppercase tracking-[0.3em] font-bold animate-pulse">Syncing Data...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                    {projects.length > 0 ? projects.map((project) => (
                        <div key={project.id} className="bg-[#0c0c0e] rounded-[2.5rem] border border-white/5 flex flex-col group hover:border-white/20 transition-all duration-700 shadow-2xl overflow-hidden">
                            <div className="relative aspect-video overflow-hidden bg-black/40 border-b border-white/5">
                                <img src={project.image_url || '/hero.jpg'} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={() => setEditingProject(project)}
                                        className="p-3 bg-white/10 backdrop-blur-xl text-white rounded-full hover:bg-white hover:text-black transition-all shadow-2xl active:scale-90"
                                        title="Edit Artifact"
                                    >
                                        <Edit3 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-3 bg-red-500/10 backdrop-blur-xl text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-2xl active:scale-90"
                                        title="Delete Artifact"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-[10px] text-white/50 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase font-bold tracking-widest">{project.year}</span>
                                </div>
                            </div>
                            <div className="p-8 flex items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold tracking-tight italic uppercase">{project.title}</h3>
                                    <p className="text-brand-gray text-sm font-medium">{project.category}</p>
                                </div>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    className="p-4 bg-white/5 text-brand-gray rounded-[1.5rem] hover:bg-white hover:text-black transition-all group/link"
                                    title="View Deployment"
                                >
                                    <ExternalLink className="w-6 h-6 transition-transform group-hover/link:rotate-45" />
                                </a>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full py-32 border-2 border-dashed border-white/5 rounded-[3rem] text-center flex flex-col items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                <ImageIcon className="w-8 h-8 text-brand-gray" />
                            </div>
                            <div>
                                <p className="text-brand-gray font-medium text-lg">Empty Showcase Archive</p>
                                <p className="text-brand-gray/50 text-xs uppercase tracking-widest mt-1">Start initializing artifacts</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


