export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface ApiResponseObject<T> {
  message: string;
  result: boolean;
  object: T;
}
export enum UserRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN"
}
export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl: string;
  bio: string;
  isActive: boolean;
  createdAt: string;      // ISO 8601 string (e.g., "2025-10-29T12:34:56Z")
  updatedAt: string;      // same as above
  lastLoginAt: string;    // same as above
}

export interface LoginResponse{
  token: string;
  role: string;
}

