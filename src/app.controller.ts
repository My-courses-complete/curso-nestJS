import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('category/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `Categoria ${id} - Producto ${productId}`;
  }
}
