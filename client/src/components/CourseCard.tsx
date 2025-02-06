import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Preview from './Preview';

const CourseCard = ({ course, onGoToCourse }: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className='group relative h-full'
    >
      <Card className='h-full overflow-hidden shadow-none hover:shadow-lg transition-all duration-300 border border-customgreys-secondarybg hover:border-primary-500/50' onClick={() => onGoToCourse(course)}>
        {/* Image Section */}
        <CardHeader className='relative p-0 aspect-video'>
          <div className='relative h-48 w-full overflow-hidden'>
            <Image
              src={course.image || '/placeholder.png'}
              alt={course.title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-110'
              priority
            />
            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-cod-gray/50 via-primary-500/20 to-transparent' />

            {/* Category Tag */}
            <Badge className='absolute top-3 right-3 backdrop-blur-sm bg-primary-100/20 text-primary-700 border border-primary-300 hover:bg-primary-200/30'>
              {course.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className='p-4 space-y-4'>
          {/* Title Section */}
          <CardTitle className='text-xl font-bold text-cod-gray group-hover:text-primary-600 transition-colors'>
            {course.title}
          </CardTitle>

          {/* Scrollable Description with Gradient Fade */}
          <div className='relative h-32'>
            <div className='h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary-300 pr-2'>
              <Preview value={course.description || ''} />
            </div>
            <div className='absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-customgreys-primarybg via-customgreys-primarybg' />
          </div>

          {/* Footer Section */}
          <div className='flex items-center justify-between border-t border-customgreys-dirtyGrey pt-4'>
            {/* Teacher Info */}
            <div className='flex items-center gap-2 hover:bg-customgreys-secondarybg rounded-lg p-1 -m-1 transition-colors'>
              <Avatar className='w-8 h-8 border-2 border-primary-300'>
                <AvatarImage alt={course.teacherName} />
                <AvatarFallback className='bg-primary-100 text-primary-700 font-medium'>
                  {course.teacherName[0]}
                </AvatarFallback>
              </Avatar>
              <p className='text-sm text-customgreys-darkerGrey font-medium'>
                {course.teacherName}
              </p>
            </div>

            {/* Price Tag */}
            <Badge
              variant='outline'
              className='bg-primary-50 text-primary-700 border-primary-300 px-3 py-1.5'
            >
              <span className='font-semibold'>{formatPrice(course.price)}</span>
            </Badge>
          </div>
        </CardContent>

        {/* Hover Overlay */}
        <div className='absolute inset-0 hidden group-hover:block bg-primary-100/20 pointer-events-none transition-colors' />
      </Card>
    </motion.div>
  );
};

export default CourseCard;
