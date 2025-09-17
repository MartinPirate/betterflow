'use client';

import { useState } from 'react';
import {
  Calendar, Plus, Clock, CheckCircle, XCircle, Users, AlertCircle,
  ChevronLeft, ChevronRight, Search, Filter, Download, Eye, Edit, Trash2,
  ChevronDown, MoreVertical, CalendarDays, UserCheck, UserX
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval,
         isSameMonth, isToday, parseISO, isWeekend, startOfWeek, endOfWeek, differenceInDays } from 'date-fns';

interface LeaveRequest {
  id: number;
  employee: string;
  avatar?: string;
  type: 'annual' | 'sick' | 'personal' | 'other';
  startDate: string;
  endDate: string;
  days: number;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
  department: string;
  requestedOn: string;
  approvedBy?: string;
  manager?: string;
}

export default function LeavesPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedStatus, setSelectedStatus] = useState('Any Status');
  const [selectedPeriod, setSelectedPeriod] = useState('All Time');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('all');
  const itemsPerPage = 10;

  // Extended leave requests data
  const allLeaveRequests: LeaveRequest[] = [
    {
      id: 1,
      employee: 'Catalina Cump',
      type: 'annual',
      startDate: '2025-09-22',
      endDate: '2025-09-26',
      days: 5,
      status: 'approved',
      reason: 'Family vacation to Europe',
      department: 'Engineering',
      requestedOn: '2025-09-01',
      approvedBy: 'John Manager',
      manager: 'John Manager'
    },
    {
      id: 2,
      employee: 'Valerian Roca',
      type: 'sick',
      startDate: '2025-09-19',
      endDate: '2025-09-20',
      days: 2,
      status: 'approved',
      reason: 'Medical appointment',
      department: 'Marketing',
      requestedOn: '2025-09-18',
      approvedBy: 'Sarah Johnson',
      manager: 'Sarah Johnson'
    },
    {
      id: 3,
      employee: 'Claudia Malau',
      type: 'annual',
      startDate: '2025-10-01',
      endDate: '2025-10-10',
      days: 8,
      status: 'pending',
      reason: 'Annual vacation',
      department: 'Sales',
      requestedOn: '2025-09-15',
      manager: 'Mike Wilson'
    },
    {
      id: 4,
      employee: 'John Doe',
      type: 'personal',
      startDate: '2025-09-25',
      endDate: '2025-09-25',
      days: 1,
      status: 'approved',
      reason: 'Personal matters',
      department: 'Finance',
      requestedOn: '2025-09-20',
      approvedBy: 'Alice Brown',
      manager: 'Alice Brown'
    },
    {
      id: 5,
      employee: 'Jane Smith',
      type: 'sick',
      startDate: '2025-09-18',
      endDate: '2025-09-18',
      days: 1,
      status: 'rejected',
      reason: 'Flu symptoms',
      department: 'HR',
      requestedOn: '2025-09-17',
      manager: 'Tom Davis'
    },
    {
      id: 6,
      employee: 'Michael Brown',
      type: 'annual',
      startDate: '2025-10-15',
      endDate: '2025-10-25',
      days: 9,
      status: 'pending',
      reason: 'Trip to Asia',
      department: 'Engineering',
      requestedOn: '2025-09-10',
      manager: 'John Manager'
    },
    {
      id: 7,
      employee: 'Emily Johnson',
      type: 'personal',
      startDate: '2025-09-28',
      endDate: '2025-09-29',
      days: 2,
      status: 'approved',
      reason: 'Family emergency',
      department: 'Marketing',
      requestedOn: '2025-09-25',
      approvedBy: 'Sarah Johnson',
      manager: 'Sarah Johnson'
    },
    {
      id: 8,
      employee: 'David Wilson',
      type: 'annual',
      startDate: '2025-11-20',
      endDate: '2025-11-30',
      days: 9,
      status: 'pending',
      reason: 'Thanksgiving holidays',
      department: 'Sales',
      requestedOn: '2025-09-05',
      manager: 'Mike Wilson'
    },
    {
      id: 9,
      employee: 'Sophie Martinez',
      type: 'sick',
      startDate: '2025-09-17',
      endDate: '2025-09-17',
      days: 1,
      status: 'approved',
      reason: 'Doctor appointment',
      department: 'Finance',
      requestedOn: '2025-09-16',
      approvedBy: 'Alice Brown',
      manager: 'Alice Brown'
    },
    {
      id: 10,
      employee: 'Robert Lee',
      type: 'annual',
      startDate: '2025-12-20',
      endDate: '2025-12-31',
      days: 8,
      status: 'pending',
      reason: 'Christmas holidays',
      department: 'Engineering',
      requestedOn: '2025-09-01',
      manager: 'John Manager'
    }
  ];

  // Filter requests based on selected tab
  const getFilteredRequests = () => {
    switch (selectedTab) {
      case 'active':
        return allLeaveRequests.filter(r => {
          const today = new Date();
          const start = parseISO(r.startDate);
          const end = parseISO(r.endDate);
          return start <= today && end >= today && r.status === 'approved';
        });
      case 'upcoming':
        return allLeaveRequests.filter(r => {
          const today = new Date();
          const start = parseISO(r.startDate);
          return start > today && r.status === 'approved';
        });
      case 'rejected':
        return allLeaveRequests.filter(r => r.status === 'rejected');
      default:
        return allLeaveRequests;
    }
  };

  const filteredRequests = getFilteredRequests();
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats
  const activeLeaves = allLeaveRequests.filter(l => {
    const today = new Date();
    const start = parseISO(l.startDate);
    const end = parseISO(l.endDate);
    return start <= today && end >= today && l.status === 'approved';
  });

  const upcomingLeaves = allLeaveRequests.filter(l => {
    const today = new Date();
    const start = parseISO(l.startDate);
    return start > today && l.status === 'approved';
  });

  const rejectedRequests = allLeaveRequests.filter(l => l.status === 'rejected');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'annual': return 'bg-purple-100 text-purple-800';
      case 'sick': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-green-100 text-green-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Leave Management</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage team leaves and requests</p>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white rounded-xl font-semibold hover:from-[#5F29A1] hover:to-[#204782] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            REQUEST LEAVE
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <div className="flex-1 min-w-[200px]">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
            >
              <option>All Users</option>
              <option>Catalina Cump</option>
              <option>Valerian Roca</option>
              <option>Claudia Malau</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
            >
              <option>Any Status</option>
              <option>Approved</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
            >
              <option>All Time</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>Next Month</option>
              <option>This Year</option>
            </select>
          </div>

          <button className="px-5 py-2 bg-[#9152DE] text-white rounded-lg font-medium hover:bg-[#5F29A1] transition-all duration-200 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Apply
          </button>

          <button className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <Filter className="h-5 w-5" />
          </button>
        </div>

        {/* Stats Cards - Now Visible and Clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('all')}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 ${
              selectedTab === 'all' ? 'border-[#9152DE] shadow-[#9152DE]/20' : 'border-gray-200 dark:border-gray-700'
            } cursor-pointer hover:scale-105 transform`}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-[#9152DE] mb-2">
                {allLeaveRequests.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">All Leaves</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedTab('active')}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 ${
              selectedTab === 'active' ? 'border-green-500 shadow-green-500/20' : 'border-gray-200 dark:border-gray-700'
            } cursor-pointer hover:scale-105 transform`}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">
                {activeLeaves.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Active Leaves</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedTab('upcoming')}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 ${
              selectedTab === 'upcoming' ? 'border-blue-500 shadow-blue-500/20' : 'border-gray-200 dark:border-gray-700'
            } cursor-pointer hover:scale-105 transform`}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {upcomingLeaves.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Upcoming Leaves</p>
            </div>
          </button>

          <button
            onClick={() => setSelectedTab('rejected')}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-200 border-2 ${
              selectedTab === 'rejected' ? 'border-red-500 shadow-red-500/20' : 'border-gray-200 dark:border-gray-700'
            } cursor-pointer hover:scale-105 transform`}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-red-600 mb-2">
                {rejectedRequests.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Rejected</p>
            </div>
          </button>
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Leave Requests
                <span className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-400">
                  ({filteredRequests.length} total)
                </span>
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                          {request.employee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {request.employee}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {request.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getTypeColor(request.type)}`}>
                        {request.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {format(parseISO(request.startDate), 'MMM d')} - {format(parseISO(request.endDate), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {request.days}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                        {request.reason}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {request.manager}
                      </div>
                      {request.approvedBy && (
                        <div className="text-xs text-green-600">
                          ✓ {request.approvedBy}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-[#9152DE] transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button className="text-gray-400 hover:text-blue-600 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredRequests.length)}
                </span>{' '}
                of <span className="font-medium">{filteredRequests.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#9152DE] text-white'
                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Leave Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Request Leave</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Leave request form would go here...</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#9152DE] text-white rounded-lg hover:bg-[#5F29A1]">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}