'use client';

import { usePathname } from 'next/navigation';
import ProfileSidebar from "@/components/layout/ProfileSidebar";
import NavigationDock from "@/components/layout/NavigationDock";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    return (
        <div className="flex flex-col xl:flex-row min-h-screen">
            {!isAdmin && <ProfileSidebar />}

            <main className={`flex-1 w-full min-h-screen relative z-10 ${!isAdmin ? 'xl:ml-[400px] xl:mr-[100px]' : ''}`}>
                {children}
            </main>

            {!isAdmin && <NavigationDock />}
        </div>
    );
}
