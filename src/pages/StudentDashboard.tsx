import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  Target,
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const navigationItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'My Courses', path: '/student/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Progress', path: '/student/progress', icon: <Target className="w-4 h-4" /> },
  { label: 'Achievements', path: '/student/achievements', icon: <Award className="w-4 h-4" /> },
];

export default function StudentDashboard() {
  const suggestedCourses = [
    {
      title: 'Advanced React Patterns',
      difficulty: 'Intermediate',
      progress: 0,
      matchScore: 95,
      reason: 'Based on your JavaScript mastery',
    },
    {
      title: 'UI/UX Design Fundamentals',
      difficulty: 'Beginner',
      progress: 0,
      matchScore: 87,
      reason: 'Complement your frontend skills',
    },
    {
      title: 'TypeScript Deep Dive',
      difficulty: 'Advanced',
      progress: 0,
      matchScore: 92,
      reason: 'Next step in your learning path',
    },
  ];

  const activeCourses = [
    {
      title: 'Modern JavaScript ES6+',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'Arrow Functions & This Context',
    },
    {
      title: 'Introduction to Python',
      progress: 45,
      totalLessons: 30,
      completedLessons: 14,
      nextLesson: 'List Comprehensions',
    },
    {
      title: 'Data Structures & Algorithms',
      progress: 30,
      totalLessons: 40,
      completedLessons: 12,
      nextLesson: 'Binary Search Trees',
    },
  ];

  const recentActivity = [
    { type: 'completed', text: 'Completed "Async/Await in JavaScript"', time: '2 hours ago' },
    { type: 'quiz', text: 'Scored 92% on Python Basics Quiz', time: '5 hours ago' },
    { type: 'started', text: 'Started "Data Structures & Algorithms"', time: '1 day ago' },
  ];

  return (
    <DashboardLayout role="student" navigationItems={navigationItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome Back, <span className="gradient-text">Learner!</span>
          </h1>
          <p className="text-muted-foreground">Continue your journey to mastery</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Courses Active', value: '3', icon: BookOpen, color: 'text-primary' },
            { label: 'Avg. Progress', value: '50%', icon: TrendingUp, color: 'text-accent' },
            { label: 'Lessons Completed', value: '44', icon: CheckCircle2, color: 'text-success' },
            { label: 'Study Hours', value: '28h', icon: Clock, color: 'text-warning' },
          ].map((stat, index) => (
            <Card key={index} className="glass glow-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Suggested Courses */}
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              AI-Recommended for You
            </CardTitle>
            <CardDescription>
              Personalized course suggestions based on your learning patterns and goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedCourses.map((course, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {course.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{course.reason}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-accent font-medium">{course.matchScore}% Match</span>
                    </div>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 glow-hover">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Courses */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeCourses.map((course, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Next: {course.nextLesson}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {course.completedLessons} of {course.totalLessons} lessons completed
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  {activity.type === 'completed' && <CheckCircle2 className="w-5 h-5 text-success" />}
                  {activity.type === 'quiz' && <Award className="w-5 h-5 text-warning" />}
                  {activity.type === 'started' && <Play className="w-5 h-5 text-accent" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
