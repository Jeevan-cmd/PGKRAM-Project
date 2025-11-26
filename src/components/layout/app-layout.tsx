'use client';

import { usePathname, useRouter } from 'next/navigation';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/layout/main-sidebar';
import { useUser } from '@/firebase';
import { useEffect } from 'react';
import { Footer } from './footer';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useUser();
  const isAuthPage = pathname === '/' || pathname === '/signup';

  useEffect(() => {
    if (loading) return; // Wait until user status is determined

    if (!user && !isAuthPage) {
      router.push('/');
    }
  }, [user, loading, isAuthPage, router]);

  if (isAuthPage) {
    return <>{children}</>;
  }
  
  if (loading || !user) {
    // You can show a loading spinner here
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
