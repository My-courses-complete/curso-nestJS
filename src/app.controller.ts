import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo') newEndpoint() {
    return 'Nuevo';
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return `Producto ${id}`;
  }

  @Get('products')
  getProducts(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    return `Limit: ${limit} - Offset: ${offset}`;
  }

  @Get('category/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Categoria ${id} - Producto ${productId}`;
  }
}
