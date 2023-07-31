import { getData } from './get-data.entity';

export const GetDataProvider = [
  {
    provide: 'SLIDER_REPOSITORY',
    useValue: getData,
  },
];
