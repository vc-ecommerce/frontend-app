import ForgotPassword from '@/components/domains/auth/ForgotPassword';

export const forgot = [
  {
    path: '/password/forgot/:token',
    name: 'auth.forgot',
    component: ForgotPassword
  }
];
