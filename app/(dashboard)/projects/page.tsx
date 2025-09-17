'use client';

import { Briefcase, Plus, Search, Filter } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: 'Project Alpha',
      client: 'NewbridgeFX',
      progress: 75,
      status: 'active',
      team: 5,
      deadline: '2025-10-15'
    },
    {
      id: 2,
      name: 'Beta Platform',
      client: 'TechCorp',
      progress: 45,
      status: 'active',
      team: 3,
      deadline: '2025-11-20'
    },
    {
      id: 3,
      name: 'Gamma Initiative',
      client: 'StartupXYZ',
      progress: 90,
      status: 'active',
      team: 8,
      deadline: '2025-09-30'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-600">Manage and track all your projects</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white rounded-lg hover:from-[#5F29A1] hover:to-[#204782] transition-all flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Project
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
            />
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-[#9152DE]/10 rounded-lg">
                <Briefcase className="h-6 w-6 text-[#9152DE]" />
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {project.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{project.client}</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#9152DE] to-[#5F29A1] h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Team: {project.team}</span>
                <span className="text-gray-600">Due: {project.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}