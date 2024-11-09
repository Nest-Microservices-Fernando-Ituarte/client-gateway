import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  // ApiCookieAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiCreateProductResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new product' }),
    // ApiCookieAuth(),
    ApiResponse({
      status: 201,
      description: 'The product has been successfully registered.',
      schema: {
        example: {
          message: 'The product has been successfully registered.',
          status: 201,
          product: {
            id: 1,
            name: 'Camera Nikon',
            price: 15.99,
            available: true,
            createdAt: '2024-02-27T15:50:58.406Z',
            updatedAt: '2024-02-27T15:50:58.406Z',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description:
        'Validation error: Some fields do not meet the requirements.',
      schema: {
        example: {
          message: ['name should not be empty', 'name must be a string'],
          error: 'Bad Request',
          statusCode: 400,
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
    ApiConflictResponse({
      description: 'Conflict: "name" already exists.',
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
