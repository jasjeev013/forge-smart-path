import apiClient from './client';
import { ApiResponseObject, CourseDto, EnrollmentCourseDto } from '../types';

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

export const getStudentCompletedLearningMaterialForCourse = async (
  enrollmentId: string,
): Promise<ApiResponseObject<string[]>> => {
  const response = await apiClient.get<ApiResponseObject<string[]>>(
    `/progress/get/${enrollmentId}`,
  );
  return response.data;
};

export const getStudentActiveCourses = async (): Promise<ApiResponseObject<EnrollmentCourseDto>> => {
  const studentId = localStorage.getItem('student_id');
  const response = await apiClient.get<ApiResponseObject<EnrollmentCourseDto>>(
    `/enroll/get/courses/active/${studentId}`,
  );
  return response.data;
};
export const getStudentCompletedCourses = async (): Promise<ApiResponseObject<EnrollmentCourseDto>> => {
  const studentId = localStorage.getItem('student_id');
  const response = await apiClient.get<ApiResponseObject<EnrollmentCourseDto>>(
    `/enroll/get/courses/completed/${studentId}`,
  );
  return response.data;
}
