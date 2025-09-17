'use client';

import { Bot, Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Insight {
  id: string;
  type: 'suggestion' | 'achievement' | 'warning' | 'tip';
  title: string;
  description: string;
  action?: string;
}

export default function AIInsightsWidget() {
  const insights: Insight[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'Great Progress!',
      description: "You've completed 80% more tasks than your weekly average.",
      action: 'View Details'
    },
    {
      id: '2',
      type: 'suggestion',
      title: 'Optimize Your Schedule',
      description: 'Your most productive hours are 9-11 AM. Consider scheduling important tasks during this time.',
      action: 'Update Calendar'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Deadline Approaching',
      description: 'Project Alpha has 2 pending tasks due tomorrow.',
      action: 'View Tasks'
    },
    {
      id: '4',
      type: 'tip',
      title: 'Team Collaboration',
      description: 'Sarah Mitchell is working on a related task. Consider syncing up.',
      action: 'Send Message'
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'achievement':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'tip':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      default:
        return <Bot className="h-5 w-5 text-purple-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'suggestion':
        return 'bg-yellow-50 border-yellow-200';
      case 'achievement':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'tip':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-purple-50 border-purple-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-[#9152DE]" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Insights</h2>
        <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-[#9152DE]/10 text-[#9152DE] rounded-full">
          Powered by AI
        </span>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border transition-all hover:shadow-md ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {insight.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {insight.description}
                </p>
                {insight.action && (
                  <button className="text-xs font-medium text-[#9152DE] hover:text-[#5F29A1]">
                    {insight.action} →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full px-4 py-2 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white text-sm font-medium rounded-lg hover:from-[#5F29A1] hover:to-[#204782] transition-all">
          Ask BetterFlow AI
        </button>
      </div>
    </div>
  );
}