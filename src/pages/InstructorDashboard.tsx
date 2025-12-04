import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Upload, 
  Users, 
  TrendingUp,
  Edit,
  Save,
  X,
  Briefcase,
  GraduationCap,
  Clock,
  DollarSign,
  Plus
} from 'lucide-react';

const navigationItems = [
  { label: 'Dashboard', path: '/instructor/dashboard', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'My Courses', path: '/instructor/courses', icon: <BookOpen className="w-4 h-4" /> },
  { label: 'Create Course', path: '/instructor/create-course', icon: <Plus className="w-4 h-4" /> },
];

interface InstructorProfile {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
  expertiseDomains: string[];
  qualifications: string;
  yearsExperience: number;
  hourlyRate: number;
}

export default function InstructorDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<InstructorProfile>({
    email: 'john.instructor@example.com',
    firstName: 'John',
    lastName: 'Smith',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    bio: 'Passionate educator with expertise in software development and modern web technologies.',
    expertiseDomains: ['JavaScript', 'React', 'Node.js', 'Python'],
    qualifications: 'M.Sc. Computer Science, AWS Certified Solutions Architect',
    yearsExperience: 8,
    hourlyRate: 75,
  });
  const [editedProfile, setEditedProfile] = useState<InstructorProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleExpertiseChange = (value: string) => {
    const domains = value.split(',').map(d => d.trim()).filter(d => d);
    setEditedProfile({ ...editedProfile, expertiseDomains: domains });
  };

  return (
    <DashboardLayout role="instructor" navigationItems={navigationItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Instructor <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Manage your profile and view your stats</p>
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
            { label: 'Avg. Rating', value: '4.8', icon: TrendingUp, color: 'text-green-500' },
            { label: 'Total Earnings', value: '$12,450', icon: DollarSign, color: 'text-yellow-500' },
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

        {/* Profile Card */}
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your instructor profile</CardDescription>
              </div>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <img
                  src={isEditing ? editedProfile.avatarUrl : profile.avatarUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                />
                {isEditing && (
                  <Input
                    placeholder="Avatar URL"
                    value={editedProfile.avatarUrl}
                    onChange={(e) => setEditedProfile({ ...editedProfile, avatarUrl: e.target.value })}
                    className="max-w-xs"
                  />
                )}
              </div>

              {/* Profile Details */}
              <div className="flex-1 grid gap-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.firstName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                      />
                    ) : (
                      <p className="text-lg font-medium">{profile.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.lastName}
                        onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                      />
                    ) : (
                      <p className="text-lg font-medium">{profile.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    />
                  ) : (
                    <p className="text-muted-foreground">{profile.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  {isEditing ? (
                    <Textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-muted-foreground">{profile.bio}</p>
                  )}
                </div>

                {/* Professional Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Expertise Domains
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.expertiseDomains.join(', ')}
                        onChange={(e) => handleExpertiseChange(e.target.value)}
                        placeholder="Separate with commas"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.expertiseDomains.map((domain, i) => (
                          <Badge key={i} variant="secondary">{domain}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Qualifications
                    </Label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.qualifications}
                        onChange={(e) => setEditedProfile({ ...editedProfile, qualifications: e.target.value })}
                      />
                    ) : (
                      <p className="text-muted-foreground">{profile.qualifications}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Years of Experience
                    </Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editedProfile.yearsExperience}
                        onChange={(e) => setEditedProfile({ ...editedProfile, yearsExperience: parseInt(e.target.value) || 0 })}
                      />
                    ) : (
                      <p className="text-lg font-medium">{profile.yearsExperience} years</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Hourly Rate
                    </Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={editedProfile.hourlyRate}
                        onChange={(e) => setEditedProfile({ ...editedProfile, hourlyRate: parseFloat(e.target.value) || 0 })}
                      />
                    ) : (
                      <p className="text-lg font-medium">${profile.hourlyRate}/hr</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
