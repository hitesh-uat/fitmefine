import Loading from '@/components/Loading';
import { useCurrentCourse } from '@/hooks/useCurrentCourse';
import { useCreateStripePaymentIntentMutation } from '@/state/api';
import { Elements } from '@stripe/react-stripe-js';
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance: Appearance = {
  theme: 'flat',
  variables: {
    fontFamily: 'Inter, system-ui, sans-serif',
    colorPrimary: '#f1b163',
    colorBackground: '#ffffff',
    colorText: '#374151',
    colorDanger: '#ef4444',
    borderRadius: '8px',
  },
  rules: {
    '.Input': {
      border: '1px solid #e68d19',
      padding: '10px 12px',
      backgroundColor: '#ffffff',
    },
    '.Input:focus': {
      borderColor: '#e68d19',
      boxShadow: '0 0 0 1px #e68d19',
    },
    '.Label': {
      color: '#374151',
      fontWeight: '500',
      marginBottom: '6px',
    },
    '.Error': {
      color: '#ef4444',
    },
  },
};

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientSecret, setClientSecret] = useState<string | ''>('');
  const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();
  const { course } = useCurrentCourse();

  useEffect(() => {
    if (!course) return;
    const fetchPaymentIntent = async () => {
      const result = await createStripePaymentIntent({
        amount: course?.price ?? 9999999999999,
      }).unwrap();

      setClientSecret(result.clientSecret);
    };

    fetchPaymentIntent();
  }, [createStripePaymentIntent, course?.price, course]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) return <Loading />;

  return (
    <Elements stripe={stripePromise} options={options} key={clientSecret}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
