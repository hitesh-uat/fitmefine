'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { UserButton, useUser } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Bell, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = ({ isCoursePage }: { isCoursePage: boolean }) => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as 'student' | 'teacher';
  const [notificationPulse, setNotificationPulse] = useState(true);

  return (
    <nav className='sticky top-0 z-40 bg-gradient-to-r from-primary/95 to-primary/90 backdrop-blur-lg shadow-xl animate-fade-in-down'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Left Section */}
          <div className='flex items-center space-x-4'>
            <div className='md:hidden'>
              <SidebarTrigger className='text-primary-foreground hover:text-primary-foreground/80 transition-colors duration-300 hover:scale-110' />
            </div>

            <div className='relative group'>
              <Link
                href='/search'
                className={cn(
                  'flex items-center px-4 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20',
                  'transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg',
                  'border border-primary-foreground/20 hover:border-primary-foreground/30',
                  {
                    '!bg-primary-foreground/20': isCoursePage,
                  }
                )}
                scroll={false}
              >
                <span className='hidden sm:inline text-primary-foreground/90 font-medium'>
                  Search Programs
                </span>
                <span className='sm:hidden text-primary-foreground/90 font-medium'>
                  Search
                </span>
                <BookOpen
                  className='ml-2 text-primary-foreground/70 group-hover:text-primary-foreground 
                           transition-all duration-300 group-hover:translate-x-1'
                  size={18}
                />
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className='flex items-center space-x-6'>
            <button
              className='relative p-2 hover:bg-primary-foreground/10 rounded-full transition-all duration-300
                       hover:rotate-12 hover:scale-110'
              onClick={() => setNotificationPulse(false)}
            >
              {notificationPulse && (
                <span className='absolute top-1 right-1.5 h-2 w-2 bg-red-400 rounded-full animate-ping' />
              )}
              <span className='absolute top-1 right-1.5 h-2 w-2 bg-red-500 rounded-full' />
              <Bell
                className='h-6 w-6 text-primary-foreground/90 hover:text-primary-foreground 
                            transition-colors duration-300'
              />
            </button>

            <div className='hover:transform hover:-translate-y-0.5 transition-all duration-300'>
              <UserButton
                appearance={{
                  baseTheme: dark,
                  elements: {
                    // Fixed text color for better contrast
                    userButtonOuterIdentifier:
                      'text-primary-foreground/90 hover:text-primary-foreground',
                    userButtonBox: 'scale-90 sm:scale-100 hover:scale-105',
                    userButtonAvatarBox:
                      'h-8 w-8 border-2 border-primary-foreground/20 hover:border-primary-foreground/40',
                    userButtonPopoverCard: 'shadow-xl',
                    // Add these new properties for text elements
                    userButtonTrigger: 'text-primary-foreground',
                    userButtonPopoverActionButtonText: 'text-gray-800',
                    userButtonPopoverActionButtonIcon: 'text-gray-800',
                    userButtonPopoverFooter: 'bg-primary/10',
                  },
                }}
                showName={true}
                userProfileMode='navigation'
                userProfileUrl={
                  userRole === 'teacher' ? '/teacher/profile' : '/user/profile'
                }
                afterSignOutUrl='/'
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
