
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { MaintenanceRecord } from '@/types/maintenance';
import { Vehicle } from '@/types/vehicle';

interface AddMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  maintenanceRecord?: MaintenanceRecord | null;
}

interface MaintenanceFormData {
  purchaseDate: string;
  vehicle: string;
  maintenanceService: string;
  cost: number;
  description: string;
}

// Mock data for dropdowns
const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', vinNumber: '1HGCM82633A123456', regNo: 'KAB-987', model: 'Isuzu', vehicleType: 'Rigid', depot: 'LETA', status: 'Scheduled' },
  { id: '2', vinNumber: '1HGCM82633A123457', regNo: 'KAC 2030-2', model: 'Mitsubishi', vehicleType: 'Rigid', depot: 'LETA', status: 'Scheduled' },
  { id: '4', vinNumber: '1HGCM82633A123459', regNo: 'KAW-132B2', model: 'Mercedes', vehicleType: 'Trailer', depot: 'LETA', status: 'Scheduled' },
  { id: '6', vinNumber: '1HGCM82633A123461', regNo: 'KAW 949D2', model: 'Scania', vehicleType: 'Trailer', depot: 'LETA', status: 'Scheduled' },
];

const maintenanceServices = [
  { id: 'oil-change', name: 'Oil Change' },
  { id: 'tyre', name: 'Tyres' },
  { id: 'tyre-change', name: 'Tyre change' },
  { id: 'brake', name: 'Brake Service' },
  { id: 'license', name: 'License' },
  { id: 'inspection', name: 'Inspection' },
  { id: 'repair', name: 'General Repair' },
];

export default function AddMaintenanceModal({ isOpen, onClose, maintenanceRecord }: AddMaintenanceModalProps) {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<MaintenanceFormData>({
    defaultValues: {
      purchaseDate: new Date().toISOString().split('T')[0],
      vehicle: '',
      maintenanceService: '',
      cost: 0,
      description: '',
    }
  });
  
  useEffect(() => {
    if (maintenanceRecord) {
      // Find vehicle ID from registration number
      const vehicle = MOCK_VEHICLES.find(v => v.regNo === maintenanceRecord.registrationNumber);
      
      // Find maintenance service ID from name
      const service = maintenanceServices.find(s => 
        s.name.toLowerCase() === maintenanceRecord.maintenanceService.toLowerCase()
      );
      
      const formData = {
        purchaseDate: maintenanceRecord.purchaseDate,
        vehicle: vehicle?.id || '',
        maintenanceService: service?.id || '',
        cost: maintenanceRecord.cost,
        description: maintenanceRecord.description || '',
      };
      reset(formData);
    } else {
      reset({
        purchaseDate: new Date().toISOString().split('T')[0],
        vehicle: '',
        maintenanceService: '',
        cost: 0,
        description: '',
      });
    }
  }, [maintenanceRecord, reset]);
  
  const onSubmit = (data: MaintenanceFormData) => {
    // Here we would normally send the data to the server
    console.log('Form submitted:', data);
    
    // Show toast notification
    toast({
      title: maintenanceRecord ? "Maintenance record updated" : "Maintenance record added",
      description: `Maintenance record has been ${maintenanceRecord ? 'updated' : 'added'} successfully.`,
    });
    
    // Close the modal
    onClose();
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={maintenanceRecord ? "Edit Maintenance Record" : "Create Maintenance Record"}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>
            {maintenanceRecord ? 'Update Maintenance Record' : 'Create Maintenance Record'}
          </Button>
        </>
      }
    >
      <div className="text-sm text-gray-500 mb-4">
        Input the maintenance details
      </div>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Purchase Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={`w-full p-2 border rounded-md ${errors.purchaseDate ? 'border-red-500' : 'border-gray-300'}`}
              {...register('purchaseDate', { required: true })}
            />
            {errors.purchaseDate && (
              <p className="text-sm text-red-500">Purchase Date is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full p-2 border rounded-md ${errors.vehicle ? 'border-red-500' : 'border-gray-300'}`}
              {...register('vehicle', { required: true })}
            >
              <option value="">Select Vehicle</option>
              {MOCK_VEHICLES.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.regNo} ({vehicle.model})
                </option>
              ))}
            </select>
            {errors.vehicle && (
              <p className="text-sm text-red-500">Vehicle is required</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Maintenance Cost (KES) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className={`w-full p-2 border rounded-md ${errors.cost ? 'border-red-500' : 'border-gray-300'}`}
              min={0}
              {...register('cost', { 
                required: true,
                min: 0,
                valueAsNumber: true
              })}
            />
            {errors.cost && (
              <p className="text-sm text-red-500">
                {errors.cost.type === 'required' ? 'Cost is required' : 'Cost must be greater than 0'}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Maintenance Service <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full p-2 border rounded-md ${errors.maintenanceService ? 'border-red-500' : 'border-gray-300'}`}
              {...register('maintenanceService', { required: true })}
            >
              <option value="">Select Service</option>
              {maintenanceServices.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
            {errors.maintenanceService && (
              <p className="text-sm text-red-500">Maintenance Service is required</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={5}
            maxLength={255}
            placeholder="Enter description (optional)"
            {...register('description')}
          ></textarea>
        </div>
      </form>
    </Modal>
  );
}
