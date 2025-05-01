
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Search, Settings, ChevronRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import DateRangePicker from '@/components/routing/DateRangePicker';
import StatusTabs from '@/components/routing/StatusTabs';
import OrdersTable from '@/components/routing/OrdersTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order, OrderStatus } from '@/types/order';
import { CustomerType } from '@/types/routing';
import RouteSettingsModal from '@/components/routing/RouteSettingsModal';
import EditConfigurationModal from '@/components/routing/EditConfigurationModal';

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: '1',
    orderNo: '1241789',
    customer: 'MOSES B. ORUYA',
    phoneNumber: '+254701234567',
    volume: '1.58 Crates',
    createdAt: '2023-05-01T08:00:00Z',
    status: 'Pending',
    region: 'Central',
    subRegion: 'BUBUBURU',
    depot: 'Nairobi Main'
  },
  {
    id: '2',
    orderNo: '1241617',
    customer: 'HOTEL MONARCH LIMITED',
    phoneNumber: '+254701234568',
    volume: '1.58 Crates',
    createdAt: '2023-05-01T09:15:00Z',
    status: 'Pending',
    region: 'Central',
    subRegion: 'TOWN2',
    depot: 'Nairobi Main'
  },
  {
    id: '3',
    orderNo: '1241785',
    customer: 'STEPHEN MJEMA COSMAS',
    phoneNumber: '+254701234569',
    volume: '11 Crates',
    createdAt: '2023-05-02T10:30:00Z',
    status: 'Pending',
    region: 'Central',
    subRegion: 'TOWN2',
    depot: 'Nairobi Main'
  },
  {
    id: '4',
    orderNo: '1241694',
    customer: 'JAMES KIBUCHI NJOROGE',
    phoneNumber: '+254701234570',
    volume: '22.84 Crates',
    createdAt: '2023-05-03T14:45:00Z',
    status: 'Pending',
    region: 'Central',
    subRegion: 'BUBUBURU',
    depot: 'Nairobi Main'
  },
  {
    id: '5',
    orderNo: '1241464',
    customer: 'FRANCIS MARIA MWANGI',
    phoneNumber: '+254701234571',
    volume: '8.67 Crates',
    createdAt: '2023-05-04T16:20:00Z',
    status: 'Pending',
    region: 'East',
    subRegion: 'TOWN2',
    depot: 'Nairobi East'
  },
  {
    id: '6',
    orderNo: '1241574',
    customer: 'CHANDRANA SUPERMARKETS YAYA CENTER',
    phoneNumber: '+254701234572',
    volume: '5.75 Crates',
    createdAt: '2023-05-05T11:10:00Z',
    status: 'Pending',
    region: 'Central',
    subRegion: 'TOWN2',
    depot: 'Nairobi Main'
  },
  {
    id: '7',
    orderNo: '1241549',
    customer: 'MAJID AL FUTTAIM HYPERMARKET LTD-MEGA',
    phoneNumber: '+254701234573',
    volume: '3.50 Crates',
    createdAt: '2023-05-06T09:05:00Z',
    status: 'Pending',
    region: 'West',
    subRegion: 'TOWN2',
    depot: 'Nairobi West'
  },
  {
    id: '8',
    orderNo: '1241653',
    customer: 'MAJID AL FUTTAIM HYPERMARKET LTD-MEGA',
    phoneNumber: '+254701234574',
    volume: '5.22 Crates',
    createdAt: '2023-05-07T13:30:00Z',
    status: 'Pending',
    region: 'West',
    subRegion: 'TOWN2',
    depot: 'Nairobi West'
  }
];

// Mock data for counts
const mockStatusCounts = {
  'Pending': 338,
  'Ready For Dispatch': 120,
  'In Transit': 85,
  'Arrived At Customer': 0,
  'Completed': 5799,
  'Cancelled': 839,
  'All': 7181
};

// Mock data for sub-regions and customer types
const mockSubRegions = ['BUBUBURU', 'TOWN1', 'TOWN2', 'EASTLANDS', 'WESTLANDS'];
const mockCustomerTypes: CustomerType[] = ['Retail', 'Wholesale', 'Distributor', 'Other'];

export default function RoutingPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [activeStatus, setActiveStatus] = useState<OrderStatus | 'All'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [subRegion, setSubRegion] = useState<string>('');
  const [customerType, setCustomerType] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [isRouteSettingsOpen, setIsRouteSettingsOpen] = useState(false);
  const [isEditConfigOpen, setIsEditConfigOpen] = useState(false);

  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    // Would typically fetch data based on date range
  };

  const handleStatusChange = (status: OrderStatus | 'All') => {
    setActiveStatus(status);
    // Would typically fetch data based on status
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Would typically filter data based on search query
  };

  const handleSubRegionChange = (value: string) => {
    setSubRegion(value);
    // Would typically filter data based on sub-region
  };

  const handleCustomerTypeChange = (value: string) => {
    setCustomerType(value);
    // Would typically filter data based on customer type
  };

  const handleOrderSelectionChange = (orderId: string, isSelected: boolean) => {
    const newSelection = new Set(selectedOrders);
    if (isSelected) {
      newSelection.add(orderId);
    } else {
      newSelection.delete(orderId);
    }
    setSelectedOrders(newSelection);
  };

  const handleSelectAllOrders = (isSelected: boolean) => {
    if (isSelected) {
      const allIds = new Set(orders.map(order => order.id));
      setSelectedOrders(allIds);
    } else {
      setSelectedOrders(new Set());
    }
  };

  const handleGenerateRoute = () => {
    console.log('Generating route for selected orders:', Array.from(selectedOrders));
    // Would typically make API call to generate route
    // On success, navigate to route builder page
    // window.location.href = `/routing/builder/${batchId}`;
  };

  const handleOpenRouteSettings = () => {
    setIsRouteSettingsOpen(true);
  };

  const handleOpenEditConfig = () => {
    setIsRouteSettingsOpen(false);
    setIsEditConfigOpen(true);
  };

  return (
    <PageLayout title="Routing">
      <div className="space-y-6">
        {/* Date Range Picker */}
        <DateRangePicker 
          startDate={startDate} 
          endDate={endDate} 
          onChange={handleDateRangeChange} 
        />

        {/* Status Tabs */}
        <StatusTabs 
          activeStatus={activeStatus} 
          onStatusChange={handleStatusChange} 
          counts={mockStatusCounts}
        />

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search Orders..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                id="R1.S1"
              />
            </div>
            
            <div className="w-full sm:w-56">
              <Select value={subRegion} onValueChange={handleSubRegionChange}>
                <SelectTrigger id="R1.F1">
                  <SelectValue placeholder="Sub-Region" />
                </SelectTrigger>
                <SelectContent>
                  {mockSubRegions.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-56">
              <Select value={customerType} onValueChange={handleCustomerTypeChange}>
                <SelectTrigger id="R1.F2">
                  <SelectValue placeholder="Customer Type" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomerTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <Button 
              variant="outline" 
              id="R1.B1" 
              onClick={handleOpenRouteSettings}
              className="flex items-center"
            >
              <Settings size={16} className="mr-1" />
              Route Settings
            </Button>
            
            <Button 
              id="R1.B2" 
              disabled={selectedOrders.size === 0}
              onClick={handleGenerateRoute}
              className="flex items-center"
            >
              Generate Route
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <OrdersTable 
          orders={orders} 
          selectedOrders={selectedOrders} 
          onSelectionChange={handleOrderSelectionChange}
          onSelectAll={handleSelectAllOrders}
        />

        {/* Route Settings Modal */}
        <RouteSettingsModal 
          isOpen={isRouteSettingsOpen} 
          onClose={() => setIsRouteSettingsOpen(false)} 
          onEdit={handleOpenEditConfig}
        />

        {/* Edit Configuration Modal */}
        <EditConfigurationModal 
          isOpen={isEditConfigOpen} 
          onClose={() => setIsEditConfigOpen(false)} 
        />
      </div>
    </PageLayout>
  );
}
