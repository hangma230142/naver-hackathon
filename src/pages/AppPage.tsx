import { useState, useMemo } from 'react';
import { Task, TaskCategory, TaskStatus, TaskPriority } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { Header } from '@/components/layout/Header';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { PomodoroTimer } from '@/components/timer/PomodoroTimer';
import { TaskCalendar } from '@/components/calendar/TaskCalendar';
import { ProductivityDashboard } from '@/components/analytics/ProductivityDashboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Timer, CheckCircle2, Calendar, BarChart3 } from 'lucide-react';

const AppPage = () => {
  const [activeView, setActiveView] = useState('tasks');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [selectedTaskForTimer, setSelectedTaskForTimer] = useState<Task | undefined>();
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | undefined>();

  const {
    tasks,
    allTasks,
    loading,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    addSubtask,
    toggleSubtask
  } = useTasks();

  // Task statistics
  const taskStats = useMemo(() => {
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.status === 'completed').length;
    const inProgress = allTasks.filter(t => t.status === 'in-progress').length;

    const byCategory = allTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<TaskCategory, number>);

    const byStatus = allTasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<TaskStatus, number>);

    const byPriority = allTasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<TaskPriority, number>);

    return {
      total,
      completed,
      inProgress,
      byCategory,
      byStatus,
      byPriority
    };
  }, [allTasks]);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      toast({
        title: "Task updated! ✏️",
        description: `"${taskData.title}" has been updated successfully.`,
      });
    } else {
      createTask(taskData);
      toast({
        title: "Task created! 🎉",
        description: `"${taskData.title}" has been added to your list.`,
      });
    }
    setIsTaskFormOpen(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = (taskId: string) => {
    const task = allTasks.find(t => t.id === taskId);
    deleteTask(taskId);
    toast({
      title: "Task deleted! 🗑️",
      description: `"${task?.title}" has been removed from your list.`,
      variant: "destructive"
    });
  };

  const handleCompleteTask = (taskId: string) => {
    const task = allTasks.find(t => t.id === taskId);
    if (task?.status === 'completed') {
      updateTask(taskId, { status: 'todo', completedAt: undefined });
      toast({
        title: "Task reopened! 🔄",
        description: `"${task.title}" is back in your todo list.`,
      });
    } else {
      completeTask(taskId);
      toast({
        title: "Task completed! ✅",
        description: `Great job finishing "${task?.title}"!`,
      });
    }
  };

  const handleStartTimer = (task: Task) => {
    setSelectedTaskForTimer(task);
    setActiveView('timer');
  };

  const handleTaskTimerComplete = (taskId: string, actualTime: number) => {
    updateTask(taskId, { 
      actualTime: (allTasks.find(t => t.id === taskId)?.actualTime || 0) + actualTime 
    });
  };

  const handleCalendarDateClick = (date: Date) => {
    setSelectedCalendarDate(date);
  };

  const handleCalendarTaskClick = (task: Task) => {
    handleEditTask(task);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'timer':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Timer className="w-6 h-6 text-warning" />
                Focus Timer
              </h2>
              <p className="text-muted-foreground">
                Use the Pomodoro technique to boost your productivity and track your progress.
              </p>
            </div>

            <PomodoroTimer
              selectedTask={selectedTaskForTimer}
              onTaskComplete={handleTaskTimerComplete}
            />

            {selectedTaskForTimer && (
              <Card className="p-4 mt-6">
                <h3 className="font-semibold mb-2">Current Task</h3>
                <TaskCard
                  task={selectedTaskForTimer}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                  onStartTimer={handleStartTimer}
                />
              </Card>
            )}
          </div>
        );

      case 'calendar':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Task Calendar
              </h2>
              <p className="text-muted-foreground">
                View your tasks by due date and plan your schedule effectively.
              </p>
            </div>

            <TaskCalendar
              tasks={allTasks.filter(task => task.dueDate)}
              onTaskClick={handleCalendarTaskClick}
              onDateClick={handleCalendarDateClick}
              selectedDate={selectedCalendarDate}
            />
          </div>
        );

      case 'analytics':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-success" />
                Productivity Analytics
              </h2>
              <p className="text-muted-foreground">
                Analyze your productivity patterns and improve your workflow.
              </p>
            </div>

            <ProductivityDashboard tasks={allTasks} />
          </div>
        );

      default: // tasks view
        return (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    Task Management
                  </h2>
                  <p className="text-muted-foreground">
                    Organize your tasks, track progress, and boost productivity.
                  </p>
                </div>
                
                {tasks.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                      {tasks.filter(t => t.status === 'completed').length} completed
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {tasks.filter(t => t.status !== 'completed').length} remaining
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <TaskFilters
                filter={filter}
                onFilterChange={setFilter}
                taskCounts={taskStats}
              />

              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading tasks...</p>
                </div>
              ) : tasks.length === 0 ? (
                <Card className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                  <p className="text-muted-foreground mb-4">
                    {Object.values(filter).some(v => v !== undefined && v !== '') 
                      ? "Try adjusting your filters or create a new task."
                      : "Create your first task to get started with productivity tracking."
                    }
                  </p>
                  <Button onClick={handleCreateTask} className="bg-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Task
                  </Button>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      onComplete={handleCompleteTask}
                      onStartTimer={handleStartTimer}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        onCreateTask={handleCreateTask}
        taskStats={taskStats}
      />

      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>

      <TaskForm
        task={editingTask}
        isOpen={isTaskFormOpen}
        onClose={() => {
          setIsTaskFormOpen(false);
          setEditingTask(undefined);
        }}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default AppPage;