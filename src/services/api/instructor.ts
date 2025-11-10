import apiClient from './client';
import { InstructorDto, ApiResponseObject } from '../types';

export const createInstructorProfile = async (
  userId: string,
  instructorData: Partial<InstructorDto>
): Promise<ApiResponseObject<InstructorDto>> => {
  const response = await apiClient.post<ApiResponseObject<InstructorDto>>(
    `/instructor/create/${userId}`,
    instructorData
  );
  return response.data;
};
export const getInstructorProfile = async (
  userId: string,
): Promise<ApiResponseObject<InstructorDto>> => {
  const response = await apiClient.get<ApiResponseObject<InstructorDto>>(
    `/instructor/get/${userId}`,
  );
  console.log('Fetched instructor profile for user ID:', userId, response.data);
  return response.data;
};
