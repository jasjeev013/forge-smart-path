import apiClient from '../api/client';
import { ApiResponseObject, LoginRequest, RegisterRequest, LoginResponse } from '../types';

export const loginIn = async (loginRequest: LoginRequest): Promise<ApiResponseObject<LoginResponse>> => {
  const response = await apiClient.post('/auth/login', loginRequest);
  // localStorage.setItem('token', response.data.token);
  // localStorage.setItem('expiresAt', response.data.expirationDate.toString());
  return response.data;
};

export const register = async (registerRequest: RegisterRequest): Promise<ApiResponseObject<LoginResponse>> => {
  const response = await apiClient.post('/auth/register', registerRequest);
  return response.data;
};

