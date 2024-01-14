import { Request, Response, NextFunction } from 'express';
import ApiClient from '../../services/ApiClient';
import Authentication from '../Authentication';
import { ErrorCodes } from '../../constants';
import { Exception } from '../../helpers';

jest.mock('../../services/ApiClient');

describe('Authentication Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }) as jest.Mock,
    };
    mockNextFunction = jest.fn();
  });

  it('should authenticate user and call next() if token is valid', async () => {
    const mockToken = 'valid-token';
    const mockUser = { id: '123', username: 'testuser' };

    // Mocking the ApiClient.get method
    (ApiClient as jest.Mocked<typeof ApiClient>).get.mockResolvedValue(mockUser);

    mockRequest.headers = { authorization: `Bearer ${mockToken}` };

    await Authentication.authenticate(mockRequest as Request, mockResponse as Response, mockNextFunction);

    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockNextFunction).toHaveBeenCalled();
    expect((mockRequest as any).user).toEqual(mockUser);
  });

  it('should handle invalid token and return unauthorized status', async () => {
    const mockInvalidToken = 'invalid-token';

    // Mocking the ApiClient.get method to throw an error
    (ApiClient as jest.Mocked<typeof ApiClient>).get.mockRejectedValue(new Exception('Invalid token', 401));

    mockRequest.headers = { authorization: `Bearer ${mockInvalidToken}` };

    await Authentication.authenticate(mockRequest as Request, mockResponse as Response, mockNextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(ErrorCodes.UNAUTHORIZED);
    expect(mockNextFunction).not.toHaveBeenCalled();
  });

  it('should handle missing or improperly formatted token and return unauthorized status', async () => {
    const mockRequestWithoutToken: Partial<Request> = {};

    await Authentication.authenticate(mockRequestWithoutToken as Request, mockResponse as Response, mockNextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(ErrorCodes.UNAUTHORIZED);
    expect(mockNextFunction).not.toHaveBeenCalled();
  });
});
