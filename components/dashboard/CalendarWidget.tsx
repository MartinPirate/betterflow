'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
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
  isToday
} from 'date-fns';

interface Event {
  date: Date;
  title: string;
  type: 'meeting' | 'leave' | 'holiday' | 'deadline';
}

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events: Event[] = [
    { date: new Date(), title: 'Team Standup', type: 'meeting' },
    { date: addDays(new Date(), 2), title: 'Sprint Review', type: 'meeting' },
    { date: addDays(new Date(), 5), title: 'Project Deadline', type: 'deadline' },
    { date: addDays(new Date(), 7), title: 'John - Vacation', type: 'leave' },
    { date: addDays(new Date(), 14), title: 'Company Holiday', type: 'holiday' }
  ];

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#9152DE]" />
          Calendar
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-1 hover:bg-gray-100 dark:bg-gray-800 rounded transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[120px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1 hover:bg-gray-100 dark:bg-gray-800 rounded transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{day}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const hasEvent = events.some(event => isSameDay(event.date, cloneDay));

        days.push(
          <div
            key={day.toString()}
            className={`
              relative p-2 text-center cursor-pointer transition-all
              ${!isSameMonth(day, monthStart)
                ? 'text-gray-400'
                : 'text-gray-900'
              }
              ${isSameDay(day, selectedDate)
                ? 'bg-[#9152DE]/10 text-[#9152DE] font-medium'
                : ''
              }
              ${isToday(day)
                ? 'bg-[#9152DE] text-white rounded-lg font-medium'
                : 'hover:bg-gray-100 rounded-lg'
              }
            `}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span className="text-sm">{format(day, 'd')}</span>
            {hasEvent && !isToday(day) && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#9152DE] rounded-full" />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  const todayEvents = events.filter(event => isSameDay(event.date, selectedDate));

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'leave': return 'bg-yellow-100 text-yellow-800';
      case 'holiday': return 'bg-green-100 text-green-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {todayEvents.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Events on {format(selectedDate, 'MMM d')}
          </h3>
          <div className="space-y-2">
            {todayEvents.map((event, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-lg text-xs font-medium ${getEventColor(event.type)}`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}