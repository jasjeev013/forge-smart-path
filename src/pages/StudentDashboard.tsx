import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  TrendingUp, 
  Target,
  User,
  Mail,
  Award,
  BookMarked
} from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'My Courses', path: '/student/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Progress', path: '/student/progress', icon: <Target className="w-4 h-4" /> },
];

export default function StudentDashboard() {
  const [profile, setProfile] = useState({
    currentLevel: 'Intermediate',
    totalXp: 2850,
    learningGoals: 'Master full-stack development and cloud technologies',
    preferredLearningStyle: 'VISUAL' as 'VISUAL' | 'AUDITORY' | 'READING' | 'KINESTHETIC',
    email: 'student@skillforge.com',
    firstName: 'Alex',
    lastName: 'Johnson',
    avatarUrl: '',
    bio: 'Passionate learner focused on web development and cloud computing. Love building projects and solving real-world problems.'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <DashboardLayout role="student" navigationItems={navigationItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome Back, <span className="gradient-text">{profile.firstName}!</span>
            </h1>
            <p className="text-muted-foreground">Level {profile.currentLevel} • {profile.totalXp} XP</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "secondary" : "default"}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Current Level', value: profile.currentLevel, icon: Award, color: 'text-primary' },
            { label: 'Total XP', value: profile.totalXp.toLocaleString(), icon: TrendingUp, color: 'text-accent' },
            { label: 'Active Courses', value: '3', icon: BookOpen, color: 'text-success' },
            { label: 'Learning Style', value: profile.preferredLearningStyle, icon: BookMarked, color: 'text-warning' },
          ].map((stat, index) => (
            <Card key={index} className="glass glow-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Section */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Update your profile details' : 'View your profile information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningStyle">Preferred Learning Style</Label>
              <Select
                value={profile.preferredLearningStyle}
                onValueChange={(value: any) => setProfile({ ...profile, preferredLearningStyle: value })}
                disabled={!isEditing}
              >
                <SelectTrigger id="learningStyle">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VISUAL">Visual</SelectItem>
                  <SelectItem value="AUDITORY">Auditory</SelectItem>
                  <SelectItem value="READING">Reading/Writing</SelectItem>
                  <SelectItem value="KINESTHETIC">Kinesthetic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningGoals">Learning Goals</Label>
              <Textarea
                id="learningGoals"
                value={profile.learningGoals}
                onChange={(e) => setProfile({ ...profile, learningGoals: e.target.value })}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                disabled={!isEditing}
                rows={4}
              />
            </div>

            {isEditing && (
              <Button className="w-full" onClick={() => setIsEditing(false)}>
                Save Changes
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
