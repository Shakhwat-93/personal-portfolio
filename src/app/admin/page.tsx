export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-4xl font-bold font-heading mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard label="Total Projects" value="20" color="bg-blue-500" />
                <StatCard label="Tech Stack Items" value="12" color="bg-purple-500" />
                <StatCard label="Live Sections" value="6" color="bg-green-500" />
            </div>

            <div className="mt-12 p-8 bg-[#0a0a0a] rounded-3xl border border-white/5">
                <h2 className="text-xl font-bold mb-4">Welcome to your Admin Panel</h2>
                <p className="text-brand-gray leading-relaxed max-w-2xl">
                    From here, you can control everything on your portfolio in real-time.
                    Use the sidebar to navigate to the specific sections you want to edit.
                    Any changes you make will be instantly saved and reflected on your public website.
                </p>
            </div>
        </div>
    );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="p-8 bg-[#0a0a0a] rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-sm text-brand-gray uppercase tracking-widest">{label}</span>
            <div className="flex items-center gap-4 mt-2">
                <div className={`w-1 h-8 rounded-full ${color}`} />
                <span className="text-4xl font-bold font-heading">{value}</span>
            </div>
        </div>
    );
}
