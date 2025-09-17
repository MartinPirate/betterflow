'use client';

import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function LeavesPage() {
  const leaveRequests = [
    {
      id: 1,
      type: 'Vacation',
      startDate: '2025-10-01',
      endDate: '2025-10-05',
      days: 5,
      status: 'approved',
      reason: 'Family vacation'
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2025-09-20',
      endDate: '2025-09-21',
      days: 2,
      status: 'pending',
      reason: 'Medical appointment'
    },
    {
      id: 3,
      type: 'Personal',
      startDate: '2025-11-15',
      endDate: '2025-11-15',
      days: 1,
      status: 'approved',
      reason: 'Personal matters'
    }
  ];

  const leaveBalance = {
    vacation: { total: 21, used: 5, remaining: 16 },
    sick: { total: 10, used: 2, remaining: 8 },
    personal: { total: 5, used: 1, remaining: 4 }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your time off and leave requests</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white rounded-lg hover:from-[#5F29A1] hover:to-[#204782] transition-all flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Request Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Vacation Days</h3>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">{leaveBalance.vacation.remaining}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(leaveBalance.vacation.used / leaveBalance.vacation.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {leaveBalance.vacation.used} used of {leaveBalance.vacation.total} days
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Sick Leave</h3>
            <Calendar className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">{leaveBalance.sick.remaining}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${(leaveBalance.sick.used / leaveBalance.sick.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {leaveBalance.sick.used} used of {leaveBalance.sick.total} days
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Personal Days</h3>
            <Calendar className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">{leaveBalance.personal.remaining}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(leaveBalance.personal.used / leaveBalance.personal.total) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {leaveBalance.personal.used} used of {leaveBalance.personal.total} days
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Leave Requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaveRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {request.startDate} to {request.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {request.days} {request.days === 1 ? 'day' : 'days'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {request.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.status === 'pending' ? (
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    ) : (
                      <button className="text-[#9152DE] hover:text-[#5F29A1]">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}