
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import SearchInput from '@/components/ui/SearchInput';
import { Vehicle } from '@/types/vehicle';

interface BulkAssignVehiclesModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
}

const depots = [
  { id: 'leta', name: 'LETA' },
  { id: 'nairobi', name: 'NAIROBI' },
  { id: 'mombasa', name: 'MOMBASA' },
];

const orderPools = [
  { id: 'pool1', name: 'Order Pool 1' },
  { id: 'pool2', name: 'Order Pool 2' },
  { id: 'pool3', name: 'Order Pool 3' },
];

const drivers = [
  { id: 'driver1', name: 'Aurora Long' },
  { id: 'driver2', name: 'Ben Hyman' },
  { id: 'driver3', name: 'Benson Ojiem' },
  { id: 'driver4', name: 'Yudi Okche' },
];

export default function BulkAssignVehiclesModal({ isOpen, onClose, vehicles }: BulkAssignVehiclesModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState<Set<string>>(new Set());
  const [selectedDepot, setSelectedDepot] = useState('');
  const [selectedOrderPool, setSelectedOrderPool] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  
  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleVehicle = (id: string) => {
    const newSelected = new Set(selectedVehicles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedVehicles(newSelected);
  };
  
  const toggleAll = () => {
    if (selectedVehicles.size === filteredVehicles.length) {
      setSelectedVehicles(new Set());
    } else {
      setSelectedVehicles(new Set(filteredVehicles.map(v => v.id)));
    }
  };
  
  const handleAssign = () => {
    // Here we would normally send the data to the server
    console.log('Assigning vehicles:', {
      vehicles: Array.from(selectedVehicles),
      depot: selectedDepot,
      orderPool: selectedOrderPool,
      driver: selectedDriver
    });
    
    // Show toast notification
    toast({
      title: "Vehicles assigned",
      description: `${selectedVehicles.size} vehicles have been assigned successfully.`,
    });
    
    // Close the modal
    onClose();
  };
  
  const isAssignDisabled = selectedVehicles.size === 0 || 
    (!selectedDepot && !selectedOrderPool && !selectedDriver);
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Bulk Assign Vehicles"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleAssign}
            disabled={isAssignDisabled}
          >
            Assign {selectedVehicles.size} {selectedVehicles.size === 1 ? 'Vehicle' : 'Vehicles'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">
            Select vehicles to assign
          </h3>
          
          <SearchInput 
            placeholder="Search vehicles..." 
            onSearch={setSearchQuery}
            className="w-full mb-4"
          />
          
          <div className="border rounded-md overflow-hidden max-h-60 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      className="rounded text-logistic-accent focus:ring-logistic-accent"
                      checked={selectedVehicles.size === filteredVehicles.length && filteredVehicles.length > 0}
                      onChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>Reg No</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Current Driver</TableHead>
                  <TableHead>Current Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map(vehicle => (
                    <TableRow key={vehicle.id} className="hover:bg-gray-50 cursor-pointer">
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded text-logistic-accent focus:ring-logistic-accent"
                          checked={selectedVehicles.has(vehicle.id)}
                          onChange={() => toggleVehicle(vehicle.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{vehicle.regNo}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.driverName || '-'}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                          vehicle.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          vehicle.status === 'Dispatched' ? 'bg-purple-100 text-purple-800' :
                          vehicle.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {vehicle.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                      No vehicles matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Assign to Depot
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedDepot}
              onChange={(e) => setSelectedDepot(e.target.value)}
            >
              <option value="">Select Depot</option>
              {depots.map(depot => (
                <option key={depot.id} value={depot.id}>{depot.name}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Assign to Order Pool
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedOrderPool}
              onChange={(e) => setSelectedOrderPool(e.target.value)}
            >
              <option value="">Select Order Pool</option>
              {orderPools.map(pool => (
                <option key={pool.id} value={pool.id}>{pool.name}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Assign to Driver (Optional)
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
            >
              <option value="">Select Driver</option>
              {drivers.map(driver => (
                <option key={driver.id} value={driver.id}>{driver.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
}
