'use client';

import { useState, useEffect } from 'react';
import { Clock, Play, Pause, Coffee } from 'lucide-react';
import { format } from 'date-fns';

export default function ClockWidget() {
  const [isClocked, setIsClocked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
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

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 font-mono">
            {format(currentTime, 'HH:mm:ss')}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Working Time</p>
            <p className="text-2xl font-bold text-[#9152DE] font-mono">{elapsedTime}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClockToggle}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
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

        {isClocked && startTime && (
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            Started at {format(startTime, 'HH:mm')}
          </div>
        )}
      </div>
    </div>
  );
}