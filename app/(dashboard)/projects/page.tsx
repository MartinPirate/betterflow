'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Plus,
  Search,
  Calendar,
  Users,
  DollarSign,
  MoreVertical,
  TrendingUp,
  FolderOpen,
  Briefcase,
  Target,
  ChevronRight,
  Layout,
  List,
  Grid3X3
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  allocation: number;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'on-hold' | 'completed' | 'planning';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  team: TeamMember[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  tasks: {
    total: number;
    completed: number;
  };
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform Redesign',
    client: 'TechMart Inc',
    status: 'active',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 125000,
    spent: 78500,
    priority: 'high',
    description: 'Complete redesign of the e-commerce platform with enhanced UX',
    tasks: { total: 45, completed: 29 },
    team: [
      { id: '1', name: 'John Doe', role: 'Project Manager', allocation: 100 },
      { id: '2', name: 'Sarah Smith', role: 'UX Designer', allocation: 80 },
      { id: '3', name: 'Mike Johnson', role: 'Frontend Dev', allocation: 100 },
      { id: '4', name: 'Emily Chen', role: 'Backend Dev', allocation: 60 }
    ]
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    client: 'FinanceFirst',
    status: 'active',
    progress: 45,
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    budget: 200000,
    spent: 89000,
    priority: 'critical',
    description: 'Developing a secure mobile banking application for iOS and Android',
    tasks: { total: 62, completed: 28 },
    team: [
      { id: '5', name: 'Alex Turner', role: 'Tech Lead', allocation: 100 },
      { id: '6', name: 'Lisa Wang', role: 'Mobile Dev', allocation: 100 },
      { id: '7', name: 'Tom Brown', role: 'QA Engineer', allocation: 50 }
    ]
  },
  {
    id: '3',
    name: 'HR Management System',
    client: 'GlobalCorp',
    status: 'planning',
    progress: 10,
    startDate: '2024-04-01',
    endDate: '2024-12-31',
    budget: 95000,
    spent: 5000,
    priority: 'medium',
    description: 'Building a comprehensive HR management system with payroll integration',
    tasks: { total: 38, completed: 4 },
    team: [
      { id: '8', name: 'Rachel Green', role: 'Business Analyst', allocation: 75 },
      { id: '9', name: 'David Lee', role: 'Full Stack Dev', allocation: 100 }
    ]
  },
  {
    id: '4',
    name: 'Marketing Analytics Dashboard',
    client: 'MediaPro Agency',
    status: 'completed',
    progress: 100,
    startDate: '2023-11-01',
    endDate: '2024-02-28',
    budget: 45000,
    spent: 42500,
    priority: 'low',
    description: 'Real-time analytics dashboard for marketing campaigns',
    tasks: { total: 25, completed: 25 },
    team: [
      { id: '10', name: 'Chris Martin', role: 'Data Analyst', allocation: 0 },
      { id: '11', name: 'Nina Patel', role: 'Frontend Dev', allocation: 0 }
    ]
  },
  {
    id: '5',
    name: 'Cloud Migration Project',
    client: 'TechStartup Co',
    status: 'on-hold',
    progress: 30,
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    budget: 150000,
    spent: 35000,
    priority: 'high',
    description: 'Migrating legacy infrastructure to AWS cloud services',
    tasks: { total: 48, completed: 14 },
    team: [
      { id: '12', name: 'Steve Rogers', role: 'DevOps Engineer', allocation: 50 },
      { id: '13', name: 'Natasha Romanoff', role: 'Cloud Architect', allocation: 50 }
    ]
  }
];

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(mockProjects);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track all your projects</p>
        </div>
        <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-[#9152DE]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Projects</p>
                <p className="text-2xl font-bold">{activeProjects}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
                <p className="text-2xl font-bold">${(totalBudget / 1000).toFixed(0)}k</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Budget Spent</p>
                <p className="text-2xl font-bold">{((totalSpent / totalBudget) * 100).toFixed(0)}%</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Mode */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-[#9152DE]' : ''}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-[#9152DE]' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('timeline')}
            className={viewMode === 'timeline' ? 'bg-[#9152DE]' : ''}
          >
            <Layout className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Projects View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.client}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      ${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                        <AvatarFallback className="text-xs bg-[#9152DE] text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <Briefcase className="h-4 w-4" />
                    <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 dark:bg-gray-900">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{project.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{project.client}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="h-2 w-20" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((member) => (
                            <Avatar key={member.id} className="h-6 w-6 border border-white">
                              <AvatarFallback className="text-xs bg-[#9152DE] text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                              +{project.team.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        ${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(project.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === 'timeline' && (
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Gantt chart view of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProjects.map((project) => {
                const startDate = new Date(project.startDate);
                const endDate = new Date(project.endDate);
                const today = new Date();
                const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                const progressPercentage = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));

                return (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{project.name}</h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-full relative"
                          style={{ width: `${project.progress}%` }}
                        >
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-medium">
                            {project.progress}%
                          </div>
                        </div>
                      </div>
                      <div
                        className="absolute top-0 h-8 w-0.5 bg-red-500"
                        style={{ left: `${progressPercentage}%` }}
                        title="Today"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.team.length} members
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {project.tasks.completed}/{project.tasks.total} tasks
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${(project.budget / 1000).toFixed(0)}k budget
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}