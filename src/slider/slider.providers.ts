import { Slider } from './slider.entity';

export const SliderProviders = [
  {
    provide: 'SLIDER_REPOSITORY',
    useValue: Slider,
  },
];
