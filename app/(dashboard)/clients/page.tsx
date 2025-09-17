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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Plus,
  Search,
  Filter,
  Building2,
  Users,
  FolderOpen,
  DollarSign,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Globe,
  MapPin,
  MoreVertical,
  Edit,
  Star,
  Clock,
  FileText,
  BarChart,
  PieChart,
  Activity,
  Briefcase,
  CreditCard,
  AlertCircle,
  Grid3X3,
  List
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Contact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  value: number;
  progress: number;
}

interface Client {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'inactive' | 'prospect';
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  joinDate: string;
  totalRevenue: number;
  activeProjects: number;
  completedProjects: number;
  contacts: Contact[];
  website: string;
  location: string;
  description: string;
  projects: Project[];
  satisfaction: number;
  paymentStatus: 'on-time' | 'delayed' | 'overdue';
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'NewbridgeFX',
    industry: 'Financial Services',
    status: 'active',
    tier: 'platinum',
    joinDate: '2020-03-15',
    totalRevenue: 850000,
    activeProjects: 3,
    completedProjects: 12,
    website: 'https://newbridgefx.com',
    location: 'New York, USA',
    description: 'Leading financial services provider specializing in forex trading and investment solutions.',
    satisfaction: 95,
    paymentStatus: 'on-time',
    contacts: [
      { id: '1', name: 'Robert Chen', position: 'CEO', email: 'robert@newbridgefx.com', phone: '+1 555 123 4567', isPrimary: true },
      { id: '2', name: 'Maria Garcia', position: 'CTO', email: 'maria@newbridgefx.com', phone: '+1 555 123 4568', isPrimary: false }
    ],
    projects: [
      { id: '1', name: 'Trading Platform v2', status: 'active', value: 250000, progress: 65 },
      { id: '2', name: 'Mobile App', status: 'active', value: 180000, progress: 45 },
      { id: '3', name: 'Analytics Dashboard', status: 'completed', value: 120000, progress: 100 }
    ]
  },
  {
    id: '2',
    name: 'TechMart Inc',
    industry: 'E-Commerce',
    status: 'active',
    tier: 'gold',
    joinDate: '2021-06-20',
    totalRevenue: 520000,
    activeProjects: 2,
    completedProjects: 8,
    website: 'https://techmart.com',
    location: 'San Francisco, USA',
    description: 'E-commerce platform specializing in consumer electronics and tech gadgets.',
    satisfaction: 88,
    paymentStatus: 'on-time',
    contacts: [
      { id: '3', name: 'John Smith', position: 'Product Owner', email: 'john@techmart.com', phone: '+1 555 234 5678', isPrimary: true }
    ],
    projects: [
      { id: '4', name: 'Website Redesign', status: 'active', value: 125000, progress: 80 },
      { id: '5', name: 'Inventory System', status: 'active', value: 95000, progress: 30 }
    ]
  },
  {
    id: '3',
    name: 'GlobalCorp',
    industry: 'Consulting',
    status: 'active',
    tier: 'gold',
    joinDate: '2019-11-10',
    totalRevenue: 1200000,
    activeProjects: 4,
    completedProjects: 18,
    website: 'https://globalcorp.com',
    location: 'London, UK',
    description: 'International consulting firm providing business transformation and strategy services.',
    satisfaction: 92,
    paymentStatus: 'delayed',
    contacts: [
      { id: '4', name: 'Emily Watson', position: 'VP Operations', email: 'emily@globalcorp.com', phone: '+44 20 7123 4567', isPrimary: true },
      { id: '5', name: 'James Brown', position: 'Project Manager', email: 'james@globalcorp.com', phone: '+44 20 7123 4568', isPrimary: false }
    ],
    projects: [
      { id: '6', name: 'HR System', status: 'active', value: 180000, progress: 55 },
      { id: '7', name: 'Data Migration', status: 'on-hold', value: 75000, progress: 20 }
    ]
  },
  {
    id: '4',
    name: 'FinanceFirst',
    industry: 'Banking',
    status: 'active',
    tier: 'platinum',
    joinDate: '2020-08-05',
    totalRevenue: 980000,
    activeProjects: 2,
    completedProjects: 15,
    website: 'https://financefirst.com',
    location: 'Frankfurt, Germany',
    description: 'Digital banking solutions for modern financial institutions.',
    satisfaction: 96,
    paymentStatus: 'on-time',
    contacts: [
      { id: '6', name: 'Klaus Mueller', position: 'Director IT', email: 'klaus@financefirst.com', phone: '+49 69 1234 5678', isPrimary: true }
    ],
    projects: [
      { id: '8', name: 'Mobile Banking App', status: 'active', value: 320000, progress: 70 }
    ]
  },
  {
    id: '5',
    name: 'MediaPro Agency',
    industry: 'Marketing',
    status: 'inactive',
    tier: 'silver',
    joinDate: '2022-01-15',
    totalRevenue: 180000,
    activeProjects: 0,
    completedProjects: 4,
    website: 'https://mediapro.agency',
    location: 'Los Angeles, USA',
    description: 'Creative marketing agency focused on digital campaigns.',
    satisfaction: 75,
    paymentStatus: 'overdue',
    contacts: [
      { id: '7', name: 'Sarah Johnson', position: 'Creative Director', email: 'sarah@mediapro.agency', phone: '+1 310 555 9876', isPrimary: true }
    ],
    projects: []
  },
  {
    id: '6',
    name: 'TechStartup Co',
    industry: 'Technology',
    status: 'prospect',
    tier: 'bronze',
    joinDate: '2024-02-01',
    totalRevenue: 0,
    activeProjects: 0,
    completedProjects: 0,
    website: 'https://techstartup.co',
    location: 'Austin, USA',
    description: 'Emerging tech startup looking for development partners.',
    satisfaction: 0,
    paymentStatus: 'on-time',
    contacts: [
      { id: '8', name: 'Mike Davis', position: 'Founder', email: 'mike@techstartup.co', phone: '+1 512 555 1234', isPrimary: true }
    ],
    projects: []
  }
];

export default function ClientsPage() {
  const [clients] = useState<Client[]>(mockClients);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const getTierColor = (tier: Client['tier']) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusIcon = (status: Client['paymentStatus']) => {
    switch (status) {
      case 'on-time': return <CreditCard className="h-4 w-4 text-green-500" />;
      case 'delayed': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesTier = tierFilter === 'all' || client.tier === tierFilter;

    return matchesSearch && matchesIndustry && matchesStatus && matchesTier;
  });

  const industries = [...new Set(clients.map(c => c.industry))];
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalRevenue = clients.reduce((acc, c) => acc + c.totalRevenue, 0);
  const totalProjects = clients.reduce((acc, c) => acc + c.activeProjects + c.completedProjects, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients Management</h1>
          <p className="text-gray-500 mt-1">Manage client relationships and projects</p>
        </div>
        <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new client to your portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Financial Services</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Primary Contact</Label>
                  <Input id="contact" placeholder="Contact name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 555 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the client..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddClientOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
                Add Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Clients</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-[#9152DE]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Clients</p>
                <p className="text-2xl font-bold">{activeClients}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <p className="text-2xl font-bold">{totalProjects}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="bronze">Bronze</SelectItem>
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
        </div>
      </div>

      {/* Clients View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-[#9152DE] text-white">
                        {client.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <CardDescription>{client.industry}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                  <Badge className={getTierColor(client.tier)}>
                    {client.tier}
                  </Badge>
                  {getPaymentStatusIcon(client.paymentStatus)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-semibold">${(client.totalRevenue / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Projects</p>
                    <p className="font-semibold">{client.activeProjects + client.completedProjects}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Active</p>
                    <p className="font-semibold">{client.activeProjects}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Satisfaction</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{client.satisfaction}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Primary Contact</p>
                  {client.contacts.filter(c => c.isPrimary).map(contact => (
                    <div key={contact.id} className="space-y-1">
                      <p className="text-sm font-medium">{contact.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    Since {new Date(client.joinDate).getFullYear()}
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projects
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Primary Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Satisfaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-[#9152DE] text-white">
                              {client.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.industry}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getTierColor(client.tier)}>
                          {client.tier}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ${(client.totalRevenue / 1000).toFixed(0)}k
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>{client.activeProjects} active</span>
                          <span className="text-gray-400">/</span>
                          <span>{client.completedProjects} completed</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {client.contacts.filter(c => c.isPrimary).map(contact => (
                          <div key={contact.id}>
                            <div className="text-sm text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{client.satisfaction}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
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
      )}
    </div>
  );
}