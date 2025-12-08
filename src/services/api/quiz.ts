import apiClient from './client';
import { QuizDto, ApiResponseObject, FullQuizDto, FullAttemptQuizDto, QuizAttemptDto, QuizRequestDto, QuizResponseDto } from '../types';

export const createQuiz = async (
  topicId: string,
  quizData: Partial<QuizDto>
): Promise<ApiResponseObject<QuizDto>> => {
  const response = await apiClient.post<ApiResponseObject<QuizDto>>(
    `/quiz/create/${topicId}`,
    quizData
  );
  return response.data;
};
export const createFullQuiz = async (
  topicId: string,
  quizData: Partial<FullQuizDto>
): Promise<ApiResponseObject<QuizDto>> => {
  const instructorId = localStorage.getItem('instructor_id');
  const response = await apiClient.post<ApiResponseObject<QuizDto>>(
    `/quiz/create/${topicId}/${instructorId}`,
    quizData
  );
  return response.data;
};
export const attemptFullQuiz = async (
  quizId: string,
  enrollmentId: string,
  courseId: string,
  quizData: Partial<FullAttemptQuizDto>
): Promise<ApiResponseObject<QuizAttemptDto>> => {
  const studentId = localStorage.getItem('student_id');
  const response = await apiClient.post<ApiResponseObject<QuizAttemptDto>>(
    `/quiz/attempt/${quizId}/${studentId}/${enrollmentId}/${courseId}`,
    quizData
  );
  return response.data;
};
export const getAttemptFullQuiz = async (
  quizId: string,
): Promise<ApiResponseObject<FullAttemptQuizDto>> => {
  const studentId = localStorage.getItem('student_id');
  const response = await apiClient.get<ApiResponseObject<FullAttemptQuizDto>>(
    `/quiz/attempt/get/${quizId}/${studentId}`
  );
  return response.data;
};

export const getQuizById = async (
  quizId: string
): Promise<ApiResponseObject<FullQuizDto>> => {
  const response = await apiClient.get<ApiResponseObject<FullQuizDto>>(
    `/quiz/get/${quizId}`
  );
  return response.data;
};


export const getAllQuizzesForTopic = async (
  topicId: string
): Promise<ApiResponseObject<QuizDto[]>> => {
  const response = await apiClient.get<ApiResponseObject<QuizDto[]>>(
    `/quiz/topic/${topicId}`
  );
  return response.data;
};

export const generateQuizQuestions = async (
  quizData: QuizRequestDto
): Promise<ApiResponseObject<QuizResponseDto>> => {
  const response = await apiClient.post<ApiResponseObject<QuizResponseDto>>(
    `/quiz/generate`,
    quizData
  );
  return response.data;
};

