'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw, Mail, MapPin, Github, Linkedin, Facebook, User as UserIcon } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminProfile() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        location: '',
        bio: '',
        image_url: '',
        github_url: '',
        linkedin_url: '',
        facebook_url: '',
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        setLoading(true);
        try {
            const { data: profileData, error } = await supabase
                .from('profile')
                .select('*')
                .single();

            if (profileData) {
                setData(profileData);
            }
        } catch (err) {
            console.error('Fetch profile error:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        const { error } = await supabase
            .from('profile')
            .upsert({ ...data, updated_at: new Date() });

        if (error) {
            alert('Error saving profile: ' + error.message);
        } else {
            alert('Profile updated successfully!');
        }
        setSaving(false);
    }

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-32 text-brand-gray gap-5">
            <RefreshCw className="w-12 h-12 animate-spin text-white opacity-20" />
            <p className="text-xs uppercase tracking-[0.3em] font-bold animate-pulse">Syncing Profile...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase italic">General settings</h1>
                    <p className="text-brand-gray text-sm md:text-base font-medium">Control how you are perceived by the digital world.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50 shadow-xl active:scale-95"
                >
                    {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    <span>{saving ? 'Syncing...' : 'Push Updates'}</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* Visual Identity */}
                <div className="xl:col-span-4 space-y-8">
                    <div className="bg-[#0c0c0e] p-8 rounded-[3rem] border border-white/5 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                            <h3 className="text-sm font-bold uppercase tracking-widest italic">Visual Identity</h3>
                        </div>

                        <ImageUpload
                            defaultValue={data.image_url}
                            onUpload={(url) => setData({ ...data, image_url: url })}
                        />

                        <div className="space-y-2">
                            <label className="text-[10px] text-brand-gray uppercase tracking-widest font-bold">Raw Asset URL</label>
                            <input
                                type="text"
                                value={data.image_url}
                                onChange={(e) => setData({ ...data, image_url: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/20 transition-colors text-xs font-mono text-zinc-500"
                                placeholder="/hero.jpg"
                            />
                        </div>
                    </div>
                </div>

                {/* Core Manifest */}
                <div className="xl:col-span-8 space-y-10">
                    <div className="bg-[#0c0c0e] p-8 md:p-12 rounded-[3.5rem] border border-white/5 space-y-10">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-white rounded-full" />
                            <h3 className="text-sm font-bold uppercase tracking-widest italic">Core Manifest</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-xs text-brand-gray uppercase tracking-widest font-bold">Identity Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium text-lg"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs text-brand-gray uppercase tracking-widest font-bold flex items-center gap-2">Contact Link</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all font-medium text-lg"
                                    placeholder="hello@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs text-brand-gray uppercase tracking-widest font-bold flex items-center gap-2">Base Operations (Location)</label>
                            <div className="relative">
                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray" />
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData({ ...data, location: e.target.value })}
                                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-white/20 transition-all font-medium"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs text-brand-gray uppercase tracking-widest font-bold">Persona Narrative (Bio)</label>
                            <textarea
                                rows={5}
                                value={data.bio}
                                onChange={(e) => setData({ ...data, bio: e.target.value })}
                                className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] px-8 py-6 outline-none focus:border-white/20 transition-all font-medium leading-relaxed"
                                placeholder="Tell your story..."
                            />
                        </div>

                        {/* Social Logic */}
                        <div className="pt-10 border-t border-white/5 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-zinc-800 rounded-full" />
                                <h3 className="text-sm font-bold uppercase tracking-widest italic text-zinc-400">Social Interface</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs text-brand-gray flex items-center gap-2 font-bold uppercase tracking-widest">
                                        <Github className="w-4 h-4" /> GitHub Archive
                                    </label>
                                    <input
                                        type="text"
                                        value={data.github_url}
                                        onChange={(e) => setData({ ...data, github_url: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all text-sm font-mono"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs text-brand-gray flex items-center gap-2 font-bold uppercase tracking-widest">
                                        <Linkedin className="w-4 h-4" /> LinkedIn Node
                                    </label>
                                    <input
                                        type="text"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData({ ...data, linkedin_url: e.target.value })}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-white/20 transition-all text-sm font-mono"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

