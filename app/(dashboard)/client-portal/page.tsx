'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Calendar,
  Clock,
  Download,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Activity,
  Target,
  Package,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Milestone,
  BarChart2,
  PieChartIcon
} from 'lucide-react';

export default function ClientPortalPage() {
  const [selectedProject, setSelectedProject] = useState('all');

  // Sample client data
  const clientInfo = {
    name: 'NewBridge FX',
    tier: 'Platinum',
    primaryContact: 'Sarah Johnson',
    email: 'sarah@newbridgefx.com',
    phone: '+1 (555) 987-6543',
    accountManager: 'Michael Chen',
    contractValue: 850000,
    activeProjects: 3,
    completedProjects: 12
  };

  // Project data
  const projects = [
    {
      id: 1,
      name: 'Trading Platform Redesign',
      status: 'in_progress',
      progress: 68,
      startDate: '2025-06-01',
      endDate: '2025-12-31',
      budget: 250000,
      spent: 170000,
      team: [
        { name: 'Alex Turner', role: 'Project Manager', avatar: '/avatars/alex.jpg' },
        { name: 'Emma Wilson', role: 'Lead Developer', avatar: '/avatars/emma.jpg' },
        { name: 'James Lee', role: 'UI/UX Designer', avatar: '/avatars/james.jpg' },
        { name: 'Sophie Chen', role: 'Backend Developer', avatar: '/avatars/sophie.jpg' }
      ],
      milestones: [
        { name: 'Requirements Gathering', status: 'completed', date: '2025-06-15' },
        { name: 'Design Phase', status: 'completed', date: '2025-07-30' },
        { name: 'Development Sprint 1', status: 'completed', date: '2025-08-30' },
        { name: 'Development Sprint 2', status: 'in_progress', date: '2025-09-30' },
        { name: 'Testing & QA', status: 'upcoming', date: '2025-11-15' },
        { name: 'Deployment', status: 'upcoming', date: '2025-12-31' }
      ],
      nextDeliverable: 'API Integration Module',
      dueIn: 5
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'in_progress',
      progress: 45,
      startDate: '2025-08-01',
      endDate: '2026-02-28',
      budget: 180000,
      spent: 81000,
      team: [
        { name: 'David Kim', role: 'Mobile Lead', avatar: '/avatars/david.jpg' },
        { name: 'Lisa Brown', role: 'iOS Developer', avatar: '/avatars/lisa.jpg' }
      ],
      milestones: [
        { name: 'Wireframes', status: 'completed', date: '2025-08-15' },
        { name: 'UI Design', status: 'in_progress', date: '2025-09-30' },
        { name: 'Core Features', status: 'upcoming', date: '2025-11-30' }
      ],
      nextDeliverable: 'UI Mockups',
      dueIn: 12
    },
    {
      id: 3,
      name: 'Data Analytics Dashboard',
      status: 'review',
      progress: 92,
      startDate: '2025-04-01',
      endDate: '2025-09-30',
      budget: 120000,
      spent: 110400,
      team: [
        { name: 'Mark Davis', role: 'Data Architect', avatar: '/avatars/mark.jpg' },
        { name: 'Nina Patel', role: 'Frontend Developer', avatar: '/avatars/nina.jpg' }
      ],
      milestones: [
        { name: 'Data Architecture', status: 'completed', date: '2025-05-01' },
        { name: 'Dashboard Development', status: 'completed', date: '2025-08-01' },
        { name: 'User Testing', status: 'in_progress', date: '2025-09-15' }
      ],
      nextDeliverable: 'Final Review',
      dueIn: 2
    }
  ];

  // Updates feed
  const updates = [
    {
      id: 1,
      project: 'Trading Platform Redesign',
      type: 'milestone',
      message: 'Development Sprint 1 completed successfully',
      timestamp: '2 hours ago',
      user: 'Alex Turner'
    },
    {
      id: 2,
      project: 'Mobile App Development',
      type: 'deliverable',
      message: 'UI mockups ready for review',
      timestamp: '5 hours ago',
      user: 'David Kim'
    },
    {
      id: 3,
      project: 'Data Analytics Dashboard',
      type: 'update',
      message: 'Performance optimization completed - 40% faster load times',
      timestamp: '1 day ago',
      user: 'Mark Davis'
    },
    {
      id: 4,
      project: 'Trading Platform Redesign',
      type: 'meeting',
      message: 'Sprint review meeting scheduled for tomorrow at 2 PM',
      timestamp: '2 days ago',
      user: 'Emma Wilson'
    }
  ];

  // Invoice history
  const invoices = [
    { id: 'INV-2025-009', date: '2025-09-01', amount: 42500, status: 'paid', project: 'Trading Platform Redesign' },
    { id: 'INV-2025-008', date: '2025-08-01', amount: 38000, status: 'paid', project: 'Mobile App Development' },
    { id: 'INV-2025-007', date: '2025-07-01', amount: 45000, status: 'pending', project: 'Trading Platform Redesign' },
    { id: 'INV-2025-006', date: '2025-06-01', amount: 28000, status: 'paid', project: 'Data Analytics Dashboard' }
  ];

  // Deliverables
  const deliverables = [
    { name: 'Requirements Document v2.0', project: 'Trading Platform Redesign', date: '2025-09-10', size: '2.4 MB' },
    { name: 'UI Design Mockups', project: 'Mobile App Development', date: '2025-09-12', size: '15.6 MB' },
    { name: 'API Documentation', project: 'Trading Platform Redesign', date: '2025-09-05', size: '850 KB' },
    { name: 'Test Report August', project: 'Data Analytics Dashboard', date: '2025-08-31', size: '1.2 MB' }
  ];

  // Performance metrics
  const performanceData = [
    { month: 'Apr', delivered: 8, planned: 10 },
    { month: 'May', delivered: 12, planned: 12 },
    { month: 'Jun', delivered: 15, planned: 14 },
    { month: 'Jul', delivered: 11, planned: 12 },
    { month: 'Aug', delivered: 14, planned: 13 },
    { month: 'Sep', delivered: 9, planned: 11 }
  ];

  // Budget distribution
  const budgetData = [
    { name: 'Development', value: 45, fill: '#9152DE' },
    { name: 'Design', value: 20, fill: '#5F29A1' },
    { name: 'Testing', value: 15, fill: '#204782' },
    { name: 'Management', value: 12, fill: '#10B981' },
    { name: 'Other', value: 8, fill: '#7F8C8D' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500';
      case 'review':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'upcoming':
        return 'bg-gray-500/10 text-gray-500 dark:text-gray-400';
      default:
        return 'bg-gray-500/10 text-gray-500 dark:text-gray-400';
    }
  };

  return (
    <div className="p-8">
      {/* Client Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{clientInfo.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <Badge className="bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400">
                  {clientInfo.tier} Client
                </Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Contract Value: ${clientInfo.contractValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Projects</p>
                  <p className="text-2xl font-bold">{clientInfo.activeProjects}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">On-Time Delivery</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Budget Utilization</p>
                  <p className="text-2xl font-bold">72%</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Satisfaction Score</p>
                  <div className="flex items-center gap-1 mt-1">
                    <p className="text-2xl font-bold">4.8</p>
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <Target className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Cards */}
            <div className="lg:col-span-2 space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        <CardDescription>
                          {project.startDate} - {project.endDate}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Budget */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                        <p className="font-semibold">${project.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
                        <p className="font-semibold">${project.spent.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Team */}
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Team Members</p>
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 4).map((member, idx) => (
                          <Avatar key={idx} className="border-2 border-white">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 4 && (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                            +{project.team.length - 4}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Next Deliverable */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Next Deliverable</p>
                        <p className="font-medium">{project.nextDeliverable}</p>
                      </div>
                      <Badge variant="outline">
                        Due in {project.dueIn} days
                      </Badge>
                    </div>

                    {/* View Details Button */}
                    <Button variant="outline" className="w-full">
                      View Project Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Updates Feed */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Latest Updates</CardTitle>
                  <CardDescription>Recent activity across your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <div key={update.id} className="flex gap-3">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          update.type === 'milestone' ? 'bg-green-100' :
                          update.type === 'deliverable' ? 'bg-blue-100' :
                          update.type === 'meeting' ? 'bg-purple-100' :
                          'bg-gray-100'
                        }`}>
                          {update.type === 'milestone' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                           update.type === 'deliverable' ? <Package className="h-4 w-4 text-blue-600" /> :
                           update.type === 'meeting' ? <Calendar className="h-4 w-4 text-purple-600" /> :
                           <AlertCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{update.project}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{update.message}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {update.user} • {update.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Your Account Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Account Manager</p>
                    <p className="font-medium">{clientInfo.accountManager}</p>
                    <Button variant="link" className="px-0 h-auto" size="sm">
                      <Mail className="h-3 w-3 mr-1" />
                      Send Email
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Primary Contact</p>
                    <p className="font-medium">{clientInfo.primaryContact}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{clientInfo.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Performance</CardTitle>
                <CardDescription>Deliverables completed vs planned</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="planned" fill="#E2E8F0" />
                    <Bar dataKey="delivered" fill="#9152DE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Budget Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Distribution</CardTitle>
                <CardDescription>Allocation across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Milestone Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              <CardDescription>Track progress across all project milestones</CardDescription>
            </CardHeader>
            <CardContent>
              {projects.map((project) => (
                <div key={project.id} className="mb-6 last:mb-0">
                  <h4 className="font-medium mb-3">{project.name}</h4>
                  <div className="space-y-2">
                    {project.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in_progress' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`} />
                        <span className="text-sm flex-1">{milestone.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{milestone.date}</span>
                        <Badge variant="outline" className={getStatusColor(milestone.status)}>
                          {milestone.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>View and download your invoices</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-gray-400 dark:text-gray-600" />
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.project}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${invoice.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.date}</p>
                    </div>
                    <Badge className={
                      invoice.status === 'paid' ? 'bg-green-500/10 text-green-500' :
                      'bg-yellow-500/10 text-yellow-500'
                    }>
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deliverables Tab */}
        <TabsContent value="deliverables">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Deliverables</CardTitle>
                  <CardDescription>Download project files and documents</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deliverables.map((deliverable, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{deliverable.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{deliverable.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{deliverable.date}</p>
                        <p className="text-sm text-gray-400">{deliverable.size}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}