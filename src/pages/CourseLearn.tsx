import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  Video,
  FileText,
  Link as LinkIcon,
  HelpCircle,
  CheckCircle,
  PlayCircle,
  BookOpen,
  Clock,
  Menu,
  X,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { dummyCourseContent } from '@/data/dummyCourseContent';
import { MaterialType } from '@/services/types';

type ContentItem = {
  type: 'material' | 'quiz';
  data: typeof dummyCourseContent.fullTopic[0]['learningMaterial'][0] | typeof dummyCourseContent.fullTopic[0]['quizzes'][0];
};

const getContentIcon = (contentType: MaterialType | string) => {
  switch (contentType) {
    case MaterialType.VIDEO:
    case 'VIDEO':
      return <Video className="w-4 h-4" />;
    case MaterialType.DOCUMENT:
    case 'PDF':
    case MaterialType.TEXT:
    case 'TEXT':
      return <FileText className="w-4 h-4" />;
    case MaterialType.LINK:
    case 'LINK':
      return <LinkIcon className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
};

export default function CourseLearn() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const courseData = dummyCourseContent;
  const totalItems = courseData.fullTopic.reduce(
    (acc, topic) => acc + topic.learningMaterial.length + (topic.quizzes?.length || 0),
    0
  );
  const progressPercent = totalItems > 0 ? (completedItems.size / totalItems) * 100 : 0;

  const handleSelectMaterial = (material: typeof courseData.fullTopic[0]['learningMaterial'][0]) => {
    setSelectedContent({ type: 'material', data: material });
  };

  const handleSelectQuiz = (quiz: typeof courseData.fullTopic[0]['quizzes'][0]) => {
    setSelectedContent({ type: 'quiz', data: quiz });
  };

  const handleMarkComplete = () => {
    if (selectedContent) {
      const newCompleted = new Set(completedItems);
      newCompleted.add(selectedContent.data.id);
      setCompletedItems(newCompleted);
    }
  };

  const renderContentViewer = () => {
    if (!selectedContent) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Welcome to {courseData.course.title}</h2>
          <p className="text-muted-foreground max-w-md">
            Select a lesson from the sidebar to start learning. Track your progress as you complete each section.
          </p>
        </div>
      );
    }

    if (selectedContent.type === 'quiz') {
      const quiz = selectedContent.data as typeof courseData.fullTopic[0]['quizzes'][0];
      return (
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            <Badge variant="secondary">Quiz</Badge>
          </div>
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <p className="text-muted-foreground">{quiz.description}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {quiz.timeLimitMinutes} minutes
            </span>
            <span>{quiz.totalQuestions} questions</span>
            <span>Passing score: {quiz.passingScore}%</span>
          </div>
          <Button size="lg" className="mt-4">
            Start Quiz
          </Button>
        </div>
      );
    }

    const material = selectedContent.data as typeof courseData.fullTopic[0]['learningMaterial'][0];
    const contentType = material.contentType;

    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-2">
          {getContentIcon(contentType)}
          <Badge variant="secondary">{contentType}</Badge>
          {material.durationMinutes && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {material.durationMinutes} min
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold">{material.title}</h1>
        <p className="text-muted-foreground">{material.description}</p>

        {/* Content Display */}
        <div className="mt-8">
          {contentType === MaterialType.VIDEO && (
            <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Video Player</p>
                <p className="text-sm text-muted-foreground mt-2">{material.contentUrl}</p>
              </div>
            </div>
          )}

          {contentType === MaterialType.TEXT && (
            <div className="prose prose-invert max-w-none">
              <div className="bg-secondary/50 rounded-lg p-6">
                {material.contentText || 'No content available.'}
              </div>
            </div>
          )}

          {contentType === MaterialType.DOCUMENT && (
            <div className="bg-secondary rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">PDF Document</p>
              <Button variant="outline" asChild>
                <a href={material.contentUrl} target="_blank" rel="noopener noreferrer">
                  Open PDF
                </a>
              </Button>
            </div>
          )}

          {contentType === MaterialType.LINK && (
            <div className="bg-secondary rounded-lg p-8 text-center">
              <LinkIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">External Resource</p>
              <Button variant="outline" asChild>
                <a href={material.contentUrl} target="_blank" rel="noopener noreferrer">
                  Open Link
                </a>
              </Button>
            </div>
          )}
        </div>

        {/* Mark Complete Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={handleMarkComplete}
            disabled={completedItems.has(material.id)}
            className={completedItems.has(material.id) ? 'bg-green-600' : ''}
          >
            {completedItems.has(material.id) ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Completed
              </>
            ) : (
              'Mark as Complete'
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex h-[calc(100vh-64px)]">
        {/* Sidebar Toggle for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-20 left-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative lg:translate-x-0 z-40 w-80 h-full bg-card border-r transition-transform duration-300`}
        >
          <div className="p-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
            <h2 className="font-semibold text-lg line-clamp-2">{courseData.course.title}</h2>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          </div>

          <ScrollArea className="h-[calc(100%-140px)]">
            <Accordion type="multiple" defaultValue={courseData.fullTopic.map(t => t.topic.id)} className="px-2">
              {courseData.fullTopic.map((fullTopic, topicIndex) => (
                <AccordionItem key={fullTopic.topic.id} value={fullTopic.topic.id}>
                  <AccordionTrigger className="hover:no-underline px-2">
                    <div className="flex items-center gap-2 text-left">
                      <span className="text-xs text-muted-foreground w-6">
                        {topicIndex + 1}.
                      </span>
                      <span className="text-sm font-medium">{fullTopic.topic.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 pl-8">
                      {fullTopic.learningMaterial.map((material) => {
                        const isCompleted = completedItems.has(material.id);
                        const isSelected =
                          selectedContent?.type === 'material' &&
                          selectedContent.data.id === material.id;
                        
                        return (
                          <button
                            key={material.id}
                            onClick={() => handleSelectMaterial(material)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md text-left text-sm transition-colors ${
                              isSelected
                                ? 'bg-primary/20 text-primary'
                                : 'hover:bg-secondary'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                            ) : (
                              getContentIcon(material.contentType)
                            )}
                            <span className="line-clamp-1">{material.title}</span>
                          </button>
                        );
                      })}
                      
                      {fullTopic.quizzes?.map((quiz) => {
                        const isCompleted = completedItems.has(quiz.id);
                        const isSelected =
                          selectedContent?.type === 'quiz' &&
                          selectedContent.data.id === quiz.id;
                        
                        return (
                          <button
                            key={quiz.id}
                            onClick={() => handleSelectQuiz(quiz)}
                            className={`w-full flex items-center gap-2 p-2 rounded-md text-left text-sm transition-colors ${
                              isSelected
                                ? 'bg-primary/20 text-primary'
                                : 'hover:bg-secondary'
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                            ) : (
                              <HelpCircle className="w-4 h-4 shrink-0" />
                            )}
                            <span className="line-clamp-1">{quiz.title}</span>
                            <Badge variant="outline" className="ml-auto text-xs">
                              Quiz
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            {renderContentViewer()}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
