import { useMemo } from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Target,
  Calendar,
  Zap,
  BarChart3
} from 'lucide-react';
import { Task } from '@/types/task';
import { TaskStorage } from '@/utils/storage';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProductivityDashboardProps {
  tasks: Task[];
}

export const ProductivityDashboard = ({ tasks }: ProductivityDashboardProps) => {
  const stats = useMemo(() => TaskStorage.getStats(), [tasks]);

  const categoryData = useMemo(() => {
    return Object.entries(stats.categoryBreakdown).map(([category, count]) => ({
      name: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value: count,
      percentage: (count / tasks.length) * 100 || 0
    }));
  }, [stats.categoryBreakdown, tasks.length]);

  const completionTrend = useMemo(() => {
    return stats.dailyProgress.map(day => ({
      date: new Date(day.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      completed: day.completed,
      timeSpent: Math.round(day.timeSpent / 60 * 10) / 10, // Convert to hours
    }));
  }, [stats.dailyProgress]);

  const priorityData = useMemo(() => {
    const priorities = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(priorities).map(([priority, count]) => ({
      name: priority.charAt(0).toUpperCase() + priority.slice(1),
      value: count,
      percentage: (count / tasks.length) * 100 || 0,
      color: priority === 'urgent' ? 'bg-destructive' :
             priority === 'high' ? 'bg-red-500' :
             priority === 'medium' ? 'bg-warning' : 'bg-success'
    }));
  }, [tasks]);

  const procrastinationLevel = useMemo(() => {
    if (stats.procrastinationCoefficient <= 1.2) return { level: 'Excellent', color: 'success' };
    if (stats.procrastinationCoefficient <= 1.5) return { level: 'Good', color: 'primary' };
    if (stats.procrastinationCoefficient <= 2.0) return { level: 'Fair', color: 'warning' };
    return { level: 'Needs Improvement', color: 'destructive' };
  }, [stats.procrastinationCoefficient]);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
              <p className="text-2xl font-bold text-success">{stats.tasksCompleted}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Time</p>
              <p className="text-2xl font-bold text-primary">
                {Math.round(stats.totalTimeSpent / 60 * 10) / 10}h
              </p>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Time/Task</p>
              <p className="text-2xl font-bold text-accent">
                {Math.round(stats.averageCompletionTime)}m
              </p>
            </div>
            <Target className="w-8 h-8 text-accent" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Procrastination</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {stats.procrastinationCoefficient.toFixed(1)}x
                </p>
                <Badge 
                  variant={procrastinationLevel.color === 'success' ? 'default' : 'secondary'}
                  className={`text-xs ${
                    procrastinationLevel.color === 'success' ? 'bg-success text-success-foreground' :
                    procrastinationLevel.color === 'warning' ? 'bg-warning text-warning-foreground' :
                    procrastinationLevel.color === 'destructive' ? 'bg-destructive text-destructive-foreground' :
                    'bg-primary text-primary-foreground'
                  }`}
                >
                  {procrastinationLevel.level}
                </Badge>
              </div>
            </div>
            <Zap className="w-8 h-8 text-warning" />
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Progress */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Daily Progress (Last 7 Days)</h3>
          </div>
          <div className="space-y-4">
            {completionTrend.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{day.date}</span>
                  <span className="font-medium">{day.completed} tasks, {day.timeSpent}h</span>
                </div>
                <Progress 
                  value={Math.min(day.completed * 10, 100)} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-success" />
            <h3 className="text-lg font-semibold">Tasks by Category</h3>
          </div>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="font-medium">{category.value} ({category.percentage.toFixed(0)}%)</span>
                </div>
                <Progress 
                  value={category.percentage} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Priority Distribution */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-warning" />
          <h3 className="text-lg font-semibold">Priority Distribution</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {priorityData.map((priority, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${priority.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium">{priority.name}</div>
              <div className="text-2xl font-bold">{priority.value}</div>
              <div className="text-xs text-muted-foreground">{priority.percentage.toFixed(0)}%</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Productivity Insights</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
            <div>
              <span className="font-medium">Completion Rate:</span> You've completed{' '}
              {stats.tasksCompleted} tasks with an average of{' '}
              {Math.round(stats.averageCompletionTime)} minutes per task.
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <span className="font-medium">Time Estimation:</span> You tend to take{' '}
              {stats.procrastinationCoefficient.toFixed(1)}x longer than estimated.{' '}
              {stats.procrastinationCoefficient > 1.5 
                ? 'Consider breaking larger tasks into smaller ones.'
                : 'Your time estimation is quite accurate!'
              }
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
            <div>
              <span className="font-medium">Most Productive Time:</span> Based on your patterns,{' '}
              {stats.mostProductiveHour === 14 ? '2:00 PM' : `${stats.mostProductiveHour}:00`} is your peak productivity hour.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};