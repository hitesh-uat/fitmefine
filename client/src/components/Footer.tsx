'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const containerAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true, amount: 0.2 },
  };

  const staggerAnimation = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    viewport: { once: true },
  };

  const itemAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  const socialLinks = [Facebook, Twitter, Instagram, Linkedin];
  return (
    <motion.footer
      className='w-full bg-customgreys-primarybg text-white py-12 border-t border-customgreys-dirtyGrey'
      {...containerAnimation}
    >
      <div className='max-w-7xl mx-auto px-4 grid md:grid-cols-5 gap-8'>
        {/* Logo Section */}
        <motion.div className='md:col-span-2' {...itemAnimation}>
          <motion.h3
            className='text-xl font-bold mb-4 flex items-center gap-2'
            whileHover={{ scale: 1.02 }}
          >
            <Dumbbell className='w-6 h-6 text-primary-500' />
            <span className='text-white'>FitMeFine</span>
          </motion.h3>
          <motion.p
            className='text-customgreys-darkGrey'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Empowering global health through education since 2020
          </motion.p>
        </motion.div>

        {/* Platform Links */}
        <motion.div {...staggerAnimation}>
          <h4 className='font-bold mb-4 text-white'>Platform</h4>
          <div className='space-y-2'>
            {['Programs', 'Pricing', 'Features', 'Mobile App'].map((link, i) => (
              <motion.div
                key={link}
                {...itemAnimation}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href='#'
                  className='text-customgreys-darkGrey hover:text-primary-500 block transition-colors'
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Links */}
        <motion.div {...staggerAnimation}>
          <h4 className='font-bold mb-4 text-white'>Company</h4>
          <div className='space-y-2'>
            {['About', 'Careers', 'Blog', 'Contact'].map((link, i) => (
              <motion.div
                key={link}
                {...itemAnimation}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href='#'
                  className='text-customgreys-darkGrey hover:text-primary-500 block transition-colors'
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legal Links */}
        <motion.div {...staggerAnimation}>
          <h4 className='font-bold mb-4 text-white'>Legal</h4>
          <div className='space-y-2'>
            {['Privacy', 'Terms', 'Security', 'Cookie Policy'].map(
              (link, i) => (
                <motion.div
                  key={link}
                  {...itemAnimation}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href='#'
                    className='text-customgreys-darkGrey hover:text-primary-500 block transition-colors'
                  >
                    {link}
                  </Link>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className='max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-customgreys-dirtyGrey'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className='md:flex justify-between items-center'>
          <motion.p
            className='text-customgreys-darkGrey'
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
          >
            © 2020 FitMeFine. All rights reserved.
          </motion.p>

          <motion.div
            className='flex gap-4 justify-center mt-4 md:mt-0'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {socialLinks.map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, color: '#3b82f6' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-customgreys-darkGrey hover:text-primary-500'
                >
                  <Icon className='w-5 h-5' />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;

// Social icons remain same

// Add these social icons at the top with other imports
const Facebook = ({ className }: { className?: string }) => (
  <svg fill='currentColor' viewBox='0 0 24 24' className={className}>
    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg fill='currentColor' viewBox='0 0 24 24' className={className}>
    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg fill='currentColor' viewBox='0 0 24 24' className={className}>
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg fill='currentColor' viewBox='0 0 24 24' className={className}>
    <path d='M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z' />
  </svg>
);
