
import { cn } from "@/lib/utils";
import { RoutingStep } from "@/types/routing";
import { CheckCircle, Circle, MapPin, Truck, Users } from "lucide-react";

interface RoutingWizardTabsProps {
  activeStep: RoutingStep;
  onStepChange: (step: RoutingStep) => void;
  isStepAccessible: (step: RoutingStep) => boolean;
}

export default function RoutingWizardTabs({
  activeStep,
  onStepChange,
  isStepAccessible
}: RoutingWizardTabsProps) {
  const steps: RoutingStep[] = ['Trip Details', 'Select Stops', 'Select Team Members', 'Trip Summary'];
  
  const getStepIcon = (step: RoutingStep, isActive: boolean, isCompleted: boolean) => {
    switch(step) {
      case 'Trip Details':
        return isCompleted ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />;
      case 'Select Stops':
        return isCompleted ? <CheckCircle className="w-5 h-5" /> : <MapPin className="w-5 h-5" />;
      case 'Select Team Members':
        return isCompleted ? <CheckCircle className="w-5 h-5" /> : <Users className="w-5 h-5" />;
      case 'Trip Summary':
        return <Truck className="w-5 h-5" />;
      default:
        return <Circle className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white flex w-full">
      {steps.map((step, index) => {
        const isActive = step === activeStep;
        const isAccessible = isStepAccessible(step);
        const isCompleted = steps.indexOf(activeStep) > steps.indexOf(step);
        
        return (
          <button
            key={step}
            onClick={() => isAccessible && onStepChange(step)}
            className={cn(
              "flex-1 py-4 text-center transition-all relative flex items-center justify-center gap-2",
              isActive 
                ? "bg-blue-800" 
                : "hover:bg-blue-700/70",
              isCompleted && !isActive && "bg-blue-700",
              !isAccessible && "opacity-60 cursor-not-allowed"
            )}
            disabled={!isAccessible}
          >
            {getStepIcon(step, isActive, isCompleted)}
            <span>{step}</span>
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
