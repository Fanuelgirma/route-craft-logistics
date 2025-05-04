import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RoutingLocation, TripPlan } from '@/types/routing';
import { cn } from '@/lib/utils';

interface TripDetailsStepProps {
  tripPlan: TripPlan;
  onUpdate: (updates: Partial<TripPlan>) => void;
  onNext: () => void;
}

export default function TripDetailsStep({ tripPlan, onUpdate, onNext }: TripDetailsStepProps) {
  // Mock data for locations
  const locations: RoutingLocation[] = [
    { 
      id: '1', 
      name: 'Nairobi Main Warehouse', 
      address: '123 Industrial Avenue, Nairobi', 
      lat: -1.2864, 
      lng: 36.8172, 
      type: 'Warehouse' 
    },
    { 
      id: '2', 
      name: 'Driver Home - John Doe', 
      address: '55 Miller St, Pyrmont NSW 2009, Australia', 
      lat: -33.8688, 
      lng: 151.2093, 
      type: 'Driver Home' 
    },
  ];
  
  const [startAddress, setStartAddress] = useState(tripPlan.startLocation?.address || '');
  const [endAddress, setEndAddress] = useState(tripPlan.endLocation?.address || '');
  
  const handleStartLocationSelect = (locationType: string) => {
    if (locationType === 'manual') {
      // Keep the current address
    } else if (locationType === 'warehouse') {
      const warehouse = locations.find(l => l.type === 'Warehouse');
      if (warehouse) {
        setStartAddress(warehouse.address);
        onUpdate({ startLocation: warehouse });
      }
    } else if (locationType === 'driver-home') {
      const driverHome = locations.find(l => l.type === 'Driver Home');
      if (driverHome) {
        setStartAddress(driverHome.address);
        onUpdate({ startLocation: driverHome });
      }
    }
  };

  const handleEndLocationTypeChange = (type: TripPlan['endLocationType']) => {
    onUpdate({ endLocationType: type });
    
    if (type === 'Return To Start' && tripPlan.startLocation) {
      onUpdate({ endLocation: tripPlan.startLocation });
      setEndAddress(tripPlan.startLocation.address);
    } else if (type === 'Warehouse') {
      const warehouse = locations.find(l => l.type === 'Warehouse');
      if (warehouse) {
        onUpdate({ endLocation: warehouse });
        setEndAddress(warehouse.address);
      }
    } else if (type === 'No End Location') {
      onUpdate({ endLocation: null });
      setEndAddress('');
    }
  };

  return (
    <div className="p-4 bg-white shadow-sm rounded-md">
      <h2 className="text-2xl font-medium mb-6">Trip Details</h2>
      
      <div className="space-y-6">
        {/* Fleet section */}
        <div>
          <Label className="text-sm text-gray-500">Fleet</Label>
          <div className="mt-1">
            <div className="relative">
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="all"
              >
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </div>

        {/* Start Location section */}
        <div>
          <Label className="text-sm text-gray-500">Start Location</Label>
          <div className="mt-2 space-y-3">
            <RadioGroup 
              defaultValue="manual" 
              className="flex space-x-4"
              onValueChange={handleStartLocationSelect}
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual" className="text-sm cursor-pointer">Enter a start location</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="driver-home" id="driver-home" />
                <Label htmlFor="driver-home" className="text-sm cursor-pointer">Team members start from their home location</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="warehouse" id="warehouse" />
                <Label htmlFor="warehouse" className="text-sm cursor-pointer">Warehouse</Label>
              </div>
            </RadioGroup>

            <div className="w-full">
              <Label className="text-xs text-gray-500">Address</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  value={startAddress} 
                  onChange={(e) => setStartAddress(e.target.value)}
                  className="pl-10" 
                  placeholder="Enter start address"
                />
              </div>
              <div className="flex items-center mt-1 justify-between">
                <Label className="text-xs text-gray-500">Run #</Label>
                <Input className="w-24 h-8 ml-2 text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* End Location section */}
        <div>
          <div className="flex justify-between items-center">
            <Label className="text-sm text-gray-500">End Location</Label>
            <Button 
              variant="link" 
              className="text-blue-500 p-0 h-auto text-sm"
              onClick={() => handleEndLocationTypeChange('Custom')}
            >
              Change
            </Button>
          </div>
          
          <div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50">
            <RadioGroup 
              value={tripPlan.endLocationType}
              onValueChange={(value) => handleEndLocationTypeChange(value as TripPlan['endLocationType'])}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="No End Location" id="no-end" />
                <Label htmlFor="no-end" className="cursor-pointer">No end location</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="Return To Start" id="return" />
                <Label htmlFor="return" className="cursor-pointer">Return to start location</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="Driver Default" id="driver-default" />
                <Label htmlFor="driver-default" className="cursor-pointer">Team member's default end location</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="Custom" id="custom-end" />
                <Label htmlFor="custom-end" className="cursor-pointer">Enter an end location</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="Warehouse" id="warehouse-end" />
                <Label htmlFor="warehouse-end" className="cursor-pointer">Warehouse</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Date and Time section */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-sm text-gray-500">Date</Label>
            <div className="mt-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left",
                      !tripPlan.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tripPlan.date ? format(tripPlan.date, "yyyy-MM-dd") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={tripPlan.date}
                    onSelect={(date) => date && onUpdate({ date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-500">Start Time</Label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tripPlan.startTime}
                onChange={(e) => onUpdate({ startTime: e.target.value })}
              >
                {Array.from({ length: 24 }).map((_, hour) => {
                  const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                  return (
                    <option key={timeStr} value={timeStr}>{timeStr}</option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-500">End Time</Label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={tripPlan.endTime}
                onChange={(e) => onUpdate({ endTime: e.target.value })}
              >
                {Array.from({ length: 24 }).map((_, hour) => {
                  const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                  return (
                    <option key={timeStr} value={timeStr}>{timeStr}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Checkboxes section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="skill-matching" 
              checked={tripPlan.skillMatching}
              onCheckedChange={(checked) => onUpdate({ skillMatching: !!checked })}
            />
            <Label htmlFor="skill-matching" className="cursor-pointer">Skill matching ON</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="team-member-profile" 
              checked={tripPlan.useTeamMemberProfile}
              onCheckedChange={(checked) => onUpdate({ useTeamMemberProfile: !!checked })}
            />
            <Label htmlFor="team-member-profile" className="text-sm cursor-pointer">
              Use the start/end times on the team member profiles (where configured), overriding the times above
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="add-return" 
              checked={tripPlan.addReturnToStart}
              onCheckedChange={(checked) => onUpdate({ addReturnToStart: !!checked })}
            />
            <Label htmlFor="add-return" className="cursor-pointer">Add return to start location for existing trips</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="ignore-windows" 
              checked={tripPlan.ignoreTimeWindows}
              onCheckedChange={(checked) => onUpdate({ ignoreTimeWindows: !!checked })}
            />
            <Label htmlFor="ignore-windows" className="cursor-pointer">Ignore Time Windows</Label>
          </div>
        </div>

        {/* Next button */}
        <div className="flex justify-end mt-4">
          <Button 
            onClick={onNext} 
            className="flex items-center"
          >
            Next
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
