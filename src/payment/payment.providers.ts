import { Payments } from './payment.entity';

export const PaymentsProviders = [
  {
    provide: 'SLIDER_REPOSITORY',
    useValue: Payments,
  },
];
