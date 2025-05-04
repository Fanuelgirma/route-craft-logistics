
import React, { useState } from 'react';
import { TripPlan, RoutingLocation } from '@/types/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Settings, ChevronRight, Plus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

interface TripDetailsStepProps {
  tripPlan: TripPlan;
  onUpdate: (updates: Partial<TripPlan>) => void;
  onNext: () => void;
  onOpenSettings?: () => void;
}

export default function TripDetailsStep({ tripPlan, onUpdate, onNext, onOpenSettings }: TripDetailsStepProps) {
  const [locationName, setLocationName] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  
  const handleDateChange = (dateStr: string) => {
    const newDate = new Date(dateStr);
    onUpdate({ date: newDate });
  };
  
  const handleStartTimeChange = (time: string) => {
    onUpdate({ startTime: time });
  };
  
  const handleEndTimeChange = (time: string) => {
    onUpdate({ endTime: time });
  };
  
  const handleEndLocationTypeChange = (type: TripPlan['endLocationType']) => {
    onUpdate({ endLocationType: type });
  };
  
  const handleToggleSkillMatching = (checked: boolean) => {
    onUpdate({ skillMatching: checked });
  };
  
  const handleToggleUseTeamMemberProfile = (checked: boolean) => {
    onUpdate({ useTeamMemberProfile: checked });
  };
  
  const handleToggleIgnoreTimeWindows = (checked: boolean) => {
    onUpdate({ ignoreTimeWindows: checked });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Trip Details</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <Button variant="outline" size="sm" onClick={onOpenSettings} className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>Route Settings</span>
          </Button>
        </div>
        
        <Card>
          <CardContent className="pt-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tripName">Trip Name</Label>
                <Input 
                  id="tripName" 
                  value={tripPlan.name}
                  onChange={(e) => onUpdate({ name: e.target.value })}
                  className="border-gray-300"
                  placeholder="Enter trip name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tripDate">Trip Date</Label>
                <div className="relative">
                  <Input
                    id="tripDate"
                    type="date"
                    value={format(tripPlan.date, 'yyyy-MM-dd')}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="pl-10 border-gray-300"
                  />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <div className="relative">
                  <Input
                    id="startTime"
                    type="time"
                    value={tripPlan.startTime}
                    onChange={(e) => handleStartTimeChange(e.target.value)}
                    className="pl-10 border-gray-300"
                  />
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="relative">
                  <Input
                    id="endTime"
                    type="time"
                    value={tripPlan.endTime}
                    onChange={(e) => handleEndTimeChange(e.target.value)}
                    className="pl-10 border-gray-300"
                  />
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Starting Location</h3>
        
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 overflow-hidden">
          <CardHeader className="pb-2 relative">
            <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-medium text-blue-800">{tripPlan.startLocation.name}</CardTitle>
            <CardDescription>{tripPlan.startLocation.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 flex gap-4">
              <Button variant="outline" size="sm" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                Change Location
              </Button>
              <Button variant="outline" size="sm" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                <Plus className="h-3 w-3 mr-1" /> Add New Location
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Ending Location</h3>
        
        <Card>
          <CardContent className="pt-6">
            <RadioGroup
              defaultValue={tripPlan.endLocationType}
              onValueChange={(value) => handleEndLocationTypeChange(value as TripPlan['endLocationType'])}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="No End Location" id="no-end" />
                <Label htmlFor="no-end" className="flex-1 cursor-pointer">No End Location</Label>
              </div>
              
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="Return To Start" id="return" />
                <Label htmlFor="return" className="flex-1 cursor-pointer">Return To Start Location</Label>
              </div>
              
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="Driver Default" id="driver-default" />
                <Label htmlFor="driver-default" className="flex-1 cursor-pointer">Driver Default Location</Label>
              </div>
              
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="Custom" id="custom" />
                <Label htmlFor="custom" className="flex-1 cursor-pointer">Custom Location</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Additional Options</h3>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox 
                  id="skillMatching" 
                  checked={tripPlan.skillMatching} 
                  onCheckedChange={handleToggleSkillMatching}
                />
                <div>
                  <Label htmlFor="skillMatching" className="text-sm font-medium cursor-pointer">Skill Matching</Label>
                  <p className="text-xs text-gray-500">Match drivers with required skills to stops</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox 
                  id="useTeamMember" 
                  checked={tripPlan.useTeamMemberProfile} 
                  onCheckedChange={handleToggleUseTeamMemberProfile}
                />
                <div>
                  <Label htmlFor="useTeamMember" className="text-sm font-medium cursor-pointer">Use Team Member Profile</Label>
                  <p className="text-xs text-gray-500">Apply team member preferences when planning routes</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
                <Checkbox 
                  id="ignoreTimeWindows" 
                  checked={tripPlan.ignoreTimeWindows} 
                  onCheckedChange={handleToggleIgnoreTimeWindows}
                />
                <div>
                  <Label htmlFor="ignoreTimeWindows" className="text-sm font-medium cursor-pointer">Ignore Time Windows</Label>
                  <p className="text-xs text-gray-500">Ignore customer time windows when planning routes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end mt-10">
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Next Step <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
