import ResetPassword from '@/domains/auth/ResetPassword';

export const reset = [
  {
    path: '/password/reset',
    name: 'auth.reset',
    component: ResetPassword
  }
];
