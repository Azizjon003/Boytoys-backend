import { Sequelize } from 'sequelize-typescript';
import { Slider } from '../slider/slider.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'boytoys',
        logging: false,
      });

      sequelize.addModels([Slider]);
      await sequelize.sync();
      console.log('Database connected');
      return sequelize;
    },
  },
];
