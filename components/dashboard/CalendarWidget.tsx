'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Star, Clock, Target } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  isWeekend
} from 'date-fns';

interface CalendarDay {
  date: Date;
  hasEntry: boolean;
  holiday?: boolean;
  onLeave?: boolean;
  noEntry?: boolean;
  weekend?: boolean;
  forecast?: boolean;
  hoursWorked?: number;
  targetHours?: number;
  description?: string;
  projects?: string[];
  breaks?: number;
  efficiency?: number;
}

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data with hours worked and detailed information
  const calendarData: CalendarDay[] = [
    {
      date: new Date(2025, 8, 1),
      hasEntry: true,
      hoursWorked: 11.0,
      targetHours: 10.5,
      description: "Completed frontend development and client meetings",
      projects: ["BetterFlow UI", "Client Portal"],
      breaks: 45,
      efficiency: 92
    },
    {
      date: new Date(2025, 8, 2),
      hasEntry: true,
      hoursWorked: 12.0,
      targetHours: 11.5,
      description: "Database optimization and API improvements",
      projects: ["Backend API", "Database"],
      breaks: 30,
      efficiency: 88
    },
    {
      date: new Date(2025, 8, 3),
      hasEntry: true,
      hoursWorked: 9.0,
      targetHours: 9.8,
      description: "Bug fixes and code reviews",
      projects: ["Bug Fixes", "Code Review"],
      breaks: 60,
      efficiency: 85
    },
    {
      date: new Date(2025, 8, 4),
      hasEntry: true,
      hoursWorked: 9.0,
      targetHours: 9.5,
      description: "Team collaboration and planning session",
      projects: ["Planning", "Team Meeting"],
      breaks: 45,
      efficiency: 90
    },
    {
      date: new Date(2025, 8, 5),
      hasEntry: true,
      hoursWorked: 10.0,
      targetHours: 10.5,
      description: "Component development and testing",
      projects: ["BetterFlow UI", "Testing"],
      breaks: 30,
      efficiency: 95
    },
    { date: new Date(2025, 8, 6), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 7), hasEntry: false, weekend: true },
    {
      date: new Date(2025, 8, 8),
      hasEntry: true,
      hoursWorked: 9.0,
      targetHours: 9.9,
      description: "Authentication system improvements",
      projects: ["Auth System", "Security"],
      breaks: 40,
      efficiency: 87
    },
    {
      date: new Date(2025, 8, 9),
      hasEntry: true,
      hoursWorked: 8.0,
      targetHours: 10.0,
      description: "Documentation and user guides",
      projects: ["Documentation"],
      breaks: 75,
      efficiency: 75
    },
    {
      date: new Date(2025, 8, 10),
      hasEntry: true,
      hoursWorked: 7.0,
      targetHours: 7.8,
      description: "Client feedback integration",
      projects: ["Client Portal", "Feedback"],
      breaks: 50,
      efficiency: 82
    },
    {
      date: new Date(2025, 8, 11),
      hasEntry: true,
      hoursWorked: 13.0,
      targetHours: 13.8,
      description: "Major feature development and deployment",
      projects: ["Feature Development", "Deployment"],
      breaks: 20,
      efficiency: 96
    },
    {
      date: new Date(2025, 8, 12),
      hasEntry: true,
      hoursWorked: 13.0,
      targetHours: 13.5,
      description: "Performance optimization and monitoring",
      projects: ["Performance", "Monitoring"],
      breaks: 25,
      efficiency: 94
    },
    {
      date: new Date(2025, 8, 13),
      hasEntry: false,
      weekend: true,
      hoursWorked: 3.0,
      targetHours: 3.0,
      description: "Quick bug fix for production",
      projects: ["Emergency Fix"],
      breaks: 0,
      efficiency: 100
    },
    { date: new Date(2025, 8, 14), hasEntry: false, weekend: true },
    {
      date: new Date(2025, 8, 15),
      hasEntry: true,
      hoursWorked: 18.0,
      targetHours: 18.0,
      description: "Critical project deadline - extended work session",
      projects: ["Critical Project", "Deadline"],
      breaks: 45,
      efficiency: 89
    },
    {
      date: new Date(2025, 8, 16),
      hasEntry: true,
      hoursWorked: 15.7,
      targetHours: 15.7,
      description: "Project finalization and client presentation",
      projects: ["Project Finalization", "Client Presentation"],
      breaks: 30,
      efficiency: 91
    },
    {
      date: new Date(2025, 8, 17),
      hasEntry: true,
      hoursWorked: 0,
      targetHours: 8.0,
      description: "Current day - still working",
      projects: ["TBD"],
      breaks: 0,
      efficiency: 0
    },
    { date: new Date(2025, 8, 18), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true },
    { date: new Date(2025, 8, 19), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true },
    { date: new Date(2025, 8, 20), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 21), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 22), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true },
    { date: new Date(2025, 8, 23), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true },
    { date: new Date(2025, 8, 24), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true },
    { date: new Date(2025, 8, 25), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true },
    { date: new Date(2025, 8, 26), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true },
    { date: new Date(2025, 8, 27), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 28), hasEntry: false, weekend: true }
  ];

  const getDataForDate = (date: Date): CalendarDay | undefined => {
    return calendarData.find(item => isSameDay(item.date, date));
  };

  const handleDayClick = (dayData: CalendarDay | undefined, date: Date) => {
    if (dayData && dayData.hoursWorked !== undefined) {
      setSelectedDay(dayData);
      setIsModalOpen(true);
    }
  };

  const getAIScore = (efficiency: number, hoursWorked: number, targetHours: number, breaks: number) => {
    let score = efficiency;

    // Adjust score based on hours vs target
    const hoursRatio = hoursWorked / targetHours;
    if (hoursRatio >= 0.9 && hoursRatio <= 1.1) {
      score += 5; // Good balance
    } else if (hoursRatio < 0.8) {
      score -= 15; // Too few hours
    } else if (hoursRatio > 1.3) {
      score -= 10; // Too many hours
    }

    // Adjust for breaks (healthy breaks are good)
    if (breaks >= 30 && breaks <= 60) {
      score += 3;
    } else if (breaks > 90) {
      score -= 5;
    }

    return Math.max(0, Math.min(100, score));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Average';
    return 'Needs Improvement';
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-[#9152DE]/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-[#9152DE]" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>

        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-[#9152DE]/10 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-[#9152DE]" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
      <div className="grid grid-cols-7 gap-1 mb-3">
        {days.map((day) => (
          <div key={day} className="text-center py-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayData = getDataForDate(cloneDay);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isTodayDate = isToday(day);
        const isWeekendDay = isWeekend(day);

        let cellClasses = "relative h-16 w-full flex flex-col items-center justify-center text-sm font-medium cursor-pointer transition-all border border-gray-200 dark:border-gray-600";
        let bgColor = "";
        let textColor = "text-gray-700 dark:text-gray-300";

        if (!isCurrentMonth) {
          textColor = "text-gray-400";
        } else if (isTodayDate) {
          // Today gets purple circle background
          bgColor = "";
          textColor = "text-gray-900 dark:text-gray-100";
        } else if (dayData?.noEntry && dayData?.hoursWorked === 0 && !isWeekendDay) {
          // Days with 0 hours worked (not weekends) get red background
          bgColor = "bg-red-100 border-red-300";
          textColor = "text-red-800";
        } else if (dayData?.holiday) {
          bgColor = "bg-blue-200 border-blue-300";
          textColor = "text-blue-800";
        } else if (dayData?.weekend || isWeekendDay) {
          bgColor = "bg-blue-100 border-blue-200";
          textColor = "text-blue-700";
        } else if (dayData?.onLeave) {
          bgColor = "bg-gray-400 border-gray-500";
          textColor = "text-white";
        } else if (dayData?.forecast) {
          bgColor = "bg-green-100 border-green-200";
          textColor = "text-green-700";
        }

        days.push(
          <div
            key={day.toString()}
            className={`${cellClasses} ${bgColor} ${textColor} rounded-lg hover:opacity-80`}
            onClick={() => handleDayClick(dayData, cloneDay)}
          >
            {/* Day number */}
            {isTodayDate ? (
              <div className="w-6 h-6 bg-[#9152DE] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{format(day, 'd')}</span>
              </div>
            ) : (
              <span className="text-sm font-medium">{format(day, 'd')}</span>
            )}

            {/* Hours worked display */}
            {dayData?.hoursWorked !== undefined && dayData.hoursWorked > 0 && isCurrentMonth && (
              <div className="flex flex-col items-center text-xs mt-1">
                <span className="bg-[#5F29A1] text-white px-2 py-1 rounded-full text-xs font-medium">
                  {dayData.hoursWorked}h
                </span>
              </div>
            )}

            {dayData?.holiday && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-blue-600">
                Holiday
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-2">{rows}</div>;
  };

  // Remove the events-related code since we're using a different data structure

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Calendar Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#9152DE] rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Has Entry</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">0 Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Holiday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">On Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Weekend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">Forecast</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#9152DE] rounded-full"></div>
            <span className="text-gray-700 dark:text-gray-300">Today</span>
          </div>
        </div>
      </div>

      {/* Day Details Modal */}
      {isModalOpen && selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="!bg-white rounded-lg max-w-4xl w-full max-h-[70vh] overflow-y-auto shadow-2xl" style={{ backgroundColor: 'white' }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {format(selectedDay.date, 'EEEE, MMMM d')}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  {/* Hours Worked Section */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-5 w-5 text-[#9152DE]" />
                      <h3 className="text-lg font-medium text-gray-900">Time Summary</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Hours Worked</p>
                        <p className="text-2xl font-bold text-[#9152DE]">{selectedDay.hoursWorked}h</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Target Hours</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedDay.targetHours}h</p>
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  {selectedDay.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                      <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
                        {selectedDay.description}
                      </p>
                    </div>
                  )}

                  {/* Projects Section */}
                  {selectedDay.projects && selectedDay.projects.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Projects</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDay.projects.map((project, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#9152DE] text-white rounded-full text-sm font-medium"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div>
                  {/* Breaks Section */}
                  {selectedDay.breaks !== undefined && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Break Time</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-lg font-semibold text-gray-900">{selectedDay.breaks} minutes</p>
                        <p className="text-sm text-gray-600">
                          {selectedDay.breaks >= 30 && selectedDay.breaks <= 60 ? 'Healthy break time' :
                           selectedDay.breaks > 90 ? 'Consider reducing break time' :
                           'Consider taking more breaks'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* AI Performance Score */}
                  {selectedDay.efficiency !== undefined && selectedDay.hoursWorked !== undefined && selectedDay.targetHours !== undefined && selectedDay.breaks !== undefined && (
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Star className="h-5 w-5 text-[#9152DE]" />
                        <h3 className="text-lg font-medium text-gray-900">AI Performance Score</h3>
                      </div>
                      <div className="bg-gradient-to-r from-[#9152DE]/10 to-[#5F29A1]/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-3xl font-bold text-[#9152DE]">
                            {getAIScore(selectedDay.efficiency, selectedDay.hoursWorked, selectedDay.targetHours, selectedDay.breaks)}
                          </span>
                          <span className={`text-lg font-medium ${getScoreColor(getAIScore(selectedDay.efficiency, selectedDay.hoursWorked, selectedDay.targetHours, selectedDay.breaks))}`}>
                            {getScoreLabel(getAIScore(selectedDay.efficiency, selectedDay.hoursWorked, selectedDay.targetHours, selectedDay.breaks))}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>• Base efficiency: {selectedDay.efficiency}%</p>
                          <p>• Hours balance: {((selectedDay.hoursWorked / selectedDay.targetHours) * 100).toFixed(0)}%</p>
                          <p>• Break time: {selectedDay.breaks} minutes</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}