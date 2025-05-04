
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { TripPlan } from '@/types/routing';
import { Driver } from '@/types/driver';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SelectTeamMembersStepProps {
  tripPlan: TripPlan;
  onUpdate: (updates: Partial<TripPlan>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function SelectTeamMembersStep({ tripPlan, onUpdate, onNext, onPrevious }: SelectTeamMembersStepProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for drivers
  const mockDrivers: Driver[] = [
    { id: '1', name: 'Anthony Mann', phone: '+254712345678', licenseNo: 'DL12345', depot: 'Nairobi Main', status: 'Active' },
    { id: '2', name: 'Bob Amato', phone: '+254723456789', licenseNo: 'DL23456', depot: 'Nairobi East', status: 'Active' },
    { id: '3', name: 'Driver Steve', phone: '+254734567890', licenseNo: 'DL34567', depot: 'Nairobi West', status: 'Active' },
    { id: '4', name: 'John S', phone: '+254745678901', licenseNo: 'DL45678', depot: 'Nairobi Main', status: 'Active' },
    { id: '5', name: 'Locate2u Demo', phone: '+254756789012', licenseNo: 'DL56789', depot: 'Nairobi Main', status: 'Active' },
    { id: '6', name: 'Melbourne driver', phone: '+254767890123', licenseNo: 'DL67890', depot: 'Nairobi East', status: 'Active' },
    { id: '7', name: 'Georgia Katos', phone: '+254778901234', licenseNo: 'DL78901', depot: 'Nairobi West', status: 'Active' },
    { id: '8', name: 'Glenn GPS G62', phone: '+254789012345', licenseNo: 'DL89012', depot: 'Nairobi Main', status: 'Active' },
    { id: '9', name: 'Kaushal Developer', phone: '+254790123456', licenseNo: 'DL90123', depot: 'Nairobi East', status: 'Active' },
    { id: '10', name: 'Member Kaushal', phone: '+254701234567', licenseNo: 'DL01234', depot: 'Nairobi West', status: 'Active' },
    { id: '11', name: 'Steve Locate2u', phone: '+254712345670', licenseNo: 'DL12340', depot: 'Nairobi Main', status: 'Active' },
  ];

  // Generate random stop counts for each driver
  const driverStopCounts = mockDrivers.reduce((acc, driver) => {
    acc[driver.id] = Math.floor(Math.random() * 25) + 5; // 5-30 stops
    return acc;
  }, {} as Record<string, number>);

  // Filter drivers based on search query
  const filteredDrivers = mockDrivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.phone.includes(searchQuery)
  );

  // Handle driver selection
  const handleSelectDriver = (driver: Driver, selected: boolean) => {
    if (selected) {
      onUpdate({ 
        selectedDrivers: [...(tripPlan.selectedDrivers || []), driver]
      });
    } else {
      onUpdate({
        selectedDrivers: (tripPlan.selectedDrivers || []).filter(d => d.id !== driver.id)
      });
    }
  };

  const isDriverSelected = (driverId: string) => {
    return (tripPlan.selectedDrivers || []).some(driver => driver.id === driverId);
  };

  // Check driver load status
  const getDriverLoadStatus = (driverId: string) => {
    const stopCount = driverStopCounts[driverId];
    if (stopCount > 20) return 'overloaded';
    if (stopCount < 8) return 'underutilized';
    return 'balanced';
  };

  return (
    <div className="p-4 bg-white shadow-sm rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium">Select Team Members</h2>
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
            disabled={(tripPlan.selectedDrivers || []).length === 0}
          >
            Next
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search team members..."
          className="pl-10"
        />
      </div>

      <div className="border rounded-md max-h-[calc(100vh-300px)] overflow-y-auto">
        <TooltipProvider>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Team Member</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Stop Count</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Load Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => {
                const isSelected = isDriverSelected(driver.id);
                const loadStatus = getDriverLoadStatus(driver.id);
                const stopCount = driverStopCounts[driver.id];
                
                return (
                  <tr 
                    key={driver.id}
                    className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                  >
                    <td className="p-4 border-b">
                      <div className="flex items-center">
                        <Checkbox 
                          checked={isSelected}
                          onCheckedChange={(checked) => handleSelectDriver(driver, !!checked)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">{driver.name}</div>
                          <div className="text-sm text-gray-500">{driver.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-b">
                      {isSelected ? `${stopCount} stops` : '-'}
                    </td>
                    <td className="p-4 border-b">
                      {isSelected && (
                        <div className="flex items-center">
                          {loadStatus === 'overloaded' && (
                            <Tooltip>
                              <TooltipTrigger>
                                <AlertTriangle className="text-amber-500 h-5 w-5" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This driver has too many stops</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          {loadStatus === 'underutilized' && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="text-blue-500 h-5 w-5" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This driver could handle more stops</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          <span className={
                            loadStatus === 'overloaded' ? 'text-amber-500 ml-2' : 
                            loadStatus === 'underutilized' ? 'text-blue-500 ml-2' : 
                            'text-green-500 ml-2'
                          }>
                            {loadStatus === 'overloaded' ? 'Overloaded' : 
                             loadStatus === 'underutilized' ? 'Underutilized' : 
                             'Balanced'}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredDrivers.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No team members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TooltipProvider>
      </div>
    </div>
  );
}
