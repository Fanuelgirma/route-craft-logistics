
import { cn } from "@/lib/utils";
import { RoutingStep } from "@/types/routing";

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

  return (
    <div className="bg-blue-600 text-white flex w-full">
      {steps.map((step, index) => {
        const isActive = step === activeStep;
        const isAccessible = isStepAccessible(step);
        
        return (
          <button
            key={step}
            onClick={() => isAccessible && onStepChange(step)}
            className={cn(
              "flex-1 py-3 text-center transition-colors relative",
              isActive ? "bg-blue-700" : "hover:bg-blue-700/70",
              !isAccessible && "opacity-60 cursor-not-allowed"
            )}
            disabled={!isAccessible}
          >
            {step}
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
