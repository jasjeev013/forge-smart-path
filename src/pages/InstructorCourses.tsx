import { useEffect, useState } from 'react';
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
  Trash2,
  Upload
} from 'lucide-react';
import { CourseDto, SkillLevel } from '@/services/types';
import { getCoursePublished, getDraftCoursesForinstructor, getPublishedCoursesForinstructor } from '@/services/api/course';

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
  const [draftCourses,setDraftCourses] = useState<CourseDto[]>([]);
  const [publishedCourses,setPublishedCourses] = useState<CourseDto[]>([]);

  useEffect(() => {
    async function getDraftCourses(){
      const res = await getDraftCoursesForinstructor();
      if(res.result){
        setDraftCourses(res.object);
      }
    }
    getDraftCourses();
  },[])
  
  useEffect(() => {
    async function getPublishedCourses(){
      const res = await getPublishedCoursesForinstructor();
      if(res.result){
        setPublishedCourses(res.object);
      }
    }
    getPublishedCourses();
  },[])

  const publishCourse = async (courseId: string) => {
    const res = await getCoursePublished(courseId);
    if(res.result){
      const newDraftCourses = draftCourses.filter(course => course.id !== courseId);
      setDraftCourses(newDraftCourses);
      setPublishedCourses([...publishedCourses, res.object]);
    }
  }

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
                              <span>10 lessons</span>
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
                            <Button onClick={() => publishCourse(course.id)} variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Publish Course
                            </Button>
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
                  <Card key={course?.id} className="glass hover:border-primary/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <img
                          src={course?.thumbnailUrl}
                          alt={course?.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold">{course?.title}</h3>
                                <Badge className={getDifficultyColor(course?.difficultyLevel)}>
                                  {course?.difficultyLevel}
                                </Badge>
                                <Badge className="bg-green-500/20 text-green-500">
                                  Published
                                </Badge>
                                {course?.isFeatured && (
                                  <Badge className="bg-primary/20 text-primary">Featured</Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {course?.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>10+ students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              <span>20+ lessons</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>★5 </span>
                            </div>
                            <span>${course?.price}</span>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/instructor/edit-course/${course?.id}`}>
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
