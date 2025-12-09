import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  BarChart3, 
  Home,
  Play,
  CheckCircle,
  Clock,
  Award,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { CourseDto, EnrollmentCourseDto, SkillLevel } from '@/services/types';
import { useEffect, useState } from 'react';
import { getStudentActiveCourses, getStudentCompletedCourses } from '@/services/api/student';

const navigationItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: <Home className="w-4 h-4" /> },
  { label: 'My Courses', path: '/student/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Progress', path: '/student/progress', icon: <BarChart3 className="w-4 h-4" /> },
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
  const navigate = useNavigate();
  const [completedCoursesList, setCompletedCoursesList] = useState<EnrollmentCourseDto>({
    studentEnrollments: [],
    courses: [],
  });
  const [activeCoursesList, setActiveCoursesList] = useState<EnrollmentCourseDto>({
    studentEnrollments: [],
    courses: [],
  });

  useEffect(() => {
    async function fetchCompletedCourses() {
      // Fetch completed courses logic here
      const res = await getStudentCompletedCourses();
      if(res.result){
        setCompletedCoursesList(res.object);
      }
    }
    async function fetchActiveCourses() {
      // Fetch active courses logic here
      const res = await getStudentActiveCourses();
      if(res.result){
        setActiveCoursesList(res.object);
      }
    }
    fetchCompletedCourses();
    fetchActiveCourses();
  }, []);


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
            {activeCoursesList.courses.length === 0 ? (
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
                {activeCoursesList.courses.map((course,index) => (
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
                            
                              <span className="font-medium">{59}%</span>
                            </div>
                            <Progress value={activeCoursesList.studentEnrollments[index].currentProgressPercent} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.estimatedDurationHours}</span>
                              </div>
                            </div>
                            <Link to={`/courses/${course.id}/learn/${activeCoursesList.studentEnrollments[index].id}`}>
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
            {completedCoursesList.courses.length === 0 ? (
              <Card className="glass">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No completed courses yet. Keep learning!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {completedCoursesList.courses.map((course,index) => (
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
                              <span>Score: {30}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{30} lessons</span>
                            </div>
                            <span>Completed: {course.updatedAt}</span>
                          </div>

                          <div className="flex gap-2">
                            <Link to={`/courses/${course.id}/learn/${completedCoursesList.studentEnrollments[index].id}`}>
                              <Button variant="outline" size="sm">
                                <Play className="w-4 h-4 mr-2" />
                                Review Course
                              </Button>
                            </Link>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => navigate(`/interview/${completedCoursesList.studentEnrollments[index].id}`)}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Take Interview
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
