import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar' })
  image: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
  @ManyToMany(() => Category, (category) => category.products, {
    nullable: false,
  })
  categories: Category[];
}
