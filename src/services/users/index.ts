import apiClient from "../api/client";
import { ApiResponseObject, UserDto } from "../types";

export const getUserDetails = async (): Promise<
  ApiResponseObject<UserDto>
> => {
  const response = await apiClient.get(`/user/get`);
  return response.data;
};
