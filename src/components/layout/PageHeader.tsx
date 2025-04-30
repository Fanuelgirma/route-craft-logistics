
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Tab {
  name: string;
  href: string;
  current: boolean;
}

interface PageHeaderProps {
  title: string;
  tabs?: Tab[];
  actions?: ReactNode;
  breadcrumbs?: { name: string; href: string }[];
}

export default function PageHeader({ title, tabs, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="border-b border-gray-200 pb-4">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.name} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <Link
                  to={breadcrumb.href}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {breadcrumb.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {actions && <div className="mt-2 sm:mt-0">{actions}</div>}
      </div>
      
      {tabs && tabs.length > 0 && (
        <div className="mt-4 border-b border-gray-200">
          <div className="flex -mb-px space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={cn(
                  "py-2 px-1 border-b-2 text-sm font-medium",
                  tab.current
                    ? "border-logistic-accent text-logistic-accent"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
