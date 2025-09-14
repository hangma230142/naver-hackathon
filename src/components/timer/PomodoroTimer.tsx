import { useState, useEffect } from 'react';
import { Play, Pause, Square, RotateCcw, Settings } from 'lucide-react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface PomodoroTimerProps {
  selectedTask?: Task;
  onTaskComplete?: (taskId: string, actualTime: number) => void;
}

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number; // after how many work sessions
}

const defaultSettings: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
};

export const PomodoroTimer = ({ selectedTask, onTaskComplete }: PomodoroTimerProps) => {
  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [currentMode, setCurrentMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const getCurrentDuration = () => {
    switch (currentMode) {
      case 'work': return settings.workDuration * 60;
      case 'shortBreak': return settings.shortBreakDuration * 60;
      case 'longBreak': return settings.longBreakDuration * 60;
    }
  };

  const progress = ((getCurrentDuration() - timeLeft) / getCurrentDuration()) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (currentMode === 'work') {
      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);
      setTotalTimeSpent(prev => prev + settings.workDuration);
      
      // Determine next break type
      const isLongBreak = newSessionCount % settings.longBreakInterval === 0;
      const nextMode = isLongBreak ? 'longBreak' : 'shortBreak';
      
      setCurrentMode(nextMode);
      setTimeLeft(isLongBreak ? settings.longBreakDuration * 60 : settings.shortBreakDuration * 60);
      
      toast({
        title: "Work session completed! 🎉",
        description: `Time for a ${isLongBreak ? 'long' : 'short'} break.`,
      });
      
      // Play notification sound (if browser supports it)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', {
          body: `Work session completed! Time for a ${isLongBreak ? 'long' : 'short'} break.`,
          icon: '/favicon.ico'
        });
      }
    } else {
      // Break completed
      setCurrentMode('work');
      setTimeLeft(settings.workDuration * 60);
      
      toast({
        title: "Break time's over! 💪",
        description: "Ready to get back to work?",
      });
    }
  };

  const toggleTimer = () => {
    if (!isRunning && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getCurrentDuration());
  };

  const stopSession = () => {
    if (currentMode === 'work' && selectedTask && onTaskComplete) {
      const timeSpentMinutes = Math.ceil((getCurrentDuration() - timeLeft) / 60);
      if (timeSpentMinutes > 0) {
        onTaskComplete(selectedTask.id, timeSpentMinutes);
        toast({
          title: "Time logged! ⏰",
          description: `${timeSpentMinutes} minutes added to "${selectedTask.title}"`,
        });
      }
    }
    
    setIsRunning(false);
    setCurrentMode('work');
    setTimeLeft(settings.workDuration * 60);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const modeLabels = {
    work: 'Focus Time',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  const modeColors = {
    work: 'bg-gradient-primary',
    shortBreak: 'bg-gradient-success',
    longBreak: 'bg-gradient-warning',
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 text-center shadow-timer">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge 
              className={`${modeColors[currentMode]} text-white px-4 py-1`}
            >
              {modeLabels[currentMode]}
            </Badge>
            
            {selectedTask && (
              <p className="text-sm text-muted-foreground">
                Working on: <span className="font-medium">{selectedTask.title}</span>
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="text-6xl font-mono font-bold text-primary">
              {formatTime(timeLeft)}
            </div>
            
            <Progress 
              value={progress} 
              className="w-full h-3"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={toggleTimer}
              size="lg"
              className={`${modeColors[currentMode]} shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              {isRunning ? (
                <Pause className="w-5 h-5 mr-2" />
              ) : (
                <Play className="w-5 h-5 mr-2" />
              )}
              {isRunning ? 'Pause' : 'Start'}
            </Button>

            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>

            {isRunning && (
              <Button
                onClick={stopSession}
                variant="destructive"
                size="lg"
              >
                <Square className="w-5 h-5 mr-2" />
                Stop
              </Button>
            )}
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="text-center">
              <div className="font-semibold text-primary">{sessionCount}</div>
              <div>Sessions</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-primary">{totalTimeSpent}m</div>
              <div>Total Time</div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setSettingsOpen(true)}
          className="text-muted-foreground"
        >
          <Settings className="w-4 h-4 mr-2" />
          Timer Settings
        </Button>
      </div>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Timer Settings</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Work Duration (minutes)</Label>
                <Input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.workDuration}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    workDuration: parseInt(e.target.value) || 25
                  }))}
                />
              </div>
              <div>
                <Label>Short Break (minutes)</Label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.shortBreakDuration}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    shortBreakDuration: parseInt(e.target.value) || 5
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Long Break (minutes)</Label>
                <Input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.longBreakDuration}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    longBreakDuration: parseInt(e.target.value) || 15
                  }))}
                />
              </div>
              <div>
                <Label>Long Break Interval</Label>
                <Input
                  type="number"
                  min="2"
                  max="10"
                  value={settings.longBreakInterval}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    longBreakInterval: parseInt(e.target.value) || 4
                  }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setSettingsOpen(false)}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};