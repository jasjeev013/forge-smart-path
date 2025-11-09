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

export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED"
}

export enum MaterialType {
  VIDEO = "VIDEO",
  DOCUMENT = "DOCUMENT",
  IMAGE = "IMAGE",
  TEXT = "TEXT",
  LINK = "LINK"
}

export enum QuizType {
  PRACTICE = "PRACTICE",
  ASSESSMENT = "ASSESSMENT",
  FINAL_EXAM = "FINAL_EXAM"
}

export interface InstructorDto {
  id: string;
  userId: string;
  expertiseDomains: string[];
  qualifications: string;
  yearsExperience: number;
  hourlyRate: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseDto {
  id: string;
  subjectId: string;
  instructorId: string;
  title: string;
  description: string;
  difficultyLevel: SkillLevel;
  thumbnailUrl: string;
  learningObjectives: string[];
  prerequisites: string[];
  estimatedDurationHours: number;
  isPublished: boolean;
  isFeatured: boolean;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface TopicDto {
  id: string;
  courseId: string;
  parentTopicId: string | null;
  title: string;
  description: string;
  orderIndex: number;
  difficultyLevel: SkillLevel;
  estimatedDurationMinutes: number;
  learningObjectives: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LearningMaterialDto {
  id: string;
  topicId: string;
  title: string;
  description: string;
  contentType: MaterialType;
  contentUrl: string;
  contentText: string;
  durationMinutes: number;
  difficultyLevel: SkillLevel;
  tags: string[];
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizDto {
  id: string;
  topicId: string;
  instructorId: string;
  title: string;
  description: string;
  quizType: QuizType;
  difficultyLevel: SkillLevel;
  timeLimitMinutes: number;
  totalQuestions: number;
  passingScore: number;
  isActive: boolean;
  isAiGenerated: boolean;
  aiGenerationPrompt: string;
  createdAt: string;
  updatedAt: string;
}

