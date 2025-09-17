'use client';

import {
  TrendingUp,
  Clock,
  Target,
  Award,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
  color: string;
}

export default function QuickStatsWidget() {
  const stats: Stat[] = [
    {
      label: 'Productivity Score',
      value: '94%',
      change: 5,
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Hours This Week',
      value: '38.5',
      change: -1.5,
      trend: 'down',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      label: 'Tasks Completed',
      value: '47',
      change: 12,
      trend: 'up',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      label: 'Team Ranking',
      value: '#3',
      change: 0,
      trend: 'neutral',
      icon: Award,
      color: 'text-yellow-600'
    }
  ];

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center text-green-600 text-xs">
          <ArrowUp className="h-3 w-3" />
          <span>{Math.abs(change)}%</span>
        </div>
      );
    } else if (trend === 'down') {
      return (
        <div className="flex items-center text-red-600 text-xs">
          <ArrowDown className="h-3 w-3" />
          <span>{Math.abs(change)}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
          <Minus className="h-3 w-3" />
          <span>0%</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Stats</h2>

      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-white rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                </div>
              </div>
              {getTrendIcon(stat.trend, stat.change)}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-[#9152DE]/10 to-[#5F29A1]/10 rounded-lg">
        <h3 className="text-sm font-semibold text-[#9152DE] mb-2">AI Insight</h3>
        <p className="text-xs text-gray-700 dark:text-gray-300">
          Your productivity is 5% higher than last week. Keep up the great work!
          Consider taking a short break to maintain this performance.
        </p>
      </div>
    </div>
  );
}