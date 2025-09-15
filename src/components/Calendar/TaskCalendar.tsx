import { useState, useMemo } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isToday, 
  addMonths, 
  subMonths, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskCalendarProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onDateClick: (date: Date) => void;
  onCreateTask: (selectedDate?: Date) => void;
  selectedDate?: Date;
}

export const TaskCalendar = ({ tasks, onTaskClick, onDateClick, onCreateTask, selectedDate }: TaskCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const tasksByDate = useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (task.dueDate) {
        const dateKey = format(task.dueDate, 'yyyy-MM-dd');
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(task);
      }
      return acc;
    }, {} as Record<string, Task[]>);
  }, [tasks]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' 
      ? subMonths(currentDate, 1) 
      : addMonths(currentDate, 1)
    );
  };

  const getDayTasks = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return tasksByDate[dateKey] || [];
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-300';
      case 'low': return 'bg-green-400';
      default: return 'bg-muted';
    }
  };

  const isDateOverdue = (date: Date, tasks: Task[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today && tasks.some(task => task.status !== 'completed');
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant={view === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('month')}
              >
                Month
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                Week
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        {view === 'month' ? (
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-muted p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}

            {/* Month Days */}
            {monthDays.map((date, index) => {
              const dayTasks = getDayTasks(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isCurrentDay = isToday(date);
              const isOverdue = isDateOverdue(date, dayTasks);

              return (
                <div
                  key={index}
                  onClick={() => onDateClick(date)}
                  className={cn(
                    "bg-card p-2 min-h-[80px] cursor-pointer hover:bg-muted/50 transition-colors",
                    isSelected && "bg-primary/10 border-2 border-primary",
                    isCurrentDay && "bg-accent/20",
                    isOverdue && "bg-destructive/10"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "text-sm font-medium",
                      isCurrentDay && "text-primary font-bold",
                      isOverdue && "text-destructive"
                    )}>
                      {format(date, 'd')}
                    </span>
                    {dayTasks.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {dayTasks.length}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTaskClick(task);
                        }}
                        className={cn(
                          "text-xs p-1 rounded truncate cursor-pointer hover:opacity-80",
                          getTaskPriorityColor(task.priority),
                          "text-white"
                        )}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-muted p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}

            {/* Week Days */}
            {weekDays.map((date, index) => {
              const dayTasks = getDayTasks(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isCurrentDay = isToday(date);
              const isOverdue = isDateOverdue(date, dayTasks);

              return (
                <div
                  key={index}
                  onClick={() => onDateClick(date)}
                  className={cn(
                    "bg-card p-4 min-h-[120px] cursor-pointer hover:bg-muted/50 transition-colors",
                    isSelected && "bg-primary/10 border-2 border-primary",
                    isCurrentDay && "bg-accent/20",
                    isOverdue && "bg-destructive/10"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "text-sm font-medium",
                      isCurrentDay && "text-primary font-bold",
                      isOverdue && "text-destructive"
                    )}>
                      {format(date, 'EEE d')}
                    </span>
                    {dayTasks.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {dayTasks.length}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayTasks.map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTaskClick(task);
                        }}
                        className={cn(
                          "text-xs p-1 rounded truncate cursor-pointer hover:opacity-80",
                          getTaskPriorityColor(task.priority),
                          "text-white"
                        )}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Selected Date Tasks */}
      {selectedDate && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              Tasks for {format(selectedDate, 'EEEE, MMMM do, yyyy')}
            </h3>
            <Button
              size="sm"
              onClick={() => onCreateTask(selectedDate)}
              className="bg-gradient-primary"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </Button>
          </div>

          <div className="space-y-2">
            {getDayTasks(selectedDate).length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No tasks scheduled for this date
              </p>
            ) : (
              getDayTasks(selectedDate).map(task => (
                <div
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      getTaskPriorityColor(task.priority)
                    )} />
                    <div>
                      <p className={cn(
                        "font-medium",
                        task.status === 'completed' && "line-through text-muted-foreground"
                      )}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={task.status === 'completed' ? 'default' : 'outline'}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                    {task.estimatedTime > 0 && (
                      <Badge variant="secondary">
                        {task.estimatedTime}m
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

      {/* Calendar Legend */}
      <Card className="p-4">
        <h4 className="font-medium mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Urgent Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-300 rounded-full" />
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            <span>Low Priority</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
