import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'student' | 'instructor' | 'admin';
  navigationItems: { label: string; path: string; icon: ReactNode }[];
}

export default function DashboardLayout({ children, navigationItems }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="fixed top-24 left-4 z-40">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="glass"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex pt-20 md:pt-24">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 md:left-4 top-20 md:top-24 bottom-0 md:bottom-4 glass border md:border-r md:rounded-2xl transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-0'
          } overflow-hidden z-40`}
        >
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`w-full justify-start ${isActive ? 'bg-primary' : ''}`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? 'md:ml-64' : 'ml-0'
          }`}
        >
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
