import apiClient from './client';
import { QuizDto, ApiResponseObject, FullQuizDto } from '../types';

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
  quizData: FullQuizDto
): Promise<ApiResponseObject<QuizDto>> => {
  const instructorId = localStorage.getItem('instructor_id');
  const response = await apiClient.post<ApiResponseObject<QuizDto>>(
    `/quiz/create/${topicId}/${instructorId}`,
    quizData
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
