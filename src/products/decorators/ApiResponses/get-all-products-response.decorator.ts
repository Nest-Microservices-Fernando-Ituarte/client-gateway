import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

export const ApiGetAllProductsResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve all products' }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: 'Number of items per page',
      example: 10,
      type: Number,
    }),
    ApiQuery({
      name: 'page',
      required: false,
      description: 'Page number to retrieve',
      example: 1,
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'Products retrieved successfully.',
      schema: {
        example: {
          statusCode: 200,
          message: 'Products retrieved successfully.',
          products: [
            {
              id: 1,
              name: "TV 55'",
              price: 15.99,
              available: true,
              createdAt: '2024-02-27T15:50:58.406Z',
              updatedAt: '2024-02-27T15:50:58.406Z',
            },
            {
              id: 2,
              name: 'Tablet samsung',
              price: 15.99,
              available: true,
              createdAt: '2024-02-27T15:50:58.406Z',
              updatedAt: '2024-02-27T15:50:58.406Z',
            },
          ],
          pagination: {
            page: 1,
            limit: 10,
            totalCount: 50,
          },
        },
      },
    }),
    ApiNoContentResponse({
      description: 'No products found in the list.',
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
