import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Upload, 
  Users, 
  TrendingUp,
  Video,
  FileText,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

const navigationItems = [
  { label: 'Dashboard', path: '/instructor/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'My Courses', path: '/instructor/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Upload Content', path: '/instructor/upload', icon: <Upload className="w-4 h-4" /> },
  { label: 'Students', path: '/instructor/students', icon: <Users className="w-4 h-4" /> },
];

export default function InstructorDashboard() {
  const courses = [
    {
      title: 'Modern JavaScript ES6+',
      students: 1247,
      rating: 4.8,
      status: 'Published',
      lessons: 24,
      difficulty: 'Intermediate',
    },
    {
      title: 'Introduction to Python',
      students: 892,
      rating: 4.9,
      status: 'Published',
      lessons: 30,
      difficulty: 'Beginner',
    },
    {
      title: 'Advanced React Patterns',
      students: 634,
      rating: 4.7,
      status: 'Published',
      lessons: 18,
      difficulty: 'Advanced',
    },
  ];

  const recentUploads = [
    { type: 'video', name: 'Introduction to Async/Await', course: 'Modern JavaScript ES6+', date: '2 days ago' },
    { type: 'pdf', name: 'JavaScript Cheat Sheet.pdf', course: 'Modern JavaScript ES6+', date: '3 days ago' },
    { type: 'video', name: 'List Comprehensions Tutorial', course: 'Introduction to Python', date: '1 week ago' },
  ];

  return (
    <DashboardLayout role="instructor" navigationItems={navigationItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Instructor <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Manage your courses and engage with students</p>
          </div>
          <Link to="/instructor/create-course">
            <Button className="bg-primary hover:bg-primary/90 glow-hover">
              <Plus className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Students', value: '2,773', icon: Users, color: 'text-primary' },
            { label: 'Active Courses', value: '3', icon: BookOpen, color: 'text-accent' },
            { label: 'Avg. Rating', value: '4.8', icon: TrendingUp, color: 'text-success' },
            { label: 'Total Lessons', value: '72', icon: Video, color: 'text-warning' },
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

        {/* Course Management */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Your Courses</CardTitle>
            <CardDescription>Manage and update your course content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {course.difficulty}
                        </Badge>
                        <Badge className="text-xs bg-success">{course.status}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>★ {course.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Add Content
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Quick Upload
            </CardTitle>
            <CardDescription>Add new content to your courses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Video className="w-6 h-6 text-accent" />
                <span>Upload Video</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <FileText className="w-6 h-6 text-warning" />
                <span>Upload PDF</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Plus className="w-6 h-6 text-success" />
                <span>Create Quiz</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUploads.map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  {upload.type === 'video' ? (
                    <Video className="w-5 h-5 text-accent" />
                  ) : (
                    <FileText className="w-5 h-5 text-warning" />
                  )}
                  <div>
                    <p className="font-medium">{upload.name}</p>
                    <p className="text-sm text-muted-foreground">{upload.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{upload.date}</span>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
