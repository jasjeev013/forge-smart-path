import apiClient from './client';
import { CourseDto, ApiResponseObject } from '../types';

export const createCourse = async (
  instructorId: string,
  courseData: Partial<CourseDto>
): Promise<ApiResponseObject<CourseDto>> => {
  const response = await apiClient.post<ApiResponseObject<CourseDto>>(
    `/course/create/${instructorId}`,
    courseData
  );
  return response.data;
};

export const getAllCourses = async (): Promise<ApiResponseObject<CourseDto[]>> => {
  const response = await apiClient.get<ApiResponseObject<CourseDto[]>>('/course/all');
  return response.data;
};
