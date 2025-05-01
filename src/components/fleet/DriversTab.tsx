
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import SearchInput from '@/components/ui/SearchInput';
import { Driver } from '@/types/driver';

// Mock data for demonstration
const MOCK_DRIVERS: Driver[] = [
  { id: '1', name: 'Aurora Long', phone: '+254757961280', licenseNo: 'DL123456', depot: 'LETA', assignedVehicle: 'KAC 2030-2', status: 'Active' },
  { id: '2', name: 'Ben Hyman', phone: '+254710172937', licenseNo: 'DL789012', depot: 'LETA', assignedVehicle: 'KAW-127B2', status: 'Active' },
  { id: '3', name: 'Benson Ojiem', phone: '+254723539350', licenseNo: 'DL345678', depot: 'LETA', assignedVehicle: 'KAW-132B2', status: 'On Leave' },
  { id: '4', name: 'Yudi Okche', phone: '+254728552889', licenseNo: 'DL901234', depot: 'LETA', assignedVehicle: 'KAW 949D2', status: 'Active' },
  { id: '5', name: 'Perfect Z', phone: '+254783568107', licenseNo: 'DL567890', depot: 'LETA', assignedVehicle: 'KAW-251C2', status: 'Inactive' },
];

interface DriverStatusTabsProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    all: number;
    active: number;
    inactive: number;
    'on leave': number;
  };
}

function DriverStatusTabs({ activeStatus, onStatusChange, counts }: DriverStatusTabsProps) {
  const tabs = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'active', label: 'Active', count: counts.active },
    { id: 'inactive', label: 'Inactive', count: counts.inactive },
    { id: 'on leave', label: 'On Leave', count: counts['on leave'] }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 whitespace-nowrap font-medium text-gray-600 border-b-2 flex items-center ${
              activeStatus === tab.id
                ? "border-logistic-accent text-logistic-accent"
                : "border-transparent hover:text-gray-800 hover:border-gray-300"
            }`}
            onClick={() => onStatusChange(tab.id)}
            aria-selected={activeStatus === tab.id}
            role="tab"
          >
            {tab.label} <span className="ml-2 bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DriversTab() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter drivers based on active status and search query
  const filteredDrivers = MOCK_DRIVERS.filter(driver => {
    // Filter by status
    if (activeStatus !== 'all' && driver.status.toLowerCase() !== activeStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !driver.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !driver.phone.includes(searchQuery)) {
      return false;
    }
    
    return true;
  });
  
  // Count drivers by status
  const driverCounts = {
    all: MOCK_DRIVERS.length,
    active: MOCK_DRIVERS.filter(d => d.status === 'Active').length,
    inactive: MOCK_DRIVERS.filter(d => d.status === 'Inactive').length,
    'on leave': MOCK_DRIVERS.filter(d => d.status === 'On Leave').length,
  };

  const handleRowClick = (driver: Driver) => {
    navigate(`/fleet/drivers/${driver.id}`);
  };
  
  return (
    <div className="space-y-4">
      <DriverStatusTabs 
        activeStatus={activeStatus} 
        onStatusChange={setActiveStatus} 
        counts={driverCounts} 
      />
      
      <div className="flex justify-between mb-4">
        <div className="w-64">
          <SearchInput 
            placeholder="Search drivers..." 
            onSearch={setSearchQuery}
            className="w-full"
          />
        </div>
        
        <Button className="bg-logistic hover:bg-logistic/80">
          <Plus className="mr-2 h-4 w-4" /> Add Driver
        </Button>
      </div>
      
      <div className="bg-white rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>License No</TableHead>
              <TableHead>Depot</TableHead>
              <TableHead>Assigned Vehicle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrivers.map((driver) => (
              <TableRow 
                key={driver.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(driver)}
              >
                <TableCell className="font-medium">{driver.id}</TableCell>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.licenseNo}</TableCell>
                <TableCell>{driver.depot}</TableCell>
                <TableCell>{driver.assignedVehicle || '-'}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    driver.status === 'Active' ? 'bg-green-100 text-green-800' :
                    driver.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {driver.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">View details</span>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Edit</span>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination would go here */}
      <div className="flex justify-end mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDrivers.length}</span> of{" "}
          <span className="font-medium">{filteredDrivers.length}</span> results
        </div>
      </div>
    </div>
  );
}
