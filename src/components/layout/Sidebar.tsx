
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  Box, 
  Route, 
  Car, // Replacing Fleet with Car icon
  Users, 
  Bell, 
  BarChart, 
  Map, 
  Settings, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Trips', icon: Truck, path: '/trips' },
  { name: 'Returnables', icon: Package, path: '/returnables' },
  { name: 'Orders', icon: Box, path: '/orders' },
  { name: 'Routing', icon: Route, path: '/routing' },
  { name: 'Fleet', icon: Car, path: '/fleet' }, // Updated to use Car icon
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Alerts', icon: Bell, path: '/alerts' },
  { name: 'KPIs', icon: BarChart, path: '/kpis' },
  { name: 'Live Map', icon: Map, path: '/map' },
  { name: 'Sales', icon: BarChart, path: '/sales' },
  { name: 'Settings', icon: Settings, path: '/settings', hasSubmenu: true },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-56"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          <div className="w-8 h-8 rounded-full bg-logistic-accent flex items-center justify-center text-white font-bold">
            L
          </div>
          {!collapsed && <span className="ml-2 font-semibold text-logistic">LogisCraft</span>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("text-gray-500 hover:text-gray-700", collapsed && "hidden")}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "sidebar-item",
                currentPath === item.path && "active"
              )}
            >
              <item.icon className={currentPath === item.path ? "text-logistic-accent" : ""} />
              {!collapsed && (
                <span className="flex-1">{item.name}</span>
              )}
              {!collapsed && item.hasSubmenu && (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        {collapsed ? (
          <button 
            onClick={() => setCollapsed(false)} 
            className="w-full flex justify-center text-gray-500 hover:text-gray-700"
          >
            <ChevronRight size={20} />
          </button>
        ) : (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
