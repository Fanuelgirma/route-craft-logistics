
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Settings, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RouteStop, TripPlan } from '@/types/routing';

interface SelectStopsStepProps {
  tripPlan: TripPlan;
  onUpdate: (updates: Partial<TripPlan>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function SelectStopsStep({ tripPlan, onUpdate, onNext, onPrevious }: SelectStopsStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for stops
  const mockStops: RouteStop[] = Array.from({ length: 98 }, (_, index) => ({
    id: `L2024${Math.floor(1000000 + Math.random() * 9000000)}`,
    dropNo: index + 1,
    orderId: `ORD${Math.floor(10000 + Math.random() * 90000)}`,
    customer: [
      'MOSES B. ORUYA',
      'HOTEL MONARCH LIMITED',
      'STEPHEN MJEMA COSMAS',
      'JAMES KIBUCHI NJOROGE',
      'FRANCIS MARIA MWANGI',
      'CHANDRANA SUPERMARKETS YAYA CENTER',
      'MAJID AL FUTTAIM HYPERMARKET LTD-MEGA'
    ][Math.floor(Math.random() * 7)],
    address: [
      '50 Waterloo Rd, Macquarie Park, New South Wales, Australia',
      '3 Linden Ave, Pymble, New South Wales, 2073, Australia',
      '2 Market Street, Sydney, New South Wales, Australia',
      '44 Market Street, Sydney, New South Wales, Australia',
      '1 1 2 1 University of New South Wales Sydney NSW 2052',
      '10 Elizabeth Street, Paddington, New South Wales, Australia',
      '22 Brookhollow Avenue, Baulkham Hills, New South Wales, Australia',
      '38 Queen Street, Ashfield, New South Wales, Australia',
      '10 10 Elizabeth St, Paddington, New South Wales, Australia',
      '242 Arden Street, Coogee, New South Wales, Australia',
      '29 Wakefield Street, North Manly, New South Wales, Australia'
    ][Math.floor(Math.random() * 11)],
    distance: parseFloat((Math.random() * 10 + 1).toFixed(2)),
    volume: Math.floor(Math.random() * 20) + 1,
  }));

  // Filter stops based on search query
  const filteredStops = mockStops.filter(stop => 
    stop.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stop.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stop.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredStops.length / itemsPerPage);
  const paginatedStops = filteredStops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle stop selection
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      onUpdate({ selectedStops: [...filteredStops] });
    } else {
      onUpdate({ selectedStops: [] });
    }
  };

  const handleSelectStop = (stop: RouteStop, selected: boolean) => {
    if (selected) {
      onUpdate({ 
        selectedStops: [...(tripPlan.selectedStops || []), stop]
      });
    } else {
      onUpdate({
        selectedStops: (tripPlan.selectedStops || []).filter(s => s.id !== stop.id)
      });
    }
  };

  const isSelected = (stopId: string) => {
    return (tripPlan.selectedStops || []).some(stop => stop.id === stopId);
  };

  const allSelected = filteredStops.length > 0 && 
    filteredStops.every(stop => isSelected(stop.id));

  return (
    <div className="p-4 bg-white shadow-sm rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium">Select Stops ({filteredStops.length})</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 w-4 h-4" />
            Back
          </Button>
          <Button 
            onClick={onNext}
            className="flex items-center"
            disabled={(tripPlan.selectedStops || []).length === 0}
          >
            Next
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="select-all" 
            checked={allSelected}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">Select All</label>
        </div>

        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
            placeholder="Search stops..."
            className="pl-10"
          />
        </div>

        <Button variant="outline" className="flex items-center">
          <Filter className="mr-1 w-4 h-4" />
          Filter
        </Button>
        
        <Button variant="outline" className="flex items-center">
          <Settings className="mr-1 w-4 h-4" />
          Options
        </Button>
      </div>

      <div className="border rounded-md max-h-[calc(100vh-300px)] overflow-y-auto">
        <table className="w-full">
          <tbody>
            {paginatedStops.map((stop) => {
              const isStopSelected = isSelected(stop.id);
              
              return (
                <tr 
                  key={stop.id}
                  className={`hover:bg-gray-50 ${isStopSelected ? 'bg-blue-50' : ''}`}
                >
                  <td className="p-3 border-b">
                    <Checkbox 
                      checked={isStopSelected}
                      onCheckedChange={(checked) => handleSelectStop(stop, !!checked)}
                      className="mr-2"
                    />
                    <span className="font-mono text-xs text-gray-500">{stop.id}</span>
                  </td>
                  <td className="p-3 border-b">
                    <div className="text-sm font-medium">{stop.address}</div>
                    <div className="text-xs text-gray-500">{stop.customer}</div>
                  </td>
                </tr>
              );
            })}
            {paginatedStops.length === 0 && (
              <tr>
                <td colSpan={2} className="p-4 text-center text-gray-500">
                  No stops found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Create a simple pagination showing current page +/- 2
            const pageNum = Math.min(
              Math.max(currentPage - 2 + i, 1),
              totalPages
            );
            // Skip if we already rendered this page number
            if (i > 0 && pageNum <= currentPage - 3 + i) return null;
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className="h-8 w-8 p-0"
              >
                {pageNum}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div>
          {itemsPerPage} / page
        </div>
      </div>
    </div>
  );
}
