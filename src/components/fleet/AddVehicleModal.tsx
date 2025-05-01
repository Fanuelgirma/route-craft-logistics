
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { Vehicle } from '@/types/vehicle';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle | null;
}

interface VehicleFormData {
  vinNumber: string;
  regNo: string;
  model: string;
  make: string;
  year?: number;
  tonnage?: number;
  vehicleType: string;
  depot: string;
  region: string;
  subRegion: string;
  status: string;
}

const vehicleTypes = [
  { id: 'rigid', name: 'Rigid' },
  { id: 'trailer', name: 'Trailer' },
  { id: 'pickup', name: 'Pickup' },
  { id: 'van', name: 'Van' },
];

const depots = [
  { id: 'leta', name: 'LETA' },
  { id: 'nairobi', name: 'NAIROBI' },
  { id: 'mombasa', name: 'MOMBASA' },
];

const regions = [
  { id: 'default', name: 'DEFAULT' },
  { id: 'zone1', name: 'ZONE 1' },
  { id: 'zone2', name: 'ZONE 2' },
];

const subRegions = [
  { id: 'nairobi', name: 'NAIROBI', regionId: 'default' },
  { id: 'githunguri', name: 'GITHUNGURI', regionId: 'default' },
  { id: 'dandora', name: 'DANDORA', regionId: 'default' },
  { id: 'embakasi', name: 'EMBAKASI', regionId: 'zone2' },
  { id: 'ruiru', name: 'RUIRU', regionId: 'default' },
  { id: 'donholm', name: 'DONHOLM', regionId: 'zone1' },
  { id: 'n-north', name: 'N. NORTH', regionId: 'default' },
];

const statuses = [
  { id: 'available', name: 'Available' },
  { id: 'scheduled', name: 'Scheduled' },
  { id: 'dispatched', name: 'Dispatched' },
  { id: 'in-transit', name: 'In Transit' },
  { id: 'offline', name: 'Offline' },
];

export default function AddVehicleModal({ isOpen, onClose, vehicle }: AddVehicleModalProps) {
  const [filteredSubRegions, setFilteredSubRegions] = useState(subRegions);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    watch,
    formState: { errors } 
  } = useForm<VehicleFormData>({
    defaultValues: {
      vinNumber: '',
      regNo: '',
      model: '',
      make: '',
      vehicleType: '',
      depot: 'leta',
      region: '',
      subRegion: '',
      status: 'available',
    }
  });
  
  const selectedRegion = watch('region');
  
  useEffect(() => {
    if (selectedRegion) {
      setFilteredSubRegions(subRegions.filter(sr => sr.regionId === selectedRegion));
    } else {
      setFilteredSubRegions(subRegions);
    }
  }, [selectedRegion]);
  
  useEffect(() => {
    if (vehicle) {
      const formData = {
        vinNumber: vehicle.vinNumber,
        regNo: vehicle.regNo,
        model: vehicle.model,
        make: vehicle.make || '',
        year: vehicle.year,
        tonnage: vehicle.tonnage,
        vehicleType: vehicle.vehicleType.toLowerCase(),
        depot: vehicle.depot.toLowerCase(),
        region: vehicle.region ? vehicle.region.toLowerCase().replace(' ', '') : '',
        subRegion: vehicle.subRegion ? vehicle.subRegion.toLowerCase().replace(' ', '') : '',
        status: vehicle.status.toLowerCase().replace(' ', '-'),
      };
      reset(formData);
    } else {
      reset({
        vinNumber: '',
        regNo: '',
        model: '',
        make: '',
        vehicleType: '',
        depot: 'leta',
        region: '',
        subRegion: '',
        status: 'available',
      });
    }
  }, [vehicle, reset]);
  
  const onSubmit = (data: VehicleFormData) => {
    // Here we would normally send the data to the server
    console.log('Form submitted:', data);
    
    // Show toast notification
    toast({
      title: vehicle ? "Vehicle updated" : "Vehicle added",
      description: `${data.regNo} has been ${vehicle ? 'updated' : 'added'} successfully.`,
    });
    
    // Close the modal
    onClose();
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={vehicle ? "Edit Vehicle" : "Add Vehicle"}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>
            {vehicle ? 'Update Vehicle' : 'Save Vehicle'}
          </Button>
        </>
      }
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              VIN Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${errors.vinNumber ? 'border-red-500' : 'border-gray-300'}`}
              {...register('vinNumber', { required: true, maxLength: 17 })}
            />
            {errors.vinNumber && (
              <p className="text-sm text-red-500">VIN Number is required (max 17 characters)</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Registration No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${errors.regNo ? 'border-red-500' : 'border-gray-300'}`}
              {...register('regNo', { required: true })}
            />
            {errors.regNo && (
              <p className="text-sm text-red-500">Registration No is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
              {...register('model', { required: true })}
            />
            {errors.model && (
              <p className="text-sm text-red-500">Model is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register('make')}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              min={1980}
              max={new Date().getFullYear()}
              {...register('year', { 
                min: 1980, 
                max: new Date().getFullYear(),
                valueAsNumber: true 
              })}
            />
            {errors.year && (
              <p className="text-sm text-red-500">Year must be between 1980 and the current year</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tonnage (tons)
            </label>
            <input
              type="number"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md"
              min={0}
              {...register('tonnage', { 
                min: 0,
                valueAsNumber: true
              })}
            />
            {errors.tonnage && (
              <p className="text-sm text-red-500">Tonnage must be greater than 0</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Type <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full p-2 border rounded-md ${errors.vehicleType ? 'border-red-500' : 'border-gray-300'}`}
              {...register('vehicleType', { required: true })}
            >
              <option value="">Select Vehicle Type</option>
              {vehicleTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            {errors.vehicleType && (
              <p className="text-sm text-red-500">Vehicle Type is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Depot <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full p-2 border rounded-md ${errors.depot ? 'border-red-500' : 'border-gray-300'}`}
              {...register('depot', { required: true })}
            >
              <option value="">Select Depot</option>
              {depots.map(depot => (
                <option key={depot.id} value={depot.id}>{depot.name}</option>
              ))}
            </select>
            {errors.depot && (
              <p className="text-sm text-red-500">Depot is required</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register('region')}
            >
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Sub-Region
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register('subRegion')}
              disabled={!selectedRegion}
            >
              <option value="">Select Sub-Region</option>
              {filteredSubRegions.map(subRegion => (
                <option key={subRegion.id} value={subRegion.id}>{subRegion.name}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Initial Status
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register('status')}
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}
