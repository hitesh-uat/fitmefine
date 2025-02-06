import SharedNotificationSettings from '@/components/SharedNotificationSettings';

const UserSettings = () => {
  return (
    <div className='max-w-6xl mx-auto p-6 bg-customgreys-primarybg min-h-screen'>
      <SharedNotificationSettings
        title='Notification Settings'
        subtitle='Manage your notification preferences'
      />
    </div>
  );
};

export default UserSettings;
