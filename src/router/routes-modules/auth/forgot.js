import ForgotPassword from '@/components/pages/auth/ForgotPassword';

export const forgot = [
  {
    path: '/password/forgot/:token',
    name: 'auth.forgot',
    component: ForgotPassword
  }
];
