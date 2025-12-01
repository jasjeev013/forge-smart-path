import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  TrendingUp, 
  Target,
  Award,
  Clock,
  Play,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navigationItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'My Courses', path: '/student/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Progress', path: '/student/progress', icon: <Target className="w-4 h-4" /> },
];

export default function StudentCourses() {
  const navigate = useNavigate();

  const continueLearningCourses = [
    {
      id: '1',
      title: 'Modern JavaScript ES6+',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'Arrow Functions & This Context',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
      difficulty: 'Intermediate',
      estimatedTime: '6h remaining',
    },
    {
      id: '2',
      title: 'Introduction to Python',
      progress: 45,
      totalLessons: 30,
      completedLessons: 14,
      nextLesson: 'List Comprehensions',
      thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      difficulty: 'Beginner',
      estimatedTime: '12h remaining',
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      progress: 30,
      totalLessons: 40,
      completedLessons: 12,
      nextLesson: 'Binary Search Trees',
      thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
      difficulty: 'Advanced',
      estimatedTime: '20h remaining',
    },
  ];

  const completedCourses = [
    {
      id: '4',
      title: 'HTML & CSS Fundamentals',
      completedDate: '2025-11-15',
      score: 95,
      totalLessons: 20,
      thumbnailUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400',
      difficulty: 'Beginner',
      certificateUrl: '#',
    },
    {
      id: '5',
      title: 'Git & Version Control',
      completedDate: '2025-10-28',
      score: 88,
      totalLessons: 15,
      thumbnailUrl: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400',
      difficulty: 'Beginner',
      certificateUrl: '#',
    },
    {
      id: '6',
      title: 'React Basics',
      completedDate: '2025-10-10',
      score: 92,
      totalLessons: 28,
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      difficulty: 'Intermediate',
      certificateUrl: '#',
    },
  ];

  return (
    <DashboardLayout role="student" navigationItems={navigationItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">My Courses</span>
          </h1>
          <p className="text-muted-foreground">Track your learning journey and achievements</p>
        </div>

        {/* Continue Learning Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {continueLearningCourses.map((course) => (
              <div key={course.id} className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all">
                <div className="flex gap-4">
                  <img 
                    src={course.thumbnailUrl} 
                    alt={course.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {course.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Next: {course.nextLesson}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {course.completedLessons}/{course.totalLessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {course.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/courses/${course.id}/learn`)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-primary">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Completed Courses Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Completed Courses
            </CardTitle>
            <CardDescription>Your achievements and certifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map((course) => (
                <div 
                  key={course.id}
                  className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-success/50 transition-all space-y-3"
                >
                  <img 
                    src={course.thumbnailUrl} 
                    alt={course.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold">{course.title}</h3>
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {course.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Score: {course.score}%
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.totalLessons} lessons completed
                      </p>
                      <p>Completed: {new Date(course.completedDate).toLocaleDateString()}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => window.open(course.certificateUrl, '_blank')}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
