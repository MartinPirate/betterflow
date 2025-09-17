'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  Building2,
  Plus,
  Users,
  TrendingUp,
  AlertCircle,
  Search,
  Filter,
  DollarSign,
  Activity,
  Package,
  MoreVertical,
  Edit,
  Eye,
  Settings,
  UserPlus,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Globe,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Database,
  Shield
} from 'lucide-react';

interface Company {
  id: number;
  name: string;
  logo: string;
  users: number;
  projects: number;
  status: 'active' | 'inactive' | 'trial' | 'suspended';
  plan: 'Enterprise' | 'Professional' | 'Starter' | 'Free';
  revenue: number;
  growth: number;
  domain: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  lastActivity: string;
  storage: { used: number; total: number };
}

export default function CompaniesPage() {
  const { user, canAccess } = useAuth();
  const router = useRouter();
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    if (!canAccess(['superadmin'])) {
      router.push('/dashboard');
    }
  }, [canAccess, router]);

  const companies: Company[] = [
    {
      id: 1,
      name: 'BetterFlow Technologies',
      logo: 'BF',
      users: 45,
      projects: 12,
      status: 'active',
      plan: 'Enterprise',
      revenue: 125000,
      growth: 15,
      domain: 'betterflow.eu',
      contact: 'Tudor Andrei',
      email: 'admin@betterflow.eu',
      phone: '+40 721 234 567',
      location: 'Bucharest, Romania',
      joinDate: '2020-01-15',
      lastActivity: '2 hours ago',
      storage: { used: 45, total: 100 }
    },
    {
      id: 2,
      name: 'NewbridgeFX',
      logo: 'NF',
      users: 23,
      projects: 6,
      status: 'active',
      plan: 'Professional',
      revenue: 45000,
      growth: 8,
      domain: 'newbridgefx.com',
      contact: 'Robert Chen',
      email: 'admin@newbridgefx.com',
      phone: '+1 555 123 4567',
      location: 'New York, USA',
      joinDate: '2021-03-22',
      lastActivity: '1 day ago',
      storage: { used: 28, total: 50 }
    },
    {
      id: 3,
      name: 'TechCorp Solutions',
      logo: 'TC',
      users: 67,
      projects: 18,
      status: 'active',
      plan: 'Enterprise',
      revenue: 189000,
      growth: 22,
      domain: 'techcorp.com',
      contact: 'Maria Garcia',
      email: 'admin@techcorp.com',
      phone: '+1 555 987 6543',
      location: 'San Francisco, USA',
      joinDate: '2020-06-10',
      lastActivity: '5 hours ago',
      storage: { used: 78, total: 100 }
    },
    {
      id: 4,
      name: 'StartupXYZ',
      logo: 'SX',
      users: 8,
      projects: 2,
      status: 'trial',
      plan: 'Starter',
      revenue: 2500,
      growth: -5,
      domain: 'startupxyz.io',
      contact: 'Mike Davis',
      email: 'mike@startupxyz.io',
      phone: '+1 555 456 7890',
      location: 'Austin, USA',
      joinDate: '2024-02-01',
      lastActivity: '3 days ago',
      storage: { used: 5, total: 10 }
    },
    {
      id: 5,
      name: 'GlobalCorp',
      logo: 'GC',
      users: 89,
      projects: 24,
      status: 'active',
      plan: 'Enterprise',
      revenue: 320000,
      growth: 18,
      domain: 'globalcorp.com',
      contact: 'James Wilson',
      email: 'admin@globalcorp.com',
      phone: '+44 20 7123 4567',
      location: 'London, UK',
      joinDate: '2019-11-10',
      lastActivity: '30 minutes ago',
      storage: { used: 92, total: 200 }
    }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesPlan = planFilter === 'all' || company.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalRevenue = companies.reduce((sum, c) => sum + c.revenue, 0);
  const totalUsers = companies.reduce((sum, c) => sum + c.users, 0);
  const totalProjects = companies.reduce((sum, c) => sum + c.projects, 0);
  const activeCompanies = companies.filter(c => c.status === 'active').length;

  const getStatusColor = (status: Company['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: Company['plan']) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Professional': return 'bg-blue-100 text-blue-800';
      case 'Starter': return 'bg-green-100 text-green-800';
      case 'Free': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!canAccess(['superadmin'])) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Companies Management</h1>
          <p className="text-gray-500 mt-1">Manage all tenant companies and their subscriptions</p>
        </div>
        <Dialog open={isAddCompanyOpen} onOpenChange={setIsAddCompanyOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Create a new tenant company in the system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input id="domain" placeholder="company.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Contact Name</Label>
                  <Input id="contact-name" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" placeholder="email@company.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plan">Subscription Plan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="free">Free Trial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="users">User Limit</Label>
                  <Input id="users" type="number" placeholder="50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes about this company..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCompanyOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
                Create Company
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
                <p className="text-sm text-gray-500">Total Companies</p>
                <p className="text-2xl font-bold">{companies.length}</p>
                <p className="text-xs text-green-600 mt-1">
                  <ArrowUp className="inline h-3 w-3" />
                  {activeCompanies} active
                </p>
              </div>
              <Building2 className="h-8 w-8 text-[#9152DE]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Across all companies
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</p>
                <p className="text-xs text-green-600 mt-1">
                  <ArrowUp className="inline h-3 w-3" />
                  15% growth
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold">{totalProjects}</p>
                <p className="text-xs text-gray-600 mt-1">
                  In progress
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search companies..."
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
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Starter">Starter</SelectItem>
            <SelectItem value="Free">Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Companies Table/Cards */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed View</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Projects
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Growth
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Storage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCompanies.map((company) => (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-[#9152DE] text-white">
                                {company.logo}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{company.name}</p>
                              <p className="text-xs text-gray-500">{company.domain}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{company.users}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {company.projects}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getPlanColor(company.plan)}>
                            {company.plan}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ${(company.revenue / 1000).toFixed(0)}k
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center gap-1 text-sm ${
                            company.growth > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {company.growth > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                            {Math.abs(company.growth)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getStatusColor(company.status)}>
                            {company.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={(company.storage.used / company.storage.total) * 100}
                              className="w-16 h-2"
                            />
                            <span className="text-xs text-gray-500">
                              {company.storage.used}GB
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCompany(company)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-[#9152DE] text-white">
                          {company.logo}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <CardDescription>{company.domain}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Badge className={getStatusColor(company.status)}>
                      {company.status}
                    </Badge>
                    <Badge className={getPlanColor(company.plan)}>
                      {company.plan}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Users</p>
                      <p className="font-semibold">{company.users}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Projects</p>
                      <p className="font-semibold">{company.projects}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-semibold">${(company.revenue / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Growth</p>
                      <p className={`font-semibold ${company.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {company.growth > 0 ? '+' : ''}{company.growth}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Storage Usage</span>
                      <span className="font-medium">
                        {company.storage.used}GB / {company.storage.total}GB
                      </span>
                    </div>
                    <Progress value={(company.storage.used / company.storage.total) * 100} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      {company.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      {company.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {company.location}
                    </div>
                  </div>

                  <div className="flex justify-between pt-3 border-t">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Overview</CardTitle>
              <CardDescription>Subscription and payment information for all companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCompanies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#9152DE] text-white">
                          {company.logo}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-gray-500">{company.plan} Plan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-medium">${(company.revenue / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-gray-500">Monthly</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                      <Button variant="outline" size="sm">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions and changes across all companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCompanies.map((company) => (
                  <div key={company.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                        {company.logo}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{company.name}</span>
                        <span className="text-gray-500"> last active </span>
                        <span className="text-gray-900">{company.lastActivity}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {company.users} users • {company.projects} active projects
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {company.lastActivity}
                    </Badge>
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