'use client';

import { useState } from 'react';
import {
  Download, Clock, Calendar, Users, FileSpreadsheet, Bell, CheckCircle,
  TrendingUp, Filter, Search, ChevronRight, FileText, BarChart3,
  Printer, Share2, Mail, Archive, Settings, RefreshCw, Eye, Play,
  CalendarDays, UserCheck, ClipboardList, AlertCircle, Timer
} from 'lucide-react';

interface Report {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  type: 'timesheet' | 'leaves' | 'compliance' | 'users' | 'reminder';
  frequency: 'daily' | 'weekly' | 'monthly' | 'on-demand';
  lastGenerated?: string;
  nextScheduled?: string;
  fileSize?: string;
  format: string[];
  color: string;
  status: 'ready' | 'processing' | 'scheduled' | 'error';
  downloads: number;
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const reports: Report[] = [
    {
      id: 1,
      title: 'Timesheet Export',
      description: 'Export all employee timesheets with detailed breakdown of hours, projects, and tasks',
      icon: FileSpreadsheet,
      type: 'timesheet',
      frequency: 'on-demand',
      lastGenerated: '2 hours ago',
      fileSize: '2.4 MB',
      format: ['Excel', 'CSV', 'PDF'],
      color: 'from-blue-500 to-cyan-500',
      status: 'ready',
      downloads: 1250
    },
    {
      id: 2,
      title: 'Timesheet Report',
      description: 'Comprehensive timesheet analysis with overtime calculations, billable hours, and productivity metrics',
      icon: Clock,
      type: 'timesheet',
      frequency: 'weekly',
      lastGenerated: '3 days ago',
      nextScheduled: 'Monday 8:00 AM',
      fileSize: '3.8 MB',
      format: ['PDF', 'Excel'],
      color: 'from-purple-500 to-pink-500',
      status: 'scheduled',
      downloads: 890
    },
    {
      id: 3,
      title: 'Leaves Report',
      description: 'Complete leave management report including balances, upcoming leaves, and team availability',
      icon: CalendarDays,
      type: 'leaves',
      frequency: 'monthly',
      lastGenerated: '5 days ago',
      nextScheduled: 'Dec 1, 2024',
      fileSize: '1.6 MB',
      format: ['PDF', 'Excel', 'CSV'],
      color: 'from-green-500 to-emerald-500',
      status: 'ready',
      downloads: 567
    },
    {
      id: 4,
      title: 'Daily Reminders',
      description: 'Automated daily summary of pending tasks, meetings, and important deadlines',
      icon: Bell,
      type: 'reminder',
      frequency: 'daily',
      lastGenerated: 'Today 6:00 AM',
      nextScheduled: 'Tomorrow 6:00 AM',
      fileSize: '0.5 MB',
      format: ['Email', 'PDF'],
      color: 'from-orange-500 to-red-500',
      status: 'ready',
      downloads: 2340
    },
    {
      id: 5,
      title: 'Weekly Compliance',
      description: 'Compliance tracking report with policy adherence, training completion, and audit readiness',
      icon: CheckCircle,
      type: 'compliance',
      frequency: 'weekly',
      lastGenerated: '2 days ago',
      nextScheduled: 'Sunday 11:00 PM',
      fileSize: '4.2 MB',
      format: ['PDF', 'Excel'],
      color: 'from-indigo-500 to-purple-500',
      status: 'processing',
      downloads: 432
    },
    {
      id: 6,
      title: 'Users Monthly Report',
      description: 'Detailed user activity report with login patterns, permissions, and system usage statistics',
      icon: Users,
      type: 'users',
      frequency: 'monthly',
      lastGenerated: '1 week ago',
      nextScheduled: 'Dec 1, 2024',
      fileSize: '5.1 MB',
      format: ['PDF', 'Excel', 'HTML'],
      color: 'from-teal-500 to-green-500',
      status: 'ready',
      downloads: 789
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFrequencyBadge = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'bg-purple-100 text-purple-800';
      case 'weekly':
        return 'bg-blue-100 text-blue-800';
      case 'monthly':
        return 'bg-green-100 text-green-800';
      case 'on-demand':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  const stats = {
    totalReports: reports.length,
    readyReports: reports.filter(r => r.status === 'ready').length,
    totalDownloads: reports.reduce((sum, r) => sum + r.downloads, 0),
    scheduledReports: reports.filter(r => r.status === 'scheduled').length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Generate and export various reports</p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white rounded-xl font-semibold hover:from-[#5F29A1] hover:to-[#204782] transition-all duration-200 shadow-lg hover:shadow-xl">
              <Calendar className="h-5 w-5" />
              Schedule Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalReports}</p>
              </div>
              <FileText className="h-8 w-8 text-[#9152DE]" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Ready</p>
                <p className="text-2xl font-bold text-green-600">{stats.readyReports}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Downloads</p>
                <p className="text-2xl font-bold text-blue-600">{(stats.totalDownloads / 1000).toFixed(1)}k</p>
              </div>
              <Download className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Scheduled</p>
                <p className="text-2xl font-bold text-orange-600">{stats.scheduledReports}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="timesheet">Timesheet</option>
                <option value="leaves">Leaves</option>
                <option value="compliance">Compliance</option>
                <option value="users">Users</option>
                <option value="reminder">Reminders</option>
              </select>
              <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                {/* Card Header with Gradient */}
                <div className={`h-2 bg-gradient-to-r ${report.color}`}></div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${report.color} rounded-lg shadow-md`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full border ${getStatusBadge(report.status)}`}>
                        {report.status}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${getFrequencyBadge(report.frequency)}`}>
                        {report.frequency}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {report.description}
                  </p>

                  {/* Report Info */}
                  <div className="space-y-2 mb-4">
                    {report.lastGenerated && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Last Generated</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{report.lastGenerated}</span>
                      </div>
                    )}
                    {report.nextScheduled && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Next Scheduled</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{report.nextScheduled}</span>
                      </div>
                    )}
                    {report.fileSize && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">File Size</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{report.fileSize}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Downloads</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{report.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Format Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {report.format.map((format, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                    {report.status === 'ready' ? (
                      <>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white rounded-lg hover:from-[#5F29A1] hover:to-[#204782] transition-all duration-200">
                          <Download className="h-4 w-4" />
                          Export
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </>
                    ) : report.status === 'processing' ? (
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg cursor-not-allowed" disabled>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Processing...
                      </button>
                    ) : report.status === 'scheduled' ? (
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">
                        <Play className="h-4 w-4" />
                        Generate Now
                      </button>
                    ) : (
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors">
                        <AlertCircle className="h-4 w-4" />
                        Retry
                      </button>
                    )}

                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No reports found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FileSpreadsheet className="h-8 w-8 text-[#9152DE]" />
              <span className="text-sm font-medium">Generate All</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Archive className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-medium">Archive Old</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Mail className="h-8 w-8 text-green-600" />
              <span className="text-sm font-medium">Email Reports</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Printer className="h-8 w-8 text-orange-600" />
              <span className="text-sm font-medium">Print All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}