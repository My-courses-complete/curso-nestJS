import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  get(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    return {
      message: `Productos ${limit} ${offset}`,
      data: [],
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Producto creado',
      data: payload,
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id') id: string) {
    return {
      message: `Producto ${id}`,
      data: {},
    };
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() payload: any) {
    return {
      message: `Producto ${id} actualizado`,
      data: payload,
    };
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return `Eliminar producto ${id}`;
  }
}
