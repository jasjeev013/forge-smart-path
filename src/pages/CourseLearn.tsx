import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Video, FileText, Link as LinkIcon, HelpCircle, Clock, Play, CheckCircle2, Loader2, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';
import { CourseStructure, LearningMaterial, LearningMaterialDto, QuizDto, FullQuizDto, QuizQuestionDto, FullAttemptQuizDto } from '@/services/types';
import { getCourseById, markLearningMaterialCompleted } from '@/services/api/course';
import { getStudentCompletedLearningMaterialForCourse } from '@/services/api/student';
import { getQuizById, attemptFullQuiz, getAttemptFullQuiz } from '@/services/api/quiz';

type ContentItem = (LearningMaterialDto | QuizDto) & { type: 'material' | 'quiz' };

export default function CourseLearn() {
  const { courseId, enrollmentId } = useParams();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [course, setCourse] = useState<CourseStructure | null>(null);
  
  // Quiz state
  const [activeQuiz, setActiveQuiz] = useState<FullQuizDto | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Time tracking
  const quizStartTimeRef = useRef<number>(0);
  const questionStartTimeRef = useRef<number>(0);
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  
  // Previous attempt state
  const [previousAttempt, setPreviousAttempt] = useState<FullAttemptQuizDto | null>(null);
  const [attemptLoading, setAttemptLoading] = useState(false);
  const [showAttempt, setShowAttempt] = useState(false);
  
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

  const handleItemClick = (item: LearningMaterial | any, type: 'material' | 'quiz') => {
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

  const handleTakeQuiz = async (quizId: string) => {
    setQuizLoading(true);
    setShowAttempt(false);
    try {
      const res = await getQuizById(quizId);
      if (res.result && res.object) {
        setActiveQuiz(res.object);
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setQuestionTimes({});
        setQuizSubmitted(false);
        quizStartTimeRef.current = Date.now();
        questionStartTimeRef.current = Date.now();
      } else {
        toast.error('Failed to load quiz');
      }
    } catch (error) {
      toast.error('Error loading quiz');
      console.error(error);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleViewAttempt = async (quizId: string) => {
    setAttemptLoading(true);
    setShowAttempt(false);
    try {
      const res = await getAttemptFullQuiz(quizId);
      if (res.result && res.object) {
        setPreviousAttempt(res.object);
        setShowAttempt(true);
        setQuizStarted(false);
      } else {
        toast.error('No previous attempt found');
      }
    } catch (error) {
      toast.error('Error loading attempt');
      console.error(error);
    } finally {
      setAttemptLoading(false);
    }
  };

  const handleQuestionChange = (newIndex: number) => {
    // Save time spent on current question
    const currentQuestion = activeQuiz?.quizQuestions?.[currentQuestionIndex];
    if (currentQuestion?.id) {
      const timeSpent = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);
      setQuestionTimes(prev => ({
        ...prev,
        [currentQuestion.id!]: (prev[currentQuestion.id!] || 0) + timeSpent
      }));
    }
    questionStartTimeRef.current = Date.now();
    setCurrentQuestionIndex(newIndex);
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuiz || !selectedContent) return;
    
    // Save time for the last question
    const currentQuestion = activeQuiz.quizQuestions?.[currentQuestionIndex];
    if (currentQuestion?.id) {
      const timeSpent = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);
      setQuestionTimes(prev => ({
        ...prev,
        [currentQuestion.id!]: (prev[currentQuestion.id!] || 0) + timeSpent
      }));
    }
    
    const questions = activeQuiz.quizQuestions || [];
    const totalTimeSpent = Math.floor((Date.now() - quizStartTimeRef.current) / 1000);
    
    // Calculate scores
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    const questionIds: string[] = [];
    const quizAnswerDtos: Array<{
      studentAnswer: string;
      isCorrect: boolean;
      pointsEarned: number;
      timeSpentSeconds: number;
    }> = [];
    
    questions.forEach((q) => {
      if (!q.id) return;
      const studentAnswer = selectedAnswers[q.id] || '';
      const isCorrect = studentAnswer === q.correctAnswer;
      const points = q.points || 1;
      maxPossibleScore += points;
      const pointsEarned = isCorrect ? points : 0;
      totalScore += pointsEarned;
      
      questionIds.push(q.id);
      quizAnswerDtos.push({
        studentAnswer,
        isCorrect,
        pointsEarned,
        timeSpentSeconds: questionTimes[q.id] || 0
      });
    });
    
    const percentageScore = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
    
    const attemptData: Partial<FullAttemptQuizDto> = {
      quizAttemptDto: {
        timeSpentSeconds: totalTimeSpent,
        totalScore,
        maxPossibleScore,
        percentageScore,
        status: "SUBMITTED"
      },
      questionIds,
      quizAnswerDtos
    };
    
    try {
      const res = await attemptFullQuiz(selectedContent.id,enrollmentId, courseId, attemptData);
      if (res.result) {
        setQuizSubmitted(true);
        toast.success('Quiz submitted successfully!');
      } else {
        toast.error('Failed to submit quiz');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error submitting quiz');
    }
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setActiveQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuestionTimes({});
    setQuizSubmitted(false);
    setShowAttempt(false);
    setPreviousAttempt(null);
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
      
      // Show loading state while fetching quiz
      if (quizLoading) {
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
              <p className="text-muted-foreground">Loading quiz...</p>
            </div>
          </div>
        );
      }

      // Show previous attempt view
      if (showAttempt && previousAttempt) {
        const attempt = previousAttempt.quizAttemptDto;
        const passed = (attempt.percentageScore || 0) >= (quiz.passingScore || 70);
        
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Previous Attempt</h2>
                <p className="text-muted-foreground mt-2">{quiz.title}</p>
              </div>
              <Button variant="outline" onClick={handleResetQuiz}>Back</Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${passed ? 'text-green-500' : 'text-destructive'}`}>
                    {(attempt.percentageScore || 0).toFixed(0)}%
                  </div>
                  <Badge variant={passed ? 'default' : 'destructive'} className="text-lg px-4 py-1">
                    {passed ? 'Passed' : 'Failed'}
                  </Badge>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Score</p>
                      <p className="font-semibold">{attempt.totalScore} / {attempt.maxPossibleScore}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time Spent</p>
                      <p className="font-semibold">{Math.floor((attempt.timeSpentSeconds || 0) / 60)}m {(attempt.timeSpentSeconds || 0) % 60}s</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previousAttempt.quizAnswerDtos.map((answer, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${answer.isCorrect ? 'border-green-500 bg-green-500/10' : 'border-destructive bg-destructive/10'}`}>
                    <p className="font-medium mb-2">Question {index + 1}</p>
                    <p className="text-sm">
                      Your answer: <span className={answer.isCorrect ? 'text-green-500' : 'text-destructive'}>{answer.studentAnswer}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Points: {answer.pointsEarned} • Time: {answer.timeSpentSeconds}s
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );
      }

      // Quiz not started yet - show "Start Quiz" and "Quiz Attempt" buttons
      if (!quizStarted || !activeQuiz) {
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
                <div className="flex gap-4">
                  <Button size="lg" className="flex-1" onClick={() => handleTakeQuiz(quiz.id)} disabled={quizLoading}>
                    {quizLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                    Start Quiz
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1" onClick={() => handleViewAttempt(quiz.id)} disabled={attemptLoading}>
                    {attemptLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ClipboardList className="w-4 h-4 mr-2" />}
                    Quiz Attempt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      }

      // Quiz submitted - show results
      if (quizSubmitted && activeQuiz) {
        const questions = activeQuiz.quizQuestions || [];
        let correctCount = 0;
        questions.forEach((q) => {
          if (q.id && selectedAnswers[q.id] === q.correctAnswer) {
            correctCount++;
          }
        });
        const score = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
        const passed = score >= (activeQuiz.quizDto?.passingScore || 70);

        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-muted-foreground">{activeQuiz.quizDto?.title}</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${passed ? 'text-green-500' : 'text-destructive'}`}>
                    {score.toFixed(0)}%
                  </div>
                  <Badge variant={passed ? 'default' : 'destructive'} className="text-lg px-4 py-1">
                    {passed ? 'Passed' : 'Failed'}
                  </Badge>
                  <p className="text-muted-foreground">
                    You got {correctCount} out of {questions.length} questions correct
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Passing score: {activeQuiz.quizDto?.passingScore}%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {questions.map((q, index) => {
                  const isCorrect = q.id && selectedAnswers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-destructive bg-destructive/10'}`}>
                      <p className="font-medium mb-2">
                        {index + 1}. {q.questionText}
                      </p>
                      <p className="text-sm">
                        Your answer: <span className={isCorrect ? 'text-green-500' : 'text-destructive'}>{q.id && selectedAnswers[q.id]}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-500">Correct answer: {q.correctAnswer}</p>
                      )}
                      {q.explanation && (
                        <p className="text-sm text-muted-foreground mt-2">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Button className="w-full" onClick={handleResetQuiz}>
              Retake Quiz
            </Button>
          </div>
        );
      }

      // Quiz in progress - show questions
      const questions = activeQuiz?.quizQuestions || [];
      const currentQuestion = questions[currentQuestionIndex];

      if (!currentQuestion) {
        return <p>No questions available.</p>;
      }

      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{activeQuiz?.quizDto?.title}</h2>
              <p className="text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <Badge variant="outline">{currentQuestion.points} pts</Badge>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <p className="text-lg font-medium">{currentQuestion.questionText}</p>

              <RadioGroup
                value={currentQuestion.id ? selectedAnswers[currentQuestion.id] || '' : ''}
                onValueChange={(value) => {
                  if (currentQuestion.id) {
                    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id!]: value }));
                  }
                }}
              >
                {currentQuestion.options && Object.entries(currentQuestion.options).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key} className="flex-1 cursor-pointer">
                      <span className="font-medium mr-2">{key}.</span>
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex === questions.length - 1 ? (
              <Button onClick={handleSubmitQuiz}>
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
                disabled={!currentQuestion.id || !selectedAnswers[currentQuestion.id]}
              >
                Next
              </Button>
            )}
          </div>
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
            <h1 className="font-semibold">{course.course.title}</h1>
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