
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Vehicle } from '@/types/vehicle';
import { Separator } from '@/components/ui/separator';

interface VehicleDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
}

export default function VehicleDetailDrawer({ isOpen, onClose, vehicle }: VehicleDetailDrawerProps) {
  if (!vehicle) {
    return null;
  }
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Vehicle Details</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="flex items-center mb-4">
            <h3 className="text-2xl font-bold">{vehicle.regNo}</h3>
            <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
              vehicle.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
              vehicle.status === 'Dispatched' ? 'bg-purple-100 text-purple-800' :
              vehicle.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {vehicle.status}
            </span>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">VIN Number</p>
                <p className="font-medium">{vehicle.vinNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">{vehicle.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Make</p>
                <p className="font-medium">{vehicle.make || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-medium">{vehicle.year || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tonnage</p>
                <p className="font-medium">{vehicle.tonnage ? `${vehicle.tonnage}T` : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle Type</p>
                <p className="font-medium">{vehicle.vehicleType}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Location & Assignment</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Depot</p>
                <p className="font-medium">{vehicle.depot}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium">{vehicle.region || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sub-Region</p>
                <p className="font-medium">{vehicle.subRegion || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned Driver</p>
                <p className="font-medium">{vehicle.driverName || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Driver Phone</p>
                <p className="font-medium">{vehicle.driverPhone || '-'}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Recent Trips</h4>
            <p className="text-gray-500">No recent trips found.</p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Maintenance History</h4>
            <p className="text-gray-500">No maintenance records found.</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
