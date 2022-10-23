import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';

import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { ProductsService } from '../services/products.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' })
  async get(@Query() params: FilterProductDto) {
    return {
      data: await this.productsService.findAll(params),
    };
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() payload: CreateProductDto) {
    return {
      message: 'Producto creado',
      data: await this.productsService.create(payload),
    };
  }

  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Producto ${id}`,
      data: await this.productsService.findOne(+id),
    };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      message: `Producto ${id} actualizado`,
      data: await this.productsService.update(+id, payload),
    };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.delete(id);
  }

  @Delete('/:id/category/:categoryId')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.productsService.removeCategoryFromProduct(id, categoryId);
  }

  @Put('/:id/category/:categoryId')
  async addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.productsService.addCategoryToProduct(id, categoryId);
  }
}
