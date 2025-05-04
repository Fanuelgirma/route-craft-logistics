
import { useState } from 'react';
import { ChevronLeft, Settings, Download, Check, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { TripPlan, Route } from '@/types/routing';
import { Driver } from '@/types/driver';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';

interface TripSummaryStepProps {
  tripPlan: TripPlan;
  onUpdate: (updates: Partial<TripPlan>) => void;
  onPrevious: () => void;
  onComplete: () => void;
}

export default function TripSummaryStep({ tripPlan, onUpdate, onPrevious, onComplete }: TripSummaryStepProps) {
  const [createFixedOrder, setCreateFixedOrder] = useState(tripPlan.createFixedOrderTrips || false);
  
  // Generate mock routes based on selected drivers
  const generateRoutes = (): Route[] => {
    const selectedDrivers = tripPlan.selectedDrivers || [];
    return selectedDrivers.map((driver, index) => {
      const randomStopCount = Math.floor(Math.random() * 15) + 5; // 5-20 stops
      const randomEndHour = 12 + Math.floor(Math.random() * 10); // 12-22 (12PM - 10PM)
      const randomEndMinute = Math.floor(Math.random() * 60); // 0-59 minutes
      
      return {
        id: `route-${index + 1}`,
        name: `Route ${index + 1}`,
        driverId: driver.id,
        driverName: driver.name,
        stops: [],
        capacityUtilization: Math.floor(Math.random() * 100),
        distance: parseFloat((Math.random() * 50 + 10).toFixed(2)),
        volume: Math.floor(Math.random() * 100),
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'][index % 6],
        estimatedEndTime: `${randomEndHour}:${randomEndMinute.toString().padStart(2, '0')} PM`
      };
    });
  };

  // If we don't have routes yet, generate them
  if (!tripPlan.routes || tripPlan.routes.length === 0) {
    const routes = generateRoutes();
    onUpdate({ routes });
  }

  const handleCreateTrips = () => {
    toast({
      title: "Trips Created",
      description: `${tripPlan.routes?.length || 0} trips have been successfully created.`
    });
    onComplete();
  };

  return (
    <div className="p-4 bg-white shadow-sm rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium">Trip Summary</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Input
            placeholder="Find team member..."
            className="w-64 pl-4"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Weight</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Volume
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Volume</DropdownMenuItem>
                <DropdownMenuItem>Weight</DropdownMenuItem>
                <DropdownMenuItem>Distance</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-md max-h-[calc(100vh-350px)] overflow-y-auto mb-4">
        <TooltipProvider>
          <table className="w-full">
            <tbody>
              {(tripPlan.routes || []).map((route, index) => {
                const driver = (tripPlan.selectedDrivers || []).find(d => d.id === route.driverId);
                if (!driver) return null;
                
                // Determine load status based on capacity
                const loadStatus = 
                  route.capacityUtilization > 90 ? 'overloaded' :
                  route.capacityUtilization < 40 ? 'underutilized' :
                  'balanced';
                
                return (
                  <tr 
                    key={route.id}
                    className="hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <td className="p-4">
                      {index + 1}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          {driver.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{driver.name}</div>
                          <div className="text-sm text-gray-600">{route.stops.length || Math.floor(Math.random() * 20) + 5} Stops, finishing at {route.estimatedEndTime}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end">
                        {loadStatus === 'overloaded' && (
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertTriangle className="text-amber-500 h-5 w-5 mr-2" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This route is overloaded</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {loadStatus === 'underutilized' && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="text-blue-500 h-5 w-5 mr-2" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This driver could handle more stops</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        <span>{route.capacityUtilization}/1000 null</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {(tripPlan.routes || []).length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No routes have been generated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TooltipProvider>
      </div>

      <div className="flex items-center justify-between space-x-4 mb-4">
        <div className="flex items-center">
          <Checkbox 
            id="fixed-order" 
            checked={createFixedOrder}
            onCheckedChange={(checked) => {
              setCreateFixedOrder(!!checked);
              onUpdate({ createFixedOrderTrips: !!checked });
            }}
            className="mr-2"
          />
          <label htmlFor="fixed-order" className="text-sm cursor-pointer">Create Fixed Order Trips</label>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Download className="mr-1 h-4 w-4" />
            Download
          </Button>
          
          <Button 
            onClick={handleCreateTrips}
            className="flex items-center"
            disabled={(tripPlan.routes || []).length === 0}
          >
            <Check className="mr-1 h-4 w-4" />
            Create {tripPlan.routes?.length || 0} Trips
          </Button>
        </div>
      </div>
    </div>
  );
}
