import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';

const Signup = () => {
  return (
    <AuthLayout
      title="Create Account"
      description="Join the campus help desk system"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;