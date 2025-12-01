import apiClient from './client';
import { ApiResponseObject } from '../types';

export interface StudentDto {
  id: string;
  userId: string;
  currentLevel: string;
  totalXp: number;
  learningGoals: string;
  preferredLearningStyle: 'VISUAL' | 'AUDITORY' | 'READING' | 'KINESTHETIC';
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
}

export const getStudentProfile = async (
  userId: string,
): Promise<ApiResponseObject<StudentDto>> => {
  const response = await apiClient.get<ApiResponseObject<StudentDto>>(
    `/student/get/${userId}`,
  );
  console.log('Fetched student profile for user ID:', userId, response.data);
  return response.data;
};
