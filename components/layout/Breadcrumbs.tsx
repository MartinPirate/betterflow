'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);

    const breadcrumbs = [
      { name: 'Home', href: '/', icon: Home }
    ];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

      breadcrumbs.push({
        name,
        href: currentPath,
        icon: null
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = crumb.icon;

        return (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            )}
            {isLast ? (
              <span className="text-gray-900 font-medium flex items-center gap-1">
                {Icon && <Icon className="h-4 w-4" />}
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-gray-500 hover:text-[#9152DE] transition-colors flex items-center gap-1"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {crumb.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}