'use client';

import { Clock, Calendar, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { format, startOfWeek, addDays } from 'date-fns';

export default function TimesheetsPage() {
  const currentWeek = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const projects = [
    { id: 1, name: 'Project Alpha', client: 'NewbridgeFX' },
    { id: 2, name: 'Beta Platform', client: 'TechCorp' },
    { id: 3, name: 'Internal Meeting', client: 'BetterFlow' }
  ];

  const timeEntries = {
    1: [8, 8, 7.5, 8, 8, 0, 0],
    2: [0, 0, 0.5, 0, 0, 0, 0],
    3: [0.5, 0.5, 0.5, 0.5, 0.5, 0, 0]
  };

  const dayTotals = weekDays.map((_, dayIndex) =>
    Object.values(timeEntries).reduce((sum, hours) => sum + hours[dayIndex], 0)
  );

  const weekTotal = dayTotals.reduce((sum, hours) => sum + hours, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timesheets</h1>
          <p className="mt-1 text-sm text-gray-600">Track your time for Week {format(currentWeek, 'w, yyyy')}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Start Timer
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white rounded-lg hover:from-[#5F29A1] hover:to-[#204782] transition-all flex items-center gap-2">
            <Save className="h-5 w-5" />
            Submit Timesheet
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {format(currentWeek, 'MMM d')} - {format(addDays(currentWeek, 6), 'MMM d, yyyy')}
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold text-gray-900">{weekTotal} hours</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Project</th>
                {weekDays.map((day) => (
                  <th key={day.toString()} className="text-center py-3 px-2 text-sm font-medium text-gray-900">
                    <div>{format(day, 'EEE')}</div>
                    <div className="text-xs text-gray-500">{format(day, 'dd')}</div>
                  </th>
                ))}
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    <div className="text-xs text-gray-500">{project.client}</div>
                  </td>
                  {timeEntries[project.id].map((hours, index) => (
                    <td key={index} className="py-3 px-2">
                      <input
                        type="number"
                        value={hours || ''}
                        placeholder="0"
                        className="w-full text-center text-sm py-1 px-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
                        step="0.5"
                        min="0"
                        max="24"
                      />
                    </td>
                  ))}
                  <td className="py-3 px-4 text-center text-sm font-medium text-gray-900">
                    {timeEntries[project.id].reduce((sum, h) => sum + h, 0)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">Daily Total</td>
                {dayTotals.map((total, index) => (
                  <td key={index} className="py-3 px-2 text-center font-medium text-gray-900">
                    {total}
                  </td>
                ))}
                <td className="py-3 px-4 text-center font-bold text-[#9152DE]">
                  {weekTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button className="text-sm text-[#9152DE] hover:text-[#5F29A1] font-medium">
            + Add Project
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Status:</span>
            <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
              Draft
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}