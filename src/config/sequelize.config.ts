import { Sequelize } from 'sequelize-typescript';
import { Slider } from '../slider/slider.entity';
import { getData } from 'src/get-data/get-data.entity';
import { Auth } from 'src/auth/auth.entity';
import { Orders } from 'src/orders/order.entity';
import { Branch } from 'src/branch/branch.entity';

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

      sequelize.addModels([Slider, getData, Auth, Orders, Branch]);
      await sequelize.sync();
      console.log('Database connected');
      return sequelize;
    },
  },
];
