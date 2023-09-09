import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Orders } from 'src/orders/order.entity';

@Table
export class Payments extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Orders)
  orders: Orders[];
}
