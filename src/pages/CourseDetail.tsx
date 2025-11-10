import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, BookOpen, GraduationCap, ArrowLeft, FileText, Video, Image, Link as LinkIcon, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { CourseDto, TopicDto, LearningMaterialDto, QuizDto, SkillLevel, MaterialType } from '@/services/types';
import { getAllTopicsForCourse } from '@/services/api/topic';
import { getAllLearningMaterialsForTopic } from '@/services/api/learningMaterial';
import { getAllQuizzesForTopic } from '@/services/api/quiz';
import { dummyCourses, dummyTopics, dummyMaterials, dummyQuizzes } from '@/data/dummyCourses';

type TopicWithContent = TopicDto & {
  materials: LearningMaterialDto[];
  quizzes: QuizDto[];
};

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDto | null>(null);
  const [topics, setTopics] = useState<TopicWithContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseData();
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      // Load course from dummy data (in production, fetch from API)
      const courseData = dummyCourses.find(c => c.id === courseId);
      if (!courseData) {
        toast.error('Course not found');
        navigate('/courses');
        return;
      }
      setCourse(courseData);

      // Load topics with their content
      const courseTopics = dummyTopics[courseId] || [];
      
      const topicsWithContent: TopicWithContent[] = courseTopics.map((topic) => {
        // In production, fetch from API:
        // const materialsResponse = await getAllLearningMaterialsForTopic(topic.id);
        // const quizzesResponse = await getAllQuizzesForTopic(topic.id);
        
        const materials = dummyMaterials[topic.id] || [];
        const quizzes = dummyQuizzes[topic.id] || [];
        
        return {
          ...topic,
          materials,
          quizzes,
        };
      });

      setTopics(topicsWithContent);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    toast.success('Enrolled successfully! (Free enrollment)');
  };

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case SkillLevel.BEGINNER: return 'bg-green-500/10 text-green-500';
      case SkillLevel.INTERMEDIATE: return 'bg-yellow-500/10 text-yellow-500';
      case SkillLevel.ADVANCED: return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getMaterialIcon = (type: MaterialType) => {
    switch (type) {
      case MaterialType.VIDEO: return <Video className="w-4 h-4" />;
      case MaterialType.DOCUMENT: return <FileText className="w-4 h-4" />;
      case MaterialType.IMAGE: return <Image className="w-4 h-4" />;
      case MaterialType.LINK: return <LinkIcon className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 flex items-center justify-center">
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-6 pb-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Button variant="ghost" onClick={() => navigate('/courses')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>

          <Card className="glass border-border/50">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6">
                {course.thumbnailUrl && (
                  <img 
                    src={course.thumbnailUrl} 
                    alt={course.title}
                    className="w-full md:w-64 h-48 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1 space-y-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getLevelColor(course.difficultyLevel)}>
                      {course.difficultyLevel}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Clock className="w-3 h-3" />
                      {course.estimatedDurationHours}h
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <BookOpen className="w-3 h-3" />
                      {topics.length} Topics
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-primary">
                      ${course.price}
                    </div>
                    <Button onClick={handleEnroll} size="lg" className="bg-primary hover:bg-primary/90">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Enroll for Free
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {topics.length} topics • {topics.reduce((sum, t) => sum + t.materials.length, 0)} materials • {topics.reduce((sum, t) => sum + t.quizzes.length, 0)} quizzes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {topics.map((topic, index) => (
                  <AccordionItem key={topic.id} value={topic.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{topic.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {topic.estimatedDurationMinutes} min • {topic.materials.length} materials • {topic.quizzes.length} quizzes
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 space-y-2">
                        {topic.description && (
                          <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                        )}
                        
                        {topic.materials.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground">Learning Materials</h4>
                            {topic.materials.map((material) => (
                              <div key={material.id} className="flex items-center gap-2 p-2 rounded hover:bg-secondary/50 transition-colors">
                                {getMaterialIcon(material.contentType)}
                                <span className="text-sm">{material.title}</span>
                                <Badge variant="outline" className="ml-auto text-xs">
                                  {material.durationMinutes} min
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}

                        {topic.quizzes.length > 0 && (
                          <div className="space-y-2 mt-4">
                            <h4 className="text-sm font-semibold text-foreground">Quizzes</h4>
                            {topic.quizzes.map((quiz) => (
                              <div key={quiz.id} className="flex items-center gap-2 p-2 rounded hover:bg-secondary/50 transition-colors">
                                <PlayCircle className="w-4 h-4" />
                                <span className="text-sm">{quiz.title}</span>
                                <Badge variant="outline" className="ml-auto text-xs">
                                  {quiz.totalQuestions} questions
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {topics.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No topics available yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
