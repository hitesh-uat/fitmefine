'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile, useUser } from '@clerk/nextjs';

const UserProfileContent = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className='min-h-screen bg-customgreys-primarybg'>
      {/* Profile Header */}
      <div className='bg-gradient-to-b from-primary-50 to-white pt-20 pb-12'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='flex items-center gap-6'>
            <Avatar className='w-24 h-24 border-4 border-white shadow-lg'>
              <AvatarImage
                src={user.imageUrl}
                alt={user.fullName || 'User avatar'}
              />
              <AvatarFallback className='bg-primary-100 text-primary-600 text-2xl'>
                {user.fullName?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className='text-3xl font-bold text-cod-gray mb-2'>
                {user.fullName}
              </h1>
              <p className='text-customgreys-darkerGrey'>
                {user.primaryEmailAddress?.emailAddress}
              </p>
              <Badge className='mt-3 bg-primary-600 hover:bg-primary-700 text-white'>
                Health Professional
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-6 py-8 -translate-y-8'>
        <Tabs defaultValue='account' className='space-y-8'>
          <TabsList className='bg-transparent p-0 h-auto space-x-4'>
            <TabsTrigger
              value='account'
              className='data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 px-1 rounded-none'
            >
              Account Settings
            </TabsTrigger>

            <TabsTrigger
              value='progress'
              className='data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:text-primary-600 px-1 rounded-none'
            >
              Learning Progress
            </TabsTrigger>
          </TabsList>

          {/* Account Settings Tab */}
          <TabsContent value='account'>
            <Card className='p-8 border-customgreys-secondarybg shadow-sm'>
              <UserProfile
                path='/user/profile'
                routing='path'
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none border-none w-full p-0',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    formButtonPrimary: 'bg-primary-600 hover:bg-primary-700',
                    socialButtonsProviderIcon: 'invert-[.3]',
                    dividerLine: 'bg-customgreys-secondarybg',
                    formFieldInput:
                      'border-customgreys-secondarybg focus:border-primary-500',
                    navbarButton: 'text-primary-600 hover:text-primary-700',
                    footerActionLink: 'text-primary-600 hover:text-primary-700',
                    formFieldLabel: 'text-cod-gray font-medium',
                  },
                  variables: {
                    colorPrimary: '#F97316',
                    colorText: '#171616',
                    colorInputText: '#171616',
                    colorBackground: '#FFFFFF',
                  },
                }}
              />
            </Card>
          </TabsContent>

          {/* Learning Progress Tab */}
          <TabsContent value='progress'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <Card className='p-6 border-customgreys-secondarybg text-center'>
                <div className='text-4xl font-bold text-primary-600 mb-2'>
                  12
                </div>
                <div className='text-sm text-customgreys-darkerGrey'>
                  Completed Programs
                </div>
              </Card>
              <Card className='p-6 border-customgreys-secondarybg text-center'>
                <div className='text-4xl font-bold text-primary-600 mb-2'>
                  3
                </div>
                <div className='text-sm text-customgreys-darkerGrey'>
                  Certifications
                </div>
              </Card>
              <Card className='p-6 border-customgreys-secondarybg text-center'>
                <div className='text-4xl font-bold text-primary-600 mb-2'>
                  2
                </div>
                <div className='text-sm text-customgreys-darkerGrey'>
                  Active Enrollments
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfileContent;
