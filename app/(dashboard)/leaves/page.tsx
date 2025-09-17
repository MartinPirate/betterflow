'use client';

import { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle, CalendarDays, User, Building, FileText, TrendingUp, Users, X, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, differenceInDays, isWeekend, eachDayOfInterval, parseISO, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface LeaveRequest {
  id: number;
  type: 'vacation' | 'sick' | 'personal' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  reason: string;
  requestedOn: string;
  approvedBy?: string;
  comments?: string;
  employee?: string;
  department?: string;
}

export default function LeavesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [leaveType, setLeaveType] = useState('vacation');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  // Sample leave requests data
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      type: 'vacation',
      startDate: '2025-10-01',
      endDate: '2025-10-05',
      days: 5,
      status: 'approved',
      reason: 'Family vacation to Europe',
      requestedOn: '2025-09-01',
      approvedBy: 'Sarah Johnson',
      employee: 'John Doe',
      department: 'Engineering'
    },
    {
      id: 2,
      type: 'sick',
      startDate: '2025-09-20',
      endDate: '2025-09-21',
      days: 2,
      status: 'pending',
      reason: 'Medical appointment and recovery',
      requestedOn: '2025-09-18',
      employee: 'Jane Smith',
      department: 'Marketing'
    },
    {
      id: 3,
      type: 'personal',
      startDate: '2025-11-15',
      endDate: '2025-11-15',
      days: 1,
      status: 'approved',
      reason: 'Personal matters',
      requestedOn: '2025-11-01',
      approvedBy: 'Mike Wilson',
      employee: 'Bob Johnson',
      department: 'Sales'
    },
    {
      id: 4,
      type: 'vacation',
      startDate: '2025-12-20',
      endDate: '2025-12-31',
      days: 8,
      status: 'pending',
      reason: 'Holiday break with family',
      requestedOn: '2025-09-15',
      employee: 'Alice Brown',
      department: 'HR'
    },
    {
      id: 5,
      type: 'sick',
      startDate: '2025-08-15',
      endDate: '2025-08-16',
      days: 2,
      status: 'rejected',
      reason: 'Flu symptoms',
      requestedOn: '2025-08-14',
      comments: 'Please provide medical certificate',
      employee: 'Tom Davis',
      department: 'Finance'
    }
  ]);

  const leaveBalance = {
    vacation: { total: 21, used: 5, remaining: 16 },
    sick: { total: 10, used: 2, remaining: 8 },
    personal: { total: 5, used: 1, remaining: 4 },
    unpaid: { total: 'Unlimited', used: 0, remaining: 'Unlimited' }
  };

  const upcomingHolidays = [
    { date: '2025-10-31', name: 'Halloween' },
    { date: '2025-11-27', name: 'Thanksgiving' },
    { date: '2025-12-25', name: 'Christmas Day' },
    { date: '2025-12-31', name: 'New Year\'s Eve' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getStatusBadge = (status: LeaveRequest['status']) => {
    const variants = {
      approved: 'success',
      rejected: 'destructive',
      pending: 'warning',
      cancelled: 'secondary'
    } as const;

    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  const getTypeColor = (type: LeaveRequest['type']) => {
    const colors = {
      vacation: 'bg-blue-100 text-blue-800',
      sick: 'bg-red-100 text-red-800',
      personal: 'bg-green-100 text-green-800',
      unpaid: 'bg-gray-100 text-gray-800'
    };
    return colors[type];
  };

  const filteredRequests = leaveRequests.filter(request => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'ongoing') {
      const today = new Date().toISOString().split('T')[0];
      return request.startDate <= today && request.endDate >= today && request.status === 'approved';
    }
    if (selectedTab === 'upcoming') {
      const today = new Date().toISOString().split('T')[0];
      return request.startDate > today && request.status === 'approved';
    }
    if (selectedTab === 'rejected') return request.status === 'rejected';
    return true;
  });

  const calculateWorkingDays = (start: string, end: string) => {
    if (!start || !end) return 0;

    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.filter(day => !isWeekend(day)).length;
  };

  const handleSubmitRequest = () => {
    const workingDays = calculateWorkingDays(startDate, endDate);

    const newRequest: LeaveRequest = {
      id: leaveRequests.length + 1,
      type: leaveType as LeaveRequest['type'],
      startDate,
      endDate,
      days: workingDays,
      status: 'pending',
      reason,
      requestedOn: new Date().toISOString().split('T')[0],
      employee: 'Current User',
      department: 'Engineering'
    };

    setLeaveRequests([...leaveRequests, newRequest]);
    setIsModalOpen(false);
    setLeaveType('vacation');
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const handleCancelRequest = (id: number) => {
    setLeaveRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: 'cancelled' as const } : req
      )
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Track and manage your time off</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Request Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Request Time Off</DialogTitle>
                <DialogDescription>
                  Submit a new leave request for approval
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start" className="text-right">
                    Start Date
                  </Label>
                  <Input
                    id="start"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end" className="text-right">
                    End Date
                  </Label>
                  <Input
                    id="end"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="col-span-3"
                  />
                </div>
                {startDate && endDate && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Days</Label>
                    <div className="col-span-3">
                      <Badge variant="secondary">
                        {calculateWorkingDays(startDate, endDate)} working days
                      </Badge>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reason" className="text-right">
                    Reason
                  </Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please provide a reason for your leave request..."
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRequest} disabled={!startDate || !endDate || !reason}>
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Vacation Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveBalance.vacation.remaining}</div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(leaveBalance.vacation.used / leaveBalance.vacation.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {leaveBalance.vacation.used} used of {leaveBalance.vacation.total}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveBalance.sick.remaining}</div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(leaveBalance.sick.used / leaveBalance.sick.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {leaveBalance.sick.used} used of {leaveBalance.sick.total}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Personal Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveBalance.personal.remaining}</div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(leaveBalance.personal.used / leaveBalance.personal.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {leaveBalance.personal.used} used of {leaveBalance.personal.total}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Upcoming Holidays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingHolidays.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Next: {upcomingHolidays[0].name}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(parseISO(upcomingHolidays[0].date), 'MMM d')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Leave Requests</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                All ({leaveRequests.length})
              </TabsTrigger>
              <TabsTrigger value="ongoing">
                Ongoing ({leaveRequests.filter(r => {
                  const today = new Date().toISOString().split('T')[0];
                  return r.startDate <= today && r.endDate >= today && r.status === 'approved';
                }).length})
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Upcoming ({leaveRequests.filter(r => {
                  const today = new Date().toISOString().split('T')[0];
                  return r.startDate > today && r.status === 'approved';
                }).length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({leaveRequests.filter(r => r.status === 'rejected').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-4">
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {getStatusIcon(request.status)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{request.employee || 'You'}</span>
                          <Badge className={cn("text-xs", getTypeColor(request.type))}>
                            {request.type}
                          </Badge>
                          {getStatusBadge(request.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(parseISO(request.startDate), 'MMM d, yyyy')} - {format(parseISO(request.endDate), 'MMM d, yyyy')}
                          <span className="ml-2">({request.days} {request.days === 1 ? 'day' : 'days'})</span>
                        </div>
                        <div className="text-sm">{request.reason}</div>
                        {request.approvedBy && (
                          <div className="text-xs text-muted-foreground">
                            Approved by {request.approvedBy}
                          </div>
                        )}
                        {request.comments && (
                          <div className="text-xs text-muted-foreground italic">
                            "{request.comments}"
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelRequest(request.id)}
                          >
                            Cancel
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </>
                      )}
                      {request.status !== 'pending' && (
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {filteredRequests.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No leave requests found</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Team Calendar Preview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Calendar
          </CardTitle>
          <CardDescription>See who's out in your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => {
              const date = addDays(new Date(), i);
              const dayRequests = leaveRequests.filter(r => {
                const reqStart = parseISO(r.startDate);
                const reqEnd = parseISO(r.endDate);
                return date >= reqStart && date <= reqEnd && r.status === 'approved';
              });

              return (
                <div key={i} className={cn(
                  "p-3 border rounded-lg text-center",
                  isWeekend(date) && "bg-muted/50"
                )}>
                  <div className="text-xs text-muted-foreground">
                    {format(date, 'EEE')}
                  </div>
                  <div className="text-lg font-semibold">
                    {format(date, 'd')}
                  </div>
                  {dayRequests.length > 0 && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {dayRequests.length} out
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}