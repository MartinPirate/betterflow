'use client';

import { useAuth } from '@/hooks/useAuth';
import ClockWidget from '@/components/dashboard/ClockWidget';
import TasksWidget from '@/components/dashboard/TasksWidget';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import TeamStatusWidget from '@/components/dashboard/TeamStatusWidget';
import ActivityFeedWidget from '@/components/dashboard/ActivityFeedWidget';
import QuickStatsWidget from '@/components/dashboard/QuickStatsWidget';
import AIInsightsWidget from '@/components/dashboard/AIInsightsWidget';
import { Clock, CheckCircle, Users, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: 'Hours Today', value: '6.5', icon: Clock, color: 'text-blue-600' },
    { label: 'Tasks Completed', value: '12', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Team Members', value: '8', icon: Users, color: 'text-purple-600' },
    { label: 'Productivity', value: '94%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Here's what's happening in your workspace today
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ClockWidget />
            <TasksWidget />
          </div>
          <ActivityFeedWidget />
        </div>

        <div className="space-y-6">
          <CalendarWidget />
          <TeamStatusWidget />
          <QuickStatsWidget />
          <AIInsightsWidget />
        </div>
      </div>
    </div>
  );
}