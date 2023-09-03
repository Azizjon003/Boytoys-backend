import { Orders } from './order.entity';

export const OrderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useValue: Orders,
  },
];
