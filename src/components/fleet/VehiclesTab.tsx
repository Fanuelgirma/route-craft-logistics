
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import SearchInput from '@/components/ui/SearchInput';
import VehicleStatusTabs from './VehicleStatusTabs';
import { Vehicle } from '@/types/vehicle';
import AddVehicleModal from './AddVehicleModal';
import BulkAssignVehiclesModal from './BulkAssignVehiclesModal';
import BulkAssignSubRegionsModal from './BulkAssignSubRegionsModal';
import VehicleDetailDrawer from './VehicleDetailDrawer';

// Mock data for demonstration
const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', vinNumber: '1HGCM82633A123456', regNo: 'KAB-987', model: 'Isuzu', make: 'FRR', year: 2020, tonnage: 10, vehicleType: 'Rigid', depot: 'LETA', region: 'DEFAULT', subRegion: 'NAIROBI', status: 'Scheduled' },
  { id: '2', vinNumber: '1HGCM82633A123457', regNo: 'KAC 2030-2', model: 'Mitsubishi', make: 'Fuso', year: 2021, tonnage: 5, vehicleType: 'Rigid', depot: 'LETA', region: '', subRegion: 'GITHUNGURI', status: 'Scheduled', driverName: 'Aurora Long', driverPhone: '+254757961280' },
  { id: '3', vinNumber: '1HGCM82633A123458', regNo: 'KAW-127B2', model: 'Isuzu', make: 'FVZ', year: 2022, tonnage: 5, vehicleType: 'Rigid', depot: 'LETA', region: '', subRegion: 'DANDORA', status: 'Available', driverName: 'BEN HYMAN', driverPhone: '+254710172937' },
  { id: '4', vinNumber: '1HGCM82633A123459', regNo: 'KAW-132B2', model: 'Mercedes', make: 'Actros', year: 2021, tonnage: 8, vehicleType: 'Trailer', depot: 'LETA', region: 'ZONE 2', subRegion: 'EMBAKASI', status: 'Scheduled', driverName: 'BENSON OJIEM', driverPhone: '+254723539350' },
  { id: '5', vinNumber: '1HGCM82633A123460', regNo: 'KAW946D-2', model: 'Volvo', make: 'FH', year: 2020, tonnage: 0, vehicleType: 'Trailer', depot: 'LETA', region: '', subRegion: 'RUIRU', status: 'Offline' },
  { id: '6', vinNumber: '1HGCM82633A123461', regNo: 'KAW 949D2', model: 'Scania', make: 'R500', year: 2022, tonnage: 0, vehicleType: 'Trailer', depot: 'LETA', region: 'ZONE 1', subRegion: 'DONHOLM', status: 'Scheduled', driverName: 'YUDI OKCHE', driverPhone: '+254728552889' },
  { id: '7', vinNumber: '1HGCM82633A123462', regNo: 'KAX 248C-2', model: 'Isuzu', make: 'NPR', year: 2020, tonnage: 0, vehicleType: 'Rigid', depot: 'LETA', region: '', subRegion: 'N. NORTH', status: 'Available' }
];

export default function VehiclesTab() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('');
  const [subRegion, setSubRegion] = useState('');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
  const [showBulkAssignSubRegionsModal, setShowBulkAssignSubRegionsModal] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Filter vehicles based on active status and search query
  const filteredVehicles = MOCK_VEHICLES.filter(vehicle => {
    // Filter by status
    if (activeStatus !== 'all' && vehicle.status.toLowerCase() !== activeStatus.toLowerCase()) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !vehicle.regNo.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by region
    if (region && vehicle.region !== region) {
      return false;
    }
    
    // Filter by sub-region
    if (subRegion && vehicle.subRegion !== subRegion) {
      return false;
    }
    
    return true;
  });
  
  // Count vehicles by status
  const vehicleCounts = {
    all: MOCK_VEHICLES.length,
    available: MOCK_VEHICLES.filter(v => v.status === 'Available').length,
    scheduled: MOCK_VEHICLES.filter(v => v.status === 'Scheduled').length,
    dispatched: MOCK_VEHICLES.filter(v => v.status === 'Dispatched').length,
    'in transit': MOCK_VEHICLES.filter(v => v.status === 'In Transit').length,
    offline: MOCK_VEHICLES.filter(v => v.status === 'Offline').length,
  };

  const handleRowClick = (vehicle: Vehicle) => {
    navigate(`/fleet/vehicles/${vehicle.id}`);
  };

  const handleViewClick = (e: React.MouseEvent, vehicle: Vehicle) => {
    e.stopPropagation();
    setSelectedVehicle(vehicle);
    setShowDetailDrawer(true);
  };

  const handleEditClick = (e: React.MouseEvent, vehicle: Vehicle) => {
    e.stopPropagation();
    // For now, we'll just show the add modal with pre-filled data
    setSelectedVehicle(vehicle);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-4">
      <VehicleStatusTabs 
        activeStatus={activeStatus} 
        onStatusChange={setActiveStatus} 
        counts={vehicleCounts} 
      />
      
      <div className="flex justify-between mb-4">
        <Button 
          variant="outline" 
          className="border-logistic text-logistic hover:bg-logistic hover:text-white"
          onClick={() => setShowBulkAssignSubRegionsModal(true)}
        >
          Bulk Assign Sub-Regions
        </Button>
        
        <div className="space-x-2">
          <Button 
            variant="outline" 
            className="border-logistic text-logistic hover:bg-logistic hover:text-white"
            onClick={() => setShowBulkAssignModal(true)}
          >
            Bulk Assign Vehicles
          </Button>
          
          <Button 
            className="bg-logistic hover:bg-logistic/80" 
            onClick={() => {
              setSelectedVehicle(null);
              setShowAddModal(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Vehicle
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <SearchInput 
          placeholder="Search Vehicle..." 
          onSearch={setSearchQuery}
          className="w-full md:w-64"
        />
        
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 border rounded-md"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="DEFAULT">DEFAULT</option>
            <option value="ZONE 1">ZONE 1</option>
            <option value="ZONE 2">ZONE 2</option>
          </select>
          
          <select 
            className="px-3 py-2 border rounded-md"
            value={subRegion}
            onChange={(e) => setSubRegion(e.target.value)}
          >
            <option value="">All Sub-Regions</option>
            <option value="NAIROBI">NAIROBI</option>
            <option value="GITHUNGURI">GITHUNGURI</option>
            <option value="DANDORA">DANDORA</option>
            <option value="EMBAKASI">EMBAKASI</option>
            <option value="RUIRU">RUIRU</option>
            <option value="DONHOLM">DONHOLM</option>
            <option value="N. NORTH">N. NORTH</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reg No</TableHead>
              <TableHead>Tonnage</TableHead>
              <TableHead>Depot</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Sub-Region</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Driver Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow 
                key={vehicle.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(vehicle)}
              >
                <TableCell className="font-medium">{vehicle.regNo}</TableCell>
                <TableCell>{vehicle.tonnage ? vehicle.tonnage + 'T' : '-'}</TableCell>
                <TableCell>{vehicle.depot}</TableCell>
                <TableCell>{vehicle.region || '-'}</TableCell>
                <TableCell>{vehicle.subRegion || '-'}</TableCell>
                <TableCell>{vehicle.driverName || '-'}</TableCell>
                <TableCell>{vehicle.driverPhone || '-'}</TableCell>
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
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => handleViewClick(e, vehicle)}
                    >
                      <span className="sr-only">View details</span>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => handleEditClick(e, vehicle)}
                    >
                      <span className="sr-only">Edit</span>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination would go here */}
      <div className="flex justify-end mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredVehicles.length}</span> of{" "}
          <span className="font-medium">{filteredVehicles.length}</span> results
        </div>
      </div>
      
      {/* Modals */}
      <AddVehicleModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        vehicle={selectedVehicle}
      />
      
      <BulkAssignVehiclesModal 
        isOpen={showBulkAssignModal} 
        onClose={() => setShowBulkAssignModal(false)} 
        vehicles={MOCK_VEHICLES}
      />
      
      <BulkAssignSubRegionsModal 
        isOpen={showBulkAssignSubRegionsModal} 
        onClose={() => setShowBulkAssignSubRegionsModal(false)} 
        vehicles={MOCK_VEHICLES}
      />
      
      <VehicleDetailDrawer 
        isOpen={showDetailDrawer}
        onClose={() => setShowDetailDrawer(false)}
        vehicle={selectedVehicle}
      />
    </div>
  );
}
