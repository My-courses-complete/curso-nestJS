import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, payload: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    this.categoryRepository.merge(category, payload);
    return this.categoryRepository.save(category);
  }

  async delete(id: number) {
    const category = await this.findOne(id);
    return this.categoryRepository.remove(category);
  }
}
