
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Search } from "lucide-react";

interface AddServiceTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddServiceTaskModal({
  isOpen,
  onClose,
}: AddServiceTaskModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const handleSave = () => {
    // Save logic would go here
    onClose();
  };

  const handleSaveAndAddAnother = () => {
    // Save and reset form logic would go here
    setTaskName("");
    setDescription("");
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center">
                <div className="w-6 h-6 rounded-full bg-logistic-accent text-white flex items-center justify-center mr-2">
                  1
                </div>
                Details
              </h2>
            </div>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="taskName">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="mt-1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  A brief title for your unique task.
                </p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Additional details about the service/maintenance task
                </p>
              </div>

              <div>
                <Label>Subtasks</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Select Service Tasks"
                    className="pl-10 pr-3 py-2 w-full border rounded-md text-sm focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Only Service Tasks without Subtasks can be added.
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center">
                <div className="w-6 h-6 rounded-full bg-logistic-accent text-white flex items-center justify-center mr-2">
                  2
                </div>
                Recommendations
              </h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                No recommendations available for this service task.
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold flex items-center">
                <div className="w-6 h-6 rounded-full bg-logistic-accent text-white flex items-center justify-center mr-2">
                  3
                </div>
                Maintenance Categorization
              </h2>
            </div>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="categoryCode">Default Category Code</Label>
                <select
                  id="categoryCode"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-logistic-accent focus:border-logistic-accent sm:text-sm rounded-md"
                >
                  <option>Select Category Code...</option>
                  <option>Chassis</option>
                  <option>Accessories</option>
                  <option>Engine / Motor Systems</option>
                </select>
              </div>

              <div>
                <Label htmlFor="systemCode">Default System Code</Label>
                <select
                  id="systemCode"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-logistic-accent focus:border-logistic-accent sm:text-sm rounded-md"
                >
                  <option>Select System Code...</option>
                  <option>013 - Brakes</option>
                  <option>044 - Fuel System</option>
                </select>
              </div>

              <div>
                <Label htmlFor="assemblyCode">Default Assembly Code</Label>
                <select
                  id="assemblyCode"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-logistic-accent focus:border-logistic-accent sm:text-sm rounded-md"
                >
                  <option>Select Assembly Code...</option>
                  <option>011 - ABS, Anti-Lock System</option>
                  <option>007 - Throttle Controls</option>
                </select>
              </div>

              <div>
                <Label htmlFor="reasonCode">Default Reason for Repair Code</Label>
                <select
                  id="reasonCode"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-logistic-accent focus:border-logistic-accent sm:text-sm rounded-md"
                >
                  <option>Select Reason Code...</option>
                  <option>Preventive Maintenance</option>
                  <option>Breakdown</option>
                  <option>Recall</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSteps = () => {
    return (
      <div className="w-full my-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === currentStep
                    ? "bg-logistic-accent text-white"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step < currentStep ? "✓" : step}
              </div>
              {step < 3 && (
                <div className="w-full h-1 mx-2 bg-gray-200">
                  <div
                    className={`h-full ${
                      step < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Custom Service Task"
      size="xl"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {currentStep < 3 ? (
            <Button onClick={handleContinue} disabled={currentStep === 1 && !taskName}>
              Continue <ChevronRight size={16} className="ml-1" />
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={handleSaveAndAddAnother}>
                Save & Add Another
              </Button>
              <Button onClick={handleSave}>Save Service Task</Button>
            </>
          )}
        </>
      }
    >
      {renderSteps()}
      {renderStepContent()}

      <div className="mt-8 text-center text-sm text-gray-500">
        Need help getting started with Service Tasks?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Learn More
        </a>
      </div>
    </Modal>
  );
}
