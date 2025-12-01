import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sparkles, LogOut, User, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { getUserDetails } from '@/services/users';
import { UserDto } from '@/services/types';
import { toast } from 'sonner';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getUserDetails();
          if (response.result) {
            setUser(response.object);
          }
        } catch (error) {
          console.error('Failed to fetch user details');
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 glass border rounded-2xl mx-auto max-w-7xl">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <span className="text-xl md:text-2xl font-bold gradient-text">SkillForge</span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link to="/courses" className="hidden md:block">
                    <Button variant="ghost" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Courses
                    </Button>
                  </Link>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarImage src={user.avatarUrl} alt={user.firstName} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(user.firstName, user.lastName)}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(`/${user.role.toLowerCase()}/dashboard`)}>
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/courses')} className="md:hidden">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Courses
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to="/login" className="hidden sm:block">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 glow-hover">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
