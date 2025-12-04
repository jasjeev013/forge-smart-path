import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  TrendingUp,
  Edit,
  Users,
  Video,
  Plus,
  Eye,
  Trash2
} from 'lucide-react';
import { CourseDto, SkillLevel } from '@/services/types';

const navigationItems = [
  { label: 'Dashboard', path: '/instructor/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'My Courses', path: '/instructor/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Create Course', path: '/instructor/create-course', icon: <Plus className="w-4 h-4" /> },
];

// Extended type for display purposes
interface InstructorCourse extends CourseDto {
  students?: number;
  rating?: number;
  lessons?: number;
}

const dummyDraftCourses: InstructorCourse[] = [
  {
    id: 'draft-1',
    subjectId: 'sub-1',
    instructorId: 'inst-1',
    title: 'Advanced TypeScript Patterns',
    description: 'Deep dive into TypeScript advanced features and design patterns.',
    difficultyLevel: SkillLevel.ADVANCED,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
    learningObjectives: ['Master generics', 'Understand decorators'],
    prerequisites: ['Basic TypeScript knowledge'],
    estimatedDurationHours: 25,
    isPublished: false,
    isFeatured: false,
    price: 149.99,
    createdAt: '2025-11-01T10:00:00',
    updatedAt: '2025-11-15T14:00:00',
    lessons: 12,
  },
  {
    id: 'draft-2',
    subjectId: 'sub-2',
    instructorId: 'inst-1',
    title: 'Docker & Kubernetes Fundamentals',
    description: 'Learn containerization and orchestration from scratch.',
    difficultyLevel: SkillLevel.INTERMEDIATE,
    thumbnailUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400',
    learningObjectives: ['Build Docker images', 'Deploy to Kubernetes'],
    prerequisites: ['Basic Linux knowledge'],
    estimatedDurationHours: 30,
    isPublished: false,
    isFeatured: false,
    price: 199.99,
    createdAt: '2025-10-20T09:00:00',
    updatedAt: '2025-11-10T11:00:00',
    lessons: 8,
  },
];

const dummyPublishedCourses: InstructorCourse[] = [
  {
    id: 'pub-1',
    subjectId: 'sub-1',
    instructorId: 'inst-1',
    title: 'Modern JavaScript ES6+',
    description: 'Master modern JavaScript features and best practices.',
    difficultyLevel: SkillLevel.INTERMEDIATE,
    thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
    learningObjectives: ['ES6+ features', 'Async programming'],
    prerequisites: ['Basic JavaScript'],
    estimatedDurationHours: 20,
    isPublished: true,
    isFeatured: true,
    price: 99.99,
    createdAt: '2025-08-01T10:00:00',
    updatedAt: '2025-11-20T14:00:00',
    students: 1247,
    rating: 4.8,
    lessons: 24,
  },
  {
    id: 'pub-2',
    subjectId: 'sub-2',
    instructorId: 'inst-1',
    title: 'Introduction to Python',
    description: 'Complete Python programming course for beginners.',
    difficultyLevel: SkillLevel.BEGINNER,
    thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
    learningObjectives: ['Python basics', 'Data structures'],
    prerequisites: ['None'],
    estimatedDurationHours: 25,
    isPublished: true,
    isFeatured: false,
    price: 79.99,
    createdAt: '2025-06-15T09:00:00',
    updatedAt: '2025-11-18T11:00:00',
    students: 892,
    rating: 4.9,
    lessons: 30,
  },
  {
    id: 'pub-3',
    subjectId: 'sub-3',
    instructorId: 'inst-1',
    title: 'Advanced React Patterns',
    description: 'Learn advanced React concepts and patterns for scalable apps.',
    difficultyLevel: SkillLevel.ADVANCED,
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    learningObjectives: ['Custom hooks', 'Performance optimization'],
    prerequisites: ['React basics'],
    estimatedDurationHours: 18,
    isPublished: true,
    isFeatured: true,
    price: 129.99,
    createdAt: '2025-07-01T10:00:00',
    updatedAt: '2025-11-22T15:00:00',
    students: 634,
    rating: 4.7,
    lessons: 18,
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

export default function InstructorCourses() {
  const [draftCourses] = useState<InstructorCourse[]>(dummyDraftCourses);
  const [publishedCourses] = useState<InstructorCourse[]>(dummyPublishedCourses);

  return (
    <DashboardLayout role="instructor" navigationItems={navigationItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              My <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-muted-foreground">Manage your course content and track performance</p>
          </div>
          <Link to="/instructor/create-course">
            <Button className="bg-primary hover:bg-primary/90 glow-hover">
              <Plus className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="drafts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="drafts">Drafts ({draftCourses.length})</TabsTrigger>
            <TabsTrigger value="published">Published ({publishedCourses.length})</TabsTrigger>
          </TabsList>

          {/* Drafts Tab */}
          <TabsContent value="drafts" className="space-y-4">
            {draftCourses.length === 0 ? (
              <Card className="glass">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No draft courses yet. Start creating!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {draftCourses.map((course) => (
                  <Card key={course.id} className="glass hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold">{course.title}</h3>
                                <Badge className={getDifficultyColor(course.difficultyLevel)}>
                                  {course.difficultyLevel}
                                </Badge>
                                <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                                  Draft
                                </Badge>
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {course.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              <span>{course.lessons || 0} lessons</span>
                            </div>
                            <span>${course.price}</span>
                            <span>{course.estimatedDurationHours}h</span>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/instructor/edit-course/${course.id}`}>
                              <Button size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Course
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Published Tab */}
          <TabsContent value="published" className="space-y-4">
            {publishedCourses.length === 0 ? (
              <Card className="glass">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No published courses yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {publishedCourses.map((course) => (
                  <Card key={course.id} className="glass hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold">{course.title}</h3>
                                <Badge className={getDifficultyColor(course.difficultyLevel)}>
                                  {course.difficultyLevel}
                                </Badge>
                                <Badge className="bg-green-500/20 text-green-500">
                                  Published
                                </Badge>
                                {course.isFeatured && (
                                  <Badge className="bg-primary/20 text-primary">Featured</Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {course.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{course.students?.toLocaleString()} students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              <span>{course.lessons} lessons</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>★ {course.rating}</span>
                            </div>
                            <span>${course.price}</span>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/instructor/edit-course/${course.id}`}>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
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
