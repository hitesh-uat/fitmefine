'use client';

import CoursePreview from '@/components/CoursePreview';
import Loading from '@/components/Loading';
import SignInComponent from '@/components/SignIn';
import SignUpComponent from '@/components/SignUp';
import { useCurrentCourse } from '@/hooks/useCurrentCourse';
import { GuestFormData, guestSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

const CheckoutDetailsPage = () => {
  const { course: selectedCourse, isLoading, isError } = useCurrentCourse();
  const searchParams = useSearchParams();
  const showSignUp = searchParams.get('showSignUp') === 'true';

  const methods = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      email: '',
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Failed to fetch program data</div>;
  if (!selectedCourse) return <div>Program not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="mx-auto max-w-8xl px-4 sm:px-2 lg:px-3">
        <div className="grid grid-cols-1 gap-8 gap-x-16 md:grid-cols-2">
          {/* Course Preview Section */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <CoursePreview course={selectedCourse} />
          </motion.div>

          {/* Auth/Payment Section */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl p-6"
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={showSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {showSignUp ? <SignUpComponent /> : <SignInComponent />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
};

export default CheckoutDetailsPage;
