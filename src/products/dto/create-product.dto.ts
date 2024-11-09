import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Iphone 14',
    description: 'Name of the product',
  })
  @IsString()
  public name: string;

  @ApiPropertyOptional({
    example: 123,
    description: 'Price of the product',
  })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @Type(() => Number)
  public price: number;
}
