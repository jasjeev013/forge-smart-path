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


export enum MaterialType {
  VIDEO = "VIDEO",
  DOCUMENT = "PDF",
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
export interface StudentEnrollmentDto {
  id?: string;
  studentId?: string;
  courseId?: string;
  enrolledAt?: string;        // ISO date-time string
  completedAt?: string;       // ISO date-time string

  currentProgressPercent?: number;
  overallScore?: number;
  status?: string;

  lastAccessedAt?: string;    // ISO date-time string
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

export interface EnrollmentCourseDto {
  studentEnrollments:StudentEnrollmentDto[];
  courses:CourseDto[];
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

export interface QuizQuestionDto {
  id: string;
  quizId: string;
  questionType: QuestionType;
  questionText: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
  difficultyLevel: SkillLevel;
  points: number;
  orderIndex: number;
  isAiGenerated: boolean;
  aiGenerationMetadata: Record<string, any>;
  createdAt: string; // or Date, depending on how it's serialized
}
type QuestionType = "MCQ" | "TRUE_FALSE" ;

export interface FullQuizDto{
  quizDto: Partial<QuizDto>;
  quizQuestions: Partial<QuizQuestionDto>[];
}

interface Course {
  id: string;
  subjectId: string | null;
  instructorId: string;
  title: string;
  description: string;
  difficultyLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
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

interface Topic {
  id: string;
  courseId: string;
  parentTopicId: string | null;
  title: string;
  description: string;
  orderIndex: number;
  difficultyLevel:"BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  estimatedDurationMinutes: number;
  learningObjectives: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LearningMaterial {
  id: string;
  topicId: string;
  title: string;
  description: string;
  contentType: "VIDEO" | "PDF" | "ARTICLE" | "INTERACTIVE" | "LINK";
  contentUrl: string;
  contentText: string;
  durationMinutes: number;
  difficultyLevel:  "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  tags: string[];
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FullTopic {
  learningMaterial: LearningMaterial[];
  topic: Topic;
  quizzes: any[]; // This could be more specific depending on the quiz structure
}

export interface CourseStructure {
  fullTopics: FullTopic[];
  course: Course;
}

export interface StudentProgressDto {
  id: string;
  enrollmentId: string;
  courseId: string;
  learningMaterialId: string;

  completedAt: string | null; 

  completed: boolean | null;
  timeSpentMinutes: number | null;

  understandingLevel: UnderstandingLevel | null;
  notes: string | null;
  emotionalFeedback: EmotionalState | null;

  createdAt: string;
  updatedAt: string;
}

export interface FullInterviewDto {
  interviewDto: InterviewDto;
  interviewQuestionDtos: InterviewQuestionDto[];
}

export interface InterviewDto {
  id: string;
  enrollmentId: string;
  title: string;
  description: string;
  totalQuestions: number;
  isActive: boolean;
  createdAt: string;   // ISO datetime string
  updatedAt: string;   // ISO datetime string
}
export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED"
  // add more if needed
}
export interface InterviewQuestionDto {
  id: string;
  interviewId: string;
  questionText: string;
  orderIndex: number;
  difficultyLevel: SkillLevel;
  aiGuidancePrompt: string;
  createdAt: string;   // ISO datetime
}


export interface QuizAttemptDto {
  id: string;
  studentId: string;
  quizId: string;
  startedAt: string;               // ISO datetime
  submittedAt: string | null;      // null if not submitted
  timeSpentSeconds: number | null;
  totalScore: number | null;
  maxPossibleScore: number | null;
  percentageScore: number | null;
  status: AttemptStatus;
  adaptiveDifficultyData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type AttemptStatus = "SUBMITTED"

  export interface QuizAnswerDto {
  id: string;
  attemptId: string;
  questionId: string;
  studentAnswer: string;
  isCorrect: boolean | null;
  pointsEarned: number | null;
  aiFeedback: string | null;
  timeSpentSeconds: number | null;
  createdAt: string;   // ISO datetime
}

export interface FullAttemptQuizDto {
  quizAttemptDto: Partial<QuizAttemptDto>;
  questionIds: string[];
  quizAnswerDtos: Partial<QuizAnswerDto>[];
}

export interface QuizRequestDto{
  title:string;
  description:string;
}
export interface QuizResponseDto{
  quizTitle:string;
  description:string;
  questions:AIQuizQuestionDto[];
}

export interface AIQuizQuestionDto {
  questionText: string;
  questionType: QuestionType;
  options: Record<string, string>;
  correctAnswer: string;
  explanation: string;
  points: number;
  orderIndex: number;
}

export interface FullInterviewAttemptDto {
  interviewAttemptDto: InterviewAttemptDto;
  interviewAnswerDto: InterviewAnswerDto[];
}
export enum InterviewStatus {
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
  EVALUATED = "EVALUATED"
  // add or adjust based on your actual backend enum
}
export interface InterviewAttemptDto {
  id: string;
  studentId: string;
  interviewId: string;
  startedAt: string | null;      // LocalDateTime
  submittedAt: string | null;    // LocalDateTime
  aiOverallScore: number | null; // 0–100, may be null before scoring
  aiSkillEvaluation: Record<string, number>; // Map<String, Double>
  aiFeedbackSummary: string;
  status: InterviewStatus;
  createdAt: string;   // LocalDateTime
  updatedAt: string;   // LocalDateTime
}
export interface InterviewAnswerDto {
  interviewQuestionId: string;
  studentAnswer: string;
  aiEvaluation: string;    // AI-generated feedback
  aiScore: number;         // Score for this question
  timeSpentSeconds: number;
}



// Enums
export type UnderstandingLevel = "POOR" | "FAIR" | "GOOD" | "EXCELLENT";

export type EmotionalState = "CONFUSED" | "CONFIDENT" | "FRUSTRATED" | "EXCITED" | "NEUTRAL" | "STRUGGLING";

