import { applyDecorators } from '@nestjs/common';
import {
  ApiConflictResponse,
  // ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiUpdateProductResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a product' }),
    // ApiCookieAuth(),
    ApiParam({
      name: 'id',
      description: 'The unique identifier of the product',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'Product updated successfully',
      schema: {
        example: {
          statusCode: 200,
          message: 'Product updated successfully',
          product: {
            id: 1,
            name: 'Ficus',
            price: 15.99,
            available: true,
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
      description: 'No product found',
      schema: {
        example: {
          statusCode: 404,
          message: 'Product with id #1 not found',
          error: 'Not Found',
        },
      },
    }),
    ApiConflictResponse({
      description: 'Key (key)=(value) already exists.',
      schema: {
        example: {
          statusCode: 409,
          message: 'The field (field) must be unique.',
          error: 'Conflict',
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Error: Unique constraint failed on the field: (field)',
      schema: {
        example: {
          statusCode: 500,
          error: 'An unexpected error occurred.',
        },
      },
    }),
  );
};
