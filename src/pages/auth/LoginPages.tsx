import { LoginForm } from '@/components/form/login-form';
import { RegisterForm } from '@/components/form/register-form';
import { useState } from 'react';

export const LoginPages = () => {
  const [isLoginForm, setToggleForm] = useState(true);
  return (
    <>{isLoginForm ? <LoginForm setToggleForm={setToggleForm} /> : <RegisterForm setToggleForm={setToggleForm} />}</>
  );
};
