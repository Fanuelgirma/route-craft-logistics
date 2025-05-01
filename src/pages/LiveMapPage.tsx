
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import VehicleMap from '@/components/map/VehicleMap';
import { Vehicle, VehicleStatus } from '@/types/vehicle';

// Mock data
const mockVehicles: Vehicle[] = [
  { 
    id: '1', 
    vinNumber: '', 
    regNo: 'KCD 123A', 
    model: '', 
    vehicleType: '', 
    depot: '', 
    status: 'Available', 
    plate: 'KCD 123A', 
    driver: 'John Doe', 
    driverName: 'John Doe',
    location: { lat: -1.286389, lng: 36.817223 } 
  },
  { 
    id: '2', 
    vinNumber: '', 
    regNo: 'KBZ 456B', 
    model: '', 
    vehicleType: '', 
    depot: '', 
    status: 'In Transit', 
    plate: 'KBZ 456B', 
    driver: 'Jane Smith', 
    driverName: 'Jane Smith',
    location: { lat: -1.291389, lng: 36.827223 } 
  },
  { 
    id: '3', 
    vinNumber: '', 
    regNo: 'KDA 789C', 
    model: '', 
    vehicleType: '', 
    depot: '', 
    status: 'Scheduled', 
    plate: 'KDA 789C', 
    driver: 'Mark Johnson', 
    driverName: 'Mark Johnson',
    location: { lat: -1.281389, lng: 36.807223 } 
  },
  { 
    id: '4', 
    vinNumber: '', 
    regNo: 'KDB 012D', 
    model: '', 
    vehicleType: '', 
    depot: '', 
    status: 'Dispatched', 
    plate: 'KDB 012D', 
    driver: 'Sarah Williams', 
    driverName: 'Sarah Williams',
    location: { lat: -1.296389, lng: 36.837223 } 
  },
  { 
    id: '5', 
    vinNumber: '', 
    regNo: 'KCF 345E', 
    model: '', 
    vehicleType: '', 
    depot: '', 
    status: 'Offline', 
    plate: 'KCF 345E', 
    driver: 'Robert Brown', 
    driverName: 'Robert Brown',
    location: { lat: -1.276389, lng: 36.797223 } 
  },
  { 
    id: '6', 
    vinNumber: '', 
    regNo: 'KAZ 678F', 
    model: '', 
    vehicleType: '', 
    depot: '', 
    status: 'In Transit', 
    plate: 'KAZ 678F', 
    driver: 'Emily Davis', 
    driverName: 'Emily Davis',
    location: { lat: -1.301389, lng: 36.847223 } 
  },
  { 
    id: '7', 
    vinNumber: '', 
    regNo: 'KBX 901G', 
    model: '', 
    vehicleType: '', 
    depot: '', 
    status: 'Available', 
    plate: 'KBX 901G', 
    driver: 'Michael Wilson', 
    driverName: 'Michael Wilson',
    location: { lat: -1.271389, lng: 36.787223 } 
  },
  { 
    id: '8', 
    vinNumber: '', 
    regNo: 'KDC 234H', 
    model: '', 
    vehicleType: '', 
    depot: '', 
    status: 'Scheduled', 
    plate: 'KDC 234H', 
    driver: 'Lisa Miller', 
    driverName: 'Lisa Miller',
    location: { lat: -1.306389, lng: 36.857223 } 
  },
];

const statusCounts = {
  All: mockVehicles.length,
  Available: mockVehicles.filter(v => v.status === 'Available').length,
  Scheduled: mockVehicles.filter(v => v.status === 'Scheduled').length,
  Dispatched: mockVehicles.filter(v => v.status === 'Dispatched').length,
  'In Transit': mockVehicles.filter(v => v.status === 'In Transit').length,
  Offline: mockVehicles.filter(v => v.status === 'Offline').length,
};

const statusColors: Record<VehicleStatus | 'All', string> = {
  'All': 'bg-gray-100 text-gray-800',
  'Available': 'bg-green-100 text-green-800',
  'Scheduled': 'bg-blue-100 text-blue-800',
  'Dispatched': 'bg-purple-100 text-purple-800',
  'In Transit': 'bg-orange-100 text-orange-800',
  'Offline': 'bg-gray-100 text-gray-800',
};

const statusCardColors: Record<VehicleStatus | 'All', string> = {
  'All': 'border-gray-300 bg-white',
  'Available': 'border-green-500 bg-green-50',
  'Scheduled': 'border-blue-500 bg-blue-50',
  'Dispatched': 'border-purple-500 bg-purple-50',
  'In Transit': 'border-orange-500 bg-orange-50',
  'Offline': 'border-gray-500 bg-gray-50',
};

const LiveMapPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<VehicleStatus | 'All'>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusClick = (status: VehicleStatus | 'All') => {
    setSelectedStatus(status);
  };

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = !searchTerm || 
      (vehicle.regNo || vehicle.plate || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.driverName || vehicle.driver || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || vehicle.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout>
      <PageHeader
        title="Live Map"
        breadcrumbs={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Live Map', href: '/map' }]}
      />
      
      <div className="mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {(['All', 'Available', 'Scheduled', 'Dispatched', 'In Transit', 'Offline'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusClick(status)}
              className={`p-4 rounded-lg border-2 ${
                selectedStatus === status 
                  ? `${statusCardColors[status]} border-logistic-accent` 
                  : `${statusCardColors[status]} hover:border-logistic-accent`
              } transition-colors`}
            >
              <div className="text-lg font-semibold">{statusCounts[status]}</div>
              <div className="text-sm font-medium text-gray-500">{status}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4 bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-220px)]">
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-70px)]">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleClick(vehicle)}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    selectedVehicle?.id === vehicle.id ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{vehicle.regNo || vehicle.plate}</p>
                      <p className="text-sm text-gray-600">{vehicle.driverName || vehicle.driver}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[vehicle.status]}`}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              ))}

              {filteredVehicles.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No vehicles found.
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-3/4 bg-white shadow rounded-lg overflow-hidden h-[calc(100vh-220px)]">
            <VehicleMap 
              vehicles={filteredVehicles} 
              selectedVehicle={selectedVehicle}
              onSelectVehicle={handleVehicleClick}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LiveMapPage;
