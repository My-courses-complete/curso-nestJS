import { Exclude, Expose } from 'class-transformer';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-product.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({
    name: 'order_id',
  })
  customer: Customer;
  @Exclude()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];
  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));
    }
    return [];
  }
  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => total + item.quantity * item.product.price, 0);
    }
    return 0;
  }
}
