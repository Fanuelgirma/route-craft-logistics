
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function MapTab() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search Customers..."
            className="pl-9 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="h-[70vh] w-full bg-gray-200 flex items-center justify-center">
          {/* Map component would be placed here */}
          <p className="text-gray-500">Customer Map View</p>
        </div>
      </div>
    </div>
  );
}
