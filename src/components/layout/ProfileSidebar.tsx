'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Facebook, Download, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfileSidebar() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const { data, error } = await supabase
                    .from('profile')
                    .select('*')
                    .single();
                if (data) setProfile(data);
            } catch (err) {
                console.error('Profile fetch error:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    return (
        <aside className="w-full xl:fixed xl:left-0 xl:top-0 xl:h-screen xl:w-[400px] p-6 sm:p-8 flex flex-col z-50 relative">
            <div className="h-full w-full bg-[#111] rounded-3xl p-6 flex flex-col items-center text-center border border-white/5 relative overflow-hidden group">

                {/* Status Badge */}
                <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                        <span className="text-xs text-brand-gray font-medium">Available</span>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-8 relative border border-white/5">
                    <img
                        src={profile?.image_url || "/hero.jpg"}
                        alt={profile?.name || "Shakhwat Hossain Rasel"}
                        className="w-full h-full object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                    <div className="absolute bottom-6 left-6 text-left">
                        <h2 className="text-3xl font-heading font-bold leading-tight">{profile?.name?.split(' ')[0] || 'Shakhwat'}</h2>
                    </div>
                </div>

                {/* Details */}
                <div className="w-full mb-8 text-center xl:text-center">
                    <h3 className="text-xl font-bold mb-1">{profile?.name || 'Shakhwat Hossain'}</h3>
                    <a href={`mailto:${profile?.email || 'shakhwat.rasel989@gmail.com'}`} className="text-brand-gray text-sm hover:text-white transition-colors block mb-4 text-balance">
                        {profile?.email || 'shakhwat.rasel989@gmail.com'}
                    </a>
                    <p className="text-brand-gray text-xs uppercase tracking-widest">{profile?.location || 'Based in Dhaka, BD'}</p>
                </div>

                {/* Socials */}
                <div className="w-full flex justify-center gap-4 mb-auto">
                    <SocialLink href={profile?.github_url || "https://github.com/Start-with-Rasel"} icon={<Github className="w-5 h-5" />} />
                    <SocialLink href={profile?.linkedin_url || "https://www.linkedin.com/in/shakhwat-hossain-rasel-46506628b"} icon={<Linkedin className="w-5 h-5" />} />
                    <SocialLink href={`mailto:${profile?.email || "shakhwat.rasel989@gmail.com"}`} icon={<Mail className="w-5 h-5" />} />
                </div>

                {/* CTA */}
                <div className="w-full mt-8">
                    <Link
                        href="#contact"
                        className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                    >
                        Let's Talk <span className="text-lg">→</span>
                    </Link>
                </div>

            </div>
        </aside>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-brand-gray hover:text-white hover:bg-white/5 transition-all"
        >
            {icon}
        </a>
    );
}
