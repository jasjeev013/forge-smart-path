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
