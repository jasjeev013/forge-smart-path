import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 glass border rounded-2xl mx-auto max-w-7xl">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          <span className="text-xl md:text-2xl font-bold gradient-text">SkillForge</span>
        </Link>
        
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <Link to="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-primary hover:bg-primary/90 glow-hover">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
