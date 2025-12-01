import apiClient from './client';
import { CourseDto, ApiResponseObject,StudentEnrollmentDto } from '../types';

export const createCourse = async (
  instructorId: string,
  courseData: Partial<CourseDto>
): Promise<ApiResponseObject<CourseDto>> => {
  console.log('Creating course for instructor ID:', instructorId);
  const response = await apiClient.post<ApiResponseObject<CourseDto>>(
    // `/course/create/69117dee955e5b462d8a1199`,
    `/course/create/${instructorId}`,
    courseData
  );
  return response.data;
};

export const getAllCourses = async (): Promise<ApiResponseObject<CourseDto[]>> => {
  const response = await apiClient.get<ApiResponseObject<CourseDto[]>>('/course/all');
  return response.data;
};

export const enrollCourse = async (courseId:string): Promise<ApiResponseObject<StudentEnrollmentDto>> => {
  const studentId = localStorage.getItem('student_id')
  const response = await apiClient.post<ApiResponseObject<StudentEnrollmentDto>>(`enroll/create/${studentId}/${courseId}`);
  return response.data;
};

export const getAllEnrolledCourses = async (): Promise<ApiResponseObject<StudentEnrollmentDto[]>> => {
  const studentId = localStorage.getItem('student_id');
  const response = await apiClient.get<ApiResponseObject<StudentEnrollmentDto[]>>(`/enroll/get/${studentId}`);
  return response.data;
};


    
