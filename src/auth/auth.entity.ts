import { UUIDV4 } from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Orders } from 'src/orders/order.entity';

@Table
export class Auth extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  gender: string;

  @Column({
    type: DataType.DATE,
  })
  birthday: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  phoneVerifired: boolean;

  @Column({
    type: DataType.ENUM,
    values: ['user', 'admin'],
    defaultValue: 'user',
  })
  role: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt?: Date;

  @Column({
    type: DataType.TEXT,
  })
  token: string;

  @Column({
    type: DataType.DATE,
  })
  codeExpired: Date;

  @Column({
    type: DataType.STRING,
  })
  code: string;

  @HasMany(() => Orders)
  orders: Orders[];
}
