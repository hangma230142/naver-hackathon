export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  estimatedTime: number; // in minutes
  actualTime?: number; // in minutes
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  subtasks: SubTask[];
  tags: string[];
  pomodoroSessions: PomodoroSession[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface PomodoroSession {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  completed: boolean;
}

export type TaskCategory = 'work' | 'daily-life' | 'school' | 'personal';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'paused';

export interface TaskFilter {
  category?: TaskCategory;
  status?: TaskStatus;
  priority?: TaskPriority;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

export interface ProductivityStats {
  tasksCompleted: number;
  totalTimeSpent: number;
  averageCompletionTime: number;
  procrastinationCoefficient: number;
  mostProductiveHour: number;
  categoryBreakdown: Record<TaskCategory, number>;
  dailyProgress: Array<{
    date: string;
    completed: number;
    timeSpent: number;
  }>;
}