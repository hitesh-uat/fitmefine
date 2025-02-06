import { useClerk, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  Briefcase,
  DollarSign,
  LogOut,
  PanelLeft,
  Settings,
  User,
  Menu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Loading from './Loading';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const AppSidebar = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();

  const navLinks = {
    student: [
      { icon: BookOpen, label: 'Programs', href: '/user/courses' },
      { icon: Briefcase, label: 'Billing', href: '/user/billing' },
      { icon: User, label: 'Profile', href: '/user/profile' },
      { icon: Settings, label: 'Settings', href: '/user/settings' },
    ],
    teacher: [
      { icon: BookOpen, label: 'Programs', href: '/teacher/courses' },
      { icon: DollarSign, label: 'Billing', href: '/teacher/billing' },
      { icon: User, label: 'Profile', href: '/teacher/profile' },
      { icon: Settings, label: 'Settings', href: '/teacher/settings' },
    ],
  };

  if (!isLoaded) return <Loading />;
  if (!user) return <div>User not found</div>;

  const userType =
    (user.publicMetadata.userType as 'student' | 'teacher') || 'student';
  const currentNavLinks = navLinks[userType];

  return (
    <Sidebar
      collapsible='icon'
      style={{ height: '100vh' }}
      className='bg-customgreys-primarybg border-none shadow-lg animate-slideInLeft'
    >
      <SidebarHeader>
        <SidebarMenu className='app-sidebar__menu'>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              onClick={toggleSidebar}
              className='group hover:bg-primary-200/20 transition-colors duration-300'
            >
              <div className='app-sidebar__logo-container relative'>
                {/* Show image only when expanded */}
                {state === 'expanded' && (
                  <Image
                    src='/logo1.svg'
                    alt='logo'
                    width={25}
                    height={20}
                    className='app-sidebar__logo drop-shadow-lg'
                  />
                )}

                {/* Collapse/Expand indicator */}
                <div
                  className={cn(
                    'absolute transition-all duration-300',
                    state === 'expanded'
                      ? 'right-2'
                      : 'left-1/2 -translate-x-1/2'
                  )}
                >
                  {state === 'collapsed' ? (
                    <ChevronRight className='text-primary hover:text-primary/80 h-5 w-5' />
                  ) : (
                    <ChevronLeft className='text-primary hover:text-primary/80 h-5 w-5' />
                  )}
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className='app-sidebar__nav-menu'>
          {currentNavLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <SidebarMenuItem
                key={link.href}
                className={cn(
                  'app-sidebar__nav-item group transition-all duration-300 hover:bg-primary-200/10',
                  isActive && 'bg-primary-200/20'
                )}
              >
                <SidebarMenuButton
                  asChild
                  size='lg'
                  className={cn(
                    'app-sidebar__nav-button transition-colors duration-300',
                    !isActive && 'text-gray-600 hover:text-primary'
                  )}
                >
                  <Link
                    href={link.href}
                    className='app-sidebar__nav-link'
                    scroll={false}
                  >
                    <link.icon
                      className={cn(
                        'transition-colors duration-300',
                        isActive
                          ? 'text-primary animate-pulse'
                          : 'text-gray-600 group-hover:text-primary'
                      )}
                    />
                    <span
                      className={cn(
                        'app-sidebar__nav-text transition-colors duration-300',
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-gray-600 group-hover:text-primary'
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
                {isActive && (
                  <div className='app-sidebar__active-indicator animate-pulse bg-primary h-full w-1' />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => signOut()}
                className='app-sidebar__signout group hover:bg-primary-200/10 transition-colors duration-300 text-primary hover:text-primary/80'
              >
                <LogOut className='mr-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1' />
                <span className='transition-all duration-300'>Sign out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
