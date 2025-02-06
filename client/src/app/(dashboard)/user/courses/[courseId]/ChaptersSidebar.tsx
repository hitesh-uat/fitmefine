import Loading from '@/components/Loading';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useCourseProgressData } from '@/hooks/useCourseProgressData';
import { cn } from '@/lib/utils';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import {
  BookOpen,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const ChaptersSidebar = () => {
  const router = useRouter();
  const { setOpen } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {
    user,
    course,
    userProgress,
    chapterId,
    courseId,
    isLoading,
    updateChapterProgress,
  } = useCourseProgressData();

  // Persist collapse state in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    setIsCollapsed(saved ? JSON.parse(saved) : false);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const handleChapterClick = (sectionId: string, chapterId: string) => {
    router.push(`/user/courses/${courseId}/chapters/${chapterId}`, {
      scroll: false,
    });
  };

  if (isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view program progress.</div>;
  if (!course || !userProgress) return <div>Error loading program content</div>;

  return (
    <motion.div
      layout
      ref={sidebarRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'h-full bg-background shadow-lg relative overflow-hidden',
        'transition-[width] duration-300 ease-in-out',
        isCollapsed ? 'w-[70px]' : 'w-72'
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className='absolute right-0 top-4 translate-x-1/2 bg-background rounded-full p-1.5 shadow-md border hover:bg-accent z-10 transition-transform hover:scale-110'
            whileHover={{ scale: 1.1 }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className='h-4 w-4 text-foreground' />
            ) : (
              <ChevronLeft className='h-4 w-4 text-foreground' />
            )}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side='right'>
          {isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          'h-full flex flex-col',
          isCollapsed ? 'px-2 pt-16' : 'px-6'
        )}
      >
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='pt-6 mb-8'
            >
              <h2 className='text-2xl font-bold text-foreground mb-4 truncate'>
                {course.title}
              </h2>
              <hr className='border-t border-muted' />
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex-1 overflow-y-auto pb-6'>
          <LayoutGroup>
            <motion.div
              key={isCollapsed ? 'collapsed' : 'expanded'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn('space-y-2', isCollapsed ? 'mx-auto' : '')}
            >
              {course.sections.map((section, index) => (
                <Tooltip key={section.sectionId} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div>
                      <Section
                        section={section}
                        index={index}
                        sectionProgress={userProgress.sections.find(
                          (s) => s.sectionId === section.sectionId
                        )}
                        chapterId={chapterId as string}
                        courseId={courseId as string}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        handleChapterClick={handleChapterClick}
                        updateChapterProgress={updateChapterProgress}
                        isCollapsed={isCollapsed}
                      />
                    </div>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side='right' sideOffset={10}>
                      <p className='text-sm font-medium'>
                        {section.sectionTitle}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {section.chapters.length} lessons
                      </p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </motion.div>
          </LayoutGroup>
        </div>
      </div>
    </motion.div>
  );
};

interface SectionProps {
  section: Section;
  isCollapsed: boolean;
  sectionProgress?: SectionProgress;
  expandedSections: string[];
  toggleSection: (sectionId: string) => void;
  handleChapterClick: (sectionId: string, chapterId: string) => void;
  chapterId: string;
  courseId: string;
  index: number;
  updateChapterProgress: (
    sectionId: string,
    chapterId: string,
    completed: boolean
  ) => void;
}
export const Section = ({
  section,
  isCollapsed,
  sectionProgress,
  expandedSections,
  toggleSection,
  handleChapterClick,
  chapterId,
  courseId,
  updateChapterProgress,
  index,
}: SectionProps) => {
  const completedChapters =
    sectionProgress?.chapters.filter((c) => c.completed).length || 0;
  const totalChapters = section.chapters.length;
  const calculatedProgress =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;
  const isCompleted = calculatedProgress === 100;
  const isActive = expandedSections.includes(section.sectionId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative flex flex-col transition-all',
        'rounded-lg border border-primary-100',
        isCollapsed ? 'p-1.5 items-center' : 'p-3 w-full',
        isActive ? 'bg-primary-50' : 'bg-white',
        isCompleted && 'border-success-200'
      )}
    >
      {/* Section Header */}
      <div
        className={cn(
          'flex items-center w-full cursor-pointer',
          isCollapsed ? 'justify-center' : 'justify-between gap-3',
          !isCollapsed && 'hover:bg-primary-100 rounded-md p-2'
        )}
        onClick={() => !isCollapsed && toggleSection(section.sectionId)}
      >
        {isCollapsed ? (
          <div className='relative'>
            <BookOpen
              className={cn(
                'h-5 w-5',
                isCompleted ? 'text-success-600' : 'text-primary-600'
              )}
            />
            <span
              className={cn(
                'absolute -top-1 -right-1 text-xs h-5 w-5 rounded-full flex items-center justify-center border-2 border-white',
                isCompleted
                  ? 'bg-success-600 text-white'
                  : 'bg-primary-600 text-white'
              )}
            >
              {index + 1}
            </span>
          </div>
        ) : (
          <>
            <div className='flex items-center gap-3 flex-1'>
              <BookOpen
                className={cn(
                  'h-5 w-5',
                  isCompleted ? 'text-success-600' : 'text-primary-600'
                )}
              />
              <div className='flex-1'>
                <h3
                  className={cn(
                    'text-sm font-semibold truncate',
                    isCompleted ? 'text-success-800' : 'text-primary-800'
                  )}
                >
                  {section.sectionTitle}
                </h3>
                <div className='flex items-center gap-2'>
                  <span
                    className={cn(
                      'text-xs',
                      isCompleted ? 'text-success-600' : 'text-primary-600'
                    )}
                  >
                    {completedChapters}/{totalChapters} lessons
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className='h-4 w-4 text-success-600' />
                  )}
                </div>
              </div>
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform shrink-0',
                isCompleted ? 'text-success-500' : 'text-primary-500',
                isActive ? 'rotate-180' : 'rotate-0'
              )}
            />
          </>
        )}
      </div>

      {/* Chapter List */}
      <AnimatePresence>
        {!isCollapsed && isActive && (
          <div className='mt-3 space-y-1'>
            {section.chapters.map((chapter, index) => (
              <Chapter
                key={chapter.chapterId} // Should be unique
                chapter={chapter}
                index={index}
                sectionId={section.sectionId}
                sectionProgress={sectionProgress}
                chapterId={chapterId}
                courseId={courseId}
                handleChapterClick={handleChapterClick}
                updateChapterProgress={updateChapterProgress}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Chapter = ({
  chapter,
  index,
  sectionId,
  sectionProgress,
  chapterId,
  courseId,
  handleChapterClick,
  updateChapterProgress,
}: {
  chapter: Chapter;
  index: number;
  sectionId: string;
  sectionProgress?: SectionProgress;
  chapterId: string;
  courseId: string;
  handleChapterClick: (sectionId: string, chapterId: string) => void;
  updateChapterProgress: (
    sectionId: string,
    chapterId: string,
    completed: boolean
  ) => void;
}) => {
  const isCompleted = sectionProgress?.chapters.some(
    (c) => c.chapterId === chapter.chapterId && c.completed
  );
  const isCurrentChapter = chapterId === chapter.chapterId;

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateChapterProgress(sectionId, chapter.chapterId, !isCompleted);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-2 rounded-md cursor-pointer',
        'transition-colors border border-primary-100',
        isCurrentChapter
          ? 'bg-primary-50 border-primary-300 text-foreground'
          : 'hover:bg-primary-50',
        isCompleted && 'bg-success-50 border-success-300 text-success-900'
      )}
      onClick={() => handleChapterClick(sectionId, chapter.chapterId)}
    >
      <div
        className='shrink-0 hover:opacity-80 transition-opacity'
        onClick={handleToggleComplete}
      >
        {isCompleted ? (
          <CheckCircle className='h-5 w-5 text-success-600' />
        ) : (
          <div
            className={cn(
              'h-5 w-5 rounded-full flex items-center justify-center border',
              isCurrentChapter
                ? 'border-primary-500 text-primary-700 bg-primary-100'
                : 'border-primary-200 text-primary-600 bg-primary-50'
            )}
          >
            <span className='text-xs font-medium'>{index + 1}</span>
          </div>
        )}
      </div>

      <span
        className={cn(
          'text-sm flex-1 truncate',
          isCompleted ? 'text-success-800' : 'text-foreground',
          isCurrentChapter && 'font-medium'
        )}
      >
        {chapter.title}
        {chapter.freePreview && (
          <span className='ml-2 text-xs text-primary-800 px-2 py-1 rounded-full bg-primary-100'>
            Free Preview
          </span>
        )}
      </span>

      {chapter.type === 'Text' && (
        <FileText className='h-4 w-4 text-primary-400' />
      )}
    </div>
  );
};

export default ChaptersSidebar;
