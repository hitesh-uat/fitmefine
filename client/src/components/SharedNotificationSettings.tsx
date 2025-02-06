// SharedNotificationSettings.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  NotificationSettingsFormData,
  notificationSettingsSchema,
} from '@/lib/schemas';
import { useUpdateUserMutation } from '@/state/api';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CustomFormField } from './CustomFormField';
import Header from './Header';

const SharedNotificationSettings = ({
  title = 'Notification Settings',
  subtitle = 'Manage your notification settings',
}: SharedNotificationSettingsProps) => {
  const { user } = useUser();
  const [updateUser] = useUpdateUserMutation();

  const currentSettings =
    (user?.publicMetadata as { settings?: UserSettings })?.settings || {};

  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || 'daily',
    },
  });

  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return;

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          ...currentSettings,
          ...data,
        },
      },
    };

    try {
      await updateUser(updatedUser);
    } catch (error) {
      console.error('Failed to update user settings: ', error);
    }
  };

  if (!user) return <div>Please sign in to manage your settings.</div>;

  return (
    <Card className='p-8 border-customgreys-secondarybg shadow-sm'>
      <Header
        title={title}
        subtitle={subtitle}
        className='mb-8'
        titleClassName='text-2xl text-primary-600'
        subtitleClassName='text-customgreys-darkerGrey'
      />

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-6'>
            {/* Notification Switches */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex items-center space-x-4 p-4 bg-primary-50 rounded-lg'>
                <Switch
                  id='courseNotifications'
                  checked={methods.watch('courseNotifications')}
                  onCheckedChange={(val) =>
                    methods.setValue('courseNotifications', val)
                  }
                  className='data-[state=checked]:bg-primary-600'
                />
                <Label
                  htmlFor='courseNotifications'
                  className='text-cod-gray font-medium'
                >
                  Program Notifications
                </Label>
              </div>

              <div className='flex items-center space-x-4 p-4 bg-primary-50 rounded-lg'>
                <Switch
                  id='emailAlerts'
                  checked={methods.watch('emailAlerts')}
                  onCheckedChange={(val) =>
                    methods.setValue('emailAlerts', val)
                  }
                  className='data-[state=checked]:bg-primary-600'
                />
                <Label
                  htmlFor='emailAlerts'
                  className='text-cod-gray font-medium'
                >
                  Email Alerts
                </Label>
              </div>

              <div className='flex items-center space-x-4 p-4 bg-primary-50 rounded-lg'>
                <Switch
                  id='smsAlerts'
                  checked={methods.watch('smsAlerts')}
                  onCheckedChange={(val) => methods.setValue('smsAlerts', val)}
                  className='data-[state=checked]:bg-primary-600'
                />
                <Label
                  htmlFor='smsAlerts'
                  className='text-cod-gray font-medium'
                >
                  SMS Alerts
                </Label>
              </div>
            </div>

            {/* Frequency Selector */}
            <div className='max-w-xs'>
              <CustomFormField
                name='notificationFrequency'
                label='Notification Frequency'
                labelClassName='text-cod-gray font-medium mb-2'
                type='select'
                options={[
                  { value: 'immediate', label: 'Immediate' },
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                ]}
                className='border-customgreys-secondarybg focus:border-primary-500'
              />
            </div>
          </div>

          <Button
            type='submit'
            className='w-full md:w-auto bg-primary-600 hover:bg-primary-700'
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default SharedNotificationSettings;
