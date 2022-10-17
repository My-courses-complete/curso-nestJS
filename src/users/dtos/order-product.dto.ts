import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPositive, IsNotEmpty } from 'class-validator';

export class CreateOrderProductDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;
}

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {}
