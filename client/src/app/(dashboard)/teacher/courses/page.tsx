'use client';

import Loading from '@/components/Loading';
import TeacherCourseCard from '@/components/TeacherCourseCard';
import { Button } from '@/components/ui/button';
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from '@/state/api';
import { useUser } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, LineChart, Plus, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const Courses = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery({ category: 'all' });
  const [createCourse] = useCreateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  // Calculate stats
  const stats = useMemo(
    () => ({
      totalCourses: courses?.length || 0,
      publishedCourses:
        courses?.filter((c) => c.status === 'Published').length || 0,
      totalStudents:
        courses?.reduce(
          (acc, curr) => acc + (curr.enrollments?.length || 0),
          0
        ) || 0,
    }),
    [courses]
  );

  const handleCreateCourse = async () => {
    if (!user) return;
    const result = await createCourse({
      teacherId: user.id,
      teacherName: user.fullName || 'Unknown Teacher',
    }).unwrap();
    router.push(`/teacher/courses/${result.courseId}`);
  };

  if (isLoading) return <Loading />;
  if (isError || !courses) return <div>Error loading programs.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='min-h-screen  p-6 md:p-8'
    >
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header Section */}
        <motion.div
          className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-primary-100'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='space-y-1'>
            <h1 className='text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent'>
              Program Management
            </h1>
            <p className='text-lg text-primary-500 max-w-2xl'>
              Create, organize, and manage your educational content with
              precision
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              onClick={handleCreateCourse}
              className='h-14 px-8 bg-primary-500 hover:bg-primary-600 text-white-100 rounded-xl shadow-sm hover:shadow-md transition-all'
            >
              <div className='flex items-center gap-3'>
                <span className='p-2 bg-primary-400/20 rounded-lg'>
                  <Plus className='h-5 w-5' />
                </span>
                <span className='text-base font-semibold'>New Program</span>
              </div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='bg-primary-100 p-6 rounded-xl border border-primary-200'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-primary-600'>Total Programs</p>
                <p className='text-2xl font-bold text-primary-900'>
                  {stats.totalCourses}
                </p>
              </div>
              <BookOpen className='h-8 w-8 text-primary-600' />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='bg-primary-100 p-6 rounded-xl border border-primary-200'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-primary-600'>Published Programs</p>
                <p className='text-2xl font-bold text-primary-900'>
                  {stats.publishedCourses}
                </p>
              </div>
              <LineChart className='h-8 w-8 text-primary-600' />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='bg-primary-100 p-6 rounded-xl border border-primary-200'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-primary-600'>Total Students</p>
                <p className='text-2xl font-bold text-primary-900'>
                  {stats.totalStudents}
                </p>
              </div>
              <Users className='h-8 w-8 text-primary-600' />
            </div>
          </motion.div>
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.courseId}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <TeacherCourseCard
                  course={course}
                  onEdit={() =>
                    router.push(`/teacher/courses/${course.courseId}`)
                  }
                  onDelete={() => {
                    if (window.confirm('Delete this program?'))
                      deleteCourse(course.courseId);
                  }}
                  isOwner={course.teacherId === user?.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12'
          >
            <div className='text-primary-400 mb-4'>
              <BookOpen className='h-16 w-16 mx-auto' />
            </div>
            <h3 className='text-primary-800 text-xl font-semibold'>
              No programs found
            </h3>
            <p className='text-primary-600 mt-2'>
              Try adjusting your search filters
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Courses;
