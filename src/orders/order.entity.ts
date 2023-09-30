import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Auth } from 'src/auth/auth.entity';
import { Branch } from 'src/branch/branch.entity';
import { Payments } from 'src/payment/payment.entity';

@Table
export class Orders extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.ARRAY(DataType.JSONB),
    allowNull: false,
  })
  products: any[];

  @Column({
    type: DataType.JSONB,
  })
  address: any;

  @Column({
    type: DataType.TEXT,
  })
  message: string;

  @Column({
    type: DataType.ENUM,
    values: ['pending', 'success', 'cancel'],
    defaultValue: 'pending',
  })
  status: string;

  @Column({
    type: DataType.ENUM,
    values: ['delivery', 'pickup'],
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => Auth)
  @BelongsTo(() => Auth, { as: 'user' })
  auth: Auth;

  @Column({
    type: DataType.UUID,
  })
  deliveryId: string;

  @ForeignKey(() => Branch)
  @BelongsTo(() => Branch, { as: 'delivery' })
  branch: Branch;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  paymentId: string;
  @ForeignKey(() => Payments)
  @BelongsTo(() => Payments, { as: 'payment' })
  payments: Payments;
}
