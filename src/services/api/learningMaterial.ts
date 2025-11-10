import apiClient from './client';
import { LearningMaterialDto, ApiResponseObject } from '../types';

export const createLearningMaterial = async (
  topicId: string,
  materialData: Partial<LearningMaterialDto>,
  file?: File
): Promise<ApiResponseObject<LearningMaterialDto>> => {
  const formData = new FormData();
  formData.append('learningMaterialDto', new Blob([JSON.stringify(materialData)], {
    type: 'application/json'
  }));
  
  if (file) {
    formData.append('file', file);
  }

  const response = await apiClient.post<ApiResponseObject<LearningMaterialDto>>(
    `/learning/create/${topicId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const getAllLearningMaterialsForTopic = async (
  topicId: string
): Promise<ApiResponseObject<LearningMaterialDto[]>> => {
  const response = await apiClient.get<ApiResponseObject<LearningMaterialDto[]>>(
    `/learning/topic/${topicId}`
  );
  return response.data;
};
