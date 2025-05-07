
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReturnableType, ReturnableStatus } from '@/types/returnable';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ReturnablesFilterProps {
  showOverdueOnly: boolean;
  setShowOverdueOnly: (value: boolean) => void;
}

export default function ReturnablesFilter({ showOverdueOnly, setShowOverdueOnly }: ReturnablesFilterProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const returnableTypes: ReturnableType[] = ['Crate', 'Pallet', 'Cylinder', 'Container', 'Box', 'Drum', 'Tote', 'Other'];
  const statuses: ReturnableStatus[] = ['Pending Return', 'Returned', 'Damaged', 'Lost'];

  const resetFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchTerm('');
    setShowOverdueOnly(false);
  };

  return (
    <div className="p-4 bg-white border-b border-gray-200 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        {/* Date Range */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Date Range</label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {startDate ? format(startDate, 'PP') : <span className="text-gray-500">Start Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto" align="start">
                <Calendar 
                  mode="single" 
                  selected={startDate} 
                  onSelect={setStartDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {endDate ? format(endDate, 'PP') : <span className="text-gray-500">End Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto" align="start">
                <Calendar 
                  mode="single" 
                  selected={endDate} 
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => startDate ? date < startDate : false}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Item Type */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Item Type</label>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {returnableTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Depot / Location */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Depot / Location</label>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="north">North Depot</SelectItem>
              <SelectItem value="south">South Depot</SelectItem>
              <SelectItem value="east">East Depot</SelectItem>
              <SelectItem value="west">West Depot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Driver */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Driver</label>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Drivers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Drivers</SelectItem>
              <SelectItem value="john">John Smith</SelectItem>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
              <SelectItem value="mike">Mike Brown</SelectItem>
              <SelectItem value="lisa">Lisa Davis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-end">
        {/* Vehicle Reg No */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Vehicle Reg No</label>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Vehicles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              <SelectItem value="AB12CDE">AB12 CDE</SelectItem>
              <SelectItem value="XY34ZWA">XY34 ZWA</SelectItem>
              <SelectItem value="LM56NOP">LM56 NOP</SelectItem>
              <SelectItem value="QR78STU">QR78 STU</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Customer */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Customer</label>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Customers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="acme">Acme Corp</SelectItem>
              <SelectItem value="globex">Globex Ltd</SelectItem>
              <SelectItem value="initech">Initech Inc</SelectItem>
              <SelectItem value="umbrella">Umbrella Co</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-sm font-medium text-gray-700">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 h-10 w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by Trip ID, Customer, etc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center">
          <input
            id="overdue-only"
            name="overdue-only"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={showOverdueOnly}
            onChange={(e) => setShowOverdueOnly(e.target.checked)}
          />
          <label htmlFor="overdue-only" className="ml-2 block text-sm text-gray-700">
            Show Overdue Only
          </label>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
          <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
