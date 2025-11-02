import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { register } from '@/services/auth';
import { getUserDetails } from '@/services/users';
import { RegisterRequest, UserDto, UserRole } from '@/services/types';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }

    // Store user data
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    const ragisterRequest: RegisterRequest = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: UserRole.STUDENT, // default value
    };
    
    if(userData.role=='student'){
      ragisterRequest.role=UserRole.STUDENT;
    }else if(userData.role=='instructor'){
      ragisterRequest.role=UserRole.INSTRUCTOR;
    }else if(userData.role=='admin'){
      ragisterRequest.role=UserRole.ADMIN;
    }
    const regis = await register(ragisterRequest);
    if(regis.result){
      localStorage.setItem('token', regis.object.token);
      localStorage.setItem('user', JSON.stringify(regis.object));
      // localStorage.setItem('expiresAt', user.object.expirationDate.toString());
      toast.success('Welcome! Registered successfully.');

      setTimeout(() => {
        navigate(`/${regis.object.role}/dashboard`);
      }, 500);
    }else {
          toast.error('Invalid credentials. Please try again.');
        }
    // localStorage.setItem('user', JSON.stringify(userData));
    /*toast.success('Account created successfully!');
    
    setTimeout(() => {
      navigate(`/${formData.role}/dashboard`);
    }, 500);*/
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient opacity-20" />
      
      <Card className="w-full max-w-md glass border-border/50 relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl gradient-text">Join SkillForge</CardTitle>
          <CardDescription>Create your account and start learning today</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <Input
                id="name"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                className="bg-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Last Name</Label>
              <Input
                id="name"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-secondary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="bg-secondary">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student - Learn new skills</SelectItem>
                  <SelectItem value="instructor">Instructor - Teach courses</SelectItem>
                  <SelectItem value="admin">Admin - Manage platform</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="bg-secondary"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 glow-hover">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
