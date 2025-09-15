import { useState } from 'react';
import { CheckCircle2, Timer, Calendar, BarChart3, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onCreateTask: () => void;
  taskStats: {
    total: number;
    completed: number;
    inProgress: number;
  };
}

export const Header = ({ activeView, onViewChange, onCreateTask, taskStats }: HeaderProps) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
    { id: 'timer', label: 'Timer', icon: Timer },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-card backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div 
            className="flex items-center gap-2 cursor-pointer hover-scale"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">DuckDoneList</h1>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 ${
                    isActive 
                      ? 'bg-gradient-primary shadow-card' 
                      : 'hover:bg-secondary/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {taskStats.completed}/{taskStats.total} completed
            </Badge>
            {taskStats.inProgress > 0 && (
              <Badge variant="outline" className="text-xs text-warning">
                {taskStats.inProgress} in progress
              </Badge>
            )}
          </div>
          <Button
            onClick={onCreateTask}
            size="sm"
            className="bg-gradient-primary shadow-card hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Task
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};