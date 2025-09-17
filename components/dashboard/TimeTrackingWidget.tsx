'use client';

import { useState, useEffect } from 'react';
import { Clock, Play, Pause, Coffee, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueTime?: string;
}

export default function TimeTrackingWidget() {
  const [isClocked, setIsClocked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:17:27');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Review pull requests', completed: true, priority: 'high', dueTime: '10:00 AM' },
    { id: '2', text: 'Team standup meeting', completed: true, priority: 'high', dueTime: '11:00 AM' },
    { id: '3', text: 'Update project documentation', completed: false, priority: 'medium', dueTime: '2:00 PM' },
    { id: '4', text: 'Code review for auth module', completed: false, priority: 'high', dueTime: '3:00 PM' },
    { id: '5', text: 'Write unit tests', completed: false, priority: 'low' },
    { id: '6', text: 'Deploy to staging', completed: false, priority: 'medium', dueTime: '5:00 PM' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      if (isClocked && !isPaused && startTime) {
        const elapsed = new Date().getTime() - startTime.getTime();
        const hours = Math.floor(elapsed / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isClocked, isPaused, startTime]);

  const handleClockToggle = () => {
    if (!isClocked) {
      setIsClocked(true);
      setStartTime(new Date());
      setIsPaused(false);
    } else {
      setIsClocked(false);
      setStartTime(null);
      setElapsedTime('00:00:00');
      setIsPaused(false);
    }
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* Time Tracking Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#9152DE]" />
            Time Tracker
          </h2>
          {isClocked && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              isPaused ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>
              {isPaused ? 'Paused' : 'Active'}
            </span>
          )}
        </div>

        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-mono">
            {format(currentTime, 'HH:mm:ss')}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Working Time</p>
            <p className="text-2xl font-bold text-[#9152DE] font-mono">{elapsedTime}</p>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={handleClockToggle}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              isClocked
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gradient-to-r from-[#9152DE] to-[#5F29A1] hover:from-[#5F29A1] hover:to-[#204782] text-white'
            }`}
          >
            {isClocked ? (
              <>
                <Pause className="h-5 w-5" />
                Clock Out
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Clock In
              </>
            )}
          </button>

          {isClocked && (
            <button
              onClick={handlePauseToggle}
              className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              <Coffee className="h-5 w-5" />
              {isPaused ? 'Resume' : 'Break'}
            </button>
          )}
        </div>
      </div>

      {/* Today's Tasks Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Today's Tasks</h3>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg group transition-colors"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 ${getPriorityColor(task.priority)}`}
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p className={`text-sm ${
                  task.completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {task.text}
                </p>
                {task.dueTime && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {task.dueTime}
                  </p>
                )}
              </div>

              <button
                onClick={() => console.log('BetterFlow AI clicked for task:', task.text)}
                className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white rounded-md text-xs font-medium transition-all duration-200 flex items-center gap-1 hover:from-[#5F29A1] hover:to-[#204782]"
                title="Ask BetterFlow AI"
              >
                <Sparkles className="h-3 w-3" />
                <span className="hidden sm:inline">BF-AI</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}