'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, User, Award, Target, Clock, Sparkles } from 'lucide-react';

interface UserPerformance {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  hoursWorked: number;
  tasksCompleted: number;
  efficiency: number;
  avatar?: string;
}

export default function AIUserPerformanceWidget() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  const userPerformances: UserPerformance[] = [
    {
      name: 'John Doe',
      score: 92,
      trend: 'up',
      hoursWorked: 42,
      tasksCompleted: 28,
      efficiency: 94
    },
    {
      name: 'Jane Smith',
      score: 88,
      trend: 'stable',
      hoursWorked: 38,
      tasksCompleted: 24,
      efficiency: 91
    },
    {
      name: 'Mike Johnson',
      score: 85,
      trend: 'down',
      hoursWorked: 40,
      tasksCompleted: 22,
      efficiency: 87
    },
    {
      name: 'Sarah Williams',
      score: 95,
      trend: 'up',
      hoursWorked: 41,
      tasksCompleted: 32,
      efficiency: 96
    },
    {
      name: 'Tom Brown',
      score: 79,
      trend: 'down',
      hoursWorked: 35,
      tasksCompleted: 18,
      efficiency: 82
    }
  ];

  const topPerformer = userPerformances.reduce((prev, current) =>
    current.score > prev.score ? current : prev
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#9152DE]" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            AI User Performance
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              selectedPeriod === 'week'
                ? 'bg-[#9152DE] text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              selectedPeriod === 'month'
                ? 'bg-[#9152DE] text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Top Performer Banner */}
      <div className="bg-gradient-to-r from-[#9152DE]/10 to-[#5F29A1]/10 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#9152DE]" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Top Performer</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {topPerformer.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#9152DE]">{topPerformer.score}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Score</p>
          </div>
        </div>
      </div>

      {/* Performance List */}
      <div className="space-y-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">
          Team Performance
        </p>
        {userPerformances.slice(0, 4).map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-2 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.name}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {user.hoursWorked}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {user.tasksCompleted} tasks
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${getScoreColor(user.score)}`}>
                {user.score}
              </span>
              {getTrendIcon(user.trend)}
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <span className="font-medium">AI Insight:</span> Team productivity increased by 12% this week.
          Sarah Williams shows exceptional performance with 96% efficiency.
        </p>
      </div>
    </div>
  );
}