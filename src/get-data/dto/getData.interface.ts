import { Slider } from 'src/slider/slider.entity';
import { getData } from '../get-data.entity';

export interface getDataInterface {
  data: getData[];
  slider: Slider[];
}
