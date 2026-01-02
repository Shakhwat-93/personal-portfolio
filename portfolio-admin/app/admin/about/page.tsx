'use client';

import { useEffect, useState } from 'react';
import type { AboutSection } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AboutEditor() {
    const [about, setAbout] = useState<AboutSection | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/about')
            .then(res => res.json())
            .then(data => {
                setAbout(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/about', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(about),
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

    if (loading || !about) return <div>Loading...</div>;

    const Input = ({ label, field }: { label: string; field: keyof AboutSection }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                value={about[field] as string}
                onChange={e => setAbout({ ...about, [field]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-6">Edit About Section</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                    <textarea
                        value={about.heading}
                        onChange={e => setAbout({ ...about, heading: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Phone" field="phone" />
                    <Input label="Email" field="email" />
                </div>
                <Input label="CV Link (URL)" field="cv_url" />

                <h3 className="text-lg font-semibold pt-4">Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Image 1 URL" field="image1_url" />
                    <Input label="Image 2 URL" field="image2_url" />
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
