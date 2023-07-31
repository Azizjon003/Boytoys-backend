import { Get, Injectable } from '@nestjs/common';
import { getData } from './get-data.entity';
import { Slider } from 'src/slider/slider.entity';
import { getDataInterface } from './dto/getData.interface';
// import { GetDataProvider } from './get-data.providers';

@Injectable()
export class GetDataService {
  // constructor(private getDataRepository: GetDataProvider) {}
  async findAll(): Promise<getDataInterface> {
    // const data = await getData.findAll();
    // const slider = await Slider.findAll();
    const [data, slider] = await Promise.all([
      getData.findAll(),
      Slider.findAll(),
    ]);

    return {
      data,
      slider,
    };
  }
}
