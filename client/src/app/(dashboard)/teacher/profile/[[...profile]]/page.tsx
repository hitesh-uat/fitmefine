import Header from '@/components/Header';
import TeacherProfileContent from '@/components/TeacherProfileContent';

const UserProfilePage = () => {
  return (
    <div className='min-h-screen bg-customgreys-primarybg'>
      <Header title='Profile' subtitle='Manage your account settings' />
      <TeacherProfileContent />
    </div>
  );
};

export default UserProfilePage;
