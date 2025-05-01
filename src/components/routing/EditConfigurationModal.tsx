
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RouteConfig } from '@/types/routing';

interface EditConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: RouteConfig;
}

export default function EditConfigurationModal({ 
  isOpen, 
  onClose, 
  initialConfig 
}: EditConfigurationModalProps) {
  const [config, setConfig] = useState<RouteConfig>(initialConfig || {
    id: 'default',
    name: 'AUTO',
    globalDeliveryWindowFrom: '09:00',
    globalDeliveryWindowTo: '17:00',
    maximumStops: 5,
    maximumUtilization: 100,
    serviceTimePerCustomer: 5,
    routingStrategy: 'Dynamic',
    applyCustomerTimeWindow: false,
    useCustomerServiceTime: false,
    returnTrip: false
  });

  const handleUpdateConfig = () => {
    console.log('Updating configuration:', config);
    // Would typically make API call to update configuration
    // POST /api/routing/config
    onClose();
  };

  const handleInputChange = (field: keyof RouteConfig, value: string | number | boolean) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Edit Configuration"
      size="md"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateConfig}>
            Update Configuration
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={config.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Global Delivery Window</Label>
          <div className="flex space-x-4 items-center">
            <div className="flex-1">
              <Label htmlFor="deliveryFrom" className="text-xs">From</Label>
              <Input
                id="deliveryFrom"
                type="time"
                value={config.globalDeliveryWindowFrom}
                onChange={(e) => handleInputChange('globalDeliveryWindowFrom', e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="deliveryTo" className="text-xs">To</Label>
              <Input
                id="deliveryTo"
                type="time"
                value={config.globalDeliveryWindowTo}
                onChange={(e) => handleInputChange('globalDeliveryWindowTo', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="maximumStops">Maximum Stops</Label>
            <Input
              id="maximumStops"
              type="number"
              min="1"
              max="50"
              value={config.maximumStops}
              onChange={(e) => handleInputChange('maximumStops', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maximumUtilization">Maximum Utilization %</Label>
            <Input
              id="maximumUtilization"
              type="number"
              min="0"
              max="100"
              value={config.maximumUtilization}
              onChange={(e) => handleInputChange('maximumUtilization', parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="serviceTime">Service Per Customer Time (Minutes)</Label>
            <Input
              id="serviceTime"
              type="number"
              min="0"
              value={config.serviceTimePerCustomer}
              onChange={(e) => handleInputChange('serviceTimePerCustomer', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="routingStrategy">Routing</Label>
            <Select 
              value={config.routingStrategy} 
              onValueChange={(value) => handleInputChange('routingStrategy', value as 'Dynamic' | 'Dynamic with Sub-Regions' | 'Static')}
            >
              <SelectTrigger id="routingStrategy">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dynamic">Dynamic</SelectItem>
                <SelectItem value="Dynamic with Sub-Regions">Dynamic with Sub-Regions</SelectItem>
                <SelectItem value="Static">Static</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="applyCustomerWindow" 
              checked={config.applyCustomerTimeWindow}
              onCheckedChange={(checked) => 
                handleInputChange('applyCustomerTimeWindow', checked === true)
              }
            />
            <Label htmlFor="applyCustomerWindow" className="text-sm">Apply Customer Time Window</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="useCustomerServiceTime" 
              checked={config.useCustomerServiceTime}
              onCheckedChange={(checked) => 
                handleInputChange('useCustomerServiceTime', checked === true)
              }
            />
            <Label htmlFor="useCustomerServiceTime" className="text-sm">Use Customer Service Time</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="returnTrip" 
              checked={config.returnTrip}
              onCheckedChange={(checked) => 
                handleInputChange('returnTrip', checked === true)
              }
            />
            <Label htmlFor="returnTrip" className="text-sm">Return Trip</Label>
          </div>
        </div>
      </div>
    </Modal>
  );
}
