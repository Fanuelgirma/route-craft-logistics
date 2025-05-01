
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import SearchInput from '@/components/ui/SearchInput';
import { Vehicle } from '@/types/vehicle';

interface BulkAssignSubRegionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
}

const regions = [
  { id: 'default', name: 'DEFAULT', subRegions: ['nairobi', 'githunguri', 'dandora', 'ruiru', 'n-north'] },
  { id: 'zone1', name: 'ZONE 1', subRegions: ['donholm'] },
  { id: 'zone2', name: 'ZONE 2', subRegions: ['embakasi'] },
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

export default function BulkAssignSubRegionsModal({ isOpen, onClose, vehicles }: BulkAssignSubRegionsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState<Set<string>>(new Set());
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState('');
  
  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter subregions based on selected region
  const filteredSubRegions = selectedRegion 
    ? subRegions.filter(sr => sr.regionId === selectedRegion) 
    : [];
  
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
  
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedSubRegion('');
  };
  
  const handleAssign = () => {
    // Here we would normally send the data to the server
    console.log('Assigning Sub-Region:', {
      vehicles: Array.from(selectedVehicles),
      region: selectedRegion,
      subRegion: selectedSubRegion,
    });
    
    // Show toast notification
    toast({
      title: "Sub-Region assigned",
      description: `${selectedVehicles.size} vehicles have been assigned to ${
        subRegions.find(sr => sr.id === selectedSubRegion)?.name || 'the selected sub-region'
      }.`,
    });
    
    // Close the modal
    onClose();
  };
  
  const isAssignDisabled = selectedVehicles.size === 0 || !selectedSubRegion;
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Bulk Assign Sub-Regions"
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
                  <TableHead>Current Region</TableHead>
                  <TableHead>Current Sub-Region</TableHead>
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
                      <TableCell>{vehicle.region || '-'}</TableCell>
                      <TableCell>{vehicle.subRegion || '-'}</TableCell>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedRegion}
              onChange={handleRegionChange}
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
              value={selectedSubRegion}
              onChange={(e) => setSelectedSubRegion(e.target.value)}
              disabled={!selectedRegion}
            >
              <option value="">Select Sub-Region</option>
              {filteredSubRegions.map(subRegion => (
                <option key={subRegion.id} value={subRegion.id}>{subRegion.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
}
