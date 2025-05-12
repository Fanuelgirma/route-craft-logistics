
import { useState } from 'react';
import { Calendar, Clock, Plus, Upload, X } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ServiceEntry, ServiceLineItem, RepairPriorityClass, Vendor } from '@/types/maintenance';
import { Vehicle } from '@/types/vehicle';

interface ServiceEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceEntry?: ServiceEntry;
}

// Mock data
const mockVehicles: Vehicle[] = [
  { 
    id: '1100',
    vinNumber: 'JT2BK12U920110601',
    regNo: '6TRJ244',
    model: 'Prius',
    make: 'Toyota',
    year: 2018,
    vehicleType: 'Car',
    depot: 'Chicago',
    status: 'Available',
  },
  { 
    id: '2100',
    vinNumber: 'F76U897S26987608',
    regNo: 'BHT467',
    model: 'F-150',
    make: 'Ford',
    year: 2016,
    vehicleType: 'Truck',
    depot: 'Chicago',
    status: 'Available',
  }
];

const mockVendors: Vendor[] = [
  { id: '1', name: 'Elite Tire & Service Inc' },
  { id: '2', name: 'AutoZone' },
  { id: '3', name: 'Jiffy Lube' }
];

const mockRepairPriorities: RepairPriorityClass[] = [
  { id: '1', name: 'Scheduled' },
  { id: '2', name: 'Non-Scheduled' },
  { id: '3', name: 'Emergency' }
];

export default function ServiceEntryModal({ isOpen, onClose, serviceEntry }: ServiceEntryModalProps) {
  const [selectedVehicle, setSelectedVehicle] = useState(serviceEntry?.assetId || '');
  const [completionDate, setCompletionDate] = useState(serviceEntry?.completionDate?.split('T')[0] || '');
  const [completionTime, setCompletionTime] = useState(serviceEntry?.completionDate?.split('T')[1].slice(0, 5) || '');
  const [repairPriority, setRepairPriority] = useState('');
  const [vendor, setVendor] = useState('');
  const [reference, setReference] = useState('');
  const [labels, setLabels] = useState('');
  const [setStartDate, setSetStartDate] = useState(false);
  const [comments, setComments] = useState('');

  const handleSave = () => {
    // Implement save logic
    onClose();
  };

  const handleSaveAndAddAnother = () => {
    // Implement save and reset form logic
    // Reset form fields
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Service Entry"
      size="xl"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveAndAddAnother}>
            Save & Add Another
          </Button>
          <Button onClick={handleSave}>
            Save Service Entry
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Details Section */}
        <div className="bg-white rounded-md p-6 border">
          <h2 className="text-lg font-semibold mb-4">Details</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="asset" className="flex items-center">
                Asset <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger id="asset" className="w-full mt-1">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {mockVehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.id} [{vehicle.year} {vehicle.make} {vehicle.model}]
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="repairPriority">Repair Priority Class</Label>
              <Select value={repairPriority} onValueChange={setRepairPriority}>
                <SelectTrigger id="repairPriority" className="w-full mt-1">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {mockRepairPriorities.map((priority) => (
                    <SelectItem key={priority.id} value={priority.id}>
                      {priority.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Repair Priority Class (VMRS Code Key 16) is a simple way to classify whether a service or repair was scheduled, non-scheduled, or an emergency.
              </p>
            </div>
            
            <div>
              <Label htmlFor="completionDate" className="flex items-center">
                Completion Date <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="completionDate"
                    type="date"
                    className="pl-10"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="completionTime"
                    type="time"
                    className="pl-10"
                    value={completionTime}
                    onChange={(e) => setCompletionTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="setStartDate"
                  checked={setStartDate}
                  onChange={(e) => setSetStartDate(e.target.checked)}
                  className="rounded text-logistic-accent focus:ring-logistic-accent"
                />
                <label htmlFor="setStartDate" className="ml-2 text-sm">
                  Set Start Date
                </label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="vendor">Vendor</Label>
              <Select value={vendor} onValueChange={setVendor}>
                <SelectTrigger id="vendor" className="w-full mt-1">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  {mockVendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="labels">Labels</Label>
              <Select value={labels} onValueChange={setLabels}>
                <SelectTrigger id="labels" className="w-full mt-1">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Issues Section */}
        <div className="bg-white rounded-md p-6 border">
          <h2 className="text-lg font-semibold mb-4">Issues</h2>
          
          {!selectedVehicle ? (
            <div className="text-center py-10 text-gray-500">
              Select a asset first.
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No issues found for this vehicle.
            </div>
          )}
        </div>
        
        {/* Line Items Section */}
        <div className="bg-white rounded-md p-6 border">
          <h2 className="text-lg font-semibold mb-4">Line Items</h2>
          
          {!selectedVehicle ? (
            <div className="text-center py-10 text-gray-500">
              Select a asset first.
            </div>
          ) : (
            <div className="text-center py-10">
              <Button variant="outline" className="flex items-center">
                <Plus size={16} className="mr-1" />
                Add Line Item
              </Button>
            </div>
          )}
        </div>
        
        {/* Photos & Documents Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-md p-6 border">
            <h2 className="text-lg font-semibold mb-4">Photos</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition cursor-pointer">
              <Upload size={24} />
              <p className="mt-2 font-medium">Drag and drop files to upload</p>
              <p className="text-sm">or click to pick files</p>
            </div>
          </div>
          
          <div className="bg-white rounded-md p-6 border">
            <h2 className="text-lg font-semibold mb-4">Documents</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition cursor-pointer">
              <Upload size={24} />
              <p className="mt-2 font-medium">Drag and drop files to upload</p>
              <p className="text-sm">or click to pick files</p>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="bg-white rounded-md p-6 border">
          <h2 className="text-lg font-semibold mb-4">Comments</h2>
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium mr-3">
              FG
            </div>
            <Textarea
              placeholder="Add an optional comment"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
