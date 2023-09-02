import { Auth } from './auth.entity';

Auth;

export const AuthProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: Auth,
  },
];
