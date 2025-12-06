import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import CourseBasicInfo from '@/components/course/CourseBasicInfo';
import TopicItem, { QuizWithQuestions } from '@/components/course/TopicItem';
import { 
  CourseDto, 
  TopicDto, 
  LearningMaterialDto, 
  QuizQuestionDto,
  SkillLevel, 
  MaterialType,
  QuizType 
} from '@/services/types';
import { addThumbnailURL, createCourse } from '@/services/api/course';
import { createTopic } from '@/services/api/topic';
import { createLearningMaterial } from '@/services/api/learningMaterial';
import { createFullQuiz } from '@/services/api/quiz';

type TopicWithContent = TopicDto & { 
  materials: (LearningMaterialDto & { file?: File })[]; 
  quizzes: QuizWithQuestions[];
  isSaved?: boolean;
};

export default function CreateCourse() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<Partial<CourseDto>>({
    difficultyLevel: SkillLevel.BEGINNER,
    price: 0,
    estimatedDurationHours: 0,
    isPublished: false,
    isFeatured: false,
    learningObjectives: [],
    prerequisites: [],
  });
  const [savedCourseId, setSavedCourseId] = useState<string | null>(null);
  const [topics, setTopics] = useState<TopicWithContent[]>([]);
  const [isSavingCourse, setIsSavingCourse] = useState(false);
  const [isSavingTopic, setIsSavingTopic] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseData.title || !courseData.description || courseData.price === undefined) {
      toast.error('Please fill in all required course details');
      return;
    }

    setIsSavingCourse(true);
    try {
      const userId = localStorage.getItem('instructor_id');
      if (!userId) {
        toast.error('User not found. Please login again.');
        return;
      }

      const response = await createCourse(userId, courseData);
      
      if (response.result) {
        setSavedCourseId(response.object.id);
        toast.success('Course saved successfully! Now you can add topics.');

        if (thumbnailFile) {
          const formData = new FormData();
          formData.append('file', thumbnailFile);
          const res = await addThumbnailURL(response.object.id, formData);
          if (res.result) {
            toast.success('Thumbnail uploaded successfully!');
          } else {
            toast.error('Failed to upload thumbnail');
          }
        }
      } else {
        toast.error(response.message || 'Failed to save course');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save course');
    } finally {
      setIsSavingCourse(false);
    }
  };

  const addTopic = () => {
    if (!savedCourseId) {
      toast.error('Please save the course first');
      return;
    }

    const newTopic: TopicWithContent = {
      id: `temp-${Date.now()}`,
      courseId: savedCourseId,
      parentTopicId: null,
      title: '',
      description: '',
      orderIndex: topics.length,
      difficultyLevel: SkillLevel.BEGINNER,
      estimatedDurationMinutes: 0,
      learningObjectives: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      materials: [],
      quizzes: [],
      isSaved: false,
    };
    setTopics([...topics, newTopic]);
  };

  const handleSaveTopic = async (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    if (!topic.title) {
      toast.error('Topic title is required');
      return;
    }

    setIsSavingTopic(topicId);
    try {
      const response = await createTopic(savedCourseId!, {
        title: topic.title,
        description: topic.description,
        orderIndex: topic.orderIndex,
        difficultyLevel: topic.difficultyLevel,
        estimatedDurationMinutes: topic.estimatedDurationMinutes,
        learningObjectives: topic.learningObjectives,
      });
      console.log('Topic creation response:', response);

      if (response.result) {
        const savedTopicId = response.object.id;
        
        // Save all materials
        for (const material of topic.materials) {
          await createLearningMaterial(
            savedTopicId, 
            {
              title: material.title,
              description: material.description,
              contentType: material.contentType,
              contentUrl: material.contentUrl,
              contentText: material.contentText,
              durationMinutes: material.durationMinutes,
              difficultyLevel: material.difficultyLevel,
              tags: material.tags,
              orderIndex: material.orderIndex,
              isActive: material.isActive,
            },
            material.file
          );
        }

        // Save all quizzes with questions using createFullQuiz
        for (const quiz of topic.quizzes) {
          const quizQuestions: Partial<QuizQuestionDto>[] = quiz.questions.map((q, index) => ({
            quizId: '',
            questionType: q.questionType,
            questionText: q.questionText,
            options: q.questionType === 'TRUE_FALSE' 
              ? { A: 'True', B: 'False' } 
              : q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || '',
            difficultyLevel: SkillLevel.BEGINNER,
            points: q.points || 1,
            orderIndex: index,
            isAiGenerated: false,
            aiGenerationMetadata: {},
            createdAt: new Date().toISOString(),
          }));

          await createFullQuiz(savedTopicId, {
            quizDto: {
              topicId: savedTopicId,
              instructorId: '',
              title: quiz.title,
              description: quiz.description || '',
              quizType: QuizType.PRACTICE,
              difficultyLevel: SkillLevel.BEGINNER,
              timeLimitMinutes: 30,
              totalQuestions: quiz.totalQuestions || quiz.questions.length,
              passingScore: quiz.passingScore || 70,
              isActive: true,
              isAiGenerated: false,
              aiGenerationPrompt: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            quizQuestions: quizQuestions,
          });
        }

        setTopics(topics.map(t => 
          t.id === topicId ? { ...response.object, materials: t.materials, quizzes: t.quizzes, isSaved: true } : t
        ));
        toast.success('Topic saved successfully!');
      } else {
        toast.error(response.message || 'Failed to save topic');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save topic');
    } finally {
      setIsSavingTopic(null);
    }
  };

  const updateTopic = (topicId: string, updates: Partial<TopicDto>) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { ...topic, ...updates } : topic
    ));
  };

  const deleteTopic = (topicId: string) => {
    setTopics(topics.filter(topic => topic.id !== topicId));
  };

  const addMaterial = (topicId: string, type: MaterialType) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        const newMaterial: LearningMaterialDto = {
          id: Date.now().toString(),
          topicId,
          title: '',
          description: '',
          contentType: type,
          contentUrl: '',
          contentText: '',
          durationMinutes: 0,
          difficultyLevel: SkillLevel.BEGINNER,
          tags: [],
          orderIndex: topic.materials.length,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return { ...topic, materials: [...topic.materials, newMaterial] };
      }
      return topic;
    }));
  };

  const updateMaterial = (topicId: string, materialId: string, updates: Partial<LearningMaterialDto & { file?: File }>) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          materials: topic.materials.map(material =>
            material.id === materialId ? { ...material, ...updates } : material
          ),
        };
      }
      return topic;
    }));
  };

  const deleteMaterial = (topicId: string, materialId: string) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          materials: topic.materials.filter(material => material.id !== materialId),
        };
      }
      return topic;
    }));
  };

  const addQuiz = (topicId: string) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        const newQuiz: QuizWithQuestions = {
          id: Date.now().toString(),
          topicId,
          instructorId: '',
          title: '',
          description: '',
          quizType: QuizType.PRACTICE,
          difficultyLevel: SkillLevel.BEGINNER,
          timeLimitMinutes: 30,
          totalQuestions: 0,
          passingScore: 70,
          isActive: true,
          isAiGenerated: false,
          aiGenerationPrompt: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          questions: [],
        };
        return { ...topic, quizzes: [...topic.quizzes, newQuiz] };
      }
      return topic;
    }));
  };

  const updateQuiz = (topicId: string, quizId: string, updates: Partial<QuizWithQuestions>) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          quizzes: topic.quizzes.map(quiz =>
            quiz.id === quizId ? { ...quiz, ...updates } : quiz
          ),
        };
      }
      return topic;
    }));
  };

  const deleteQuiz = (topicId: string, quizId: string) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          quizzes: topic.quizzes.filter(quiz => quiz.id !== quizId),
        };
      }
      return topic;
    }));
  };

  const addQuizQuestion = (topicId: string, quizId: string) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          quizzes: topic.quizzes.map(quiz => {
            if (quiz.id === quizId) {
              const newQuestion: QuizQuestionDto = {
                id: Date.now().toString(),
                quizId,
                questionType: 'MCQ',
                questionText: '',
                options: { A: '', B: '' },
                correctAnswer: '',
                explanation: '',
                difficultyLevel: SkillLevel.BEGINNER,
                points: 1,
                orderIndex: quiz.questions.length,
                isAiGenerated: false,
                aiGenerationMetadata: {},
                createdAt: new Date().toISOString(),
              };
              return { ...quiz, questions: [...quiz.questions, newQuestion] };
            }
            return quiz;
          }),
        };
      }
      return topic;
    }));
  };

  const updateQuizQuestion = (topicId: string, quizId: string, questionId: string, updates: Partial<QuizQuestionDto>) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          quizzes: topic.quizzes.map(quiz => {
            if (quiz.id === quizId) {
              return {
                ...quiz,
                questions: quiz.questions.map(q =>
                  q.id === questionId ? { ...q, ...updates } : q
                ),
              };
            }
            return quiz;
          }),
        };
      }
      return topic;
    }));
  };

  const deleteQuizQuestion = (topicId: string, quizId: string, questionId: string) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          quizzes: topic.quizzes.map(quiz => {
            if (quiz.id === quizId) {
              return {
                ...quiz,
                questions: quiz.questions.filter(q => q.id !== questionId),
              };
            }
            return quiz;
          }),
        };
      }
      return topic;
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-6 pb-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text">Create New Course</h1>
            <p className="text-muted-foreground">Build an engaging learning experience for your students</p>
          </div>

          <form onSubmit={handleSaveCourse} className="space-y-6">
            <CourseBasicInfo courseData={courseData} onChange={(updates) => setCourseData({ ...courseData, ...updates })} thumbnailFile={thumbnailFile} setThumbnailFile={setThumbnailFile} />

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!!savedCourseId || isSavingCourse}
                className="bg-primary hover:bg-primary/90"
              >
                {isSavingCourse ? 'Saving...' : savedCourseId ? 'Course Saved ✓' : 'Save Course'}
              </Button>
            </div>
          </form>

          {savedCourseId && (
            <Card className="glass border-border/50 animate-slide-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Topics</CardTitle>
                    <CardDescription>Add topics with learning materials and quizzes</CardDescription>
                  </div>
                  <Button type="button" onClick={addTopic} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Topic
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {topics.map((topic, index) => (
                  <div key={topic.id} className="space-y-4">
                    <TopicItem
                      topic={topic}
                      topicIndex={index}
                      onUpdate={(updates) => updateTopic(topic.id, updates)}
                      onDelete={() => deleteTopic(topic.id)}
                      onAddMaterial={(type) => addMaterial(topic.id, type)}
                      onAddQuiz={() => addQuiz(topic.id)}
                      onUpdateMaterial={(materialId, updates) => updateMaterial(topic.id, materialId, updates)}
                      onDeleteMaterial={(materialId) => deleteMaterial(topic.id, materialId)}
                      onUpdateQuiz={(quizId, updates) => updateQuiz(topic.id, quizId, updates)}
                      onDeleteQuiz={(quizId) => deleteQuiz(topic.id, quizId)}
                      onAddQuizQuestion={(quizId) => addQuizQuestion(topic.id, quizId)}
                      onUpdateQuizQuestion={(quizId, questionId, updates) => updateQuizQuestion(topic.id, quizId, questionId, updates)}
                      onDeleteQuizQuestion={(quizId, questionId) => deleteQuizQuestion(topic.id, quizId, questionId)}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => handleSaveTopic(topic.id)}
                        disabled={topic.isSaved || isSavingTopic === topic.id}
                        size="sm"
                      >
                        {isSavingTopic === topic.id ? 'Saving...' : topic.isSaved ? 'Saved ✓' : 'Save Topic'}
                      </Button>
                    </div>
                  </div>
                ))}

                {topics.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No topics yet. Click "Add Topic" to start building your course.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/instructor/dashboard')}>
              {savedCourseId ? 'Finish' : 'Cancel'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
