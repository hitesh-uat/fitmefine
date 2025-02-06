'use client';
import AppSidebar from '@/components/AppSidebar';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChaptersSidebar from './user/courses/[courseId]/ChaptersSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(pathname);

  useEffect(() => {
    if (isCoursePage) {
      const match = pathname.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathname]);

  if (!isLoaded) return <Loading />;
  if (!user) return <div className="p-4 text-red-600">Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Main App Sidebar */}
        <AppSidebar />

        {/* Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Course Chapters Sidebar + Main Content */}
          <div className="flex h-full">
            {courseId && (
              <div className="shrink-0 border-r bg-white">
                <ChaptersSidebar />
              </div>
            )}

            {/* Main Content */}
            <div className={cn(
              "flex-1 overflow-y-auto",
              isCoursePage ? "bg-customgreys-primarybg" : "bg-customgreys-secondarybg"
            )}>
              <Navbar isCoursePage={isCoursePage} />
              <main className="p-4 md:p-6 bg-white-100">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}