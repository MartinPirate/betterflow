'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Link2,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Shield,
  Key,
  Globe,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Trash2,
  Download,
  Upload,
  Copy,
  Activity,
  Database,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  Users,
  Briefcase,
  CreditCard,
  Package,
  Cpu,
  Eye,
  EyeOff,
  Cloud,
  Server,
  Code,
  Terminal,
  GitBranch,
  Zap,
  ArrowRight,
  ExternalLink,
  Info,
  Lock,
  Webhook
} from 'lucide-react';
import { FaGithub, FaSlack, FaJira, FaTrello, FaGoogle, FaMicrosoft, FaDropbox, FaStripe, FaSalesforce, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { SiNotion, SiAsana, SiZoom, SiZapier, SiPostgresql, SiMongodb, SiRedis } from 'react-icons/si';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'communication' | 'development' | 'storage' | 'payment' | 'crm' | 'database' | 'social';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  icon: React.ReactNode;
  lastSync?: string;
  dataPoints?: number;
  permissions: string[];
  apiCalls?: {
    used: number;
    limit: number;
  };
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'GitHub',
    description: 'Source code management and version control',
    category: 'development',
    status: 'connected',
    icon: <FaGithub className="h-6 w-6" />,
    lastSync: '5 minutes ago',
    dataPoints: 1234,
    permissions: ['repo', 'user', 'notifications'],
    apiCalls: { used: 4520, limit: 10000 }
  },
  {
    id: '2',
    name: 'Slack',
    description: 'Team communication and collaboration',
    category: 'communication',
    status: 'connected',
    icon: <FaSlack className="h-6 w-6" />,
    lastSync: '1 hour ago',
    dataPoints: 856,
    permissions: ['channels:read', 'chat:write', 'users:read'],
    apiCalls: { used: 2150, limit: 5000 }
  },
  {
    id: '3',
    name: 'Jira',
    description: 'Issue tracking and project management',
    category: 'productivity',
    status: 'disconnected',
    icon: <FaJira className="h-6 w-6" />,
    permissions: ['read:jira-work', 'write:jira-work']
  },
  {
    id: '4',
    name: 'Google Workspace',
    description: 'Gmail, Drive, Calendar, and more',
    category: 'productivity',
    status: 'connected',
    icon: <FaGoogle className="h-6 w-6" />,
    lastSync: '30 minutes ago',
    dataPoints: 3456,
    permissions: ['email', 'calendar', 'drive'],
    apiCalls: { used: 8900, limit: 15000 }
  },
  {
    id: '5',
    name: 'Stripe',
    description: 'Payment processing and billing',
    category: 'payment',
    status: 'connected',
    icon: <FaStripe className="h-6 w-6" />,
    lastSync: '2 hours ago',
    dataPoints: 234,
    permissions: ['charges', 'customers', 'invoices'],
    apiCalls: { used: 1200, limit: 10000 }
  },
  {
    id: '6',
    name: 'Notion',
    description: 'Notes, docs, and knowledge base',
    category: 'productivity',
    status: 'pending',
    icon: <SiNotion className="h-6 w-6" />,
    permissions: ['read_content', 'write_content']
  },
  {
    id: '7',
    name: 'Microsoft Teams',
    description: 'Communication and collaboration',
    category: 'communication',
    status: 'disconnected',
    icon: <FaMicrosoft className="h-6 w-6" />,
    permissions: ['teams.read', 'chat.read', 'user.read']
  },
  {
    id: '8',
    name: 'PostgreSQL',
    description: 'Relational database',
    category: 'database',
    status: 'connected',
    icon: <SiPostgresql className="h-6 w-6" />,
    lastSync: 'Real-time',
    dataPoints: 45678,
    permissions: ['read', 'write', 'admin'],
    apiCalls: { used: 125000, limit: 500000 }
  },
  {
    id: '9',
    name: 'Zapier',
    description: 'Workflow automation platform',
    category: 'productivity',
    status: 'error',
    icon: <SiZapier className="h-6 w-6" />,
    lastSync: 'Failed 3 hours ago',
    permissions: ['zaps:read', 'zaps:write']
  }
];

export default function IntegrationsPage() {
  const [integrations] = useState<Integration[]>(mockIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: Integration['category']) => {
    switch (category) {
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'communication': return 'bg-purple-100 text-purple-800';
      case 'development': return 'bg-gray-100 text-gray-800';
      case 'storage': return 'bg-green-100 text-green-800';
      case 'payment': return 'bg-orange-100 text-orange-800';
      case 'crm': return 'bg-pink-100 text-pink-800';
      case 'database': return 'bg-indigo-100 text-indigo-800';
      case 'social': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || integration.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const totalApiCalls = integrations.filter(i => i.apiCalls).reduce((sum, i) => sum + (i.apiCalls?.used || 0), 0);
  const totalDataPoints = integrations.filter(i => i.dataPoints).reduce((sum, i) => sum + (i.dataPoints || 0), 0);

  const availableIntegrations = [
    { name: 'Asana', icon: <SiAsana className="h-6 w-6" />, category: 'productivity' },
    { name: 'Trello', icon: <FaTrello className="h-6 w-6" />, category: 'productivity' },
    { name: 'Salesforce', icon: <FaSalesforce className="h-6 w-6" />, category: 'crm' },
    { name: 'Dropbox', icon: <FaDropbox className="h-6 w-6" />, category: 'storage' },
    { name: 'Zoom', icon: <SiZoom className="h-6 w-6" />, category: 'communication' },
    { name: 'MongoDB', icon: <SiMongodb className="h-6 w-6" />, category: 'database' },
    { name: 'LinkedIn', icon: <FaLinkedin className="h-6 w-6" />, category: 'social' },
    { name: 'Twitter', icon: <FaTwitter className="h-6 w-6" />, category: 'social' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Integrations</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Connect and manage third-party services</p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#9152DE] hover:bg-[#5F29A1]">
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
              <DialogDescription>
                Choose from available integrations to connect
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <Input placeholder="Search integrations..." />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableIntegrations.map((integration, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {integration.icon}
                        </div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {integration.category}
                        </Badge>
                        <Button size="sm" className="w-full">
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Connected</p>
                <p className="text-2xl font-bold">{connectedCount}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">of {integrations.length} total</p>
              </div>
              <Link2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">API Calls</p>
                <p className="text-2xl font-bold">{(totalApiCalls / 1000).toFixed(1)}k</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">This month</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Data Synced</p>
                <p className="text-2xl font-bold">{(totalDataPoints / 1000).toFixed(1)}k</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Records</p>
              </div>
              <Database className="h-8 w-8 text-[#9152DE]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Types</p>
              </div>
              <Package className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
            <SelectItem value="communication">Communication</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="storage">Storage</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="crm">CRM</SelectItem>
            <SelectItem value="database">Database</SelectItem>
            <SelectItem value="social">Social</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="connected">Connected</SelectItem>
            <SelectItem value="disconnected">Disconnected</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Integrations Grid */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <Badge className={getCategoryColor(integration.category)} variant="outline" className="text-xs mt-1">
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status === 'connected' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {integration.status === 'error' && <XCircle className="h-3 w-3 mr-1" />}
                      {integration.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                      {integration.status}
                    </Badge>
                    {integration.lastSync && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        <RefreshCw className="h-3 w-3 inline mr-1" />
                        {integration.lastSync}
                      </span>
                    )}
                  </div>

                  {integration.apiCalls && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">API Usage</span>
                        <span className="font-medium">
                          {integration.apiCalls.used.toLocaleString()} / {integration.apiCalls.limit.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={(integration.apiCalls.used / integration.apiCalls.limit) * 100} className="h-2" />
                    </div>
                  )}

                  {integration.permissions && (
                    <div className="flex flex-wrap gap-1">
                      {integration.permissions.map((perm, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between pt-3 border-t">
                    {integration.status === 'connected' ? (
                      <>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          Disconnect
                        </Button>
                      </>
                    ) : integration.status === 'error' ? (
                      <>
                        <Button variant="outline" size="sm">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          View Error
                        </Button>
                        <Button variant="outline" size="sm">
                          Retry
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full bg-[#9152DE] hover:bg-[#5F29A1]" size="sm">
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected">
          <div className="space-y-4">
            {integrations.filter(i => i.status === 'connected').map((integration) => (
              <Card key={integration.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {integration.dataPoints && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Data Points</p>
                          <p className="font-medium">{integration.dataPoints.toLocaleString()}</p>
                        </div>
                      )}
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Webhook Endpoints</CardTitle>
                  <CardDescription>Manage incoming webhooks for real-time data</CardDescription>
                </div>
                <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Webhook className="h-5 w-5 text-[#9152DE]" />
                      <h4 className="font-medium">GitHub Push Events</h4>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Globe className="h-4 w-4" />
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                        https://api.betterflow.eu/webhooks/github/push
                      </code>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Last triggered: 2 hours ago</span>
                      <span>Total calls: 1,234</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Webhook className="h-5 w-5 text-[#9152DE]" />
                      <h4 className="font-medium">Stripe Payment Events</h4>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Globe className="h-4 w-4" />
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                        https://api.betterflow.eu/webhooks/stripe/payment
                      </code>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Last triggered: 5 hours ago</span>
                      <span>Total calls: 456</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage API keys for external access</CardDescription>
                </div>
                <Button className="bg-[#9152DE] hover:bg-[#5F29A1]">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-[#9152DE]" />
                      <h4 className="font-medium">Production API Key</h4>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono">
                        sk_live_****************************7a9b
                      </code>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Created: Jan 15, 2024</span>
                      <span>Last used: 10 minutes ago</span>
                      <span>Total requests: 45,678</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <h4 className="font-medium">Development API Key</h4>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Test Mode</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono">
                        sk_test_****************************3c4d
                      </code>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Created: Dec 10, 2023</span>
                      <span>Last used: 2 days ago</span>
                      <span>Total requests: 12,345</span>
                    </div>
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