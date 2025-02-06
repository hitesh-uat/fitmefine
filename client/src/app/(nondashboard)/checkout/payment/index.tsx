import CoursePreview from '@/components/CoursePreview';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import { useCurrentCourse } from '@/hooks/useCurrentCourse';
import { cn, formatPrice } from '@/lib/utils';
import { useCreateTransactionMutation } from '@/state/api';
import { useClerk, useUser } from '@clerk/nextjs';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { CreditCard, Loader2, LogOut, ShieldCheck } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import StripeProvider from './StripeProvider';

const PaymentPageContent = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [createTransaction] = useCreateTransactionMutation();
  const { navigateToStep } = useCheckoutNavigation();
  const { course, courseId } = useCurrentCourse();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe service is not available');
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL
      ? `${process.env.NEXT_PUBLIC_LOCAL_URL}`
      : process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : undefined;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${baseUrl}/checkout?step=3&id=${courseId}`,
      },
      redirect: 'if_required',
    });

    if (result.paymentIntent?.status === 'succeeded') {
      const transactionData: Partial<Transaction> = {
        transactionId: result.paymentIntent.id,
        userId: user?.id,
        courseId: courseId,
        paymentProvider: 'stripe',
        amount: course?.price || 0,
      };

      await createTransaction(transactionData), navigateToStep(3);
    }
  };

  const handleSignOutAndNavigate = async () => {
    await signOut();
    navigateToStep(1);
  };

  if (!course) return null;

  const elementsOptions = {
    appearance: {
      theme: 'night',
      variables: {
        colorText: '#ffffff',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='min-h-screen bg-gray-50 py-8'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Order Summary */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className='space-y-6'
          >
            <CoursePreview course={course} />
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='rounded-xl bg-white p-8 shadow-lg'
          >
            <form
              id='payment-form'
              onSubmit={handleSubmit}
              className='space-y-6'
            >
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-3xl font-bold text-gray-900'>Checkout</h1>
                  <Badge
                    variant='outline'
                    className='border-primary-500 text-primary-600'
                  >
                    Secure SSL Encryption
                  </Badge>
                </div>
                <p className='text-gray-500'>
                  Complete your purchase with our 128-bit secure payment gateway
                </p>
              </div>

              {/* Payment Method Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Payment Method
                </h3>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className='rounded-lg border border-gray-200 bg-gray-50 p-6'
                >
                  <div className='mb-4 flex items-center space-x-3'>
                    <CreditCard className='h-6 w-6 text-primary-600' />
                    <span className='text-lg font-medium'>
                      Credit/Debit Card
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='space-y-4'
                  >
                    <PaymentElement className='border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 ' />
                  </motion.div>
                </motion.div>
              </div>

              {/* Security Assurance */}
              <div className='flex items-center space-x-3 rounded-lg bg-green-50 p-4'>
                <ShieldCheck className='h-6 w-6 text-green-600' />
                <span className='text-sm text-green-700'>
                  Your payment is protected with 256-bit SSL encryption
                </span>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Payment Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between'
        >
          <Button
            onClick={handleSignOutAndNavigate}
            variant='ghost'
            className='group flex items-center gap-2 text-gray-600 hover:bg-gray-100 
           shadow-md hover:shadow-sm transition-all duration-300'
          >
            <LogOut className='h-4 w-4 transition-transform group-hover:-translate-x-0.5' />
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Switch Account
            </motion.span>
          </Button>

          <Button
            form='payment-form'
            type='submit'
            size='lg'
            className={cn(
              'w-full sm:w-auto transition-all duration-300',
              'bg-primary-600 hover:bg-primary-700 text-white-100',
              'shadow-lg shadow-primary-500/20 hover:shadow-primary-600/30',
              'rounded-xl px-8 py-6 text-lg font-semibold',
              'transform hover:scale-[1.02] active:scale-95'
            )}
            disabled={!stripe || !elements}
          >
            {stripe ? (
              <motion.div
                className='flex items-center gap-2'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <CreditCard className='h-6 w-6' />
                <span>Pay {formatPrice(course.price)}</span>
              </motion.div>
            ) : (
              <div className='flex items-center gap-2'>
                <Loader2 className='h-6 w-6 animate-spin' />
                <span>Processing...</span>
              </div>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PaymentPage = () => (
  <StripeProvider>
    <PaymentPageContent />
  </StripeProvider>
);

export default PaymentPage;
