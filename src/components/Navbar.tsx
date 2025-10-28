import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">SkillForge</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-primary hover:bg-primary/90 glow-hover">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
