import { applyDecorators } from '@nestjs/common';
import {
  // ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiDeleteProductResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a product' }),
    // ApiCookieAuth(),
    ApiParam({
      name: 'id',
      description: 'The unique identifier of the product',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'Product with id #1 has been deleted',
      schema: {
        example: {
          statusCode: 200,
          message: 'Product with id #1 has been deleted',
          product: {
            id: 1,
            name: 'Ficus',
            price: 15.99,
            available: false,
            createdAt: '2024-02-27T15:50:58.406Z',
            updatedAt: '2024-02-27T15:50:58.406Z',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: `Unauthorized: Insufficient permissions.`,
      schema: {
        example: {
          statusCode: 401,
          message: `Insufficient permissions to view this information.`,
          error: 'Unauthorized',
        },
      },
    }),
    ApiForbiddenResponse({
      description:
        'Forbidden: You do not have permission to access this resource.',
      schema: {
        example: {
          statusCode: 403,
          message: 'User Jhon Doe need a valid role: [admin]',
          error: 'Forbidden',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Product with id #1 not found',
      schema: {
        example: {
          statusCode: 404,
          message: 'Product with id #1 not found',
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
