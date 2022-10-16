import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from '../entities/product.entity';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    if (product.brandId) {
      const brand = await this.brandsService.findOne(product.brandId, false);
      newProduct.brand = brand;
    }
    if (product.categoriesIds) {
      const categories = await this.categoriesService.findManyByIds(
        product.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return this.productRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId, false);
      product.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoriesService.findManyByIds(
        payload.categoriesIds,
      );
      product.categories = categories;
    }
    this.productRepository.merge(product, payload);
    return this.productRepository.save(product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }

  async removeCategoryFromProduct(productId: number, categoryId: number) {
    const product = await this.findOne(productId);
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepository.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.findOne(productId);
    const category = await this.categoriesService.findOne(categoryId);
    product.categories.push(category);
    return this.productRepository.save(product);
  }
}
