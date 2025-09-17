'use client';

import { Users, Home, Coffee, Calendar, Briefcase, Heart } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline' | 'leave' | 'remote';
  department: string;
  currentTask?: string;
}

export default function TeamStatusWidget() {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      status: 'online',
      department: 'Management',
      currentTask: 'Reviewing Q4 reports'
    },
    {
      id: '2',
      name: 'John Doe',
      status: 'away',
      department: 'Development',
      currentTask: 'Coffee break'
    },
    {
      id: '3',
      name: 'Emily Chen',
      status: 'leave',
      department: 'Design',
    },
    {
      id: '4',
      name: 'Michael Brown',
      status: 'remote',
      department: 'Marketing',
      currentTask: 'Campaign planning'
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      status: 'online',
      department: 'Development',
      currentTask: 'Code review'
    },
    {
      id: '6',
      name: 'David Wilson',
      status: 'offline',
      department: 'Sales',
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'away': return <Coffee className="h-3 w-3 text-yellow-500" />;
      case 'offline': return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
      case 'leave': return <Calendar className="h-3 w-3 text-blue-500" />;
      case 'remote': return <Home className="h-3 w-3 text-purple-500" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Available';
      case 'away': return 'Away';
      case 'offline': return 'Offline';
      case 'leave': return 'On Leave';
      case 'remote': return 'Working Remote';
      default: return status;
    }
  };

  const onlineCount = teamMembers.filter(m => m.status === 'online').length;
  const totalCount = teamMembers.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Users className="h-5 w-5 text-[#9152DE]" />
          Team Status
        </h2>
        <span className="text-sm text-gray-500">
          {onlineCount}/{totalCount} online
        </span>
      </div>

      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                  {getStatusIcon(member.status)}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                <p className="text-xs text-gray-500">
                  {member.currentTask || getStatusText(member.status)}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{member.department}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-600">Available ({teamMembers.filter(m => m.status === 'online').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="h-3 w-3 text-yellow-500" />
            <span className="text-gray-600">Away ({teamMembers.filter(m => m.status === 'away').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-blue-500" />
            <span className="text-gray-600">On Leave ({teamMembers.filter(m => m.status === 'leave').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="h-3 w-3 text-purple-500" />
            <span className="text-gray-600">Remote ({teamMembers.filter(m => m.status === 'remote').length})</span>
          </div>
        </div>
      </div>
    </div>
  );
}