import { useState } from 'react';
import { 
  CheckCircle2, 
  Timer, 
  Calendar, 
  BarChart3,
  ArrowRight,
  Play,
  Target,
  TrendingUp,
  Clock,
  Zap,
  Star,
  Users,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'task-management',
      title: 'Task Management',
      description: 'Create, organize, and track tasks with smart categorization',
      icon: CheckCircle2,
      color: 'from-blue-500 to-cyan-500',
      details: [
        'Smart task categorization',
        'Priority-based organization',
        'Subtask management',
        'Template for task management'
      ]
    },
    {
      id: 'time-management',
      title: 'Time Management',
      description: 'Pomodoro timer with productivity tracking and insights',
      icon: Timer,
      color: 'from-yellow-400 to-orange-500',
      details: [
        'Pomodoro technique integration',
        'Due dates & deadlines',
        'Weekly and monthly calendar view',
        'Time tracking & reminders'
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Track habits and analyze productivity patterns',
      icon: BarChart3,
      color: 'from-green-400 to-emerald-500',
      details: [
        'Productivity analytics',
        'Habit tracking extensions',
        'Performance insights',
        'Progress visualization'
      ]
    }
  ];

  const categories = [
    { name: 'Work', icon: Target, color: 'text-blue-500' },
    { name: 'Daily Life', icon: Clock, color: 'text-purple-500' },
    { name: 'School/University', icon: Star, color: 'text-green-500' },
    { name: 'Personal', icon: Zap, color: 'text-yellow-500' }
  ];

  const stats = [
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'Tasks Completed', value: '500K+', icon: CheckCircle2 },
    { label: 'Hours Saved', value: '50K+', icon: Clock },
    { label: 'Productivity Boost', value: '85%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-blue-500">DuckDoneList</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
              Features
            </a>
            <a href="#categories" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
              Categories
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors">
              About
            </a>
          </nav>

          <Button 
            onClick={() => navigate('/app')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-500 border-blue-200">
              Smart Productivity Hub
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Hi, I'm Duck and I'm here to help you
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Here's what I have
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
              <Card 
                className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => navigate('/app?view=tasks')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">Task Management</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Organize and prioritize your tasks efficiently
                </p>
              </Card>

              <Card 
                className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => navigate('/app?view=timer')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">Time Management</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Track time and boost productivity with Pomodoro
                </p>
              </Card>

              <Card 
                className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => navigate('/app?view=analytics')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">Tracking your habits/life style</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Analyze patterns and improve your workflow
                </p>
              </Card>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Why you should choose me</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <Card className="p-6 text-left">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart & Intuitive</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered task prioritization and productivity insights that learn from your habits
                  </p>
                </Card>

                <Card className="p-6 text-left">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Proven Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Users report 85% productivity improvement with our procrastination-aware system
                  </p>
                </Card>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/app')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition-all duration-200 px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Your Productivity Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage tasks, track time, and analyze your productivity in one place
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === feature.id;
              
              return (
                <Card 
                  key={feature.id}
                  className={`p-8 transition-all duration-300 cursor-pointer ${
                    isHovered ? 'scale-105 shadow-lg' : 'hover:shadow-md'
                  }`}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>

                  <ul className="space-y-2">
                    {feature.details.map((detail, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-20 bg-gray-50 rounded-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Organize by Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage different aspects of your life with smart categorization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <Card 
                  key={index}
                  className="p-6 text-center hover:shadow-md transition-all duration-200 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize your {category.name.toLowerCase()} tasks effectively
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the community of productive individuals who've transformed their workflow
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              
              return (
                <Card key={index} className="p-6 text-center hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-blue-500 mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <Card className="p-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Start organizing your tasks, tracking your time, and analyzing your productivity patterns today.
            </p>
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate('/app')}
              className="bg-white text-blue-500 hover:bg-white/90 px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              Get Started Now - It's Free!
            </Button>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 text-center text-muted-foreground">
        <div className="container px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">DuckDoneList</span>
          </div>
          <p className="text-sm">
            Smart productivity hub for modern achievers. Built for getting things done.
          </p>
        </div>
      </footer>
    </div>
  );
};
