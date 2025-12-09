import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  BarChart3, 
  Home,
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle,
  Award
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  FullInterviewDto, 
  InterviewQuestionDto,
  FullInterviewAttemptDto,
  InterviewAttemptDto,
  InterviewAnswerDto
} from '@/services/types';
import { 
  getInterviewDetailsAndQuestions, 
  createInterviewAttempt,
  getInterviewAttempt
} from '@/services/api/interview';

const navigationItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: <Home className="w-4 h-4" /> },
  { label: 'My Courses', path: '/student/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Progress', path: '/student/progress', icon: <BarChart3 className="w-4 h-4" /> },
];

export default function Interview() {
  const { enrollmentId } = useParams<{ enrollmentId: string }>();
  const navigate = useNavigate();
  
  const [interviewData, setInterviewData] = useState<FullInterviewDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionStartTimes, setQuestionStartTimes] = useState<Record<string, number>>({});
  const [questionTimeSpent, setQuestionTimeSpent] = useState<Record<string, number>>({});
  const [interviewStartTime, setInterviewStartTime] = useState<Date | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<FullInterviewAttemptDto | null>(null);
  const [previousAttempt, setPreviousAttempt] = useState<InterviewAttemptDto | null>(null);
  const [showPreviousAttempt, setShowPreviousAttempt] = useState(false);

  useEffect(() => {
    fetchInterviewData();
    fetchPreviousAttempt();
  }, [enrollmentId]);

  const fetchInterviewData = async () => {
    if (!enrollmentId) return;
    try {
      const response = await getInterviewDetailsAndQuestions(enrollmentId);
      if (response.result) {
        setInterviewData(response.object);
      } else {
        toast.error('Failed to load interview');
      }
    } catch (error) {
      toast.error('Error loading interview');
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousAttempt = async () => {
    if (!enrollmentId) return;
    try {
      const response = await getInterviewAttempt(enrollmentId);
      if (response.result && response.object) {
        setPreviousAttempt(response.object);
      }
    } catch (error) {
      // No previous attempt
    }
  };

  const handleStartInterview = () => {
    setInterviewStarted(true);
    setInterviewStartTime(new Date());
    if (interviewData?.interviewQuestionDtos[0]) {
      setQuestionStartTimes({ [interviewData.interviewQuestionDtos[0].id]: Date.now() });
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    const currentQuestion = interviewData?.interviewQuestionDtos[currentQuestionIndex];
    if (currentQuestion) {
      const timeSpent = Math.floor((Date.now() - (questionStartTimes[currentQuestion.id] || Date.now())) / 1000);
      setQuestionTimeSpent(prev => ({ ...prev, [currentQuestion.id]: timeSpent }));
    }

    if (currentQuestionIndex < (interviewData?.interviewQuestionDtos.length || 0) - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      const nextQuestion = interviewData?.interviewQuestionDtos[nextIndex];
      if (nextQuestion) {
        setQuestionStartTimes(prev => ({ ...prev, [nextQuestion.id]: Date.now() }));
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitInterview = async () => {
    if (!interviewData || !enrollmentId || !interviewStartTime) return;

    // Calculate final question time
    const currentQuestion = interviewData.interviewQuestionDtos[currentQuestionIndex];
    if (currentQuestion) {
      const timeSpent = Math.floor((Date.now() - (questionStartTimes[currentQuestion.id] || Date.now())) / 1000);
      setQuestionTimeSpent(prev => ({ ...prev, [currentQuestion.id]: timeSpent }));
    }

    setSubmitting(true);

    const interviewAnswerDtos: InterviewAnswerDto[] = interviewData.interviewQuestionDtos.map(q => ({
      interviewQuestionId: q.id,
      studentAnswer: answers[q.id] || '',
      timeSpentSeconds: questionTimeSpent[q.id] || 0,
      aiEvaluation: '',
      aiScore: 0
    }));

    const fullInterviewAttemptDto = {
      interviewAttemptDto: {
        studentId: localStorage.getItem('student_id') || '',
        interviewId: interviewData.interviewDto.id,
        startedAt: interviewStartTime.toISOString(),
        submittedAt: new Date().toISOString(),
      },
      interviewAnswerDto: interviewAnswerDtos
    };

    try {
      const response = await createInterviewAttempt(enrollmentId, fullInterviewAttemptDto as any);
      if (response.result) {
        setAttemptResult(response.object as unknown as FullInterviewAttemptDto);
        setSubmitted(true);
        toast.success('Interview submitted successfully!');
      } else {
        toast.error('Failed to submit interview');
      }
    } catch (error) {
      toast.error('Error submitting interview');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="student" navigationItems={navigationItems}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!interviewData) {
    return (
      <DashboardLayout role="student" navigationItems={navigationItems}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Interview not found</p>
          <Button onClick={() => navigate('/student/courses')} className="mt-4">
            Back to Courses
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const questions = interviewData.interviewQuestionDtos;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Show previous attempt
  if (showPreviousAttempt && previousAttempt) {
    return (
      <DashboardLayout role="student" navigationItems={navigationItems}>
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Previous Interview Attempt</h1>
            <Button variant="outline" onClick={() => setShowPreviousAttempt(false)}>
              Back
            </Button>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Interview Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Overall Score</p>
                  <p className="text-2xl font-bold text-primary">{previousAttempt.aiOverallScore || 'N/A'}%</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={previousAttempt.status === 'EVALUATED' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}>
                    {previousAttempt.status}
                  </Badge>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Started At</p>
                  <p className="text-sm">{previousAttempt.startedAt ? new Date(previousAttempt.startedAt).toLocaleString() : 'N/A'}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Submitted At</p>
                  <p className="text-sm">{previousAttempt.submittedAt ? new Date(previousAttempt.submittedAt).toLocaleString() : 'N/A'}</p>
                </div>
              </div>

              {previousAttempt.aiFeedbackSummary && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">AI Feedback Summary</p>
                  <p className="text-sm">{previousAttempt.aiFeedbackSummary}</p>
                </div>
              )}

              {previousAttempt.aiSkillEvaluation && Object.keys(previousAttempt.aiSkillEvaluation).length > 0 && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Skill Evaluation</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(previousAttempt.aiSkillEvaluation).map(([skill, score]) => (
                      <div key={skill} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{skill}</span>
                        <Badge variant="outline">{score}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Show results after submission
  if (submitted && attemptResult) {
    return (
      <DashboardLayout role="student" navigationItems={navigationItems}>
        <div className="space-y-6 max-w-4xl mx-auto">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-500">
                <CheckCircle className="w-6 h-6" />
                Interview Submitted Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your interview has been submitted and is being evaluated. You will receive your results soon.
              </p>
              <div className="flex gap-2">
                <Button onClick={() => navigate('/student/courses')}>
                  Back to Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Interview not started - show start screen
  if (!interviewStarted) {
    return (
      <DashboardLayout role="student" navigationItems={navigationItems}>
        <div className="space-y-6 max-w-4xl mx-auto">
          <Card className="glass">
            <CardHeader>
              <CardTitle>{interviewData.interviewDto.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{interviewData.interviewDto.description}</p>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline">
                  {questions.length} Questions
                </Badge>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleStartInterview} size="lg">
                  Start Interview
                </Button>
                {previousAttempt && (
                  <Button variant="outline" size="lg" onClick={() => setShowPreviousAttempt(true)}>
                    View Previous Attempt
                  </Button>
                )}
                <Button variant="outline" size="lg" onClick={() => navigate('/student/courses')}>
                  Back to Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Interview in progress
  return (
    <DashboardLayout role="student" navigationItems={navigationItems}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{interviewData.interviewDto.title}</h1>
            <Badge variant="outline">
              Question {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/20 text-primary">
                {currentQuestion?.difficultyLevel}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-medium">
              {currentQuestion?.questionText}
            </div>

            <Textarea
              placeholder="Type your answer here..."
              value={answers[currentQuestion?.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion?.id, e.target.value)}
              rows={8}
              className="resize-none"
            />

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentQuestionIndex === questions.length - 1 ? (
                <Button
                  onClick={handleSubmitInterview}
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Interview
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation Dots */}
        <div className="flex justify-center gap-2 flex-wrap">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                idx === currentQuestionIndex
                  ? 'bg-primary text-primary-foreground'
                  : answers[q.id]
                  ? 'bg-green-500/20 text-green-500 border border-green-500'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}