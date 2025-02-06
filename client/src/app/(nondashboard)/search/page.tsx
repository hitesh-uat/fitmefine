'use client';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce'; // Import the debounce hook
import { formatPrice } from '@/lib/utils';
import { useGetCoursesQuery } from '@/state/api';
import { Disclosure } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  BookOpen,
  ChevronDown,
  Clipboard,
  Play,
  Star,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search term by 500ms
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery({ search: debouncedSearchTerm }); // Use the debounced value for API call
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (courses) {
      const course = id ? courses.find((c) => c.courseId === id) : courses[0];
      setSelectedCourse(course || null);
    }
  }, [courses, id]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course.courseId}`, { scroll: false });
  };

  const handleEnrollNow = (courseId: string) => {
    router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`, {
      scroll: false,
    });
  };

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState />;
  // if (!courses?.length) return <EmptyState />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='min-h-screen bg-gray-50'
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-gradient-to-r from-primary-50 to-primary-100 text-white py-16 px-6 lg:px-8'
      >
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl font-bold mb-4'>
            Transform Your Health Journey
          </h1>
          <p className='text-xl mb-8'>
            Expert-led programs in nutrition, fitness, and mental wellness
          </p>
          <div className='bg-white rounded-lg p-2 shadow-lg mx-4'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search programs by topic, symptom, or instructor...'
              className='w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-primary-500 text-gray-900'
            />
          </div>
          <div className='mt-4 flex gap-2 justify-center flex-wrap'>
            {[
              'Nutrition',
              'Fitness',
              'Mental Health',
              'Chronic Conditions',
              'Preventive Care',
            ].map((tag) => (
              <button
                key={tag}
                className='px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition text-sm'
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className='max-w-7xl mx-auto p-6 lg:p-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8'>
          {/* Course List */}
          <motion.div
            className='space-y-6'
            initial={{ x: -20 }}
            animate={{ x: 0 }}
          >
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold text-gray-900'>All Programs</h1>
              <p className='text-gray-600'>
                {courses?.length || 0} programs available
              </p>
            </div>

            <AnimatePresence>
              {courses?.map((course) => (
                <motion.div
                  key={course.courseId}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CourseCard
                    course={course}
                    isSelected={selectedCourse?.courseId === course.courseId}
                    onClick={() => handleCourseSelect(course)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Course Details */}
          <AnimatePresence mode='wait'>
            {selectedCourse ? (
              <motion.div
                key={selectedCourse.courseId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className='bg-white rounded-xl shadow-lg p-8 sticky top-6 h-fit'
              >
                {/* Course Header */}
                <div className='mb-8'>
                  <div className='relative aspect-video rounded-xl overflow-hidden mb-6'>
                    <Image
                      src={selectedCourse.image || '/course-placeholder.png'}
                      alt={selectedCourse.title}
                      layout='fill'
                      objectFit='cover'
                      className='w-full h-full'
                      loading='lazy'
                      decoding='async'
                    />
                  </div>

                  <div className='flex items-start justify-between mb-4'>
                    <div>
                      <h2 className='text-2xl font-bold text-gray-900'>
                        {selectedCourse.title}
                      </h2>
                      <p className='text-gray-600 mt-2'>
                        by {selectedCourse.teacherName}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-3xl font-bold text-primary-600'>
                        {formatPrice(selectedCourse.price)}
                      </p>
                      <p className='text-sm text-gray-600'>Lifetime access</p>
                    </div>
                  </div>

                  <Button
                    size='lg'
                    className='w-full py-6 text-lg bg-primary-500 hover:bg-primary-600 text-white-100 transition-colors shadow-md hover:shadow-lg'
                    onClick={() => handleEnrollNow(selectedCourse.courseId)}
                  >
                    Enroll Now
                  </Button>
                </div>

                {/* Course Content */}
                <div className='space-y-8'>
                  {selectedCourse.sections.map((section) => (
                    <Disclosure key={section.sectionId}>
                      {({ open }: { open: boolean }) => (
                        <div className='space-y-4'>
                          <Disclosure.Button className='w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
                            <div>
                              <h4 className='text-lg font-semibold text-left'>
                                {section.sectionTitle}
                              </h4>
                              <p className='text-gray-600 text-left'>
                                {section.chapters.length} lessons •{' '}
                              </p>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${
                                open ? 'rotate-180' : ''
                              }`}
                            />
                          </Disclosure.Button>

                          <Disclosure.Panel>
                            <div className='space-y-3'>
                              {section.chapters.map((chapter) => (
                                <div
                                  key={chapter.chapterId}
                                  className='flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg'
                                >
                                  <div className='flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center'>
                                    {chapter.type === 'Video' && (
                                      <Play className='w-4 h-4 text-primary-600' />
                                    )}
                                    {chapter.type === 'Quiz' && (
                                      <Clipboard className='w-4 h-4 text-primary-600' />
                                    )}
                                    {chapter.type === 'Text' && (
                                      <BookOpen className='w-4 h-4 text-primary-600' />
                                    )}
                                  </div>
                                  <div>
                                    <p className='font-medium'>
                                      {chapter.title}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                      {chapter.type} • 15 mins
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='bg-white rounded-xl shadow-lg p-8 text-center'
              >
                <BookOpen className='w-12 h-12 mx-auto text-gray-400 mb-4' />
                <p className='text-gray-600'>
                  Select a program to view details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const CourseCard = ({ course, isSelected, onClick }: SearchCourseCardProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-6 bg-white rounded-xl shadow-sm cursor-pointer transition-all relative ${
      isSelected
        ? 'ring-2 ring-primary-500'
        : 'hover:ring-1 hover:ring-gray-200'
    }`}
    onClick={onClick}
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}
  >
    <div className='absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'>
      CEU Certified
    </div>

    <div className='flex gap-4'>
      <div className='flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden relative'>
        <Image
          src={course.image || '/course-placeholder.png'}
          alt={course.title}
          className='object-cover'
          fill
          sizes='(max-width: 640px) 128px, 128px'
        />
      </div>

      <div className='flex-1'>
        <h3 className='font-semibold text-gray-900 mb-1'>{course.title}</h3>
        <p className='text-sm text-gray-600 mb-2'>{course.teacherName}</p>

        <div className='flex items-center gap-2'>
          <span className='text-sm px-2 py-1 bg-primary-100 text-primary-700 rounded-full'>
            {course.level}
          </span>
          <span className='text-sm text-gray-600'>•</span>
          <span className='text-sm text-gray-600'>{course.category}</span>
        </div>

        <div className='mt-2 flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Star className='w-4 h-4 text-yellow-500' />
            <span className='text-sm'>4.8</span>
          </div>
          <span className='text-lg font-bold text-primary-600'>
            {formatPrice(course.price)}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className='min-h-screen bg-gray-50 p-6 lg:p-8'>
    {/* Hero Section Skeleton */}
    <div className='bg-gray-200 animate-pulse h-64 rounded-xl mb-8' />

    <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8'>
      {/* Course List Skeleton */}
      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='h-8 bg-gray-200 rounded w-1/3 animate-pulse' />
          <div className='h-4 bg-gray-200 rounded w-1/4 animate-pulse' />
        </div>

        {[...Array(5)].map((_, i) => (
          <div key={i} className='p-6 bg-white rounded-xl shadow-sm space-y-4'>
            <div className='flex gap-4'>
              <div className='w-32 h-24 bg-gray-200 rounded-lg animate-pulse' />
              <div className='flex-1 space-y-3'>
                <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
                <div className='h-3 bg-gray-200 rounded w-1/2 animate-pulse' />
                <div className='flex gap-2'>
                  <div className='h-5 w-16 bg-gray-200 rounded-full animate-pulse' />
                  <div className='h-5 w-24 bg-gray-200 rounded-full animate-pulse' />
                </div>
                <div className='flex justify-between'>
                  <div className='h-4 w-16 bg-gray-200 rounded-full animate-pulse' />
                  <div className='h-6 w-20 bg-gray-200 rounded-full animate-pulse' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details Skeleton */}
      <div className='bg-white rounded-xl shadow-lg p-8 sticky top-6 h-fit space-y-8'>
        {/* Image Skeleton */}
        <div className='aspect-video bg-gray-200 rounded-xl animate-pulse' />

        {/* Header Skeleton */}
        <div className='space-y-4'>
          <div className='h-8 bg-gray-200 rounded w-3/4 animate-pulse' />
          <div className='h-6 bg-gray-200 rounded w-1/2 animate-pulse' />
          <div className='h-12 bg-gray-200 rounded-lg animate-pulse' />
        </div>

        {/* Sections Skeleton */}
        <div className='space-y-6'>
          {[...Array(3)].map((_, i) => (
            <div key={i} className='space-y-4'>
              <div className='h-14 bg-gray-200 rounded-lg animate-pulse' />
              <div className='space-y-3'>
                {[...Array(4)].map((_, j) => (
                  <div key={j} className='flex items-center gap-4 p-3'>
                    <div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse' />
                    <div className='flex-1 space-y-2'>
                      <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
                      <div className='h-3 bg-gray-200 rounded w-1/2 animate-pulse' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Error State
const ErrorState = () => (
  <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
    <div className='text-center max-w-md'>
      <AlertCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
      <h2 className='text-2xl font-bold mb-2'>Failed to load programs</h2>
      <p className='text-gray-600 mb-4'>
        Please check your internet connection and try again
      </p>
      <Button onClick={() => window.location.reload()}>Retry</Button>
    </div>
  </div>
);

// Empty State
const EmptyState = () => (
  <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
    <div className='text-center max-w-md'>
      <BookOpen className='w-16 h-16 text-gray-400 mx-auto mb-4' />
      <h2 className='text-2xl font-bold mb-2'>No programs found</h2>
      <p className='text-gray-600'>
        Check back later or try different search terms
      </p>
    </div>
  </div>
);

export default SearchPage;
