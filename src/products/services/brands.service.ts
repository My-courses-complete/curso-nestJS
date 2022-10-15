import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async findOne(
    id: number,
    // propiedad relation default false
    relation = true,
  ): Promise<Brand> {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: relation ? relation['products'] : [],
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(brand: CreateBrandDto): Promise<Brand> {
    const newBrand = this.brandRepository.create(brand);
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, payload: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id);
    this.brandRepository.merge(brand, payload);
    return this.brandRepository.save(brand);
  }

  async delete(id: number) {
    const brand = await this.findOne(id);
    return this.brandRepository.remove(brand);
  }
}
