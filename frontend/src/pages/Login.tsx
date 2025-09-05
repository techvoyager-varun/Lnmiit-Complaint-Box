import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <AuthLayout
      title="Sign In"
      description="Access your campus help desk account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;