'use client';

import { SignIn, useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';

const SignInComponent = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const isCheckoutPage = searchParams.get('showSignUp') !== null;
  const courseId = searchParams.get('id');

  const signUpUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=true`
    : '/signup';

  const getRedirectUrl = () => {
    if (isCheckoutPage) {
      return `/checkout?step=2&id=${courseId}&showSignUp=true`;
    }

    const userType = user?.publicMetadata?.userType as string;

    if (userType === 'teacher') {
      return '/teacher/courses';
    }
    return '/user/courses';
  };

  return (
    <SignIn
      appearance={{
        // baseTheme: dark,
        elements: {
          rootBox: 'flex justify-center items-center py-5',
          card: 'w-full shadow-none border-none',
          headerTitle: 'text-2xl font-bold text-gray-900',
          headerSubtitle: 'text-gray-500',
          formFieldLabel: 'text-gray-700 font-medium',
          formFieldInput:
            'rounded-lg border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
          formButtonPrimary:
            'bg-primary-600 hover:bg-primary-700 text-white rounded-lg py-3 text-sm font-medium transition-colors',
          footerActionLink: 'text-primary-600 hover:text-primary-700',
          socialButtonsBlockButton:
            'border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg',
        },
      }}
      signUpUrl={signUpUrl}
      forceRedirectUrl={getRedirectUrl()}
      routing='hash'
      afterSignOutUrl='/'
    />
  );
};

export default SignInComponent;
