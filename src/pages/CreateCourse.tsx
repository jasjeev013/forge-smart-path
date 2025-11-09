import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import CourseBasicInfo from '@/components/course/CourseBasicInfo';
import TopicItem from '@/components/course/TopicItem';
import { 
  CourseDto, 
  TopicDto, 
  LearningMaterialDto, 
  QuizDto, 
  SkillLevel, 
  MaterialType,
  QuizType 
} from '@/services/types';

type TopicWithContent = TopicDto & { 
  materials: LearningMaterialDto[]; 
  quizzes: QuizDto[] 
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
  const [topics, setTopics] = useState<TopicWithContent[]>([]);

  const addTopic = () => {
    const newTopic: TopicWithContent = {
      id: Date.now().toString(),
      courseId: '',
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
    };
    setTopics([...topics, newTopic]);
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

  const updateMaterial = (topicId: string, materialId: string, updates: Partial<LearningMaterialDto>) => {
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
        const newQuiz: QuizDto = {
          id: Date.now().toString(),
          topicId,
          instructorId: '',
          title: '',
          description: '',
          quizType: QuizType.PRACTICE,
          difficultyLevel: SkillLevel.BEGINNER,
          timeLimitMinutes: 30,
          totalQuestions: 10,
          passingScore: 70,
          isActive: true,
          isAiGenerated: false,
          aiGenerationPrompt: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return { ...topic, quizzes: [...topic.quizzes, newQuiz] };
      }
      return topic;
    }));
  };

  const updateQuiz = (topicId: string, quizId: string, updates: Partial<QuizDto>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseData.title || !courseData.description || !courseData.price) {
      toast.error('Please fill in all required course details');
      return;
    }

    if (topics.length === 0) {
      toast.error('Please add at least one topic');
      return;
    }

    for (const topic of topics) {
      if (!topic.title) {
        toast.error('All topics must have a title');
        return;
      }
      if (topic.materials.length === 0 && topic.quizzes.length === 0) {
        toast.error('Each topic must have at least one material or quiz');
        return;
      }
    }

    toast.success('Course created successfully!');
    setTimeout(() => navigate('/instructor/dashboard'), 1000);
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <CourseBasicInfo courseData={courseData} onChange={(updates) => setCourseData({ ...courseData, ...updates })} />

            <Card className="glass border-border/50 animate-slide-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Course Topics</CardTitle>
                    <CardDescription>Organize your course into topics with learning materials and quizzes</CardDescription>
                  </div>
                  <Button type="button" onClick={addTopic} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Topic
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {topics.map((topic, index) => (
                  <TopicItem
                    key={topic.id}
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
                  />
                ))}

                {topics.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No topics yet. Click "Add Topic" to start building your course.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/instructor/dashboard')}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 glow-hover">
                Create Course
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
