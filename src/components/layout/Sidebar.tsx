
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  Box, 
  Route, 
  Car,
  Users, 
  Bell, 
  BarChart, 
  Map, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  DollarSign,
  ShoppingBag,
  Droplet,
  ChevronDown,
  Fuel,
  History,
  Wrench
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Trips', icon: Truck, path: '/trips' },
  { name: 'Returnables', icon: Package, path: '/returnables' },
  { name: 'Sales', icon: DollarSign, path: '/sales' },
  { name: 'Orders', icon: ShoppingBag, path: '/orders' },
  { name: 'Routing', icon: Route, path: '/routing' },
  { name: 'Fleet', icon: Car, path: '/fleet' },
  {
    name: 'Fuel & Energy',
    icon: Droplet,
    path: '/fuel',
    hasSubmenu: true,
    submenu: [
      { name: 'Fuel History', path: '/fuel/history' },
      { name: 'Vehicle History', path: '/fuel/vehicle-history' },
      { name: 'Service Tasks', path: '/fuel/service-tasks', icon: Wrench }
    ]
  },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Alerts', icon: Bell, path: '/alerts' },
  { name: 'KPIs', icon: BarChart, path: '/kpis' },
  { name: 'Live Map', icon: Map, path: '/livemap' },
  { name: 'Settings', icon: Settings, path: '/settings', hasSubmenu: true },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Check if we're on a sub-path and extract the base path
  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const toggleSubmenu = (name: string) => {
    setExpandedMenu(expandedMenu === name ? null : name);
  };
  
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
            <div key={item.name}>
              {item.hasSubmenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={cn(
                      "sidebar-item w-full flex items-center",
                      isActive(item.path) && "active"
                    )}
                  >
                    <item.icon className={isActive(item.path) ? "text-logistic-accent" : ""} />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        <ChevronDown 
                          size={16} 
                          className={cn(
                            "text-gray-400 transition-transform", 
                            expandedMenu === item.name && "transform rotate-180"
                          )} 
                        />
                      </>
                    )}
                  </button>
                  {!collapsed && expandedMenu === item.name && item.submenu && (
                    <div className="ml-10 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={cn(
                            "block py-1 px-2 text-sm rounded-md flex items-center",
                            isActive(subItem.path) 
                              ? "text-logistic-accent font-medium" 
                              : "text-gray-600 hover:text-logistic-accent"
                          )}
                        >
                          {subItem.icon && <subItem.icon className="mr-2" size={16} />}
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "sidebar-item",
                    isActive(item.path) && "active"
                  )}
                >
                  <item.icon className={isActive(item.path) ? "text-logistic-accent" : ""} />
                  {!collapsed && (
                    <span className="flex-1">{item.name}</span>
                  )}
                  {!collapsed && item.hasSubmenu && (
                    <ChevronRight size={16} className="text-gray-400" />
                  )}
                </Link>
              )}
            </div>
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
