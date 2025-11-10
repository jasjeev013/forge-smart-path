import apiClient from './client';
import { QuizDto, ApiResponseObject } from '../types';

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

export const getAllQuizzesForTopic = async (
  topicId: string
): Promise<ApiResponseObject<QuizDto[]>> => {
  const response = await apiClient.get<ApiResponseObject<QuizDto[]>>(
    `/quiz/topic/${topicId}`
  );
  return response.data;
};
