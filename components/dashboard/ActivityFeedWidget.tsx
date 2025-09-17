'use client';

import {
  GitCommit,
  FileText,
  CheckCircle,
  Clock,
  UserPlus,
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'commit' | 'document' | 'task' | 'timesheet' | 'user' | 'alert' | 'achievement' | 'leave';
  user: string;
  action: string;
  target?: string;
  time: Date;
}

export default function ActivityFeedWidget() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'commit',
      user: 'John Doe',
      action: 'pushed 3 commits to',
      target: 'feature/auth-module',
      time: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: '2',
      type: 'task',
      user: 'Sarah Mitchell',
      action: 'completed task',
      target: 'Review Q4 reports',
      time: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: '3',
      type: 'timesheet',
      user: 'Emily Chen',
      action: 'submitted timesheet for',
      target: 'Week 42',
      time: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '4',
      type: 'document',
      user: 'Michael Brown',
      action: 'updated',
      target: 'API Documentation',
      time: new Date(Date.now() - 1000 * 60 * 45)
    },
    {
      id: '5',
      type: 'user',
      user: 'Admin',
      action: 'added new team member',
      target: 'Alex Johnson',
      time: new Date(Date.now() - 1000 * 60 * 60)
    },
    {
      id: '6',
      type: 'achievement',
      user: 'Lisa Anderson',
      action: 'achieved',
      target: '100% productivity score',
      time: new Date(Date.now() - 1000 * 60 * 90)
    },
    {
      id: '7',
      type: 'leave',
      user: 'David Wilson',
      action: 'requested leave for',
      target: 'Dec 25-27',
      time: new Date(Date.now() - 1000 * 60 * 120)
    },
    {
      id: '8',
      type: 'alert',
      user: 'System',
      action: 'scheduled maintenance',
      target: 'Tomorrow 2:00 AM',
      time: new Date(Date.now() - 1000 * 60 * 180)
    }
  ];

  const getActivityIcon = (type: string) => {
    const iconClass = "h-4 w-4";
    switch (type) {
      case 'commit':
        return <GitCommit className={`${iconClass} text-purple-500`} />;
      case 'document':
        return <FileText className={`${iconClass} text-blue-500`} />;
      case 'task':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'timesheet':
        return <Clock className={`${iconClass} text-orange-500`} />;
      case 'user':
        return <UserPlus className={`${iconClass} text-indigo-500`} />;
      case 'alert':
        return <AlertCircle className={`${iconClass} text-red-500`} />;
      case 'achievement':
        return <TrendingUp className={`${iconClass} text-yellow-500`} />;
      case 'leave':
        return <Calendar className={`${iconClass} text-cyan-500`} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3 group">
            <div className="flex-shrink-0 mt-0.5">
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                {getActivityIcon(activity.type)}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>{' '}
                <span className="text-gray-600">{activity.action}</span>{' '}
                {activity.target && (
                  <span className="font-medium text-[#9152DE]">{activity.target}</span>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.time, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="text-sm text-[#9152DE] hover:text-[#5F29A1] font-medium">
          View all activity →
        </button>
      </div>
    </div>
  );
}