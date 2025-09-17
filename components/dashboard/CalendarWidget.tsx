'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
}

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Sample data with hours worked based on the screenshot
  const calendarData: CalendarDay[] = [
    { date: new Date(2025, 8, 1), hasEntry: true, hoursWorked: 11.0, targetHours: 10.5 },
    { date: new Date(2025, 8, 2), hasEntry: true, hoursWorked: 12.0, targetHours: 11.5 },
    { date: new Date(2025, 8, 3), hasEntry: true, hoursWorked: 9.0, targetHours: 9.8 },
    { date: new Date(2025, 8, 4), hasEntry: true, hoursWorked: 9.0, targetHours: 9.5 },
    { date: new Date(2025, 8, 5), hasEntry: true, hoursWorked: 10.0, targetHours: 10.5 },
    { date: new Date(2025, 8, 6), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 7), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 8), hasEntry: true, hoursWorked: 9.0, targetHours: 9.9 },
    { date: new Date(2025, 8, 9), hasEntry: true, hoursWorked: 8.0, targetHours: 10.0 },
    { date: new Date(2025, 8, 10), hasEntry: true, hoursWorked: 7.0, targetHours: 7.8 },
    { date: new Date(2025, 8, 11), hasEntry: true, hoursWorked: 13.0, targetHours: 13.8 },
    { date: new Date(2025, 8, 12), hasEntry: true, hoursWorked: 13.0, targetHours: 13.5 },
    { date: new Date(2025, 8, 13), hasEntry: false, weekend: true, hoursWorked: 3.0, targetHours: 3.0 },
    { date: new Date(2025, 8, 14), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 15), hasEntry: true, hoursWorked: 18.0, targetHours: 18.0 },
    { date: new Date(2025, 8, 16), hasEntry: true, hoursWorked: 15.7, targetHours: 15.7 },
    { date: new Date(2025, 8, 17), hasEntry: true, hoursWorked: 0, targetHours: 8.0 }, // Today - current
    { date: new Date(2025, 8, 18), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true }, // 0 hours, not weekend
    { date: new Date(2025, 8, 19), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true }, // 0 hours, not weekend
    { date: new Date(2025, 8, 20), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 21), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 22), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true }, // 0 hours, not weekend
    { date: new Date(2025, 8, 23), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true }, // 0 hours, not weekend
    { date: new Date(2025, 8, 24), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true }, // 0 hours, not weekend
    { date: new Date(2025, 8, 25), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true }, // 0 hours, not weekend
    { date: new Date(2025, 8, 26), hasEntry: false, hoursWorked: 0, targetHours: 8.0, noEntry: true }, // 0 hours, not weekend
    { date: new Date(2025, 8, 27), hasEntry: false, weekend: true },
    { date: new Date(2025, 8, 28), hasEntry: false, weekend: true }
  ];

  const getDataForDate = (date: Date): CalendarDay | undefined => {
    return calendarData.find(item => isSameDay(item.date, date));
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
    </div>
  );
}