import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands() {
    return 'Get brands';
  }

  @Get('/:id')
  getBrand(@Param('id') id: string) {
    return `Get brand ${id}`;
  }

  @Post()
  createBrand() {
    return 'Create brand';
  }

  @Put('/:id')
  updateBrand(@Param('id') id: string) {
    return `Update brand ${id}`;
  }

  @Delete('/:id')
  deleteBrand(@Param('id') id: string) {
    return `Delete brand ${id}`;
  }
}
