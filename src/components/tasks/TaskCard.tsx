import { useState } from 'react';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Play,
  Check,
  AlertCircle,
  Flag
} from 'lucide-react';
import { Task, TaskPriority } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onStartTimer: (task: Task) => void;
}

const priorityConfig = {
  low: { color: 'bg-muted', label: 'Low', icon: Flag },
  medium: { color: 'bg-warning/20 text-warning-foreground', label: 'Medium', icon: Flag },
  high: { color: 'bg-destructive/20 text-destructive-foreground', label: 'High', icon: Flag },
  urgent: { color: 'bg-destructive text-destructive-foreground animate-pulse', label: 'Urgent', icon: AlertCircle },
};

const categoryConfig = {
  work: { color: 'bg-primary/10 text-primary', label: 'Work' },
  'daily-life': { color: 'bg-accent/10 text-accent-foreground', label: 'Daily Life' },
  school: { color: 'bg-success/10 text-success-foreground', label: 'School' },
  personal: { color: 'bg-warning/10 text-warning-foreground', label: 'Personal' },
};

const getTaskPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-destructive';
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500 text-white'; 
    case 'low': return 'bg-green-500 text-white';     
    default: return 'bg-muted';
  }
};

export const TaskCard = ({ task, onEdit, onDelete, onComplete, onStartTimer }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const completedSubtasks = task.subtasks.filter(sub => sub.completed).length;
  const totalSubtasks = task.subtasks.length;
  const subtaskProgress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const PriorityIcon = priorityConfig[task.priority].icon;

  return (
    <>
      <Card 
        className={cn(
          "p-4 transition-all duration-200 hover:shadow-card cursor-pointer",
          task.status === 'completed' && "opacity-75 bg-success/5 border-success/20",
          isOverdue && "border-destructive/40 bg-destructive/5",
          isHovered && "scale-[1.02] shadow-lg"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComplete(task.id)}
                className={cn(
                  "h-6 w-6 p-0 rounded-full border-2",
                  task.status === 'completed'
                    ? "bg-success text-success-foreground border-success"
                    : "border-muted-foreground/30 hover:border-primary"
                )}
              >
                {task.status === 'completed' && <Check className="w-3 h-3" />}
              </Button>

              <div className="flex-1">
                <h3 className={cn(
                  "font-medium text-sm leading-tight",
                  task.status === 'completed' && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant="secondary" 
                className={cn("text-xs", categoryConfig[task.category].color)}
              >
                {categoryConfig[task.category].label}
              </Badge>

              <Badge 
                variant="outline" 
                className={cn("text-xs flex items-center gap-1", priorityConfig[task.priority].color)}
              >
                <PriorityIcon className="w-3 h-3" />
                {priorityConfig[task.priority].label}
              </Badge>

              {task.dueDate && (
                <Badge 
                  variant={isOverdue ? "destructive" : "outline"}
                  className="text-xs flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  {format(task.dueDate, 'MMM dd')}
                </Badge>
              )}

              {task.estimatedTime > 0 && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.estimatedTime}m
                </Badge>
              )}
            </div>

            {totalSubtasks > 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Subtasks</span>
                  <span>{completedSubtasks}/{totalSubtasks}</span>
                </div>
                <Progress value={subtaskProgress} className="h-1.5" />
              </div>
            )}
          </div>

          <div className="flex items-start gap-1">
            {task.status !== 'completed' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStartTimer(task)}
                className="h-8 w-8 p-0 text-warning hover:bg-warning/10"
              >
                <Play className="w-3 h-3" />
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    </>
  );
};