'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Plus,
  Search,
  Download,
  Upload,
  Filter,
  Trash2,
  Edit,
  Copy,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Globe,
  Building,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  MapPin,
  Flag,
  Cake,
  Gift,
  Plane,
  Briefcase,
  Heart,
  Star,
  Sun,
  Moon,
  Cloud,
  Zap
} from 'lucide-react';

interface Holiday {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  type: 'public' | 'company' | 'department' | 'custom';
  category: 'national' | 'religious' | 'cultural' | 'company' | 'special';
  region?: string;
  departments?: string[];
  description?: string;
  recurring: boolean;
  mandatory: boolean;
  icon: string;
  color: string;
  affectedEmployees: number;
  status: 'active' | 'pending' | 'past';
}

const holidays: Holiday[] = [
  {
    id: '1',
    name: 'New Year\'s Day',
    date: '2025-01-01',
    type: 'public',
    category: 'national',
    region: 'All Regions',
    description: 'New Year celebration',
    recurring: true,
    mandatory: true,
    icon: 'sparkles',
    color: 'bg-purple-100 text-purple-700',
    affectedEmployees: 250,
    status: 'active'
  },
  {
    id: '2',
    name: 'Martin Luther King Jr. Day',
    date: '2025-01-20',
    type: 'public',
    category: 'national',
    region: 'United States',
    description: 'Federal holiday in the United States',
    recurring: true,
    mandatory: true,
    icon: 'flag',
    color: 'bg-blue-100 text-blue-700',
    affectedEmployees: 125,
    status: 'active'
  },
  {
    id: '3',
    name: 'Company Foundation Day',
    date: '2025-02-15',
    type: 'company',
    category: 'company',
    description: 'BetterFlow\'s 10th Anniversary',
    recurring: true,
    mandatory: false,
    icon: 'cake',
    color: 'bg-purple-100 text-purple-700',
    affectedEmployees: 250,
    status: 'pending'
  },
  {
    id: '4',
    name: 'Spring Break',
    date: '2025-03-24',
    endDate: '2025-03-28',
    type: 'company',
    category: 'special',
    description: 'Company-wide spring break',
    recurring: false,
    mandatory: false,
    icon: 'sun',
    color: 'bg-yellow-100 text-yellow-700',
    affectedEmployees: 250,
    status: 'pending'
  },
  {
    id: '5',
    name: 'Good Friday',
    date: '2025-04-18',
    type: 'public',
    category: 'religious',
    region: 'Multiple Regions',
    description: 'Christian holiday',
    recurring: true,
    mandatory: false,
    icon: 'heart',
    color: 'bg-pink-100 text-pink-700',
    affectedEmployees: 180,
    status: 'pending'
  },
  {
    id: '6',
    name: 'Engineering Team Day',
    date: '2025-05-15',
    type: 'department',
    category: 'special',
    departments: ['Engineering', 'DevOps'],
    description: 'Special day off for engineering teams',
    recurring: false,
    mandatory: false,
    icon: 'zap',
    color: 'bg-orange-100 text-orange-700',
    affectedEmployees: 75,
    status: 'pending'
  }
];

const upcomingHolidays = [
  { month: 'January', count: 2, holidays: ['New Year\'s Day', 'MLK Day'] },
  { month: 'February', count: 2, holidays: ['President\'s Day', 'Company Foundation'] },
  { month: 'March', count: 1, holidays: ['Spring Break'] },
  { month: 'April', count: 2, holidays: ['Good Friday', 'Easter Monday'] }
];

const holidayStats = {
  total: 15,
  public: 8,
  company: 4,
  department: 3,
  thisMonth: 2,
  nextMonth: 2,
  yearTotal: 15
};

export default function HolidaysPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('calendar');

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      sparkles: Sparkles,
      flag: Flag,
      cake: Cake,
      sun: Sun,
      heart: Heart,
      zap: Zap,
      gift: Gift,
      plane: Plane,
      briefcase: Briefcase,
      star: Star,
      moon: Moon,
      cloud: Cloud
    };
    const Icon = icons[iconName] || Calendar;
    return <Icon className="h-4 w-4" />;
  };

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         holiday.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || holiday.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || holiday.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Holidays Management</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage public holidays, company events, and special occasions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Holiday
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Holiday</DialogTitle>
                <DialogDescription>
                  Create a new holiday or special occasion for your organization
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="holiday-name">Holiday Name</Label>
                    <Input id="holiday-name" placeholder="e.g., Summer Company Picnic" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="holiday-type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public Holiday</SelectItem>
                        <SelectItem value="company">Company Holiday</SelectItem>
                        <SelectItem value="department">Department Holiday</SelectItem>
                        <SelectItem value="custom">Custom Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date (Optional)</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Brief description of the holiday" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region/Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="eu">Europe</SelectItem>
                        <SelectItem value="asia">Asia Pacific</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departments">Departments</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="recurring" className="rounded" />
                    <Label htmlFor="recurring">Recurring annually</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="mandatory" className="rounded" />
                    <Label htmlFor="mandatory">Mandatory holiday</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Add Holiday
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Holidays</CardTitle>
            <CalendarDays className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{holidayStats.total}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For year {selectedYear}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Holidays</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{holidayStats.public}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Government holidays</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company Events</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{holidayStats.company}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Organization-wide</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{holidayStats.thisMonth}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Upcoming holidays</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Holiday Calendar {selectedYear}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                  <div key={month} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{month}</h4>
                    <div className="space-y-1">
                      {holidays
                        .filter(h => {
                          const holidayMonth = new Date(h.date).getMonth();
                          return holidayMonth === index;
                        })
                        .slice(0, 3)
                        .map(holiday => (
                          <div key={holiday.id} className="flex items-center space-x-2 text-sm">
                            <span className={`w-2 h-2 rounded-full ${
                              holiday.type === 'public' ? 'bg-blue-500' :
                              holiday.type === 'company' ? 'bg-purple-500' :
                              'bg-orange-500'
                            }`} />
                            <span className="text-gray-600 dark:text-gray-400 truncate">
                              {new Date(holiday.date).getDate()} - {holiday.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Public Holiday</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Company Holiday</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>Department Holiday</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Holidays</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search holidays..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="national">National</SelectItem>
                      <SelectItem value="religious">Religious</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="special">Special</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredHolidays.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:bg-gray-900 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${holiday.color}`}>
                        {getIconComponent(holiday.icon)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{holiday.name}</h4>
                          {holiday.mandatory && (
                            <Badge variant="secondary" className="text-xs">
                              Mandatory
                            </Badge>
                          )}
                          {holiday.recurring && (
                            <Badge variant="outline" className="text-xs">
                              Recurring
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(holiday.date).toLocaleDateString()}
                            {holiday.endDate && ` - ${new Date(holiday.endDate).toLocaleDateString()}`}
                          </span>
                          {holiday.region && (
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {holiday.region}
                            </span>
                          )}
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {holiday.affectedEmployees} employees
                          </span>
                        </div>
                        {holiday.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{holiday.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          holiday.type === 'public' ? 'default' :
                          holiday.type === 'company' ? 'secondary' :
                          'outline'
                        }
                      >
                        {holiday.type}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Next 30 Days</CardTitle>
                <CardDescription>Holidays in the upcoming month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {holidays
                    .filter(h => h.status === 'active' || h.status === 'pending')
                    .slice(0, 5)
                    .map((holiday) => (
                      <div key={holiday.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded ${holiday.color}`}>
                            {getIconComponent(holiday.icon)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{holiday.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(holiday.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {holiday.affectedEmployees} affected
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Holiday distribution by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingHolidays.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{month.month}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {month.holidays.join(', ')}
                        </p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">
                        {month.count} holidays
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Impact Analysis</CardTitle>
              <CardDescription>How upcoming holidays affect different teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-2xl font-bold">250</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Employees</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold">120</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Business Hours Lost</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Building className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Offices Affected</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Department Impact</h4>
                  <div className="space-y-2">
                    {['Engineering', 'Sales', 'Marketing', 'HR'].map((dept) => (
                      <div key={dept} className="flex items-center justify-between">
                        <span className="text-sm">{dept}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.floor(Math.random() * 50 + 10)} employees
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Holiday Policies</CardTitle>
              <CardDescription>Configure how holidays are managed in your organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Auto-approve Public Holidays</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Automatically mark public holidays as approved for all employees
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Holiday Substitution</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Allow employees to substitute holidays with other working days
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Carry Forward Holiday Hours</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Allow unused holiday hours to be carried forward to next year
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <XCircle className="h-4 w-4 mr-2 text-red-600" />
                    Disabled
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">Regional Holiday Management</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Apply different holiday calendars based on employee location
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Enabled
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Holiday Notification Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-upcoming">Notify employees of upcoming holidays</Label>
                    <Select defaultValue="1week">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1day">1 day before</SelectItem>
                        <SelectItem value="3days">3 days before</SelectItem>
                        <SelectItem value="1week">1 week before</SelectItem>
                        <SelectItem value="2weeks">2 weeks before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-changes">Notify about holiday changes</Label>
                    <Select defaultValue="immediately">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="daily">Daily digest</SelectItem>
                        <SelectItem value="weekly">Weekly summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Import Holiday Calendars</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Import Public Holidays
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Custom Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}