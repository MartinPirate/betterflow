'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Calendar,
  Activity,
  Briefcase,
  Target,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  Filter,
  Eye,
  Share2,
  Printer
} from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  percentage?: number;
  change?: number;
}

const revenueData: ChartData[] = [
  { label: 'Jan', value: 245000, change: 12 },
  { label: 'Feb', value: 285000, change: 8 },
  { label: 'Mar', value: 325000, change: 15 },
  { label: 'Apr', value: 295000, change: -5 },
  { label: 'May', value: 345000, change: 10 },
  { label: 'Jun', value: 385000, change: 18 }
];

const projectStatusData: ChartData[] = [
  { label: 'Completed', value: 45, percentage: 35 },
  { label: 'Active', value: 28, percentage: 22 },
  { label: 'On Hold', value: 15, percentage: 12 },
  { label: 'Planning', value: 40, percentage: 31 }
];

const departmentHours: ChartData[] = [
  { label: 'Development', value: 1250, percentage: 40 },
  { label: 'Design', value: 680, percentage: 22 },
  { label: 'QA', value: 450, percentage: 14 },
  { label: 'Management', value: 380, percentage: 12 },
  { label: 'Marketing', value: 370, percentage: 12 }
];

const clientRevenue: ChartData[] = [
  { label: 'NewbridgeFX', value: 850000, percentage: 28 },
  { label: 'GlobalCorp', value: 620000, percentage: 20 },
  { label: 'TechMart Inc', value: 520000, percentage: 17 },
  { label: 'FinanceFirst', value: 480000, percentage: 16 },
  { label: 'Others', value: 580000, percentage: 19 }
];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('6months');
  const [reportType, setReportType] = useState('overview');

  const maxRevenue = Math.max(...revenueData.map(d => d.value));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track performance and analyze business metrics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Overview</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
            <SelectItem value="projects">Projects</SelectItem>
            <SelectItem value="timesheets">Timesheets</SelectItem>
            <SelectItem value="clients">Clients</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">$2.05M</p>
                <div className="flex items-center mt-2 text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">12% from last period</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Projects</p>
                <p className="text-2xl font-bold">28</p>
                <div className="flex items-center mt-2 text-blue-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">5 new this month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Hours</p>
                <p className="text-2xl font-bold">3,130</p>
                <div className="flex items-center mt-2 text-orange-600">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">8% from last period</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Client Satisfaction</p>
                <p className="text-2xl font-bold">94%</p>
                <div className="flex items-center mt-2 text-purple-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">2% improvement</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the last 6 months</CardDescription>
              </div>
              <LineChart className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueData.map((month) => (
                <div key={month.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{month.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ${(month.value / 1000).toFixed(0)}k
                      </span>
                      {month.change && (
                        <span className={`text-xs font-medium flex items-center ${
                          month.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {month.change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {Math.abs(month.change)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-full"
                      style={{ width: `${(month.value / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status Chart */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Project Status Distribution</CardTitle>
                <CardDescription>Current status of all projects</CardDescription>
              </div>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectStatusData.map((status, index) => {
                const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'];
                return (
                  <div key={status.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{status.value} projects</span>
                      <Badge variant="outline">{status.percentage}%</Badge>
                    </div>
                  </div>
                );
              })}
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Total Projects</span>
                  <span className="font-bold">128</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports Tabs */}
      <Tabs defaultValue="department" className="space-y-4">
        <TabsList>
          <TabsTrigger value="department">Department</TabsTrigger>
          <TabsTrigger value="client">Client</TabsTrigger>
          <TabsTrigger value="employee">Employee</TabsTrigger>
          <TabsTrigger value="project">Project</TabsTrigger>
        </TabsList>

        <TabsContent value="department">
          <Card>
            <CardHeader>
              <CardTitle>Department Hours & Productivity</CardTitle>
              <CardDescription>Time allocation and productivity metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departmentHours.map((dept) => (
                  <div key={dept.label}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{dept.label}</span>
                        <Badge variant="outline" className="text-xs">
                          {dept.percentage}% of total
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{dept.value} hours</span>
                    </div>
                    <Progress value={dept.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="client">
          <Card>
            <CardHeader>
              <CardTitle>Client Revenue Distribution</CardTitle>
              <CardDescription>Revenue breakdown by client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {clientRevenue.map((client, index) => {
                  const colors = [
                    'from-purple-500 to-purple-600',
                    'from-blue-500 to-blue-600',
                    'from-green-500 to-green-600',
                    'from-orange-500 to-orange-600',
                    'from-gray-500 to-gray-600'
                  ];
                  return (
                    <div key={client.label}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors[index]}`} />
                          <span className="font-medium">{client.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ${(client.value / 1000).toFixed(0)}k
                          </span>
                          <Badge variant="outline">{client.percentage}%</Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div
                          className={`h-full bg-gradient-to-r ${colors[index]} rounded-full`}
                          style={{ width: `${client.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employee">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Employees</CardTitle>
              <CardDescription>Employee performance metrics for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-2 font-medium text-sm">Employee</th>
                      <th className="text-right py-2 font-medium text-sm">Hours</th>
                      <th className="text-right py-2 font-medium text-sm">Tasks</th>
                      <th className="text-right py-2 font-medium text-sm">Efficiency</th>
                      <th className="text-right py-2 font-medium text-sm">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">John Doe</td>
                      <td className="text-right">186</td>
                      <td className="text-right">42</td>
                      <td className="text-right">
                        <Badge className="bg-green-100 text-green-800">98%</Badge>
                      </td>
                      <td className="text-right">⭐ 4.9</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Sarah Smith</td>
                      <td className="text-right">172</td>
                      <td className="text-right">38</td>
                      <td className="text-right">
                        <Badge className="bg-green-100 text-green-800">95%</Badge>
                      </td>
                      <td className="text-right">⭐ 4.8</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Mike Johnson</td>
                      <td className="text-right">165</td>
                      <td className="text-right">35</td>
                      <td className="text-right">
                        <Badge className="bg-yellow-100 text-yellow-800">92%</Badge>
                      </td>
                      <td className="text-right">⭐ 4.7</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Emily Chen</td>
                      <td className="text-right">158</td>
                      <td className="text-right">40</td>
                      <td className="text-right">
                        <Badge className="bg-yellow-100 text-yellow-800">90%</Badge>
                      </td>
                      <td className="text-right">⭐ 4.6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="project">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>Key metrics for active and recent projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">E-Commerce Platform</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">NewbridgeFX</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">On Track</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Progress</p>
                      <p className="font-medium">65%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Budget Used</p>
                      <p className="font-medium">$78.5k / $125k</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Hours</p>
                      <p className="font-medium">520 / 800</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Deadline</p>
                      <p className="font-medium">Jun 30, 2024</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">Mobile Banking App</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">FinanceFirst</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">At Risk</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Progress</p>
                      <p className="font-medium">45%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Budget Used</p>
                      <p className="font-medium">$89k / $200k</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Hours</p>
                      <p className="font-medium">680 / 1500</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Deadline</p>
                      <p className="font-medium">Aug 15, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Generate and schedule reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Monthly Report
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Weekly Reports
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Create Custom Dashboard
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare Periods
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}