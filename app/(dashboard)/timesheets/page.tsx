'use client';

import { useState } from 'react';
import { Calendar, Clock, Copy, Download, Plus, Save, Send, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format, startOfWeek, endOfWeek, addDays, addWeeks, subWeeks, isWeekend } from 'date-fns';

interface TimesheetEntry {
  projectId: string;
  projectName: string;
  clientName: string;
  taskName: string;
  hours: { [key: string]: number };
  isNew?: boolean;
}

interface TimesheetData {
  weekStart: Date;
  weekEnd: Date;
  entries: TimesheetEntry[];
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  totalHours: number;
  submittedAt?: Date;
  approvedBy?: string;
  comments?: string;
}

const SAMPLE_PROJECTS = [
  { id: 'p1', name: 'BetterFlow UI Development', client: 'Internal' },
  { id: 'p2', name: 'NewBridge FX Platform', client: 'NewBridge FX' },
  { id: 'p3', name: 'E-commerce Website', client: 'ShopMax Inc' },
  { id: 'p4', name: 'Mobile App Development', client: 'TechStart' },
  { id: 'p5', name: 'API Integration', client: 'DataFlow Systems' },
];

export default function TimesheetsPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });

  const [timesheetData, setTimesheetData] = useState<TimesheetData>({
    weekStart,
    weekEnd,
    entries: [
      {
        projectId: 'p1',
        projectName: 'BetterFlow UI Development',
        clientName: 'Internal',
        taskName: 'Dashboard Implementation',
        hours: {
          [format(addDays(weekStart, 0), 'yyyy-MM-dd')]: 8,
          [format(addDays(weekStart, 1), 'yyyy-MM-dd')]: 7.5,
          [format(addDays(weekStart, 2), 'yyyy-MM-dd')]: 8,
          [format(addDays(weekStart, 3), 'yyyy-MM-dd')]: 6,
          [format(addDays(weekStart, 4), 'yyyy-MM-dd')]: 8,
          [format(addDays(weekStart, 5), 'yyyy-MM-dd')]: 0,
          [format(addDays(weekStart, 6), 'yyyy-MM-dd')]: 0,
        },
      },
      {
        projectId: 'p2',
        projectName: 'NewBridge FX Platform',
        clientName: 'NewBridge FX',
        taskName: 'Bug Fixes',
        hours: {
          [format(addDays(weekStart, 0), 'yyyy-MM-dd')]: 0,
          [format(addDays(weekStart, 1), 'yyyy-MM-dd')]: 0.5,
          [format(addDays(weekStart, 2), 'yyyy-MM-dd')]: 0,
          [format(addDays(weekStart, 3), 'yyyy-MM-dd')]: 2,
          [format(addDays(weekStart, 4), 'yyyy-MM-dd')]: 0,
          [format(addDays(weekStart, 5), 'yyyy-MM-dd')]: 0,
          [format(addDays(weekStart, 6), 'yyyy-MM-dd')]: 0,
        },
      },
    ],
    status: 'draft',
    totalHours: 40,
  });

  const [isAddingRow, setIsAddingRow] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const calculateDayTotal = (dayKey: string) => {
    return timesheetData.entries.reduce((sum, entry) => sum + (entry.hours[dayKey] || 0), 0);
  };

  const calculateProjectTotal = (entry: TimesheetEntry) => {
    return Object.values(entry.hours).reduce((sum, hours) => sum + hours, 0);
  };

  const calculateWeekTotal = () => {
    return timesheetData.entries.reduce((sum, entry) =>
      sum + Object.values(entry.hours).reduce((entrySum, hours) => entrySum + hours, 0), 0
    );
  };

  const handleHoursChange = (entryIndex: number, dayKey: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setTimesheetData(prev => {
      const newEntries = [...prev.entries];
      newEntries[entryIndex].hours[dayKey] = numValue;
      return { ...prev, entries: newEntries, totalHours: calculateWeekTotal() };
    });
  };

  const handleAddProject = () => {
    if (!selectedProject) return;

    const project = SAMPLE_PROJECTS.find(p => p.id === selectedProject);
    if (!project) return;

    const newEntry: TimesheetEntry = {
      projectId: project.id,
      projectName: project.name,
      clientName: project.client,
      taskName: '',
      hours: weekDays.reduce((acc, day) => {
        acc[format(day, 'yyyy-MM-dd')] = 0;
        return acc;
      }, {} as { [key: string]: number }),
      isNew: true,
    };

    setTimesheetData(prev => ({
      ...prev,
      entries: [...prev.entries, newEntry],
    }));
    setIsAddingRow(false);
    setSelectedProject('');
  };

  const handleRemoveEntry = (index: number) => {
    setTimesheetData(prev => ({
      ...prev,
      entries: prev.entries.filter((_, i) => i !== index),
    }));
  };

  const handleCopyPreviousWeek = () => {
    console.log('Copying from previous week...');
  };

  const handleSaveDraft = () => {
    setTimesheetData(prev => ({ ...prev, status: 'draft' }));
  };

  const handleSubmit = () => {
    setTimesheetData(prev => ({
      ...prev,
      status: 'submitted',
      submittedAt: new Date(),
    }));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(direction === 'prev' ? subWeeks(currentWeek, 1) : addWeeks(currentWeek, 1));
  };

  const getStatusBadge = (status: TimesheetData['status']) => {
    const variants = {
      draft: 'secondary',
      submitted: 'default',
      approved: 'success',
      rejected: 'destructive',
    } as const;

    return <Badge variant={variants[status] as any}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timesheets</h1>
          <p className="text-muted-foreground">Track your time across projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Timer
          </Button>
        </div>
      </div>

      {/* Week Navigation */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateWeek('prev')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous Week
            </Button>

            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">
                {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
              </h2>
              {getStatusBadge(timesheetData.status)}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateWeek('next')}
            >
              Next Week
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timesheet Grid */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Timesheet</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPreviousWeek}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Previous Week
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 min-w-[250px]">Project / Task</th>
                  {weekDays.map((day) => (
                    <th
                      key={format(day, 'yyyy-MM-dd')}
                      className={cn(
                        "text-center p-2 min-w-[80px]",
                        isWeekend(day) && "bg-muted/50"
                      )}
                    >
                      <div className="text-xs text-muted-foreground">
                        {format(day, 'EEE')}
                      </div>
                      <div className="text-sm font-semibold">
                        {format(day, 'd')}
                      </div>
                    </th>
                  ))}
                  <th className="text-center p-2 min-w-[80px]">Total</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {timesheetData.entries.map((entry, entryIndex) => (
                  <tr key={entryIndex} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{entry.projectName}</div>
                        <div className="text-sm text-muted-foreground">
                          {entry.clientName} • {entry.taskName || 'General'}
                        </div>
                      </div>
                    </td>
                    {weekDays.map((day) => {
                      const dayKey = format(day, 'yyyy-MM-dd');
                      return (
                        <td
                          key={dayKey}
                          className={cn(
                            "p-1",
                            isWeekend(day) && "bg-muted/50"
                          )}
                        >
                          <Input
                            type="number"
                            step="0.5"
                            min="0"
                            max="24"
                            value={entry.hours[dayKey] || ''}
                            onChange={(e) => handleHoursChange(entryIndex, dayKey, e.target.value)}
                            className="w-full text-center h-8"
                            disabled={timesheetData.status !== 'draft'}
                          />
                        </td>
                      );
                    })}
                    <td className="p-2 text-center font-semibold">
                      {calculateProjectTotal(entry)}h
                    </td>
                    <td className="p-2">
                      {timesheetData.status === 'draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveEntry(entryIndex)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Add new row */}
                {isAddingRow && (
                  <tr className="border-b bg-muted/30">
                    <td className="p-2">
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project..." />
                        </SelectTrigger>
                        <SelectContent>
                          {SAMPLE_PROJECTS.filter(
                            p => !timesheetData.entries.some(e => e.projectId === p.id)
                          ).map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name} - {project.client}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td colSpan={8} className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleAddProject}>
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIsAddingRow(false);
                            setSelectedProject('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Day totals */}
                <tr className="font-semibold bg-muted/50">
                  <td className="p-2">Daily Total</td>
                  {weekDays.map((day) => {
                    const dayKey = format(day, 'yyyy-MM-dd');
                    const dayTotal = calculateDayTotal(dayKey);
                    return (
                      <td
                        key={dayKey}
                        className={cn(
                          "p-2 text-center",
                          isWeekend(day) && "bg-muted/70",
                          dayTotal > 8 && "text-orange-600",
                          dayTotal > 10 && "text-red-600"
                        )}
                      >
                        {dayTotal}h
                      </td>
                    );
                  })}
                  <td className="p-2 text-center bg-primary/10">
                    {calculateWeekTotal()}h
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {timesheetData.status === 'draft' && (
            <div className="mt-4 flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddingRow(true)}
                disabled={isAddingRow}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button onClick={handleSubmit}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit for Approval
                </Button>
              </div>
            </div>
          )}

          {timesheetData.status === 'submitted' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                Timesheet submitted on {timesheetData.submittedAt && format(timesheetData.submittedAt, 'PPpp')}.
                Awaiting approval from your manager.
              </p>
            </div>
          )}

          {timesheetData.status === 'approved' && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-900">
                Timesheet approved by {timesheetData.approvedBy || 'Manager'}.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Week Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateWeekTotal()}h</div>
            <p className="text-xs text-muted-foreground">
              Target: 40h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Overtime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(0, calculateWeekTotal() - 40)}h
            </div>
            <p className="text-xs text-muted-foreground">
              Above standard hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timesheetData.entries.length}</div>
            <p className="text-xs text-muted-foreground">
              Active this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {getStatusBadge(timesheetData.status)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last saved: Just now
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}