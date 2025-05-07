
import { useState, useEffect } from 'react';
import { RoutingStep, TripPlan } from '@/types/routing';
import RoutingWizardTabs from './RoutingWizardTabs';
import TripDetailsStep from './TripDetailsStep';
import SelectStopsStep from './SelectStopsStep';
import SelectTeamMembersStep from './SelectTeamMembersStep';
import TripSummaryStep from './TripSummaryStep';
import RoutingMapView from './RoutingMapView';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import RouteSettingsModal from './RouteSettingsModal';
import EditConfigurationModal from './EditConfigurationModal';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Show settings modal on first load
  useEffect(() => {
    // Check if we should show the route settings modal
    const hideRouteSettings = localStorage.getItem('hideRouteSettings');
    if (!hideRouteSettings) {
      setTimeout(() => {
        setShowSettingsModal(true);
      }, 500);
    }
  }, []);
  
  // Update tripPlan state
  const handleTripPlanUpdate = (updates: Partial<TripPlan>) => {
    setTripPlan(prev => ({ ...prev, ...updates }));
    toast({
      title: "Progress saved",
      description: "Your changes have been saved",
      duration: 2000,
    });
  };
  
  // Navigation between steps
  const handleNext = () => {
    if (activeStep === 'Trip Details') {
      setActiveStep('Select Stops');
      toast({
        title: "Step completed",
        description: "Now select your stops",
        duration: 2000,
      });
    }
    else if (activeStep === 'Select Stops') {
      setActiveStep('Select Team Members');
      toast({
        title: "Stops selected",
        description: "Now select team members",
        duration: 2000,
      });
    }
    else if (activeStep === 'Select Team Members') {
      setActiveStep('Trip Summary');
      toast({
        title: "Team selected",
        description: "Review your trip summary",
        duration: 2000,
      });
    }
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
    
    toast({
      title: "Trip plan completed!",
      description: "Your route has been created successfully",
      variant: "default",
    });
    
    // Reset the wizard
    setActiveStep('Trip Details');
    setTripPlan(initialTripPlan);
  };
  
  const handleOpenConfig = () => {
    setShowSettingsModal(false);
    setShowConfigModal(true);
  };
  
  // Render the appropriate step
  const renderStep = () => {
    switch (activeStep) {
      case 'Trip Details':
        return <TripDetailsStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onNext={handleNext} onOpenSettings={() => setShowConfigModal(true)} />;
      case 'Select Stops':
        return <SelectStopsStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onNext={handleNext} onPrevious={handlePrevious} />;
      case 'Select Team Members':
        return <SelectTeamMembersStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onNext={handleNext} onPrevious={handlePrevious} />;
      case 'Trip Summary':
        return <TripSummaryStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onPrevious={handlePrevious} onComplete={handleComplete} />;
      default:
        return <TripDetailsStep tripPlan={tripPlan} onUpdate={handleTripPlanUpdate} onNext={handleNext} onOpenSettings={() => setShowConfigModal(true)} />;
    }
  };

  const ModalComponent = isMobile ? Drawer : Dialog;
  const ModalContentComponent = isMobile ? DrawerContent : DialogContent;

  return (
    <div className="flex bg-gray-50 rounded-lg shadow-sm">
      <div className="w-1/2 overflow-auto border-r border-gray-200 flex flex-col">
        <div className="flex-shrink-0 shadow-sm">
          <RoutingWizardTabs
            activeStep={activeStep}
            onStepChange={setActiveStep}
            isStepAccessible={isStepAccessible}
          />
        </div>
        <div className="flex-1 overflow-auto bg-white">
          {renderStep()}
        </div>
      </div>
      <div className="w-1/2 relative bg-gray-100">
        <RoutingMapView tripPlan={tripPlan} activeStep={activeStep} />
      </div>
      
      {/* Settings Modal */}
      <RouteSettingsModal 
        isOpen={showSettingsModal} 
        onClose={() => setShowSettingsModal(false)} 
        onEdit={handleOpenConfig} 
      />
      
      {/* Edit Configuration Modal */}
      <EditConfigurationModal 
        isOpen={showConfigModal} 
        onClose={() => setShowConfigModal(false)} 
      />
    </div>
  );
}
