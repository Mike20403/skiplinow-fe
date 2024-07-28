import { LoginForm } from '@/components/form/LoginForm';
import { RegisterForm } from '@/components/form/RegisterForm';
import { useState } from 'react';

export const LoginPages = () => {
  const [isLoginForm, setToggleForm] = useState(true);
  return (
    <>{isLoginForm ? <LoginForm setToggleForm={setToggleForm} /> : <RegisterForm setToggleForm={setToggleForm} />}</>
  );
};
