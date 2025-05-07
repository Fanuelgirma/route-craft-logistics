
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { CalendarIcon, Search } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function SalesFilter() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [depot, setDepot] = useState<string | undefined>(undefined);
  const [salesperson, setSalesperson] = useState<string | undefined>(undefined);
  const [customer, setCustomer] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const handleApplyFilters = () => {
    // Logic to apply filters
    console.log("Applying filters:", {
      dateRange: [startDate, endDate],
      depot, salesperson, customer, status, searchTerm
    });
  };

  const handleResetFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setDepot(undefined);
    setSalesperson(undefined);
    setCustomer(undefined);
    setStatus(undefined);
    setSearchTerm('');
  };

  return (
    <div className="bg-gray-50 p-4 border-b border-gray-200 space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Date Range */}
        <div className="flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate && endDate ? (
                  <>
                    {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                  </>
                ) : (
                  <span>Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={{
                  from: startDate || undefined,
                  to: endDate || undefined,
                }}
                onSelect={(range) => {
                  setStartDate(range?.from);
                  setEndDate(range?.to);
                }}
                initialFocus
              />
              <div className="flex justify-between p-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStartDate(undefined);
                    setEndDate(undefined);
                  }}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={() => { /* Close popover logic */ }}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Depot */}
        <div className="w-40">
          <Select value={depot} onValueChange={setDepot}>
            <SelectTrigger>
              <SelectValue placeholder="Depot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Depots</SelectItem>
              <SelectItem value="north">North Depot</SelectItem>
              <SelectItem value="south">South Depot</SelectItem>
              <SelectItem value="east">East Depot</SelectItem>
              <SelectItem value="west">West Depot</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Salesperson */}
        <div className="w-40">
          <Select value={salesperson} onValueChange={setSalesperson}>
            <SelectTrigger>
              <SelectValue placeholder="Salesperson" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Salespeople</SelectItem>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="bob">Bob Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Customer */}
        <div className="w-40">
          <Select value={customer} onValueChange={setCustomer}>
            <SelectTrigger>
              <SelectValue placeholder="Customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="acme">Acme Corp</SelectItem>
              <SelectItem value="globex">Globex Inc</SelectItem>
              <SelectItem value="initech">Initech LLC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Status */}
        <div className="w-40">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleResetFilters}>Reset</Button>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </div>
    </div>
  );
}
