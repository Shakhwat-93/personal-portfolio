'use client';

import { useEffect, useState } from 'react';
import type { ContactInfo } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ContactEditor() {
    const [contact, setContact] = useState<ContactInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/contact')
            .then(res => res.json())
            .then(data => {
                setContact(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact),
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

    if (loading || !contact) return <div>Loading...</div>;

    const Input = ({ label, field }: { label: string; field: keyof ContactInfo }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                value={contact[field] as string}
                onChange={e => setContact({ ...contact, [field]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
            />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-6">Edit Contact Info</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Email" field="email" />
                    <Input label="LinkedIn URL" field="linkedin_url" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Address Line 1" field="address_1" />
                    <Input label="Address Line 2" field="address_2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Footer Name" field="footer_name" />
                    <Input label="Copyright Text" field="copyright_text" />
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
