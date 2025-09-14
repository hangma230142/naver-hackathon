import { Search, Filter, X } from 'lucide-react';
import { TaskFilter, TaskCategory, TaskStatus, TaskPriority } from '@/types/task';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    total: number;
    byCategory: Record<TaskCategory, number>;
    byStatus: Record<TaskStatus, number>;
    byPriority: Record<TaskPriority, number>;
  };
}

const categories: { value: TaskCategory; label: string }[] = [
  { value: 'work', label: 'Work' },
  { value: 'daily-life', label: 'Daily Life' },
  { value: 'school', label: 'School' },
  { value: 'personal', label: 'Personal' },
];

const statuses: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'paused', label: 'Paused' },
];

const priorities: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export const TaskFilters = ({ filter, onFilterChange, taskCounts }: TaskFiltersProps) => {
  const hasActiveFilters = Object.values(filter).some(value => 
    value !== undefined && value !== ''
  );

  const clearFilters = () => {
    onFilterChange({});
  };

  const updateFilter = (key: keyof TaskFilter, value: any) => {
    onFilterChange({
      ...filter,
      [key]: value === 'all' ? undefined : value
    });
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm">Filters</span>
          <Badge variant="outline" className="text-xs">
            {taskCounts.total} tasks
          </Badge>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={filter.searchTerm || ''}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Category</label>
          <Select
            value={filter.category || 'all'}
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{category.label}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {taskCounts.byCategory[category.value] || 0}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <Select
            value={filter.status || 'all'}
            onValueChange={(value) => updateFilter('status', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status.value} value={status.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{status.label}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {taskCounts.byStatus[status.value] || 0}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">Priority</label>
          <Select
            value={filter.priority || 'all'}
            onValueChange={(value) => updateFilter('priority', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              {priorities.map(priority => (
                <SelectItem key={priority.value} value={priority.value}>
                  <div className="flex items-center justify-between w-full">
                    <span>{priority.label}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {taskCounts.byPriority[priority.value] || 0}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filter.searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{filter.searchTerm}"
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilter('searchTerm', '')}
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          
          {filter.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find(c => c.value === filter.category)?.label}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilter('category', undefined)}
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          
          {filter.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {statuses.find(s => s.value === filter.status)?.label}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilter('status', undefined)}
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          
          {filter.priority && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Priority: {priorities.find(p => p.value === filter.priority)?.label}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilter('priority', undefined)}
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
};