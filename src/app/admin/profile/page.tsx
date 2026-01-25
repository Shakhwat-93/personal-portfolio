'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw, Upload, Mail, MapPin, Github, Linkedin, Facebook } from 'lucide-react';

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
        const { data: profileData, error } = await supabase
            .from('profile')
            .select('*')
            .single();

        if (profileData) {
            setData(profileData);
        }
        setLoading(false);
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

    if (loading) return <div className="flex items-center gap-2 text-brand-gray"><RefreshCw className="w-5 h-5 animate-spin" /> Loading Profile...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold font-heading">Profile Settings</h1>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Avatar & Basic Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-[#0a0a0a] border border-white/5 group">
                            <img src={data.image_url || '/hero.jpg'} alt="Profile" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <div className="flex flex-col items-center gap-2">
                                    <Upload className="w-8 h-8 text-white" />
                                    <span className="text-xs uppercase font-bold text-white">Change Image</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-brand-gray uppercase tracking-widest">Image URL</label>
                                <input
                                    type="text"
                                    value={data.image_url}
                                    onChange={(e) => setData({ ...data, image_url: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl px-4 py-3 focus:border-white/20 outline-none transition-colors text-sm"
                                    placeholder="/hero.jpg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Detailed Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs text-brand-gray uppercase tracking-widest">Display Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-brand-gray uppercase tracking-widest flex items-center gap-2"><Mail className="w-3 h-3" /> Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                                    placeholder="hello@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-brand-gray uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> Location</label>
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => setData({ ...data, location: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                                placeholder="City, Country"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-brand-gray uppercase tracking-widest">Global Bio / Short Bio</label>
                            <textarea
                                rows={4}
                                value={data.bio}
                                onChange={(e) => setData({ ...data, bio: e.target.value })}
                                className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                                placeholder="Tell something about yourself..."
                            />
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-white/5 space-y-6">
                            <h3 className="text-sm text-brand-gray uppercase tracking-widest font-bold">Social Intelligence</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-brand-gray flex items-center gap-2"><Github className="w-3 h-3" /> GitHub URL</label>
                                    <input
                                        type="text"
                                        value={data.github_url}
                                        onChange={(e) => setData({ ...data, github_url: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-brand-gray flex items-center gap-2"><Linkedin className="w-3 h-3" /> LinkedIn URL</label>
                                    <input
                                        type="text"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData({ ...data, linkedin_url: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl px-4 py-3 focus:border-white/20 outline-none transition-colors"
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
