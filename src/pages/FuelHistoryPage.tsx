
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Search, ChevronLeft, ChevronRight, Filter, MoreHorizontal, Plus, ChevronDown, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DateRangePicker from '@/components/routing/DateRangePicker';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const mockFuelEntries = [
  {
    id: '1',
    asset: { id: '2100', name: '2100 [2016 Ford F-150]', status: 'active' },
    date: 'Tue, Apr 29, 2025 2:20pm',
    vendor: 'Sample',
    meterEntry: '56,362 mi',
    usage: { distance: 257.0, unit: 'miles' },
    volume: { amount: 19.113, unit: 'gallons' },
    total: { amount: 46.23, pricePerGallon: 2.42, currency: 'USD' },
    fuelEconomy: { mpg: 13.45, unit: 'mpg (US)' },
    costPerMeter: { amount: 0.18, unit: '/ mile' },
    alerts: null,
    capacityException: null,
    locationException: null
  },
  {
    id: '2',
    asset: { id: '1100', name: '1100 [2018 Toyota Prius]', status: 'active' },
    date: 'Sun, Apr 27, 2025 2:20pm',
    vendor: 'Sample',
    meterEntry: '20,682 mi',
    usage: { distance: 425.0, unit: 'miles' },
    volume: { amount: 7.010, unit: 'gallons' },
    total: { amount: 17.26, pricePerGallon: 2.46, currency: 'USD' },
    fuelEconomy: { mpg: 60.63, unit: 'mpg (US)' },
    costPerMeter: { amount: 0.04, unit: '/ mile' },
    alerts: null,
    capacityException: null,
    locationException: null
  },
  // Add more mock entries...
];

// KPI mock data
const kpiData = {
  totalFuelCost: '$908.60',
  totalVolume: '357.73 gallons',
  avgFuelEconomyDistance: '25.67 mpg (US)',
  avgFuelEconomyHours: '--',
  avgCost: '$2.54 / gallon'
};

export default function FuelHistoryPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupBy, setGroupBy] = useState('None');
  const [showInsights, setShowInsights] = useState(true);
  
  // Handle date range changes
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <PageLayout title={<h1 className="text-2xl font-bold">Fuel History</h1>}>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="F1.S1"
              placeholder="Search" 
              className="pl-9 w-52"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DateRangePicker 
            startDate={startDate} 
            endDate={endDate} 
            onChange={handleDateRangeChange}
            className="ml-2" 
          />
          
          <Button variant="outline" className="gap-2">
            Asset
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="gap-2">
            Asset Group
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="gap-2">
            Vendor
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="gap-2">
            <span className="flex items-center">
              <Filter className="mr-1 h-4 w-4" />
              Filters
              <span className="ml-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
            </span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">1 - 20 of 20</div>
          
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="gap-2">
            Group: None
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Import Fuel Entries</DropdownMenuItem>
              <DropdownMenuItem>Find Duplicates</DropdownMenuItem>
              <DropdownMenuItem>Export Data...</DropdownMenuItem>
              <DropdownMenuItem>Manage Columns</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowInsights(!showInsights)}>
                {showInsights ? 'Hide Insights' : 'Show Insights'}
              </DropdownMenuItem>
              <DropdownMenuItem>Update Volume Setting →</DropdownMenuItem>
              <DropdownMenuItem>Items Per Page</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Fuel Entry
          </Button>
        </div>
      </div>
      
      {/* KPI Insights Bar */}
      {showInsights && (
        <div className="grid grid-cols-5 gap-4 mb-4">
          <Card className="p-4">
            <div className="text-sm text-gray-500">Total Fuel Cost</div>
            <div className="text-xl font-bold">{kpiData.totalFuelCost}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500">Total Volume</div>
            <div className="text-xl font-bold">{kpiData.totalVolume}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500">Avg. Fuel Economy (Distance)</div>
            <div className="text-xl font-bold">{kpiData.avgFuelEconomyDistance}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500">Avg. Fuel Economy (Hours)</div>
            <div className="text-xl font-bold">{kpiData.avgFuelEconomyHours}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500">Avg. Cost</div>
            <div className="text-xl font-bold">{kpiData.avgCost}</div>
          </Card>
        </div>
      )}
      
      {/* Fuel History Table */}
      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="h-4 w-4" />
              </TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Date ▼</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Meter Entry</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Fuel Economy</TableHead>
              <TableHead>Cost per Meter</TableHead>
              <TableHead>Alerts</TableHead>
              <TableHead>Capacity Exception Volume</TableHead>
              <TableHead>Location Exception Distance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFuelEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <input type="checkbox" className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-500 hover:underline cursor-pointer">{entry.asset.name}</span>
                  </div>
                </TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.vendor}</TableCell>
                <TableCell>{entry.meterEntry}</TableCell>
                <TableCell>{`${entry.usage.distance} ${entry.usage.unit}`}</TableCell>
                <TableCell>{`${entry.volume.amount.toFixed(3)} ${entry.volume.unit}`}</TableCell>
                <TableCell>
                  <div>${entry.total.amount.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">${entry.total.pricePerGallon.toFixed(2)} / gallon</div>
                </TableCell>
                <TableCell>
                  <div>{entry.fuelEconomy.mpg.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">{entry.fuelEconomy.unit}</div>
                </TableCell>
                <TableCell>
                  <div>${entry.costPerMeter.amount.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">{entry.costPerMeter.unit}</div>
                </TableCell>
                <TableCell>{entry.alerts ? "⚠️" : ""}</TableCell>
                <TableCell>{entry.capacityException || "—"}</TableCell>
                <TableCell>{entry.locationException || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageLayout>
  );
}
