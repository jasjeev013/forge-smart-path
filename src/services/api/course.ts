import apiClient from './client';
import { CourseDto, ApiResponseObject,StudentEnrollmentDto, CourseStructure } from '../types';
import { time } from 'console';

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
export const getAllPublishedCourses = async (): Promise<ApiResponseObject<CourseDto[]>> => {
  const response = await apiClient.get<ApiResponseObject<CourseDto[]>>('/course/all/published');
  return response.data;
};
export const getDraftCoursesForinstructor = async (): Promise<ApiResponseObject<CourseDto[]>> => {
  const instructorId = localStorage.getItem('instructor_id')
  const response = await apiClient.get<ApiResponseObject<CourseDto[]>>(`/course/all/draft/${instructorId}`);
  return response.data;
};
export const getPublishedCoursesForinstructor = async (): Promise<ApiResponseObject<CourseDto[]>> => {
  const instructorId = localStorage.getItem('instructor_id')
  const response = await apiClient.get<ApiResponseObject<CourseDto[]>>(`/course/all/published/${instructorId}`);
  return response.data;
};

export const enrollCourse = async (courseId:string): Promise<ApiResponseObject<StudentEnrollmentDto>> => {
  const studentId = localStorage.getItem('student_id')
  const response = await apiClient.post<ApiResponseObject<StudentEnrollmentDto>>(`enroll/create/${studentId}/${courseId}`);
  return response.data;
};

export const addThumbnailURL = async (courseId:string,formData: FormData): Promise<ApiResponseObject<String>> => {
  const response = await apiClient.post<ApiResponseObject<String>>(`course/setThumbnail/${courseId}`, formData);
  return response.data;
};

export const getAllEnrolledCourses = async (): Promise<ApiResponseObject<StudentEnrollmentDto[]>> => {
  const studentId = localStorage.getItem('student_id');
  const response = await apiClient.get<ApiResponseObject<StudentEnrollmentDto[]>>(`/enroll/get/${studentId}`);
  return response.data;
};
export const getCoursesForEnrolledCourses = async (): Promise<ApiResponseObject<CourseDto[]>> => {
  const studentId = localStorage.getItem('student_id');
  const response = await apiClient.get<ApiResponseObject<CourseDto[]>>(`/enroll/get/courses/${studentId}`);
  return response.data;
};

export const getAllCompletedCourses = async (): Promise<ApiResponseObject<CourseDto[]>> => {
  const studentId = localStorage.getItem('student_id');
  const response = await apiClient.get<ApiResponseObject<CourseDto[]>>(`/enroll/get/courses/completed/${studentId}`);
  return response.data;
};
export const getCourseById = async (courseId: string): Promise<ApiResponseObject<CourseStructure>> => {
  const response = await apiClient.get<ApiResponseObject<CourseStructure>>(`/course/getFull/${courseId}`);
  return response.data;
};

export const markLearningMaterialCompleted = async (enrollId: string, materialId: string,courseId:string): Promise<ApiResponseObject<StudentEnrollmentDto>> => {
  const response = await apiClient.post<ApiResponseObject<StudentEnrollmentDto>>(`/progress/update/${enrollId}/${materialId}`,
  {
    // body can be empty
    courseId: courseId,
    completed: true,
    emotionalFeedback:'CONFIDENT',
    understandingLevel:'GOOD',
    timeSpentMinutes: 5
  }
  );
  return response.data;
};

export const getCoursePublished = async (courseId:string): Promise<ApiResponseObject<null>> => {
  const response = await apiClient.post<ApiResponseObject<null>>(`course/publish/${courseId}`);
  return response.data;
};
