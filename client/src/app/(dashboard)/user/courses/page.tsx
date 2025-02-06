'use client';

import CourseCard from '@/components/CourseCard';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { cn } from '@/lib/utils';
import { useGetUserEnrolledCoursesQuery } from '@/state/api';
import { useUser } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const Courses = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetUserEnrolledCoursesQuery(user?.id ?? '', {
    skip: !isLoaded || !user,
  });

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

  const handleGoToCourse = (course: Course) => {
    if (course.sections?.length > 0) {
      const firstChapter = course.sections[0].chapters[0];
      router.push(
        `/user/courses/${course.courseId}/chapters/${firstChapter.chapterId}`,
        {
          scroll: false,
        }
      );
    } else {
      router.push(`/user/courses/${course.courseId}`, { scroll: false });
    }
  };

  if (!isLoaded || isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view your programs.</div>;
  if (isError || !courses || courses.length === 0)
    return <div>You are not enrolled in any programs yet.</div>;

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/20'>
      {/* Header Section */}
      <div className='mb-8 px-6'>
        <Header title='My Programs' subtitle='View your enrolled programs' />
      </div>

      {/* Enhanced Toolbar Section */}
      <div className='sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between'>
            {/* Search Input with Glassmorphism Effect */}
            <div className='relative flex-1 max-w-xl'>
              <input
                type='text'
                placeholder='Search programs...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-12 pr-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm hover:shadow-md'
              />
              <BookOpen className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
            </div>

            {/* Category Filter as Segmented Control */}
            <div className='flex items-center gap-2 p-1 bg-gray-100 rounded-lg'>
              {['all', 'development', 'design', 'business'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors duration-200',
                    selectedCategory === category
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50/50'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course grid container */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto'
        initial='hidden'
        animate='visible'
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <AnimatePresence>
          {filteredCourses.map((course) => (
            <motion.div
              key={course.courseId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <CourseCard course={course} onGoToCourse={handleGoToCourse} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Courses;
