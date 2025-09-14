import { Task, PomodoroSession, ProductivityStats } from '@/types/task';

const STORAGE_KEYS = {
  TASKS: 'duck-done-tasks',
  POMODORO: 'duck-done-pomodoro',
  SETTINGS: 'duck-done-settings',
  STATS: 'duck-done-stats'
} as const;

export class TaskStorage {
  static getTasks(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (!data) return [];
      
      return JSON.parse(data).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        subtasks: task.subtasks?.map((sub: any) => ({
          ...sub,
          createdAt: new Date(sub.createdAt)
        })) || [],
        pomodoroSessions: task.pomodoroSessions?.map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: session.endTime ? new Date(session.endTime) : undefined
        })) || []
      }));
    } catch (error) {
      console.error('Error loading tasks from storage:', error);
      return [];
    }
  }

  static saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to storage:', error);
    }
  }

  static addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  static updateTask(taskId: string, updates: Partial<Task>): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date() };
      this.saveTasks(tasks);
    }
  }

  static deleteTask(taskId: string): void {
    const tasks = this.getTasks();
    const filtered = tasks.filter(task => task.id !== taskId);
    this.saveTasks(filtered);
  }

  static getStats(): ProductivityStats {
    const tasks = this.getTasks();
    const completedTasks = tasks.filter(t => t.status === 'completed');
    
    const totalTimeSpent = completedTasks.reduce((sum, task) => sum + (task.actualTime || 0), 0);
    const averageCompletionTime = completedTasks.length > 0 
      ? totalTimeSpent / completedTasks.length 
      : 0;

    const procrastinationCoefficient = completedTasks.length > 0
      ? completedTasks.reduce((sum, task) => {
          if (task.estimatedTime && task.actualTime) {
            return sum + (task.actualTime / task.estimatedTime);
          }
          return sum;
        }, 0) / completedTasks.length
      : 1;

    const categoryBreakdown = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      tasksCompleted: completedTasks.length,
      totalTimeSpent,
      averageCompletionTime,
      procrastinationCoefficient,
      mostProductiveHour: 14, // Default to 2 PM
      categoryBreakdown: categoryBreakdown as any,
      dailyProgress: this.getDailyProgress(tasks)
    };
  }

  private static getDailyProgress(tasks: Task[]) {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayTasks = tasks.filter(task => {
        const completedDate = task.completedAt?.toISOString().split('T')[0];
        return completedDate === date;
      });

      return {
        date,
        completed: dayTasks.length,
        timeSpent: dayTasks.reduce((sum, task) => sum + (task.actualTime || 0), 0)
      };
    });
  }
}