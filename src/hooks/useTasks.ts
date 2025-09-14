import { useState, useEffect } from 'react';
import { Task, TaskFilter, TaskCategory, TaskStatus, TaskPriority } from '@/types/task';
import { TaskStorage } from '@/utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    setLoading(true);
    try {
      const storedTasks = TaskStorage.getTasks();
      setTasks(storedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    TaskStorage.addTask(newTask);
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    TaskStorage.updateTask(taskId, updates);
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    TaskStorage.deleteTask(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const completeTask = (taskId: string) => {
    const completedAt = new Date();
    updateTask(taskId, { 
      status: 'completed' as TaskStatus, 
      completedAt 
    });
  };

  const addSubtask = (taskId: string, subtaskTitle: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newSubtask = {
      id: crypto.randomUUID(),
      title: subtaskTitle,
      completed: false,
      createdAt: new Date()
    };

    updateTask(taskId, {
      subtasks: [...task.subtasks, newSubtask]
    });
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedSubtasks = task.subtasks.map(sub =>
      sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
    );

    updateTask(taskId, { subtasks: updatedSubtasks });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter.category && task.category !== filter.category) return false;
    if (filter.status && task.status !== filter.status) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    if (filter.searchTerm) {
      const searchTerm = filter.searchTerm.toLowerCase();
      if (!task.title.toLowerCase().includes(searchTerm) &&
          !task.description?.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }
    if (filter.dateRange) {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      if (dueDate < filter.dateRange.start || dueDate > filter.dateRange.end) {
        return false;
      }
    }
    return true;
  });

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    addSubtask,
    toggleSubtask,
    refreshTasks: loadTasks
  };
};