import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Activity,
  UserPlus,
  Settings,
  Shield,
  AlertCircle
} from 'lucide-react';

const navigationItems = [
  { label: 'Overview', path: '/admin/dashboard', icon: <Activity className="w-4 h-4" /> },
  { label: 'Users', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
  { label: 'Courses', path: '/admin/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function AdminDashboard() {
  const platformStats = {
    totalUsers: 52847,
    totalCourses: 1243,
    activeStudents: 38492,
    totalInstructors: 847,
    monthlyRevenue: '$125,430',
    avgRating: 4.7,
  };

  const recentUsers = [
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', joined: '2 hours ago' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'Instructor', joined: '5 hours ago' },
    { name: 'Carol Davis', email: 'carol@example.com', role: 'Student', joined: '1 day ago' },
  ];

  const systemAlerts = [
    { type: 'info', message: 'New feature: AI-powered quiz generation is now live', time: '1 hour ago' },
    { type: 'warning', message: 'Server maintenance scheduled for Sunday 2 AM', time: '3 hours ago' },
    { type: 'success', message: 'Platform reached 50K users milestone', time: '1 day ago' },
  ];

  return (
    <DashboardLayout role="admin" navigationItems={navigationItems}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Admin <span className="gradient-text">Control Panel</span>
          </h1>
          <p className="text-muted-foreground">Monitor and manage the SkillForge platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Total Users', value: platformStats.totalUsers.toLocaleString(), icon: Users, color: 'text-primary', change: '+12.5%' },
            { label: 'Active Students', value: platformStats.activeStudents.toLocaleString(), icon: TrendingUp, color: 'text-success', change: '+8.2%' },
            { label: 'Total Courses', value: platformStats.totalCourses.toLocaleString(), icon: BookOpen, color: 'text-accent', change: '+5.1%' },
            { label: 'Instructors', value: platformStats.totalInstructors.toLocaleString(), icon: UserPlus, color: 'text-warning', change: '+3.4%' },
            { label: 'Avg. Rating', value: platformStats.avgRating, icon: TrendingUp, color: 'text-success', change: '+0.3' },
            { label: 'Monthly Revenue', value: platformStats.monthlyRevenue, icon: Activity, color: 'text-primary', change: '+18.7%' },
          ].map((stat, index) => (
            <Card key={index} className="glass glow-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <Badge variant="outline" className="text-success border-success">
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Alerts */}
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              System Alerts
            </CardTitle>
            <CardDescription>Important updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.type === 'warning'
                    ? 'bg-warning/10 border-warning/30'
                    : alert.type === 'success'
                    ? 'bg-success/10 border-success/30'
                    : 'bg-primary/10 border-primary/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className={`w-5 h-5 mt-0.5 ${
                      alert.type === 'warning'
                        ? 'text-warning'
                        : alert.type === 'success'
                        ? 'text-success'
                        : 'text-primary'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
            <CardDescription>Latest users who joined the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={user.role === 'Instructor' ? 'default' : 'outline'}>
                      {user.role}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{user.joined}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Manage Users', icon: Users },
                { label: 'Review Courses', icon: BookOpen },
                { label: 'View Analytics', icon: TrendingUp },
                { label: 'System Settings', icon: Settings },
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex-col gap-2"
                >
                  <action.icon className="w-6 h-6" />
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
