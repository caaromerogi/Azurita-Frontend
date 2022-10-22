import { Authority } from './Autorities';

export type Jwt = {
  customerId: string;
  token: string;
  bearer: string;
  email: string;
  authorities: Authority[];
};
