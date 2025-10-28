import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Hero3D from '@/components/Hero3D';
import { Brain, TrendingUp, BookOpen, Users, Sparkles, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm">AI-Powered Learning Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Master Skills with{' '}
                <span className="gradient-text">Intelligent</span> Learning
              </h1>
              
              <p className="text-xl text-muted-foreground">
                SkillForge uses advanced AI to create personalized learning paths, adaptive assessments, 
                and dynamic content that evolves with your progress. Experience education reimagined.
              </p>
              
              <div className="flex gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 glow-hover">
                    Start Learning Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </div>
              
              <div className="flex gap-8 text-sm">
                <div>
                  <div className="text-3xl font-bold gradient-text">50K+</div>
                  <div className="text-muted-foreground">Active Learners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">1,200+</div>
                  <div className="text-muted-foreground">Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">95%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
            
            <div className="relative float">
              <Hero3D />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">
              Learn Smarter with <span className="gradient-text">AI Technology</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform adapts to your unique learning style and pace, delivering content 
              that challenges and inspires you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'Adaptive Learning',
                description: 'AI analyzes your performance and adjusts difficulty in real-time to keep you in the optimal learning zone.',
              },
              {
                icon: TrendingUp,
                title: 'Progress Tracking',
                description: 'Visual dashboards show your growth across subjects with detailed analytics and personalized insights.',
              },
              {
                icon: BookOpen,
                title: 'Rich Content Library',
                description: 'Access thousands of courses with videos, interactive exercises, and curated learning materials.',
              },
              {
                icon: Users,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals who create engaging content tailored to real-world applications.',
              },
              {
                icon: Zap,
                title: 'Instant Feedback',
                description: 'Get immediate responses on assignments and quizzes to accelerate your learning journey.',
              },
              {
                icon: Sparkles,
                title: 'Dynamic Assessments',
                description: 'AI-generated exams adapt to your skill level, ensuring fair and challenging evaluations.',
              },
            ].map((feature, index) => (
              <Card key={index} className="glass glow-hover border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="glass border-primary/20 overflow-hidden">
            <div className="absolute inset-0 animated-gradient opacity-10" />
            <CardContent className="relative p-12 text-center space-y-6">
              <h2 className="text-4xl font-bold">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of students already learning smarter with SkillForge. 
                Start your personalized learning journey today.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 glow-hover">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 SkillForge. Empowering learners worldwide with AI-driven education.</p>
        </div>
      </footer>
    </div>
  );
}
