'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getMenuItemsForRole } from '@/lib/navigation/menu-items';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) return null;

  const menuItems = getMenuItemsForRole(user.role);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 bg-white dark:bg-[#263244] border-r border-gray-200 dark:border-[#374151] transform transition-all duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Collapse Toggle Button */}
          <div className={cn(
            "flex items-center p-4 border-b border-gray-200 dark:border-gray-700",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Menu
              </span>
            )}
            <button
              onClick={toggleCollapse}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors hidden lg:block"
              title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'flex items-center rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-gradient-to-r from-[#9152DE]/10 to-[#5F29A1]/10 text-[#9152DE] dark:from-[#9152DE]/20 dark:to-[#5F29A1]/20 dark:text-[#A670F0] border-l-3 border-[#9152DE]'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100',
                        isCollapsed ? 'px-3 py-3 justify-center' : 'px-3 py-2.5 justify-between'
                      )}
                    >
                      <div className={cn(
                        "flex items-center",
                        isCollapsed ? "justify-center" : "space-x-3"
                      )}>
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>
                      {!isCollapsed && item.badge && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-[#9152DE]/10 text-[#9152DE] rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* Tooltip for collapsed mode */}
                    {isCollapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="px-1.5 py-0.5 text-xs bg-[#9152DE]/20 text-[#9152DE] rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* User Profile Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className={cn(
              "flex items-center relative group",
              isCollapsed ? "justify-center" : "space-x-3"
            )}>
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-[#9152DE] to-[#5F29A1] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.company}
                  </p>
                  <p className="text-xs text-[#9152DE] font-medium capitalize">
                    {user.role === 'superadmin' ? 'Super Admin' : user.role}
                  </p>
                </div>
              )}

              {/* User tooltip for collapsed mode */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs opacity-75">{user.company}</p>
                    <p className="text-xs text-[#9152DE] capitalize">
                      {user.role === 'superadmin' ? 'Super Admin' : user.role}
                    </p>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}