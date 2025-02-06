'use client';

import QuizComponent from '@/app/(dashboard)/teacher/courses/[id]/QuizComponent';
import Loading from '@/components/Loading';
import Preview from '@/components/Preview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCourseProgressData } from '@/hooks/useCourseProgressData';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import { useRef } from 'react';
import ReactPlayer from 'react-player';

const Course = () => {
  const {
    user,
    course,
    userProgress,
    currentSection,
    currentChapter,
    isLoading,
    isChapterCompleted,
    updateChapterProgress,
    hasMarkedComplete,
    setHasMarkedComplete,
  } = useCourseProgressData();

  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = ({ played }: { played: number }) => {
    if (
      played >= 0.8 &&
      !hasMarkedComplete &&
      currentChapter &&
      currentSection &&
      userProgress?.sections &&
      !isChapterCompleted()
    ) {
      setHasMarkedComplete(true);
      updateChapterProgress(
        currentSection.sectionId,
        currentChapter.chapterId,
        true
      );
    }
  };

  if (isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view this program.</div>;
  if (!course || !userProgress) return <div>Error loading program</div>;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className='h-full bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb Navigation */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={fadeIn}
          className='mb-6 flex items-center gap-2 text-sm text-gray-500 flex-wrap'
        >
          <span className='font-medium text-primary'>{course.title}</span>
          <ChevronRight className='h-4 w-4' />
          <span>{currentSection?.sectionTitle}</span>
          <ChevronRight className='h-4 w-4' />
          <span className='text-gray-800 font-semibold'>
            {currentChapter?.title}
          </span>
        </motion.div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Video and Content */}
          <div className='lg:col-span-2 space-y-8'>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={slideUp}
              transition={{ delay: 0.2 }}
            >
              <Card className='rounded-xl shadow-lg overflow-hidden relative'>
                <CardContent className='p-0 aspect-video bg-black'>
                  {currentChapter?.video ? (
                    <ReactPlayer
                      ref={playerRef}
                      url={
                        typeof currentChapter.video === 'string'
                          ? currentChapter.video
                          : undefined
                      }
                      controls
                      width='100%'
                      height='100%'
                      onProgress={handleProgress}
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload',
                          },
                        },
                      }}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='w-full h-full flex flex-col items-center justify-center text-center space-y-4 p-6'
                    >
                      <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl' />
                        <GraduationCap className='h-16 w-16 text-primary/50 relative z-10' />
                      </div>
                      <motion.div
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        className='space-y-2'
                      >
                        <h3 className='text-xl font-semibold text-gray-100'>
                          No Video Content
                        </h3>
                        <p className='text-gray-400 max-w-md'>
                          This lesson focuses on written content and exercises.
                          Explore the notes and resources below to continue your
                          learning journey.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Always visible overlay for chapter info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent'
                  >
                    <div className='text-gray-200'>
                      <h2 className='text-xl font-semibold'>
                        {currentChapter?.title}
                      </h2>
                      <p className='text-sm text-gray-400'>
                        {currentSection?.sectionTitle}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chapter Content Tabs */}
            <motion.div
              initial='hidden'
              animate='visible'
              variants={slideUp}
              transition={{ delay: 0.4 }}
            >
              <Tabs defaultValue='Notes' className='space-y-6'>
                <TabsList className='w-full bg-gray-100 p-1.5 rounded-lg'>
                  {['Notes', 'Resources', 'Quiz'].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className='w-full data-[state=active]:bg-primary-100 data-[state=active]:shadow-sm'
                      asChild
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex-1'
                      >
                        {tab}
                      </motion.div>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <AnimatePresence mode='wait'>
                  {['Notes', 'Resources', 'Quiz'].map((tab) => (
                    <TabsContent key={tab} value={tab}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className='rounded-xl shadow-sm'>
                          <CardHeader>
                            <CardTitle className='text-lg'>
                              {tab} Content
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {tab === 'Notes' && (
                              <Preview value={currentChapter?.content || ''} />
                            )}
                            {tab === 'Resources' && (
                              <p className='text-gray-600'>
                                No resources available for this lesson.
                              </p>
                            )}
                            {tab === 'Quiz' && (
                              <QuizComponent
                                quizzes={currentChapter?.quizzes || []}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>
                  ))}
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </div>

          {/* Right Column - Instructor Card */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={slideUp}
            transition={{ delay: 0.6 }}
            className='space-y-6'
          >
            <Card className='rounded-xl shadow-sm sticky top-8'>
              <CardContent className='p-6 space-y-4'>
                <div className='flex items-center gap-4'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage alt={course.teacherName} />
                    <AvatarFallback className='bg-primary-100 text-customgreys-darkGrey'>
                      {course.teacherName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='font-semibold'>{course.teacherName}</h3>
                    <p className='text-sm text-gray-500'>Program Instructor</p>
                  </div>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-medium text-sm'>About the Instructor</h4>
                  <p className='text-sm text-gray-600'>
                    Seasoned professional with 10+ years of experience in program
                    subject matter. Passionate about creating engaging learning
                    experiences.
                  </p>
                </div>
                <div className='pt-4 border-t border-gray-100'>
                  <div className='flex items-center gap-2 text-sm'>
                    <BookOpen className='h-4 w-4 text-primary-800' />
                    <span>
                      {course.sections.length} Modules •{' '}
                      {course.sections.reduce(
                        (acc, section) => acc + section.chapters.length,
                        0
                      )}{' '}
                      Lessons
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Course;
