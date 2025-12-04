import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Video, FileText, Link as LinkIcon, HelpCircle, Clock, Play, CheckCircle2 } from 'lucide-react';
// import { dummyCourseContent } from '@/data/dummyCourseContent';
import { toast } from 'sonner';
import {  CourseStructure, LearningMaterialDto, QuizDto } from '@/services/types';
import { getCourseById, markLearningMaterialCompleted } from '@/services/api/course';
import { getStudentCompletedLearningMaterialForCourse } from '@/services/api/student';

type ContentItem = (LearningMaterialDto | QuizDto) & { type: 'material' | 'quiz' };

export default function CourseLearn() {
  const { courseId,enrollmentId } = useParams();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [course,setCourse] = useState<CourseStructure | null>(null);
  
  // const [completedLearningMaterials, setCompletedLearningMaterials] = useState<Set<string>>(new Set());
  


  useEffect(() => {
    async function fetchCourse() {
      // In a real app, fetch course details by courseId.
      const course = await getCourseById(courseId);
      console.log('Fetched course:', course);
      setCourse(course.object);
    }
    fetchCourse();
    // console.log(enrollmentId)
  }, [courseId]);

  useEffect(() => {
    async function fetchCompletedLearningMaterials() {
      const res = await getStudentCompletedLearningMaterialForCourse(enrollmentId);
      console.log('Fetched completed learning materials:', res);
      setCompletedItems(new Set(res.object));
    }
    fetchCompletedLearningMaterials();
  }, [courseId]);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading course...</p>
      </div>
    );
  }

  // For demo purposes, we use dummy data. In a real app, fetch course content by courseId.
  // const courseData = dummyCourseContent;

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case 'VIDEO': return <Video className="w-4 h-4" />;
      case 'TEXT': return <FileText className="w-4 h-4" />;
      case 'PDF': return <FileText className="w-4 h-4" />;
      case 'LINK': return <LinkIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleItemClick = (item: LearningMaterialDto | QuizDto, type: 'material' | 'quiz') => {
    setSelectedContent({ ...item, type });
  };

  const handleMarkComplete = async () => {
    if (selectedContent) {

      const res = await markLearningMaterialCompleted(enrollmentId,selectedContent.id,courseId);
      if(res.result){
        toast.success('Marked as complete!');
        console.log('Marked as complete:', selectedContent.id);
        setCompletedItems(prev => new Set([...prev, selectedContent.id]));
      }else{
        toast.error('Failed to mark as complete.');
        return;
      }
    }
  };

  const renderMainContent = () => {
    if (!selectedContent) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Play className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Select a lesson to start learning</h3>
            <p className="text-muted-foreground">Choose from the course content on the left</p>
          </div>
        </div>
      );
    }

    if (selectedContent.type === 'quiz') {
      const quiz = selectedContent as QuizDto;
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{quiz.title}</h2>
              <p className="text-muted-foreground mt-2">{quiz.description}</p>
            </div>
            <Badge variant="secondary">{quiz.quizType}</Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Time Limit</p>
                  <p className="text-lg font-semibold">{quiz.timeLimitMinutes} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-lg font-semibold">{quiz.totalQuestions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Passing Score</p>
                  <p className="text-lg font-semibold">{quiz.passingScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <Badge>{quiz.difficultyLevel}</Badge>
                </div>
              </div>
              <Separator />
              <Button size="lg" className="w-full">Start Quiz</Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    const material = selectedContent as LearningMaterialDto;
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getContentIcon(material.contentType)}
              <Badge variant="outline">{material.contentType}</Badge>
              <Badge variant="secondary">{material.difficultyLevel}</Badge>
            </div>
            <h2 className="text-3xl font-bold">{material.title}</h2>
            <p className="text-muted-foreground mt-2">{material.description}</p>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{material.durationMinutes} minutes</span>
            </div>
          </div>
          {!completedItems.has(material.id) && (
            <Button onClick={handleMarkComplete} variant="outline">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          )}
          {completedItems.has(material.id) && (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Completed
            </Badge>
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
            {material.contentType === 'VIDEO' && (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Video className="w-16 h-16 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Video Player</p>
                  <p className="text-sm text-muted-foreground">{material.contentUrl}</p>
                </div>
              </div>
            )}
            
            {material.contentType === 'TEXT' && (
              <div className="prose prose-lg max-w-none">
                <p>{material.contentText}</p>
              </div>
            )}
            
            {material.contentType === 'PDF' && (
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <FileText className="w-16 h-16 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Document Viewer</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <a href={material.contentUrl} target="_blank" rel="noopener noreferrer">
                    Open Document
                  </a>
                </Button>
              </div>
            )}
            
            {material.contentType === 'LINK' && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg">
                  <LinkIcon className="w-8 h-8 mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">{material.contentText}</p>
                  <Button asChild>
                    <a href={material.contentUrl} target="_blank" rel="noopener noreferrer">
                      Visit External Resource
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {material.tags && material.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {material.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex items-center gap-4 h-16">
          <Button variant="ghost" size="icon" onClick={() => navigate('/courses')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold">{course.title}</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-80 border-r bg-background">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4">
              <h2 className="font-semibold mb-4">Course Content</h2>
              <Accordion type="multiple" defaultValue={course.fullTopics.map(t => t.topic.id)}>
                {course.fullTopics.map((topicData) => (
                  <AccordionItem key={topicData.topic.id} value={topicData.topic.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex-1 text-left">
                        <p className="font-medium">{topicData.topic.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {topicData.learningMaterial.length} materials • {topicData.quizzes?.length || 0} quizzes
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1 pl-4">
                        {topicData.learningMaterial.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => handleItemClick(material, 'material')}
                            className={`w-full text-left p-2 rounded-md hover:bg-accent transition-colors ${
                              selectedContent?.id === material.id ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {completedItems.has(material.id) ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              ) : (
                                getContentIcon(material.contentType)
                              )}
                              <span className="text-sm flex-1">{material.title}</span>
                              <span className="text-xs text-muted-foreground flex-shrink-0">
                                {material.durationMinutes}m
                              </span>
                            </div>
                          </button>
                        ))}
                        {topicData.quizzes?.map((quiz) => (
                          <button
                            key={quiz.id}
                            onClick={() => handleItemClick(quiz, 'quiz')}
                            className={`w-full text-left p-2 rounded-md hover:bg-accent transition-colors ${
                              selectedContent?.id === quiz.id ? 'bg-accent' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {completedItems.has(quiz.id) ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              ) : (
                                <HelpCircle className="w-4 h-4 flex-shrink-0" />
                              )}
                              <span className="text-sm flex-1">{quiz.title}</span>
                              <Badge variant="outline" className="text-xs">Quiz</Badge>
                            </div>
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container max-w-4xl py-8">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
