import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  BarChart3, 
  Home,
  Play,
  CheckCircle,
  Clock,
  Award,
  ExternalLink
} from 'lucide-react';
import { SkillLevel } from '@/services/types';

const navigationItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: <Home className="w-4 h-4" /> },
  { label: 'My Courses', path: '/student/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Progress', path: '/student/progress', icon: <BarChart3 className="w-4 h-4" /> },
];

interface StudentCourse {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  difficultyLevel: SkillLevel;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextLesson?: string;
  estimatedTime?: string;
  completedDate?: string;
  score?: number;
  certificateUrl?: string;
}

const continueLearningCourses: StudentCourse[] = [
  {
    id: 'course-1',
    title: 'Modern JavaScript ES6+',
    description: 'Master modern JavaScript features and best practices for web development.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
    difficultyLevel: SkillLevel.INTERMEDIATE,
    progress: 65,
    completedLessons: 16,
    totalLessons: 24,
    nextLesson: 'Async/Await Patterns',
    estimatedTime: '45 min',
  },
  {
    id: 'course-2',
    title: 'Introduction to Python',
    description: 'Learn Python from scratch with hands-on projects and exercises.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    difficultyLevel: SkillLevel.BEGINNER,
    progress: 30,
    completedLessons: 9,
    totalLessons: 30,
    nextLesson: 'Working with Lists',
    estimatedTime: '1h 20min',
  },
  {
    id: 'course-3',
    title: 'React Fundamentals',
    description: 'Build modern web applications with React and its ecosystem.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    difficultyLevel: SkillLevel.INTERMEDIATE,
    progress: 85,
    completedLessons: 17,
    totalLessons: 20,
    nextLesson: 'Custom Hooks',
    estimatedTime: '30 min',
  },
];

const completedCourses: StudentCourse[] = [
  {
    id: 'course-4',
    title: 'HTML & CSS Basics',
    description: 'Foundation course for web development with HTML5 and CSS3.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400',
    difficultyLevel: SkillLevel.BEGINNER,
    progress: 100,
    completedLessons: 20,
    totalLessons: 20,
    completedDate: '2025-10-15',
    score: 92,
    certificateUrl: '#',
  },
  {
    id: 'course-5',
    title: 'Git & GitHub Essentials',
    description: 'Version control fundamentals for modern software development.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400',
    difficultyLevel: SkillLevel.BEGINNER,
    progress: 100,
    completedLessons: 15,
    totalLessons: 15,
    completedDate: '2025-09-28',
    score: 88,
    certificateUrl: '#',
  },
];

const getDifficultyColor = (level: SkillLevel) => {
  switch (level) {
    case SkillLevel.BEGINNER:
      return 'bg-green-500/20 text-green-500';
    case SkillLevel.INTERMEDIATE:
      return 'bg-yellow-500/20 text-yellow-500';
    case SkillLevel.ADVANCED:
      return 'bg-red-500/20 text-red-500';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function StudentCourses() {
  return (
    <DashboardLayout role="student" navigationItems={navigationItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            My <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-muted-foreground">Track your learning journey and continue where you left off</p>
        </div>

        <Tabs defaultValue="continue" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="continue">Continue Learning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Continue Learning Tab */}
          <TabsContent value="continue" className="space-y-4">
            {continueLearningCourses.length === 0 ? (
              <Card className="glass">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No courses in progress. Start learning!</p>
                  <Link to="/courses">
                    <Button className="mt-4">Browse Courses</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {continueLearningCourses.map((course) => (
                  <Card key={course.id} className="glass hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold">{course.title}</h3>
                              <Badge className={getDifficultyColor(course.difficultyLevel)}>
                                {course.difficultyLevel}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {course.description}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {course.completedLessons} of {course.totalLessons} lessons
                              </span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Play className="w-4 h-4" />
                                <span>Next: {course.nextLesson}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.estimatedTime}</span>
                              </div>
                            </div>
                            <Link to={`/courses/${course.id}/learn/enroll-1`}>
                              <Button>
                                <Play className="w-4 h-4 mr-2" />
                                Continue
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed" className="space-y-4">
            {completedCourses.length === 0 ? (
              <Card className="glass">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No completed courses yet. Keep learning!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {completedCourses.map((course) => (
                  <Card key={course.id} className="glass hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative">
                          <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className="w-full md:w-48 h-32 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold">{course.title}</h3>
                              <Badge className={getDifficultyColor(course.difficultyLevel)}>
                                {course.difficultyLevel}
                              </Badge>
                              <Badge className="bg-green-500/20 text-green-500">
                                Completed
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {course.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span>Score: {course.score}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.totalLessons} lessons</span>
                            </div>
                            <span>Completed: {course.completedDate}</span>
                          </div>

                          <div className="flex gap-2">
                            <Link to={`/courses/${course.id}/learn/enroll-1`}>
                              <Button variant="outline" size="sm">
                                <Play className="w-4 h-4 mr-2" />
                                Review Course
                              </Button>
                            </Link>
                            {course.certificateUrl && (
                              <Button variant="outline" size="sm">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Certificate
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
