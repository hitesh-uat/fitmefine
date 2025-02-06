import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AccordionSections from './AccordionSections';
import Preview from './Preview';

import {
  BookOpen,
  CreditCard,
  ShieldCheck,
  User
} from 'lucide-react';

const CoursePreview = ({ course }: CoursePreviewProps) => {
  const price = formatPrice(course.price);
  return (
    <div className='space-y-8'>
      {/* Image Section with Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative overflow-hidden rounded-xl shadow-lg'
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className='relative h-56 w-full overflow-hidden'
        >
          <Image
            src={course.image || '/placeholder.png'}
            alt='Course Preview'
            width={640}
            height={360}
            className='h-full w-full object-cover'
            priority
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='absolute right-4 top-4 rounded-full bg-primary-600 px-4 py-1 text-sm font-medium text-white'
          >
            Bestseller
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Course Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='space-y-6'
      >
        <div className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              <User className='h-5 w-5 text-gray-500' />
              <p className='ml-2 text-lg text-gray-600 hover:text-primary-600 transition-colors'>
                {course.teacherName}
              </p>
            </div>
          </div>
        </div>

        {/* Course Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='prose max-w-none text-gray-700 border-l-4 border-primary-500 pl-4'
        >
          <Preview value={course.description || ''} />
        </motion.div>
      </motion.div>

      {/* Course Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='rounded-lg border border-gray-200 bg-white'
      >
        <div className='p-6'>
          <h3 className='mb-4 flex items-center text-xl font-semibold text-gray-900'>
            <BookOpen className='mr-2 h-5 w-5 text-primary-600' />
            Program Content
          </h3>
          <AccordionSections sections={course.sections} />
        </div>
      </motion.div>

      {/* Price Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className='rounded-lg bg-gray-50 p-6 shadow-sm'
      >
        <h3 className='mb-4 flex items-center text-xl font-semibold'>
          <CreditCard className='mr-2 h-5 w-5 text-primary-600' />
          Price Details
        </h3>
        <div className='space-y-3'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>1x {course.title}</span>
            <span className='font-medium text-gray-900'>{price}</span>
          </div>
          <div className='flex justify-between border-t border-gray-200 pt-4'>
            <span className='text-lg font-semibold'>Total Amount</span>
            <span className='text-lg font-semibold text-primary-600'>
              {price}
            </span>
          </div>
        </div>
        <div className='mt-4 flex items-center space-x-2 text-sm text-gray-500'>
          <ShieldCheck className='h-4 w-4 text-green-600' />
          <span>30-Day Money-Back Guarantee</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CoursePreview;
