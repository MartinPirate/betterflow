'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Building2, Plus, Users, TrendingUp, AlertCircle, Search, Filter } from 'lucide-react';

export default function CompaniesPage() {
  const { user, canAccess } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!canAccess(['superadmin'])) {
      router.push('/dashboard');
    }
  }, [canAccess, router]);

  const companies = [
    {
      id: 1,
      name: 'BetterFlow Technologies',
      logo: 'BF',
      users: 45,
      projects: 12,
      status: 'active',
      plan: 'Enterprise',
      revenue: '$125,000',
      growth: 15
    },
    {
      id: 2,
      name: 'NewbridgeFX',
      logo: 'NF',
      users: 23,
      projects: 6,
      status: 'active',
      plan: 'Professional',
      revenue: '$45,000',
      growth: 8
    },
    {
      id: 3,
      name: 'TechCorp Solutions',
      logo: 'TC',
      users: 67,
      projects: 18,
      status: 'active',
      plan: 'Enterprise',
      revenue: '$189,000',
      growth: 22
    },
    {
      id: 4,
      name: 'StartupXYZ',
      logo: 'SX',
      users: 8,
      projects: 2,
      status: 'trial',
      plan: 'Starter',
      revenue: '$2,500',
      growth: -5
    }
  ];

  const stats = [
    { label: 'Total Companies', value: '4', icon: Building2, color: 'text-purple-600' },
    { label: 'Total Users', value: '143', icon: Users, color: 'text-blue-600' },
    { label: 'Monthly Revenue', value: '$361.5K', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Active Projects', value: '38', icon: AlertCircle, color: 'text-orange-600' }
  ];

  if (!canAccess(['superadmin'])) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies Management</h1>
          <p className="mt-1 text-sm text-gray-600">Manage all tenant companies and their subscriptions</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] text-white rounded-lg hover:from-[#5F29A1] hover:to-[#204782] transition-all flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:border-transparent"
            />
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-lg flex items-center justify-center text-white font-bold">
                        {company.logo}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{company.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{company.users}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.projects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      company.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                      company.plan === 'Professional' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {company.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center gap-1 text-sm ${
                      company.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`h-4 w-4 ${company.growth < 0 ? 'rotate-180' : ''}`} />
                      {Math.abs(company.growth)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      company.status === 'active' ? 'bg-green-100 text-green-800' :
                      company.status === 'trial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#9152DE] hover:text-[#5F29A1] mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
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