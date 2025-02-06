'use client';

import CourseCardSearch from '@/components/CourseCardSearch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCarousel } from '@/hooks/useCarousel';
import { useGetCoursesQuery } from '@/state/api';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  HeartPulse,
  MessageCircle,
  Shield,
  Smile,
  Star,
  Trophy,
  Users,
  Video,
  Zap,
} from 'lucide-react';

import Image from 'next/image';

const LoadingSkeleton = () => {
  return (
    <div className='landing-skeleton'>
      <div className='landing-skeleton__hero'>
        <div className='landing-skeleton__hero-content'>
          <Skeleton className='landing-skeleton__title' />
          <Skeleton className='landing-skeleton__subtitle' />
          <Skeleton className='landing-skeleton__subtitle-secondary' />
          <Skeleton className='landing-skeleton__button' />
        </div>
        <Skeleton className='landing-skeleton__hero-image' />
      </div>

      <div className='landing-skeleton__featured'>
        <Skeleton className='landing-skeleton__featured-title' />
        <Skeleton className='landing-skeleton__featured-description' />

        <div className='landing-skeleton__tags'>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton key={index} className='landing-skeleton__tag' />
          ))}
        </div>

        <div className='landing-skeleton__courses'>
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} className='landing-skeleton__course-card' />
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='landing'
    >
      <HeroSection />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className='landing__featured'
      >
        <h2 className='landing__featured-title'>Featured Programs</h2>
        <p className='landing__featured-description'>
          From beginner to advanced, in all industries, we have the right
          programs just for you and preparing your entire journey for learning
          and making the most.
        </p>

        <div className='landing__tags'>
          {[
            'web development',
            'enterprise IT',
            'react nextjs',
            'javascript',
            'backend development',
          ].map((tag, index) => (
            <span key={index} className='landing__tag'>
              {tag}
            </span>
          ))}
        </div>

        <div className='landing__courses'>
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Trust Badges Section */}
      <TrustedSection />

      {/* User Journey Section */}
      <JourneySection />

      {/* Expanded Features Section */}
      <FeaturesSection />

      {/* Expert Coaching Team Section */}
      <CoachesSection />

      {/* Community Spotlight Section tsx Copy */}
      <SuccessStoriesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <CTASection />
    </motion.div>
  );
};

export default Landing;

const HeroSection = () => {
  const sectionAnimation = {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
    viewport: { once: true, amount: 0.3 },
  };

  const staggerAnimation = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
    viewport: { once: true },
  };

  const floatingImageAnimation = {
    initial: { scale: 0.8, opacity: 0, x: 20 },
    whileInView: { scale: 1, opacity: 1, x: 0 },
    transition: { type: 'spring', stiffness: 200 },
  };

  return (
    <section className='w-full'>
      <div className='max-w-7xl mx-auto px-0'>
        <motion.div
          className='flex flex-col md:flex-row items-center gap-12'
          {...sectionAnimation}
        >
          {/* Left Column - Content */}
          <motion.div className='md:w-1/2' {...staggerAnimation}>
            <motion.div
              className='mb-8 flex justify-center md:justify-start items-center gap-2'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className='bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium'>
                🎉 Join 50,000+ Successful Students
              </span>
            </motion.div>

            <motion.h1
              className='text-4xl md:text-6xl font-bold text-cod-gray mb-6 leading-tight'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Transform Your Health with{' '}
              <motion.span
                className='text-primary-500'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Expert-Led
              </motion.span>{' '}
              Programs
            </motion.h1>

            <motion.p
              className='text-xl text-customgreys-darkGrey mb-8 max-w-3xl'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Master muscle building, healthy weight gain, and holistic
              wellness...
            </motion.p>

            <motion.div
              className='flex gap-4 flex-col sm:flex-row'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button asChild size='lg' className='text-lg px-8 py-6 gap-2'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Start Free Trial <ArrowRight className='w-5 h-5' />
                </motion.div>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='text-lg px-8 py-6 border-primary-500 text-primary-500 hover:bg-primary-50'
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Watch Demo <Video className='w-5 h-5 ml-2' />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image Gallery */}
          <motion.div className='md:w-1/2 relative' {...sectionAnimation}>
            {/* Main Image Container */}
            <motion.div
              className='relative rounded-3xl overflow-hidden shadow-2xl h-[500px]'
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src='/landing/landing_hero.png'
                alt='Fitness training'
                className='object-cover'
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                priority
              />

              {/* Stats Overlay */}
              <motion.div
                className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className='flex gap-6 text-white-100'>
                  {[
                    { value: '95%', label: 'Success Rate' },
                    { value: '500+', label: 'Workout Videos' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <p className='text-2xl font-bold'>{stat.value}</p>
                      <p className='text-sm'>{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Images */}
            {[
              {
                src: '/landing/side_hero_1.jpeg',
                alt: 'Nutrition',
                className: '-left-8 -top-8',
                delay: 0.6,
              },
              {
                src: '/landing/side_hero_2.jpeg',
                alt: 'Workout',
                className: '-right-8 -bottom-8',
                delay: 0.8,
              },
            ].map((img, i) => (
              <motion.img
                key={i}
                src={img.src}
                alt={img.alt}
                className={`absolute ${img.className} w-32 h-32 rounded-2xl shadow-lg border-4 border-white hidden md:block`}
                {...floatingImageAnimation}
                transition={{
                  ...floatingImageAnimation.transition,
                  delay: img.delay,
                }}
              />
            ))}

            {/* Achievement Badge */}
            <motion.div
              className='absolute -right-8 top-8 bg-white-100 p-4 rounded-2xl shadow-lg hidden md:block'
              initial={{ scale: 0, rotate: -15 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, delay: 1 }}
            >
              <div className='flex items-center gap-3'>
                <Trophy className='w-8 h-8 text-yellow-500' />
                <div>
                  <p className='font-bold'>#1 Rated</p>
                  <p className='text-sm text-gray-600'>Health Platform</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustedSection = () => {
  const containerAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.5 },
    viewport: { once: true, amount: 0.2 },
  };

  const staggerAnimation = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
    viewport: { once: true },
  };

  const cardAnimation = {
    initial: { scale: 0.95, opacity: 0, y: 20 },
    whileInView: { scale: 1, opacity: 1, y: 0 },
    whileHover: { scale: 1.02, y: -5 },
    transition: { type: 'spring', stiffness: 300 },
  };

  const brands = [
    { icon: Trophy, name: 'Forbes', text: 'Top 10 Fitness Platform 2024' },
    { icon: HeartPulse, name: "Men's Health", text: "Editor's Choice Award" },
    { icon: Shield, name: 'BBC', text: 'Most Secure Platform' },
    { icon: Zap, name: 'TechCrunch', text: 'Innovation Award Winner' },
    { icon: Star, name: 'NIH', text: 'Certified Program' },
  ];

  return (
    <section className='w-full py-16'>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.div
          className='flex flex-col items-center mb-12'
          {...containerAnimation}
        >
          <motion.h3
            className='text-lg font-semibold text-primary-600 mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            TRUSTED BY INDUSTRY LEADERS
          </motion.h3>
          <motion.div
            className='w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full'
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className='grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8'
          {...staggerAnimation}
        >
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              {...cardAnimation}
              className='relative bg-white rounded-xl p-4 md:p-6 shadow-lg border border-customgreys-dirtyGrey 
                cursor-pointer group isolate'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Hover Effects */}
              <motion.div
                className='absolute inset-0 rounded-xl bg-gradient-to-br from-primary-50/50 to-transparent'
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: 'none' }}
              />
              <motion.div
                className='absolute inset-0 rounded-xl border border-primary-200/30'
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ pointerEvents: 'none' }}
              />

              <div className='flex flex-col items-center text-center gap-3 md:gap-4'>
                <motion.div
                  className='p-3 bg-primary-50 rounded-full'
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <brand.icon className='w-6 h-6 md:w-8 md:h-8 text-primary-600' />
                </motion.div>
                <motion.h4
                  className='text-lg md:text-xl font-semibold text-cod-gray'
                  whileHover={{ y: -2 }}
                >
                  {brand.name}
                </motion.h4>
                <motion.p
                  className='text-customgreys-darkGrey text-sm md:text-base leading-tight'
                  whileHover={{ y: -2 }}
                >
                  {brand.text}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StepComponent = ({
  stepNumber,
  title,
  description,
  imageSrc,
  isReversed = false,
}: {
  stepNumber: string;
  title: string;
  description: string;
  imageSrc: string;
  isReversed?: boolean;
  children?: React.ReactNode;
}) => {
  const imageAnimation = {
    initial: { scale: 0.95, opacity: 0, x: isReversed ? 50 : -50 },
    whileInView: { scale: 1, opacity: 1, x: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
    viewport: { once: true, margin: '0px 0px -100px 0px' },
  };

  const contentAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <motion.div
      className={`flex flex-col ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } items-center gap-8 relative group`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Animated vertical line */}
      {stepNumber === '01' && (
        <motion.div
          className='hidden md:block absolute left-1/2 top-24 h-[calc(100%+6rem)] w-1 overflow-hidden'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <motion.div
            className='h-full w-full bg-gradient-to-b from-primary-100 via-primary-300 to-primary-100'
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      )}

      {/* Image Container */}
      <motion.div className='md:w-1/2 relative' {...imageAnimation}>
        <motion.div
          className='absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100'
          transition={{ duration: 0.3 }}
        />
        <motion.img
          src={imageSrc}
          alt={title}
          className='rounded-2xl shadow-lg w-full h-[400px] object-cover'
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </motion.div>

      {/* Content Container */}
      <motion.div
        className={`md:w-1/2 ${isReversed ? 'md:pr-12' : 'md:pl-12'} space-y-4`}
        {...contentAnimation}
      >
        <motion.div
          className={`inline-block text-primary-600 font-medium ${
            isReversed ? 'text-right' : ''
          }`}
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {!isReversed && <span className='text-2xl mr-2'>{stepNumber}</span>}
          <span className='border-b-2 border-primary-500 pb-1'>{title}</span>
          {isReversed && <span className='text-2xl ml-2'>{stepNumber}</span>}
        </motion.div>

        <motion.h3
          className='text-4xl font-bold text-cod-gray'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className='text-customgreys-darkGrey text-lg'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const JourneySection = () => {
  const sectionAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <section className='w-full py-16 bg-white-100'>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.h2
          className='text-3xl font-bold text-center mb-16 text-cod-gray'
          {...sectionAnimation}
        >
          Your Transformative Journey
        </motion.h2>

        <div className='flex flex-col gap-24'>
          <StepComponent
            stepNumber='01'
            title='Initial Assessment'
            description='Comprehensive evaluation using advanced biometric scanning to understand your unique starting point'
            imageSrc='/landing/journey_1.jpeg'
          />

          <StepComponent
            stepNumber='02'
            title='Custom Design'
            description='Tailored 360° strategy combining precision workouts, nutrition, and recovery protocols'
            imageSrc='/landing/journey_2.jpg'
            isReversed
          />

          <StepComponent
            stepNumber='03'
            title='Guided Execution'
            description='Daily smart coaching with real-time adjustments and progress optimization'
            imageSrc='/landing/side_hero_1.jpeg'
          />
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const containerAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.5 },
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

  const cardAnimation = {
    initial: { scale: 0.95, opacity: 0, y: 20 },
    whileInView: { scale: 1, opacity: 1, y: 0 },
    whileHover: { y: -5 },
    transition: { type: 'spring', stiffness: 300 },
  };

  const features = [
    {
      icon: BookOpen,
      title: '500+ Lessons',
      text: 'Comprehensive curriculum covering all aspects of health',
    },
    {
      icon: Award,
      title: 'Certification',
      text: 'Earn recognized credentials upon completion',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      text: 'Bank-level security for your data',
    },
    {
      icon: Smile,
      title: 'Community Support',
      text: 'Connect with 50k+ health enthusiasts',
    },
    {
      icon: MessageCircle,
      title: '1:1 Coaching',
      text: 'Personalized guidance from experts',
    },
    {
      icon: HeartPulse,
      title: 'Health Tracking',
      text: 'Integrated tools to monitor progress',
    },
  ];

  return (
    <section className='w-full py-16 bg-white-100' id='features'>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-bold mb-4 text-cod-gray'>
            Everything You Need to Succeed
          </h2>
          <motion.p
            className='text-customgreys-darkGrey max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A complete health education ecosystem with cutting-edge learning
            tools
          </motion.p>
        </motion.div>

        <motion.div className='grid md:grid-cols-3 gap-8' {...staggerAnimation}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              {...cardAnimation}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              <Card className='p-8 text-center hover:shadow-lg transition-all group border border-customgreys-dirtyGrey hover:border-primary-100'>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className='w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6'
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <feature.icon className='w-8 h-8 text-primary-600' />
                  </motion.div>
                  <motion.h3
                    className='text-xl font-bold mb-2 text-cod-gray'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    className='text-customgreys-darkGrey'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {feature.text}
                  </motion.p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CoachesSection = () => {
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
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
    viewport: { once: true },
  };

  const coachAnimation = {
    initial: { scale: 0.95, opacity: 0, y: 30 },
    whileInView: { scale: 1, opacity: 1, y: 0 },
    whileHover: { y: -10 },
    transition: { type: 'spring', stiffness: 300 },
  };

  const coaches = [
    {
      name: 'Sarah Johnson',
      role: 'Strength Training Expert',
      bio: '5x National Powerlifting Champion',
      img: '/landing/coach_1.jpg',
    },
    {
      name: 'Mike Chen',
      role: 'Nutrition Specialist',
      bio: 'PhD in Sports Nutrition',
      img: '/landing/coach_2.jpeg',
    },
    {
      name: 'Emma Wilson',
      role: 'Holistic Wellness Coach',
      bio: 'Yoga Alliance Certified Instructor',
      img: '/landing/coach_3.jpeg',
    },
  ];

  return (
    <section className='w-full py-16 bg-gradient-to-b from-primary-50 to-white-100'>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-bold mb-4 text-cod-gray'>
            Meet Your Coaches
          </h2>
          <motion.p
            className='text-customgreys-darkGrey max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Learn from certified professionals with 10+ years of combined
            experience
          </motion.p>
        </motion.div>

        <motion.div className='grid md:grid-cols-3 gap-8' {...staggerAnimation}>
          {coaches.map((coach, i) => (
            <motion.div
              key={i}
              {...coachAnimation}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              className='relative group'
            >
              <motion.div
                className='relative overflow-hidden rounded-2xl aspect-square'
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src={coach.img}
                  alt={coach.name}
                  className='object-cover w-full h-full'
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />

                <motion.div
                  className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 0.8 }}
                />

                <motion.div
                  className='absolute bottom-0 left-0 right-0 p-6 text-white'
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <h3 className='text-xl font-bold text-white-100'>
                    {coach.name}
                  </h3>
                  <motion.p
                    className='text-primary-200'
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {coach.role}
                  </motion.p>
                  <motion.p
                    className='text-sm mt-2'
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {coach.bio}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SuccessStoriesSection = () => {
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
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
    viewport: { once: true },
  };

  const storyAnimation = {
    initial: { scale: 0.95, opacity: 0, y: 30 },
    whileInView: { scale: 1, opacity: 1, y: 0 },
    whileHover: { y: -10 },
    transition: { type: 'spring', stiffness: 300 },
  };

  const stories = [
    {
      name: 'Mike Chen',
      result: '+15kg muscle in 6 months',
      img: '/landing/testimonial_1.jpg',
    },
    {
      name: 'Sarah Johnson',
      result: '-12% body fat in 3 months',
      img: '/landing/testimonial_2.jpg',
    },
    {
      name: 'Emma Wilson',
      result: 'Completed first marathon',
      img: '/landing/testimonial_3.jpg',
    },
  ];

  return (
    <section className='w-full py-16 bg-white-100'>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-bold mb-4 text-cod-gray'>
            Success Stories
          </h2>
          <motion.p
            className='text-customgreys-darkGrey max-w-2xl mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join 50,000+ members who transformed their lives
          </motion.p>
        </motion.div>

        <motion.div className='grid md:grid-cols-3 gap-8' {...staggerAnimation}>
          {stories.map((story, i) => (
            <motion.div
              key={i}
              {...storyAnimation}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              className='relative group'
            >
              <motion.div
                className='relative overflow-hidden rounded-2xl aspect-[4/3]'
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src={story.img}
                  alt={story.name}
                  className='object-cover w-full h-full'
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  loading='lazy'
                />

                <motion.div
                  className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 0.8 }}
                />

                <motion.div
                  className='absolute bottom-0 left-0 right-0 p-6 text-white'
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <h3 className='text-lg text-primary-700 font-bold'>
                    {story.name}&apos; Journey
                  </h3>
                  <motion.p
                    className='text-sm mt-2 text-white-100'
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {story.result}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className='mt-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            asChild
            size='lg'
            className='gap-2 bg-primary-500 hover:bg-primary-600'
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Users className='w-5 h-5' />
              Join Community
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const PricingSection = () => {
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
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
    viewport: { once: true },
  };

  const planAnimation = {
    initial: { scale: 0.95, opacity: 0, y: 30 },
    whileInView: { scale: 1, opacity: 1, y: 0 },
    whileHover: { y: -10 },
    transition: { type: 'spring', stiffness: 300 },
  };

  const plans = [
    {
      name: 'Starter',
      price: '0',
      features: [
        '3 Free Programs',
        'Community Access',
        'Basic Tracking',
        'Weekly Webinars',
      ],
    },
    {
      name: 'Pro',
      price: '29',
      features: [
        'All Programs',
        '1:1 Coaching',
        'Advanced Tracking',
        'Certification',
        'Priority Support',
      ],
      popular: true,
    },
    {
      name: 'Team',
      price: '99',
      features: [
        'Up to 5 Users',
        'Team Dashboard',
        'Custom Content',
        'Dedicated Support',
      ],
    },
  ];

  return (
    <section className='w-full py-16 bg-white-100' id='pricing'>
      <div className='max-w-7xl mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-bold mb-4 text-cod-gray'>
            Simple, Transparent Pricing
          </h2>
          <motion.p
            className='text-customgreys-darkGrey'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Start for free, upgrade when you&apos;re ready
          </motion.p>
        </motion.div>

        <motion.div
          className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'
          {...staggerAnimation}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              {...planAnimation}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            >
              <Card
                className={`p-8 relative ${
                  plan.popular
                    ? 'border-2 border-primary-600'
                    : 'border border-customgreys-dirtyGrey'
                }`}
              >
                {plan.popular && (
                  <motion.div
                    className='absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-lg text-sm'
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Most Popular
                  </motion.div>
                )}

                <motion.h3
                  className='text-2xl font-bold mb-4 text-cod-gray'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                >
                  {plan.name}
                </motion.h3>

                <motion.div
                  className='text-4xl font-bold mb-6'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ${plan.price}
                  <span className='text-lg text-customgreys-darkGrey'>
                    /month
                  </span>
                </motion.div>

                <ul className='space-y-4 mb-8'>
                  {plan.features.map((feature, j) => (
                    <motion.li
                      key={j}
                      className='flex items-center gap-2 text-customgreys-darkGrey'
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * j }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <CheckCircle2 className='w-5 h-5 text-tertiary-50' />
                      </motion.div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className='w-full'
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Choose {plan.name}
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I access the programs?',
      answer:
        'After signing up, you&apos;ll get instant access to our learning platform through any web browser or mobile device.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer:
        'Yes, you can cancel anytime through your account settings. No hidden fees.',
    },
    {
      question: 'Are the certifications recognized?',
      answer:
        'Our certifications are accredited by leading health organizations worldwide.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers.',
    },
  ];

  const containerAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true, amount: 0.2 },
  };

  const itemAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const chevronAnimation = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <section className='w-full py-16 bg-white-100' id='faq'>
      <div className='max-w-4xl mx-auto px-4'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl font-bold mb-4 text-cod-gray'>
            Frequently Asked Questions
          </h2>
          <motion.p
            className='text-customgreys-darkGrey'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Everything you need to know about FitMeFine
          </motion.p>
        </motion.div>

        <motion.div className='space-y-6' {...containerAnimation}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              {...itemAnimation}
              viewport={{ once: true, margin: '0px 0px -20px 0px' }}
            >
              <motion.div
                className='p-6 border border-customgreys-dirtyGrey hover:border-primary-100 rounded-lg shadow-sm bg-white'
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div
                  className='cursor-pointer'
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className='flex justify-between items-center'>
                    <motion.span
                      className='text-lg font-medium text-cod-gray'
                      whileHover={{ color: '#3b82f6' }}
                      transition={{ duration: 0.2 }}
                    >
                      {faq.question}
                    </motion.span>
                    <motion.svg
                      className='w-6 h-6 text-primary-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      initial={false}
                      animate={openIndex === i ? 'open' : 'closed'}
                      variants={chevronAnimation}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </motion.svg>
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden'
                    >
                      <p className='mt-4 text-customgreys-darkGrey'>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
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
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
    viewport: { once: true },
  };

  return (
    <section className='w-full py-16 bg-customgreys-primarybg text-white'>
      <motion.div
        className='max-w-4xl mx-auto px-4 text-center'
        {...containerAnimation}
      >
        <motion.h2
          className='text-3xl md:text-4xl font-bold mb-6'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Start Your Health Journey Today
        </motion.h2>

        <motion.p
          className='text-customgreys-darkGrey mb-8 max-w-2xl mx-auto'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join thousands of students who&apos;ve transformed their lives with
          FitMeFine
        </motion.p>

        <motion.div className='flex gap-4 justify-center' {...staggerAnimation}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              asChild
              size='lg'
              className='text-lg px-8 py-6 bg-primary-500 hover:bg-primary-600'
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Get Started Now
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              asChild
              size='lg'
              variant='secondary'
              className='text-lg px-8 py-6 border border-white hover:border-primary-500 hover:text-primary-500'
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Speak to Advisor
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
