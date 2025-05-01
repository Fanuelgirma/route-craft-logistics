
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface RouteSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export default function RouteSettingsModal({ isOpen, onClose, onEdit }: RouteSettingsModalProps) {
  const [selectionMode, setSelectionMode] = useState<'automatic' | 'manual'>('automatic');
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleProceed = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideRouteSettings', 'true');
    }
    onClose();
  };

  const handleDontShowChange = (checked: boolean) => {
    setDontShowAgain(checked);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Route Optimization Settings"
      size="md"
      footer={
        <div className="flex justify-between w-full items-center">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="dont-show-again" 
              checked={dontShowAgain}
              onCheckedChange={handleDontShowChange}
            />
            <Label htmlFor="dont-show-again" className="text-sm text-gray-600">Don't show this again</Label>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onEdit} className="text-blue-500">
              Edit
            </Button>
            <Button onClick={handleProceed}>
              Proceed →
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-lg font-medium text-center mb-4 text-gray-700">AUTO</div>
        
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Delivery Window</span>
            <span className="font-medium">9:00 AM - 5:00 PM</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Customer Delivery Window</span>
            <span className="font-medium">No</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Sub-Region Ranking</span>
            <span className="font-medium">No</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Maximum Utilization</span>
            <span className="font-medium">100%</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Maximum Stops</span>
            <span className="font-medium">5</span>
          </div>
        </div>
        
        <RadioGroup 
          value={selectionMode} 
          onValueChange={(value) => setSelectionMode(value as 'automatic' | 'manual')}
          className="flex justify-center gap-8 pt-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="automatic" id="automatic" />
            <Label htmlFor="automatic">Automatic Selection</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual">Manual Selection</Label>
          </div>
        </RadioGroup>
      </div>
    </Modal>
  );
}
