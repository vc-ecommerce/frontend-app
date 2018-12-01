
import { privilege } from './privilege';
import { role } from './role';
import { user } from './user';

export const index = [
  ...privilege,
  ...role,
  ...user,
];
