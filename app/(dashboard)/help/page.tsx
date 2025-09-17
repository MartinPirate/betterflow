'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  HelpCircle,
  Book,
  MessageSquare,
  Phone,
  Mail,
  Video,
  Search,
  ChevronRight,
  Download,
  ExternalLink,
  Star,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  Shield,
  Zap,
  Settings,
  FileText,
  PlayCircle,
  BookOpen,
  Headphones,
  Send,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Rocket,
  Target,
  Award,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  BarChart,
  Briefcase
} from 'lucide-react';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I clock in and out?',
        a: 'Navigate to the Dashboard and use the Clock In/Out widget. Click the button to start/stop your timer.',
        helpful: 45,
        notHelpful: 2
      },
      {
        q: 'How do I submit my timesheet?',
        a: 'Go to Timesheets, fill in your hours for each project, and click Submit at the bottom of the page.',
        helpful: 38,
        notHelpful: 1
      },
      {
        q: 'How do I request leave?',
        a: 'Visit the Leaves page and click "Request Leave". Select your dates and leave type, then submit.',
        helpful: 52,
        notHelpful: 0
      }
    ]
  },
  {
    category: 'Account & Settings',
    questions: [
      {
        q: 'How do I change my password?',
        a: 'Go to Settings > Security tab, and click on "Change Password". Enter your current and new password.',
        helpful: 31,
        notHelpful: 3
      },
      {
        q: 'How do I update my profile information?',
        a: 'Navigate to Settings > Profile tab to update your personal information and preferences.',
        helpful: 28,
        notHelpful: 1
      },
      {
        q: 'How do I enable two-factor authentication?',
        a: 'In Settings > Security, toggle on "Two-Factor Authentication" and follow the setup instructions.',
        helpful: 42,
        notHelpful: 0
      }
    ]
  },
  {
    category: 'Projects & Tasks',
    questions: [
      {
        q: 'How do I view my assigned projects?',
        a: 'Go to the Projects page to see all projects assigned to you, along with their status and deadlines.',
        helpful: 36,
        notHelpful: 2
      },
      {
        q: 'How do I track time against a project?',
        a: 'In your Timesheet, select the project from the dropdown and enter the hours worked each day.',
        helpful: 44,
        notHelpful: 1
      }
    ]
  }
];

const guides = [
  {
    title: 'Quick Start Guide',
    description: 'Get up and running with BetterFlow in 5 minutes',
    icon: Rocket,
    duration: '5 min read',
    type: 'beginner'
  },
  {
    title: 'Time Management Best Practices',
    description: 'Learn how to effectively track and manage your time',
    icon: Clock,
    duration: '10 min read',
    type: 'intermediate'
  },
  {
    title: 'Project Collaboration Guide',
    description: 'Master team collaboration and project management',
    icon: Users,
    duration: '15 min read',
    type: 'advanced'
  },
  {
    title: 'Leave Management Tutorial',
    description: 'Everything you need to know about requesting and managing leaves',
    icon: Calendar,
    duration: '8 min read',
    type: 'beginner'
  },
  {
    title: 'Reports & Analytics',
    description: 'Generate insights from your data with powerful reports',
    icon: BarChart,
    duration: '12 min read',
    type: 'intermediate'
  },
  {
    title: 'Admin Configuration',
    description: 'Complete guide for system administrators',
    icon: Shield,
    duration: '20 min read',
    type: 'advanced'
  }
];

const videos = [
  {
    title: 'Welcome to BetterFlow',
    thumbnail: '/api/placeholder/400/225',
    duration: '3:45',
    views: 1234,
    category: 'Getting Started'
  },
  {
    title: 'Managing Your Timesheet',
    thumbnail: '/api/placeholder/400/225',
    duration: '5:20',
    views: 892,
    category: 'Features'
  },
  {
    title: 'Project Overview Walkthrough',
    thumbnail: '/api/placeholder/400/225',
    duration: '7:15',
    views: 567,
    category: 'Features'
  },
  {
    title: 'Setting Up Integrations',
    thumbnail: '/api/placeholder/400/225',
    duration: '9:30',
    views: 445,
    category: 'Advanced'
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: '',
    description: ''
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
          <p className="text-gray-500">
            Get help, browse guides, and contact our support team
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Book className="mr-2 h-4 w-4" />
            Documentation
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search for help articles, guides, or FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-6 text-lg"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Knowledge Base</CardTitle>
            <Book className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-gray-500 mt-1">Articles available</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Tutorials</CardTitle>
            <PlayCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-gray-500 mt-1">Video guides</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-gray-500 mt-1">Support response</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-gray-500 mt-1">User rating</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((category) => (
                <div key={category.category} className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-purple-600" />
                    {category.category}
                  </h3>
                  <div className="space-y-3 ml-7">
                    {category.questions.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                        <button className="w-full text-left">
                          <h4 className="font-medium mb-2">{item.q}</h4>
                          <p className="text-sm text-gray-600 mb-3">{item.a}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{item.helpful}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
                              <ThumbsDown className="h-3 w-3" />
                              <span>{item.notHelpful}</span>
                            </button>
                            <span className="text-gray-400">Was this helpful?</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides & Documentation</CardTitle>
              <CardDescription>Comprehensive guides to help you master BetterFlow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide, index) => {
                  const Icon = guide.icon;
                  return (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          guide.type === 'beginner' ? 'bg-green-100 text-green-600' :
                          guide.type === 'intermediate' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{guide.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{guide.duration}</span>
                            <Badge variant={
                              guide.type === 'beginner' ? 'secondary' :
                              guide.type === 'intermediate' ? 'outline' : 'default'
                            }>
                              {guide.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Popular resources and downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                <Button variant="outline" className="justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download User Manual (PDF)
                </Button>
                <Button variant="outline" className="justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  API Documentation
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Release Notes
                </Button>
                <Button variant="outline" className="justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Watch and learn with our video guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {videos.map((video, index) => (
                  <div key={index} className="space-y-2 cursor-pointer group">
                    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <h4 className="font-medium text-sm">{video.title}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.category}</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Mail className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Get help via email</p>
                <p className="font-medium">support@betterflow.eu</p>
                <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Chat with our team</p>
                <p className="font-medium">Available 9 AM - 6 PM EST</p>
                <p className="text-xs text-gray-500 mt-1">Instant responses</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Phone className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Phone Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Call us directly</p>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9 AM - 6 PM EST</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>Can\'t find what you\'re looking for? Create a support ticket</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={ticketForm.category}
                    onValueChange={(value) => setTicketForm({...ticketForm, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="account">Account & Billing</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={ticketForm.priority}
                    onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue..."
                  rows={5}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Average response time: 2-4 hours during business hours
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}