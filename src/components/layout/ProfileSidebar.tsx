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
        <aside className="w-full xl:fixed xl:left-0 xl:top-0 xl:h-screen xl:w-[400px] p-4 sm:p-8 flex flex-col z-50 relative">
            <div className="h-full w-full bg-[#0c0c0e] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center border border-white/5 relative overflow-hidden group shadow-2xl">

                {/* Status Badge */}
                <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20" />
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">Available for Hire</span>
                    </div>
                </div>

                {/* Profile Image */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-10 relative border border-white/5 shadow-2xl">
                    <img
                        src={profile?.image_url || "/hero.jpg"}
                        alt={profile?.name || "Shakhwat Hossain Rasel"}
                        className="w-full h-full object-cover object-[center_20%] transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                    <div className="absolute bottom-6 left-6 text-left">
                        <h2 className="text-3xl font-bold tracking-tighter uppercase italic">{profile?.name?.split(' ')[0] || 'Shakhwat'}</h2>
                    </div>
                </div>

                {/* Details */}
                <div className="w-full mb-10 text-center">
                    <h3 className="text-2xl font-bold tracking-tighter uppercase mb-1">{profile?.name || 'Shakhwat Hossain'}</h3>
                    <a href={`mailto:${profile?.email || 'shakhwat.rasel989@gmail.com'}`} className="text-brand-gray text-xs sm:text-sm hover:text-white transition-colors block mb-6 tracking-wide font-medium">
                        {profile?.email || 'shakhwat.rasel989@gmail.com'}
                    </a>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        <span className="text-[10px] text-brand-gray uppercase font-bold tracking-[0.2em]">{profile?.location || 'Dhaka, Bangladesh'}</span>
                    </div>
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
