'use client';
import NonDashboardNavbar from '@/components/NonDashboardNavbar';
import Landing from '@/app/(nondashboard)/landing/page';
import Footer from '@/components/Footer';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const getRedirectUrl = (userType: unknown) => {
  if (userType === 'teacher') {
    return '/teacher/courses';
  }
  return '/user/courses';
};

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const redirectUrl = getRedirectUrl(user.publicMetadata.userType);
      router.push(redirectUrl);
    }
  }, [user, router]);

  return (
    <div className='nondashboard-layout'>
      <NonDashboardNavbar />
      <main className='nondashboard-layout__main'>
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
