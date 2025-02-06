'use client';

import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const CompletionPage = () => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start('visible');
      await controls.start({ scale: 1.1, transition: { duration: 0.2 } });
      controls.start({ scale: 1 });
    };
    sequence();
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center  mt-6 bg-[#fafafa]'
    >
      {/* Animated Progress Circle */}
      <motion.div
        className='relative w-48 h-48 mb-8'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <svg className='w-full h-full' viewBox='0 0 100 100'>
          <motion.circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            strokeWidth='8'
            strokeLinecap='round'
            stroke='#e0e0e0'
          />
          <motion.circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            strokeWidth='8'
            strokeLinecap='round'
            stroke='#23c91a'
            initial={{ strokeDasharray: '0 283' }}
            animate={{ strokeDasharray: '283 283' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </svg>

        {/* Checkmark Animation */}
        <motion.div
          className='absolute inset-0 flex items-center justify-center'
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
          }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Check className='w-20 h-20 text-green-500' strokeWidth='2' />
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <div className='text-center space-y-8 max-w-2xl px-4'>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Payment Successful
          </h1>
          <p className='text-xl text-gray-600'>
            You now have full access to{' '}
            <span className='text-primary-600 font-semibold'>Program Name</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className='space-y-6'
        >
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
            <p className='text-gray-600 mb-4'>
              🎉 Congratulations on your enrollment!
            </p>
            <p className='text-sm text-gray-500'>
              A confirmation email has been sent to your address
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href='/user/courses'
                className='inline-block w-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-300'
              >
                Start Learning Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <Button
                variant='ghost'
                className='text-gray-600 hover:text-primary-600'
                asChild
              >
                <Link href='/'>Back to Home</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Floating Particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-primary-400 rounded-full'
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * 100 - 50 + '%',
              y: Math.random() * 100 - 50 + '%',
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CompletionPage;
