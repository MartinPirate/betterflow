'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Bell,
  BellOff,
  Check,
  X,
  Clock,
  MessageSquare,
  Calendar,
  UserPlus,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  Settings,
  Archive,
  Trash2,
  Filter,
  Search,
  ChevronRight,
  Mail,
  Smartphone,
  Globe,
  Volume2,
  Eye,
  EyeOff,
  Star,
  Users,
  Briefcase,
  TrendingUp,
  Gift,
  Shield,
  Zap,
  Heart,
  Award,
  Moon
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'mention' | 'task' | 'leave' | 'system';
  category: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  actionRequired: boolean;
  from?: string;
  relatedTo?: string;
  actions?: Array<{
    label: string;
    type: 'primary' | 'secondary' | 'danger';
  }>;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Leave Request',
    message: 'Sarah Johnson has requested leave from March 25-28, 2025',
    type: 'leave',
    category: 'Approvals',
    timestamp: '2 minutes ago',
    read: false,
    starred: false,
    actionRequired: true,
    from: 'Sarah Johnson',
    relatedTo: 'Leave Management',
    actions: [
      { label: 'Approve', type: 'primary' },
      { label: 'Decline', type: 'danger' }
    ]
  },
  {
    id: '2',
    title: 'Timesheet Reminder',
    message: 'Your timesheet for last week is pending submission',
    type: 'warning',
    category: 'Reminders',
    timestamp: '1 hour ago',
    read: false,
    starred: true,
    actionRequired: true,
    relatedTo: 'Timesheets',
    actions: [
      { label: 'Submit Now', type: 'primary' }
    ]
  },
  {
    id: '3',
    title: 'Project Update',
    message: 'Mobile App Redesign project has been updated to 75% complete',
    type: 'info',
    category: 'Projects',
    timestamp: '3 hours ago',
    read: true,
    starred: false,
    actionRequired: false,
    from: 'John Doe',
    relatedTo: 'Mobile App Redesign'
  },
  {
    id: '4',
    title: 'You were mentioned',
    message: '@you Great work on the API integration! The client is very happy.',
    type: 'mention',
    category: 'Mentions',
    timestamp: '5 hours ago',
    read: true,
    starred: true,
    actionRequired: false,
    from: 'Michael Chen',
    relatedTo: 'BetterCRM Integration'
  },
  {
    id: '5',
    title: 'Task Assigned',
    message: 'You have been assigned to review the Q1 financial reports',
    type: 'task',
    category: 'Tasks',
    timestamp: '1 day ago',
    read: true,
    starred: false,
    actionRequired: true,
    from: 'Emily Davis',
    relatedTo: 'Financial Reports',
    actions: [
      { label: 'View Task', type: 'primary' }
    ]
  },
  {
    id: '6',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on March 30, 2025 from 2:00 AM - 4:00 AM EST',
    type: 'system',
    category: 'System',
    timestamp: '2 days ago',
    read: true,
    starred: false,
    actionRequired: false,
    from: 'System Admin'
  },
  {
    id: '7',
    title: 'Team Achievement',
    message: 'Your team completed all Q1 objectives ahead of schedule!',
    type: 'success',
    category: 'Achievements',
    timestamp: '3 days ago',
    read: true,
    starred: true,
    actionRequired: false,
    relatedTo: 'Team Performance'
  },
  {
    id: '8',
    title: 'Policy Update',
    message: 'Remote work policy has been updated. Please review the changes.',
    type: 'info',
    category: 'Announcements',
    timestamp: '1 week ago',
    read: true,
    starred: false,
    actionRequired: false,
    from: 'HR Department',
    actions: [
      { label: 'Review Policy', type: 'secondary' }
    ]
  }
];

const notificationSettings = {
  channels: {
    email: { enabled: true, instant: true },
    push: { enabled: true, instant: false },
    sms: { enabled: false, instant: false },
    inApp: { enabled: true, instant: true }
  },
  categories: {
    approvals: { email: true, push: true, sms: false },
    reminders: { email: true, push: true, sms: false },
    mentions: { email: false, push: true, sms: false },
    tasks: { email: true, push: true, sms: false },
    projects: { email: false, push: false, sms: false },
    system: { email: true, push: false, sms: false },
    achievements: { email: false, push: true, sms: false },
    announcements: { email: true, push: false, sms: false }
  },
  quiet: {
    enabled: false,
    start: '22:00',
    end: '08:00',
    weekends: true
  }
};

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'leave': return Calendar;
      case 'task': return CheckCircle;
      case 'mention': return MessageSquare;
      case 'warning': return AlertCircle;
      case 'success': return Award;
      case 'error': return X;
      case 'system': return Shield;
      default: return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'mention': return 'text-purple-600 bg-purple-100';
      case 'task': return 'text-blue-600 bg-blue-100';
      case 'leave': return 'text-indigo-600 bg-indigo-100';
      case 'system': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const markAsRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const toggleStar = (id: string) => {
    setNotificationList(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, starred: !notif.starred } : notif
      )
    );
  };

  const filteredNotifications = notificationList.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || notif.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesUnread = !showUnreadOnly || !notif.read;
    const matchesTab = selectedTab === 'all' ||
                       (selectedTab === 'unread' && !notif.read) ||
                       (selectedTab === 'starred' && notif.starred) ||
                       (selectedTab === 'archived' && false);
    return matchesSearch && matchesCategory && matchesUnread && matchesTab;
  });

  const unreadCount = notificationList.filter(n => !n.read).length;
  const starredCount = notificationList.filter(n => n.starred).length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Stay updated with important activities and announcements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Archive className="mr-2 h-4 w-4" />
            Archive All
          </Button>
          <Button variant="outline" size="sm">
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Bell className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">New notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Required</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notificationList.filter(n => n.actionRequired).length}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pending actions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Starred</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{starredCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Important items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificationList.length}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total received</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadCount > 0 && (
                <Badge className="ml-2 bg-purple-100 text-purple-700">{unreadCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="starred">Starred</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-2">
            {filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <Card
                  key={notification.id}
                  className={`transition-all ${!notification.read ? 'border-purple-200 bg-purple-50/50' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold flex items-center">
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 h-2 w-2 rounded-full bg-purple-600" />
                              )}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {notification.timestamp}
                              </span>
                              {notification.from && (
                                <span className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {notification.from}
                                </span>
                              )}
                              {notification.relatedTo && (
                                <span className="flex items-center">
                                  <Briefcase className="h-3 w-3 mr-1" />
                                  {notification.relatedTo}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStar(notification.id)}
                            >
                              <Star className={`h-4 w-4 ${notification.starred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                            </Button>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {notification.actions && (
                          <div className="flex items-center space-x-2 pt-2">
                            {notification.actions.map((action, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant={action.type === 'primary' ? 'default' :
                                        action.type === 'danger' ? 'destructive' : 'outline'}
                                className={action.type === 'primary' ? 'bg-purple-600 hover:bg-purple-700' : ''}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Approvals', 'Reminders', 'Mentions', 'Tasks', 'Projects', 'System', 'Achievements', 'Announcements'].map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category.toLowerCase() ? 'default' : 'ghost'}
                    className={`w-full justify-start ${selectedCategory === category.toLowerCase() ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                    onClick={() => setSelectedCategory(selectedCategory === category.toLowerCase() ? 'all' : category.toLowerCase())}
                  >
                    <span className="flex items-center justify-between w-full">
                      {category}
                      <Badge variant="secondary">
                        {notificationList.filter(n => n.category === category).length}
                      </Badge>
                    </span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Quick settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">Email</span>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-sm">Push</span>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">SMS</span>
                  </div>
                  <Checkbox />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">Sound</span>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4" />
                    <span className="text-sm">Quiet Hours</span>
                  </div>
                  <Checkbox />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Today</span>
                  <span className="font-medium">12 notifications</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">This Week</span>
                  <span className="font-medium">47 notifications</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Response Rate</span>
                  <span className="font-medium text-green-600">92%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Avg Response Time</span>
                  <span className="font-medium">2.5 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}