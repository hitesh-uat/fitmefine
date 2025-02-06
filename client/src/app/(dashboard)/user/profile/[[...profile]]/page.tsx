import Header from '@/components/Header';
import UserProfileContent from '@/components/UserProfileContent';

const UserProfilePage = () => {
  return (
    <div className='min-h-screen bg-white-100'>
      <Header title='Profile' subtitle='Manage your account settings' />
      <UserProfileContent />
    </div>
  );
};

export default UserProfilePage;
