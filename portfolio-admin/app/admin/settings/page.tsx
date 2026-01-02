'use client';

import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SettingsEditor() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                setSettings(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                alert('Saved successfully!');
                router.refresh();
            } else {
                alert('Failed to save.');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving.');
        } finally {
            setSaving(false);
        }
    };

    if (loading || !settings) return <div>Loading...</div>;

    const Input = ({ label, field }: { label: string; field: keyof SiteSettings }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                value={settings[field] as string || ''}
                onChange={e => setSettings({ ...settings, [field]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Meta Title" field="meta_title" />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea
                        value={settings.meta_description}
                        onChange={e => setSettings({ ...settings, meta_description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Logo URL" field="logo_url" />
                    <Input label="Favicon URL" field="favicon_url" />
                </div>

                <Input label="OG Image URL (Social Share)" field="og_image_url" />

                <h3 className="text-lg font-semibold pt-4">Analytics & Tracking</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Google Analytics ID" field="google_analytics_id" />
                    <Input label="Facebook Pixel ID" field="facebook_pixel_id" />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
