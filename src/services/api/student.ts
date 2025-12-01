import apiClient from './client';

export const getStudentProfile = async (
  userId: string,
): Promise<ApiResponseObject<InstructorDto>> => {
  const response = await apiClient.get<ApiResponseObject<InstructorDto>>(
    `/student/get/${userId}`,
  );
  console.log('Fetched instructor profile for user ID:', userId, response.data);
  return response.data;
};
