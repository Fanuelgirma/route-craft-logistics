
import React, { useRef, useEffect } from 'react';
import { Map, MapPin, Layers } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';

interface VehicleMapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const statusColors: Record<string, string> = {
  'Available': '#10B981',
  'Scheduled': '#3B82F6',
  'Dispatched': '#8B5CF6',
  'In Transit': '#F59E0B',
  'Offline': '#6B7280',
};

const VehicleMap: React.FC<VehicleMapProps> = ({ vehicles, selectedVehicle, onSelectVehicle }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real implementation, this would initialize a map (Google Maps, Mapbox, etc.)
    // and place markers for each vehicle
    console.log('Initializing map with vehicles:', vehicles);
  }, [vehicles]);

  useEffect(() => {
    if (selectedVehicle) {
      // In a real implementation, this would center the map on the selected vehicle
      console.log('Centering map on vehicle:', selectedVehicle);
    }
  }, [selectedVehicle]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full bg-gray-100 flex items-center justify-center">
        {/* This is a placeholder for the actual map implementation */}
        <div className="text-center">
          <Map size={48} className="mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">
            {vehicles.length} vehicles on the map
            {selectedVehicle && `, centered on ${selectedVehicle.plate}`}
          </p>
          <p className="text-gray-400 text-sm">
            Map placeholder - implement with Mapbox or Google Maps
          </p>
          
          <div className="mt-4 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {vehicles.map((vehicle) => (
              <div 
                key={vehicle.id}
                onClick={() => onSelectVehicle(vehicle)}
                className="flex flex-col items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
              >
                <MapPin size={24} color={statusColors[vehicle.status]} />
                <p className="text-xs font-medium mt-1">{vehicle.plate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white shadow-md rounded-md p-2">
        <button className="p-2 hover:bg-gray-100 rounded-full" title="Toggle Satellite View">
          <Layers size={18} />
        </button>
      </div>
    </div>
  );
};

export default VehicleMap;
