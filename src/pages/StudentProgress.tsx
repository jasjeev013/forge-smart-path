import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  TrendingUp, 
  Target,
  Award,
  Clock,
  Calendar,
  Zap,
  Trophy,
  Flame
} from 'lucide-react';

const navigationItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'My Courses', path: '/student/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Progress', path: '/student/progress', icon: <Target className="w-4 h-4" /> },
];

export default function StudentProgress() {
  const weeklyActivity = [
    { day: 'Mon', hours: 2.5, completed: 3 },
    { day: 'Tue', hours: 1.5, completed: 2 },
    { day: 'Wed', hours: 3, completed: 4 },
    { day: 'Thu', hours: 2, completed: 2 },
    { day: 'Fri', hours: 4, completed: 5 },
    { day: 'Sat', hours: 3.5, completed: 4 },
    { day: 'Sun', hours: 1.5, completed: 1 },
  ];

  const skillProgress = [
    { skill: 'JavaScript', level: 85, xp: 3400, maxXp: 4000 },
    { skill: 'Python', level: 65, xp: 2600, maxXp: 4000 },
    { skill: 'Data Structures', level: 45, xp: 1800, maxXp: 4000 },
    { skill: 'Web Development', level: 72, xp: 2880, maxXp: 4000 },
    { skill: 'Algorithms', level: 38, xp: 1520, maxXp: 4000 },
  ];

  const achievements = [
    { title: 'First Course Completed', icon: Trophy, color: 'text-yellow-500', date: '2025-10-10' },
    { title: '7-Day Streak', icon: Flame, color: 'text-orange-500', date: '2025-11-20' },
    { title: 'Quiz Master', icon: Award, color: 'text-purple-500', date: '2025-11-15' },
    { title: 'Fast Learner', icon: Zap, color: 'text-blue-500', date: '2025-11-01' },
  ];

  const courseMetrics = [
    { course: 'Modern JavaScript ES6+', completion: 75, timeSpent: 28, avgScore: 92 },
    { course: 'Introduction to Python', completion: 45, timeSpent: 18, avgScore: 88 },
    { course: 'Data Structures & Algorithms', completion: 30, timeSpent: 15, avgScore: 85 },
  ];

  const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

  return (
    <DashboardLayout role="student" navigationItems={navigationItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Learning Progress</span>
          </h1>
          <p className="text-muted-foreground">Track your growth and achievements</p>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total XP', value: '2,850', icon: Zap, color: 'text-primary', change: '+320 this week' },
            { label: 'Study Hours', value: '28h', icon: Clock, color: 'text-accent', change: '+18h this week' },
            { label: 'Lessons Completed', value: '44', icon: BookOpen, color: 'text-success', change: '+21 this week' },
            { label: 'Current Streak', value: '7 days', icon: Flame, color: 'text-warning', change: 'Keep it up!' },
          ].map((stat, index) => (
            <Card key={index} className="glass glow-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Activity Chart */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your learning hours and completed lessons this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-secondary rounded-t-lg relative" style={{ height: `${(day.hours / maxHours) * 100}%` }}>
                      <div className="absolute inset-0 bg-primary rounded-t-lg" style={{ height: '100%' }}></div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium">{day.day}</p>
                      <p className="text-xs text-muted-foreground">{day.hours}h</p>
                      <Badge variant="secondary" className="text-xs mt-1">{day.completed}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Total: 18 hours • 21 lessons completed
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Progress */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Skill Mastery
            </CardTitle>
            <CardDescription>Your progress in different skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {skillProgress.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{skill.skill}</h3>
                    <Badge variant="secondary" className="text-xs">
                      Level {Math.floor(skill.level / 10)}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium text-primary">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-3" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{skill.xp} XP</span>
                  <span>{skill.maxXp - skill.xp} XP to next level</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Course Metrics */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Course Performance
            </CardTitle>
            <CardDescription>Detailed metrics for your active courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseMetrics.map((course, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <h3 className="font-semibold mb-3">{course.course}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{course.completion}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Completion</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{course.timeSpent}h</p>
                      <p className="text-xs text-muted-foreground mt-1">Time Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">{course.avgScore}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Avg Score</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Badges and milestones you've unlocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-secondary/50 border border-border text-center space-y-3"
                >
                  <achievement.icon className={`w-12 h-12 mx-auto ${achievement.color}`} />
                  <div>
                    <h3 className="font-semibold text-sm">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
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
