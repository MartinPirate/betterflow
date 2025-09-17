'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Bot,
  Zap,
  Plus,
  Play,
  Pause,
  Settings,
  Clock,
  Calendar,
  Mail,
  MessageSquare,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ArrowRight,
  Brain,
  Sparkles,
  Cpu,
  Activity,
  Target,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Eye,
  Download,
  Upload,
  GitBranch,
  Workflow,
  Timer,
  BellRing,
  UserCheck,
  BarChart,
  PieChart,
  Database,
  Shield,
  Gauge,
  Briefcase
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Automation {
  id: string;
  name: string;
  description: string;
  type: 'workflow' | 'scheduled' | 'triggered' | 'ai-powered';
  category: 'timesheet' | 'leave' | 'project' | 'notification' | 'report' | 'data';
  status: 'active' | 'paused' | 'draft' | 'error';
  trigger: string;
  actions: string[];
  lastRun: string;
  nextRun?: string;
  runsCount: number;
  successRate: number;
  aiEnabled: boolean;
  creator: string;
  createdAt: string;
}

const mockAutomations: Automation[] = [
  {
    id: '1',
    name: 'Weekly Timesheet Reminder',
    description: 'Automatically remind employees to submit timesheets every Friday',
    type: 'scheduled',
    category: 'timesheet',
    status: 'active',
    trigger: 'Every Friday at 3:00 PM',
    actions: ['Check timesheet status', 'Send email reminder', 'Send Slack notification'],
    lastRun: '2 hours ago',
    nextRun: '6 days',
    runsCount: 156,
    successRate: 98,
    aiEnabled: false,
    creator: 'System',
    createdAt: '2023-01-15'
  },
  {
    id: '2',
    name: 'AI Project Risk Analyzer',
    description: 'AI analyzes project metrics and alerts when risks are detected',
    type: 'ai-powered',
    category: 'project',
    status: 'active',
    trigger: 'Daily at midnight',
    actions: ['Analyze project data', 'Calculate risk score', 'Generate insights', 'Send alerts'],
    lastRun: '6 hours ago',
    nextRun: '18 hours',
    runsCount: 89,
    successRate: 100,
    aiEnabled: true,
    creator: 'Admin',
    createdAt: '2023-06-20'
  },
  {
    id: '3',
    name: 'Leave Request Auto-Approval',
    description: 'Automatically approve leave requests based on predefined rules',
    type: 'triggered',
    category: 'leave',
    status: 'active',
    trigger: 'On leave request submission',
    actions: ['Check leave balance', 'Verify team availability', 'Auto-approve if conditions met'],
    lastRun: '1 day ago',
    runsCount: 234,
    successRate: 95,
    aiEnabled: true,
    creator: 'HR Team',
    createdAt: '2023-03-10'
  },
  {
    id: '4',
    name: 'Monthly Performance Report',
    description: 'Generate and distribute performance reports to managers',
    type: 'scheduled',
    category: 'report',
    status: 'active',
    trigger: 'First Monday of each month',
    actions: ['Collect performance data', 'Generate reports', 'Email to managers'],
    lastRun: '5 days ago',
    nextRun: '25 days',
    runsCount: 12,
    successRate: 100,
    aiEnabled: false,
    creator: 'System',
    createdAt: '2023-01-01'
  },
  {
    id: '5',
    name: 'Smart Task Assignment',
    description: 'AI assigns tasks to team members based on skills and availability',
    type: 'ai-powered',
    category: 'project',
    status: 'paused',
    trigger: 'On new task creation',
    actions: ['Analyze task requirements', 'Match with team skills', 'Check availability', 'Auto-assign'],
    lastRun: '3 days ago',
    runsCount: 567,
    successRate: 92,
    aiEnabled: true,
    creator: 'Project Manager',
    createdAt: '2023-04-15'
  },
  {
    id: '6',
    name: 'Data Backup Workflow',
    description: 'Automated backup of critical data to cloud storage',
    type: 'scheduled',
    category: 'data',
    status: 'active',
    trigger: 'Every day at 2:00 AM',
    actions: ['Export data', 'Compress files', 'Upload to cloud', 'Verify backup'],
    lastRun: '10 hours ago',
    nextRun: '14 hours',
    runsCount: 365,
    successRate: 99.5,
    aiEnabled: false,
    creator: 'IT Admin',
    createdAt: '2022-12-01'
  }
];

export default function AutomationsPage() {
  const [automations] = useState<Automation[]>(mockAutomations);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: Automation['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Automation['type']) => {
    switch (type) {
      case 'workflow': return <GitBranch className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'triggered': return <Zap className="h-4 w-4" />;
      case 'ai-powered': return <Brain className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: Automation['category']) => {
    switch (category) {
      case 'timesheet': return <Clock className="h-4 w-4" />;
      case 'leave': return <Calendar className="h-4 w-4" />;
      case 'project': return <Briefcase className="h-4 w-4" />;
      case 'notification': return <BellRing className="h-4 w-4" />;
      case 'report': return <BarChart className="h-4 w-4" />;
      case 'data': return <Database className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || automation.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || automation.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const activeAutomations = automations.filter(a => a.status === 'active').length;
  const totalRuns = automations.reduce((sum, a) => sum + a.runsCount, 0);
  const avgSuccessRate = automations.reduce((sum, a) => sum + a.successRate, 0) / automations.length;
  const aiAutomations = automations.filter(a => a.aiEnabled).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Automations & AI</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Create and manage automated workflows with AI assistance</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
              <Plus className="h-4 w-4 mr-2" />
              Create Automation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Automation</DialogTitle>
              <DialogDescription>
                Set up a new automated workflow or AI-powered process
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="automation-name">Automation Name</Label>
                <Input id="automation-name" placeholder="Enter automation name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what this automation does..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workflow">Workflow</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="triggered">Triggered</SelectItem>
                      <SelectItem value="ai-powered">AI-Powered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="timesheet">Timesheet</SelectItem>
                      <SelectItem value="leave">Leave</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="data">Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Enable AI Features</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Brain className="h-4 w-4 mr-2" />
                    Smart Suggestions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Auto-Optimize
                  </Button>
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    Predictive Actions
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
                Create Automation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Automations</p>
                <p className="text-2xl font-bold">{activeAutomations}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">of {automations.length} total</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Runs</p>
                <p className="text-2xl font-bold">{totalRuns.toLocaleString()}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">All time</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Average</p>
              </div>
              <Gauge className="h-8 w-8 text-[#9152DE]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered</p>
                <p className="text-2xl font-bold">{aiAutomations}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Automations</p>
              </div>
              <Brain className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search automations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="workflow">Workflow</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="triggered">Triggered</SelectItem>
            <SelectItem value="ai-powered">AI-Powered</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Automations Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Automations</TabsTrigger>
          <TabsTrigger value="ai">AI-Powered</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredAutomations.map((automation) => (
            <Card key={automation.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#9152DE]/10 rounded-lg">
                        {getTypeIcon(automation.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {automation.name}
                          {automation.aiEnabled && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{automation.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <Badge className={getStatusColor(automation.status)}>
                        {automation.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {automation.status === 'paused' && <Pause className="h-3 w-3 mr-1" />}
                        {automation.status === 'error' && <XCircle className="h-3 w-3 mr-1" />}
                        {automation.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        {getCategoryIcon(automation.category)}
                        <span className="capitalize">{automation.category}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Timer className="h-4 w-4" />
                        <span>{automation.trigger}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Last Run</p>
                        <p className="text-sm font-medium">{automation.lastRun}</p>
                      </div>
                      {automation.nextRun && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Next Run</p>
                          <p className="text-sm font-medium">{automation.nextRun}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Runs</p>
                        <p className="text-sm font-medium">{automation.runsCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Success Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={automation.successRate} className="w-16 h-2" />
                          <span className="text-sm font-medium">{automation.successRate}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {automation.actions.map((action, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {index > 0 && <ArrowRight className="h-3 w-3 text-gray-400" />}
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {automation.status === 'active' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ai">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[#9152DE]" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Suggested automations based on your usage patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Auto-assign recurring tasks</h4>
                    <Button size="sm" className="bg-[#9152DE] hover:bg-[#5F29A1]">
                      Enable
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    AI detected 23 recurring tasks that could be automatically assigned
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Optimize meeting schedules</h4>
                    <Button size="sm" className="bg-[#9152DE] hover:bg-[#5F29A1]">
                      Enable
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reduce meeting conflicts by 40% with AI scheduling
                  </p>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Predictive resource allocation</h4>
                    <Button size="sm" className="bg-[#9152DE] hover:bg-[#5F29A1]">
                      Enable
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Forecast resource needs 2 weeks in advance
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#9152DE]" />
                  AI Performance
                </CardTitle>
                <CardDescription>How AI is improving your workflows</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Time Saved</span>
                    <span className="font-medium">156 hours/month</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy Improvement</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Decisions Automated</span>
                    <span className="font-medium">2,345 this month</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">AI Learning Progress</span>
                    <Badge className="bg-green-100 text-green-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Improving
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Employee Onboarding',
                description: 'Complete onboarding workflow with document generation',
                category: 'HR',
                icon: <UserCheck className="h-5 w-5" />
              },
              {
                name: 'Invoice Processing',
                description: 'Automated invoice approval and payment workflow',
                category: 'Finance',
                icon: <FileText className="h-5 w-5" />
              },
              {
                name: 'Customer Support Triage',
                description: 'AI categorizes and assigns support tickets',
                category: 'Support',
                icon: <MessageSquare className="h-5 w-5" />
              },
              {
                name: 'Performance Review',
                description: 'Quarterly performance review automation',
                category: 'HR',
                icon: <BarChart className="h-5 w-5" />
              },
              {
                name: 'Project Kickoff',
                description: 'Automated project setup and team notification',
                category: 'Project',
                icon: <Target className="h-5 w-5" />
              },
              {
                name: 'Data Sync',
                description: 'Sync data between multiple systems',
                category: 'IT',
                icon: <RefreshCw className="h-5 w-5" />
              }
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#9152DE]/10 rounded-lg">
                      {template.icon}
                    </div>
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                  <Button className="w-full" variant="outline">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights & Predictions</CardTitle>
              <CardDescription>AI-generated insights about your automation performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Optimization Opportunity</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your timesheet reminder automation could save 2 hours per week by running at 2 PM instead of 3 PM,
                      based on employee submission patterns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Pattern Detected</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Leave requests increase by 45% around project deadlines. Consider implementing automatic
                      workload balancing before major milestones.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">AI Prediction</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Based on historical data, expect a 30% increase in automation usage next month due to
                      upcoming project launches. Consider scaling resources.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}