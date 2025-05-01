
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface PageLayoutProps {
  children: ReactNode;
  title?: ReactNode;
  breadcrumb?: ReactNode;
}

export default function PageLayout({ children, title, breadcrumb }: PageLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {title && <div className="mb-4">{title}</div>}
          {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
          {children}
        </div>
      </main>
    </div>
  );
}
