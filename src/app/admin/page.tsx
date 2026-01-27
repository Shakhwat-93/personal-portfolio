import { LayoutDashboard, Plus, User, Image, List, Code, Rocket, Activity, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase italic">Control Center</h1>
                <p className="text-brand-gray text-sm md:text-base font-medium">Real-time surveillance and management of your digital presence.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCard label="Technical Artifacts" value="20" color="from-blue-500 to-cyan-500" icon={List} />
                <StatCard label="Tech Stack Depth" value="12" color="from-purple-500 to-pink-500" icon={Code} />
                <StatCard label="System Sections" value="6" color="from-emerald-500 to-teal-500" icon={Activity} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                <div className="xl:col-span-8 bg-[#0c0c0e] rounded-[3.5rem] border border-white/5 p-10 md:p-14 space-y-10 relative overflow-hidden group">
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-all duration-1000" />

                    <div className="relative space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
                            <h2 className="text-2xl font-bold italic uppercase tracking-tight">System Initialization</h2>
                        </div>
                        <p className="text-brand-gray leading-relaxed text-lg font-medium max-w-2xl">
                            The administrative terminal is fully operational. All modules are synchronized with the live production environment. Your modifications will propagate across the global CDN instantly upon commit.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="/admin/projects"
                                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
                            >
                                <Plus className="w-4 h-4" />
                                Add Project
                            </Link>
                            <Link
                                href="/admin/profile"
                                className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all active:scale-95 border border-white/5"
                            >
                                <User className="w-4 h-4" />
                                Edit Identity
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-4 bg-[#0c0c0e] rounded-[3.5rem] border border-white/5 p-10 flex flex-col justify-center items-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-2">
                        <Rocket className="w-10 h-10 text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-bold uppercase italic">Quick Launch</h3>
                    <p className="text-brand-gray text-sm leading-relaxed px-4">
                        Navigate to any tactical section via the sidebar node system.
                    </p>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, color, icon: Icon }: { label: string; value: string; color: string; icon: any }) {
    return (
        <div className="p-10 bg-[#0c0c0e] rounded-[3rem] border border-white/5 hover:border-white/10 transition-all duration-500 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.02] group-hover:opacity-[0.05] transition-opacity`} />

            <div className="flex flex-col gap-4 relative">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">{label}</span>
                    <Icon className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-bold tracking-tighter italic">{value}</span>
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${color}`} />
                </div>
            </div>
        </div>
    );
}

