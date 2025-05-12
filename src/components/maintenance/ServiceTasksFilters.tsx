
import { Button } from '@/components/ui/button';
import { Filter, Search, ChevronDown, Settings, Save, Download } from 'lucide-react';

interface ServiceTasksFiltersProps {
  onSearch?: (query: string) => void;
}

export default function ServiceTasksFilters({ onSearch }: ServiceTasksFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <div className="flex items-center bg-white border rounded-md shadow-sm flex-wrap">
        <Button variant="ghost" className="h-9">
          Service Task Type
          <ChevronDown size={16} className="ml-1" />
        </Button>
        <Button variant="ghost" className="h-9">
          Default Category Code
          <ChevronDown size={16} className="ml-1" />
        </Button>
        <Button variant="ghost" className="h-9">
          Default System Code
          <ChevronDown size={16} className="ml-1" />
        </Button>
        <Button variant="ghost" className="h-9">
          Has Service Reminders
          <ChevronDown size={16} className="ml-1" />
        </Button>
        <Button variant="ghost" className="h-9">
          <Filter size={16} className="mr-1" />
          Filters
        </Button>
      </div>
      
      <div className="ml-auto flex gap-2 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
        
        <Button variant="outline" size="icon">
          <Save size={16} />
        </Button>
        <Button variant="outline" size="icon">
          <Download size={16} />
        </Button>
        <Button variant="outline" size="icon">
          <Settings size={16} />
        </Button>
      </div>
    </div>
  );
}
