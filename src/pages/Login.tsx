import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Dummy credentials
const DUMMY_USERS = {
  student: { email: 'student@skillforge.com', password: 'student123', role: 'student' },
  instructor: { email: 'instructor@skillforge.com', password: 'instructor123', role: 'instructor' },
  admin: { email: 'admin@skillforge.com', password: 'admin123', role: 'admin' },
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check credentials
    const user = Object.values(DUMMY_USERS).find(
      u => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Welcome back! Logging in as ${user.role}`);
      
      // Redirect based on role
      setTimeout(() => {
        navigate(`/${user.role}/dashboard`);
      }, 500);
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const quickLogin = (role: keyof typeof DUMMY_USERS) => {
    const user = DUMMY_USERS[role];
    setEmail(user.email);
    setPassword(user.password);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient opacity-20" />
      
      <Card className="w-full max-w-md glass border-border/50 relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl gradient-text">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your learning journey</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-secondary"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 glow-hover">
              Sign In
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Quick Login (Demo)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('student')}
                className="text-xs"
              >
                Student
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('instructor')}
                className="text-xs"
              >
                Instructor
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('admin')}
                className="text-xs"
              >
                Admin
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
