import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

@Entity('order')
class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Customer)
  @JoinColumn({ name: 'customer_id'})
  customer: Customer;

  @OneToMany(() => OrdersProducts, order_products => order_products.order) //um pra muitos nessa ponta, um pra muitos na outra forma um MtoM
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
