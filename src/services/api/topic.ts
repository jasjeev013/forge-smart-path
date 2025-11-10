import apiClient from './client';
import { TopicDto, ApiResponseObject } from '../types';

export const createTopic = async (
  courseId: string,
  topicData: Partial<TopicDto>
): Promise<ApiResponseObject<TopicDto>> => {
  const response = await apiClient.post<ApiResponseObject<TopicDto>>(
    `/topic/create/${courseId}`,
    topicData
  );
  return response.data;
};

export const getAllTopicsForCourse = async (
  courseId: string
): Promise<ApiResponseObject<TopicDto[]>> => {
  const response = await apiClient.get<ApiResponseObject<TopicDto[]>>(
    `/topic/course/${courseId}`
  );
  return response.data;
};
