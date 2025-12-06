import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Clock, Users, GraduationCap } from 'lucide-react';
import Navbar from '@/components/Navbar';
// import { dummyCourses } from '@/data/dummyCourses';
import { SkillLevel } from '@/services/types';
import { toast } from 'sonner';
import {getAllCourses,enrollCourse, getAllEnrolledCourses, getAllPublishedCourses} from '@/services/api/course'

export default function Courses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [courses,setCourses] = useState([]);
  const [isStudent, setIsStudent] = useState(false);

  const [enrolledCourses,setEnrolledCourses] = useState([]);

  useEffect(()=>{
    async function getCourses(){
      const res = await getAllPublishedCourses();
      // console.log(res.object);
      setCourses(res.object);
    }
    getCourses();
    // console.log(courses)
  },[])

  useEffect(()=>{
    async function getEnrolledCourses(){
      const res = await getAllEnrolledCourses();
      setEnrolledCourses(res.object);
    }
    if(localStorage.getItem('student_id')){
      getEnrolledCourses();
    }
  },[])
  useEffect(()=>{
    const role = localStorage.getItem('student_id');
    if( role) {
      setIsStudent(true);
    }else{
      setIsStudent(false);
    }
  },[])

  

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.difficultyLevel === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case SkillLevel.BEGINNER: return 'bg-green-500/10 text-green-500 border-green-500/20';
      case SkillLevel.INTERMEDIATE: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case SkillLevel.ADVANCED: return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

 

  const handleEnroll = async  (courseId: string) => {
    console.log(enrolledCourses)
    console.log(courseId)
    const enrolled = enrolledCourses.find((e: any) => e.courseId === courseId);

    if (enrolled) {
      navigate(`/courses/${courseId}/learn/${enrolled.id}`);
      return;
    }

    console.log("Re enrolling bruhhh")
    const res = await enrollCourse(courseId);

    if (res.result) {
      navigate(`/courses/${courseId}/learn/${res.object.id}`);
      toast.success('Successfully enrolled! (Free enrollment)');
    } else {
      toast.success(res.message);
    }

    // if(!localStorage.getItem('student_id')){
    //   toast.error('Please login to enroll in a course');
    //   return;
    // }
    // console.log(courseId)
    
  };

  const viewCourseDetails = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Explore Courses</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover thousands of courses taught by expert instructors. Start learning today!
            </p>
          </div>

          {/* Search and Filter */}
          <Card className="glass border-border/50 animate-slide-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedLevel === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel('all')}
                    size="sm"
                  >
                    All Levels
                  </Button>
                  <Button
                    variant={selectedLevel === SkillLevel.BEGINNER ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel(SkillLevel.BEGINNER)}
                    size="sm"
                  >
                    Beginner
                  </Button>
                  <Button
                    variant={selectedLevel === SkillLevel.INTERMEDIATE ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel(SkillLevel.INTERMEDIATE)}
                    size="sm"
                  >
                    Intermediate
                  </Button>
                  <Button
                    variant={selectedLevel === SkillLevel.ADVANCED ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel(SkillLevel.ADVANCED)}
                    size="sm"
                  >
                    Advanced
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Card 
                key={course.id} 
                className="glass border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => viewCourseDetails(course.id)}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={course.thumbnailUrl} 
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {course.isFeatured && (
                    <Badge className="absolute top-3 right-3 bg-accent/90 backdrop-blur-sm">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={getLevelColor(course.difficultyLevel)}>
                      {course.difficultyLevel}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Instructor ID: {course.instructorId}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.estimatedDurationHours}h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.learningObjectives.length} objectives</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-2xl font-bold text-primary">${course.price}</span>
                    <Button 
                      className="bg-primary hover:bg-primary/90 glow-hover"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnroll(course.id);
                      }}
                      disabled= {!isStudent}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {enrolledCourses.some((enrolled: any) => enrolled.courseId === course.id) ? 'Continue Learning' : 'Enroll Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
