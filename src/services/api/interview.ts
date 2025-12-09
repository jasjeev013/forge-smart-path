import apiClient from './client';
import { CourseDto, ApiResponseObject,StudentEnrollmentDto, CourseStructure, FullInterviewDto, InterviewAttemptDto } from '../types';
import { time } from 'console';

export const getInterviewDetailsAndQuestions = async (
  enrollmentId: string,
): Promise<ApiResponseObject<FullInterviewDto>> => {
  const response = await apiClient.get<ApiResponseObject<FullInterviewDto>>(
    `/interview/get/${enrollmentId}`
  );
  return response.data;
};
export const createInterviewAttempt = async (
  enrollmentId: string,
  fullInterviewAttemptDto: Partial<InterviewAttemptDto>
): Promise<ApiResponseObject<FullInterviewDto>> => {
    const studentId = localStorage.getItem('student_id');
  const response = await apiClient.post<ApiResponseObject<FullInterviewDto>>(
    `/interview/create/attempt/${studentId}/${enrollmentId}`
    ,fullInterviewAttemptDto
  );
  return response.data;
};
export const getInterviewAttempt = async (
  enrollmentId: string,
): Promise<ApiResponseObject<FullInterviewDto>> => {
  const response = await apiClient.get<ApiResponseObject<FullInterviewDto>>(
    `/interview/get/attempt/${enrollmentId}`
  );
  return response.data;
};