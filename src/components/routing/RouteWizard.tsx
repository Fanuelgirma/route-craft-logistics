
import { useState, useEffect } from 'react';
import { RoutingStep, TripPlan } from '@/types/routing';
import RoutingWizardTabs from './RoutingWizardTabs';
import TripDetailsStep from './TripDetailsStep';
import SelectStopsStep from './SelectStopsStep';
import SelectTeamMembersStep from './SelectTeamMembersStep';
import TripSummaryStep from './TripSummaryStep';
import RoutingMapView from './RoutingMapView';

const initialTripPlan: TripPlan = {
  id: Math.random().toString(36).substring(2, 15),
  name: `Trip ${new Date().toLocaleDateString()}`,
  startLocation: {
    id: '1',
    name: 'Default Location',
    address: '55 Miller St, Pyrmont NSW 2009, Australia',
    lat: -33.8688,
    lng: 151.2093,
    type: 'Custom'
  },
  endLocationType: 'No End Location',
  date: new Date(),
  startTime: '09:00',
  endTime: '18:00',
  skillMatching: true,
  useTeamMemberProfile: false,
  addReturnToStart: false,
  ignoreTimeWindows: false,
  selectedStops: [],
  selectedDrivers: [],
  routes: [],
  createFixedOrderTrips: false
};

export default function RouteWizard() {
  const [activeStep, setActiveStep] = useState<RoutingStep>('Trip Details');
  const [tripPlan, setTripPlan] = useState<TripPlan>(initialTripPlan);
  
  // Update tripPlan state
  const handleTripPlanUpdate = (updates: Partial<TripPlan>) => {
    setTripPlan(prev => ({ ...prev, ...updates }));
  };
  
  // Navigation between steps
  const handleNext = () => {
    if (activeStep === 'Trip Details') setActiveStep('Select Stops');
    else if (activeStep === 'Select Stops') setActiveStep('Select Team Members');
    else if (activeStep === 'Select Team Members') setActiveStep('Trip Summary');
  };
  
  const handlePrevious = () => {
    if (activeStep === 'Select Stops') setActiveStep('Trip Details');
    else if (activeStep === 'Select Team Members') setActiveStep('Select Stops');
    else if (activeStep === 'Trip Summary') setActiveStep('Select Team Members');
  };
  
  // Determine if a step is accessible (e.g., based on completion of previous steps)
  const isStepAccessible = (step: RoutingStep) => {
    if (step === 'Trip Details') return true;
    if (step === 'Select Stops') return true; // Always allow going back
    if (step === 'Select Team Members') return tripPlan.selectedStops.length > 0;
    if (step === 'Trip Summary') return tripPlan.selectedDrivers.length > 0;
    return false;
  };
  
  // Handle completion of the wizard
  const handleComplete = () => {
    console.log('Trip plan completed:', tripPlan);
    // In a real app, you would likely make an API call here to save the trip plan
    // and then navigate to a confirmation page or back to a list of trips
    
    // For now, reset the wizard
    setActiveStep('Trip Details');
    setTripPlan(initialTripPlan);
  };
  
  // Render the appropriate step
  const renderStep = () => {
    switch (activeStep) {
      case 'Trip Details':
        return <TripDetailsStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onNext={handleNext} />;
      case 'Select Stops':
        return <SelectStopsStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onNext={handleNext} onPrevious={handlePrevious} />;
      case 'Select Team Members':
        return <SelectTeamMembersStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onNext={handleNext} onPrevious={handlePrevious} />;
      case 'Trip Summary':
        return <TripSummaryStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onPrevious={handlePrevious} onComplete={handleComplete} />;
      default:
        return <TripDetailsStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onNext={handleNext} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/2 overflow-auto border-r border-gray-200 flex flex-col">
        <div className="flex-shrink-0">
          <RoutingWizardTabs
            activeStep={activeStep}
            onStepChange={setActiveStep}
            isStepAccessible={isStepAccessible}
          />
        </div>
        <div className="flex-1 overflow-auto">
          {renderStep()}
        </div>
      </div>
      <div className="w-1/2 relative">
        <RoutingMapView tripPlan={tripPlan} activeStep={activeStep} />
      </div>
    </div>
  );
}
