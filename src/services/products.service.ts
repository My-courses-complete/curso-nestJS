import { Injectable } from '@nestjs/common';

import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counter = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product One',
      description: 'Description of product one',
      price: 100,
      stock: 10,
      image: 'https://picsum.photos/200/300',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any): Product {
    this.counter = this.counter + 1;
    const newProduct = {
      id: this.counter,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any): Product {
    const product = this.findOne(id);
    if (!product) {
      return null;
    }
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  delete(id: number): void {
    const index = this.products.findIndex((item) => item.id === id);
    this.products.splice(index, 1);
  }
}
