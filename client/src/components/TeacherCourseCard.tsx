import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BarChart, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const TeacherCourseCard = ({
  course,
  onEdit,
  onDelete,
  isOwner,
}: TeacherCourseCardProps) => {

  const router = useRouter();

  const hanldeOnClick = () => {
    return router.push(`/search?id=${course.courseId}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className='h-full'
    >
      <Card className='h-full flex flex-col border-primary-200 bg-white-100 shadow-sm hover:shadow-md transition-all overflow-hidden'>
        {/* Image Section with Gradient Overlay */}
        <CardHeader className='relative p-0 group'>
          <div className='relative h-56 w-full'>
            <Image
              src={course.image || '/placeholder.png'}
              alt={course.title}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent' />
          </div>

          {/* Badges Container */}
          <div className='absolute bottom-4 left-4 flex gap-2'>
            <Badge
              className={cn(
                'backdrop-blur-sm border-0 text-xs font-semibold',
                course.status === 'Published'
                  ? 'bg-green-100/90 text-green-800'
                  : 'bg-yellow-100/90 text-yellow-800'
              )}
            >
              {course.status}
            </Badge>
            <Badge className='backdrop-blur-sm bg-blue-100/90 text-blue-800 border-0'>
              {course.category}
            </Badge>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className='flex flex-col flex-grow p-6'>
          <div className='flex-grow space-y-4'>
            {/* Title and Teacher */}
            <div>
              <CardTitle className='text-xl font-bold text-primary-900 line-clamp-2 mb-2'>
                {course.title}
              </CardTitle>
              {!isOwner && (
                <p className='text-sm text-primary-500'>
                  By {course.teacherName}
                </p>
              )}
            </div>

            {/* Stats Row */}
            <div className='flex items-center justify-between px-3 py-2 bg-primary-50 rounded-lg'>
              <div className='flex items-center gap-2'>
                {/* <Users className='h-5 w-5 text-primary-600' /> */}
                <span className='text-sm font-medium text-primary-700'>
                  {course.enrollments?.length || 0} Students
                </span>
              </div>
              {isOwner && (
                <Badge
                  variant='outline'
                  className='border-primary-300 bg-white'
                >
                  <BarChart className='h-4 w-4 mr-2 text-primary-600' />
                  {Math.floor(Math.random() * 90) + 10}% Completion
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isOwner ? (
            <motion.div
              className='flex gap-3 mt-6'
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              <Button
                variant='ghost'
                className='flex-1 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 h-11'
                onClick={() => onEdit(course)}
              >
                <Pencil className='w-4 h-4 mr-2' />
                Edit Content
              </Button>
              <Button
                variant='ghost'
                className='rounded-full w-11 h-11 hover:bg-red-50 text-red-600 p-0'
                onClick={() => onDelete(course)}
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            </motion.div>
          ) : (
            <Button
              variant='outline'
              className='mt-4 rounded-full border-primary-200 text-primary-700 hover:bg-primary-50'
              onClick={hanldeOnClick}
            >
              View Course Details
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeacherCourseCard;
