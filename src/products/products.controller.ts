import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateProductResponse,
  ApiDeleteProductResponse,
  ApiGetAllProductsResponse,
  ApiGetOneProductResponse,
  ApiUpdateProductResponse,
} from './decorators';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  @ApiCreateProductResponse()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const response = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, createProductDto),
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Get()
  @ApiGetAllProductsResponse()
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const response = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_all_products' }, paginationDto),
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  @ApiGetOneProductResponse()
  async findOne(@Param('id') id: ParseIntPipe) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Patch(':id')
  @ApiUpdateProductResponse()
  async update(
    @Param('id') id: ParseIntPipe,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.productsClient.send(
          { cmd: 'update_product' },
          { id, ...updateProductDto },
        ),
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Delete(':id')
  @ApiDeleteProductResponse()
  async delete(@Param('id') id: ParseIntPipe) {
    try {
      const response = await firstValueFrom(
        this.productsClient.send({ cmd: 'delete_product' }, { id }),
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
