
import { login } from './login';
import { forgot } from './forgot';
import { reset } from './reset';

export const index = [
  ...login,
  ...forgot,
  ...reset
];
