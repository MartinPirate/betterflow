'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function Header({ onMenuToggle, isMobileMenuOpen = false }: HeaderProps) {
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'New leave request from John Doe', time: '5 min ago', unread: true },
    { id: 2, text: 'Your timesheet was approved', time: '1 hour ago', unread: true },
    { id: 3, text: 'Project deadline reminder', time: '2 hours ago', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">BF</span>
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">
                  BetterFlow
                </span>
              </div>
            </div>

            <div className="ml-6 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#9152DE] focus:border-[#9152DE] sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500"></span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 ${
                          notification.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <Link
                      href="/notifications"
                      className="text-sm text-[#9152DE] hover:text-[#5F29A1] font-medium"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}