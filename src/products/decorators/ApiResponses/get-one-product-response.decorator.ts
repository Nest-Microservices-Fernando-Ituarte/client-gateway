import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiGetOneProductResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve a product by ID' }),
    ApiParam({
      name: 'id',
      description: 'The unique identifier of the product',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'Product retrieved successfully.',
      schema: {
        example: {
          statusCode: 200,
          message: 'Product retrieved successfully.',
          product: {
            id: 1,
            name: "TV 55'",
            price: 15.99,
            available: true,
            createdAt: '2024-02-27T15:50:58.406Z',
            updatedAt: '2024-02-27T15:50:58.406Z',
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'No product found',
      schema: {
        example: {
          statusCode: 404,
          message: 'No product found',
          error: 'Not Found',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Check server logs',
          error: 'Internal Server Error',
        },
      },
    }),
  );
};
