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

  @ManyToOne(() => Customer) //varios pedidos podem ter um cliente
  @JoinColumn({ name: 'customer_id'})
  customer: Customer; //relacionamento

  @OneToMany(() => OrdersProducts, order_products => order_products.order, {
    cascade: true
  }) //um pra muitos nessa ponta, muitos para um na ponta do OrderProduct forma um MtoM
  order_products: OrdersProducts[]; //relacionamento

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
