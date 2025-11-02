import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Clock, Users, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Dummy course data
const dummyCourses = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive web development course.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
    duration: '40 hours',
    students: 15234,
    rating: 4.8,
    level: 'Beginner',
    price: '$99.99',
  },
  {
    id: 2,
    title: 'Advanced Python Programming',
    instructor: 'Michael Chen',
    description: 'Master advanced Python concepts including OOP, decorators, generators, and async programming.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop',
    duration: '25 hours',
    students: 8921,
    rating: 4.9,
    level: 'Advanced',
    price: '$89.99',
  },
  {
    id: 3,
    title: 'Data Science with Python',
    instructor: 'Emily Rodriguez',
    description: 'Learn data analysis, visualization, and machine learning using Python, Pandas, and Scikit-learn.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    duration: '35 hours',
    students: 12456,
    rating: 4.7,
    level: 'Intermediate',
    price: '$109.99',
  },
  {
    id: 4,
    title: 'UI/UX Design Fundamentals',
    instructor: 'David Kim',
    description: 'Master the principles of user interface and user experience design with hands-on projects.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    duration: '20 hours',
    students: 9834,
    rating: 4.6,
    level: 'Beginner',
    price: '$79.99',
  },
  {
    id: 5,
    title: 'Machine Learning A-Z',
    instructor: 'Dr. James Wilson',
    description: 'Comprehensive course on machine learning algorithms, deep learning, and neural networks.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    duration: '45 hours',
    students: 18765,
    rating: 4.9,
    level: 'Advanced',
    price: '$129.99',
  },
  {
    id: 6,
    title: 'Mobile App Development with React Native',
    instructor: 'Lisa Anderson',
    description: 'Build cross-platform mobile applications for iOS and Android using React Native.',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    duration: '30 hours',
    students: 7654,
    rating: 4.7,
    level: 'Intermediate',
    price: '$94.99',
  },
];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredCourses = dummyCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'intermediate': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'advanced': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
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
                <div className="flex gap-2">
                  <Button
                    variant={selectedLevel === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel('all')}
                    size="sm"
                  >
                    All Levels
                  </Button>
                  <Button
                    variant={selectedLevel === 'beginner' ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel('beginner')}
                    size="sm"
                  >
                    Beginner
                  </Button>
                  <Button
                    variant={selectedLevel === 'intermediate' ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel('intermediate')}
                    size="sm"
                  >
                    Intermediate
                  </Button>
                  <Button
                    variant={selectedLevel === 'advanced' ? 'default' : 'outline'}
                    onClick={() => setSelectedLevel('advanced')}
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
                className="glass border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    by {course.instructor}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <Button className="bg-primary hover:bg-primary/90 glow-hover">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Enroll Now
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
