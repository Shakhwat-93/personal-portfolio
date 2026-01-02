'use client';

import { useEffect, useState } from 'react';
import type { HeroSection } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function HeroEditor() {
    const [hero, setHero] = useState<HeroSection | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => {
                setHero(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/hero', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hero),
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

    if (loading || !hero) return <div>Loading...</div>;

    const Input = ({ label, field }: { label: string; field: keyof HeroSection }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                value={hero[field] as string}
                onChange={e => setHero({ ...hero, [field]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-6">Edit Hero Section</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Greeting Text" field="greeting_text" />
                    <Input label="Name" field="name" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={hero.description}
                        onChange={e => setHero({ ...hero, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="CTA Text" field="cta_text" />
                    <Input label="CTA Link" field="cta_link" />
                </div>
                <Input label="Hero Image URL" field="hero_image_url" />

                <h3 className="text-lg font-semibold pt-4">Links & Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Portfolio Link" field="portfolio_link" />
                    <Input label="LinkedIn Link" field="linkedin_link" />
                    <Input label="Availability Text" field="availability_text" />
                </div>

                <h3 className="text-lg font-semibold pt-4">Education & Role</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Education Text" field="education_text" />
                    <Input label="Institution" field="institution" />
                    <Input label="Role Title" field="role_title" />
                    <Input label="Projects Count" field="projects_count" />
                </div>
                <Input label="Role Description" field="role_description" />

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
