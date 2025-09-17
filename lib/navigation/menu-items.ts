import {
  LayoutDashboard,
  Clock,
  Calendar,
  Briefcase,
  Users,
  Building2,
  FileText,
  Bot,
  Link2,
  Settings,
  BarChart3,
  CalendarDays,
  UserCheck,
  Bell,
  HelpCircle,
  Shield
} from 'lucide-react';
import { UserRole } from '@/types/auth';

export interface MenuItem {
  label: string;
  href: string;
  icon: any;
  roles: UserRole[];
  badge?: string;
}

export const menuItems: MenuItem[] = [
  {
    label: 'Client Portal',
    href: '/client-portal',
    icon: Shield,
    roles: ['client']
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['superadmin', 'admin', 'user']
  },
  {
    label: 'Timesheets',
    href: '/timesheets',
    icon: Clock,
    roles: ['superadmin', 'admin', 'user']
  },
  {
    label: 'Leaves',
    href: '/leaves',
    icon: Calendar,
    roles: ['superadmin', 'admin', 'user']
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: Briefcase,
    roles: ['superadmin', 'admin', 'user', 'client']
  },
  {
    label: 'Users',
    href: '/users',
    icon: Users,
    roles: ['superadmin', 'admin']
  },
  {
    label: 'Clients',
    href: '/clients',
    icon: UserCheck,
    roles: ['superadmin', 'admin']
  },
  {
    label: 'Companies',
    href: '/companies',
    icon: Building2,
    roles: ['superadmin'],
    badge: 'Super Admin'
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['superadmin', 'admin', 'user', 'client']
  },
  {
    label: 'Automations',
    href: '/automations',
    icon: Bot,
    roles: ['superadmin', 'admin'],
    badge: 'AI'
  },
  {
    label: 'Integrations',
    href: '/integrations',
    icon: Link2,
    roles: ['superadmin', 'admin']
  },
  {
    label: 'Holidays',
    href: '/holidays',
    icon: CalendarDays,
    roles: ['superadmin', 'admin', 'user']
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
    roles: ['superadmin', 'admin', 'user'],
    badge: '2'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['superadmin', 'admin', 'user']
  },
  {
    label: 'Help & Support',
    href: '/help',
    icon: HelpCircle,
    roles: ['superadmin', 'admin', 'user', 'client']
  }
];

export function getMenuItemsForRole(role: UserRole): MenuItem[] {
  return menuItems.filter(item => item.roles.includes(role));
}