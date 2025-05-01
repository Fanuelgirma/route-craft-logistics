
import { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TripsTabs from '@/components/trips/TripsTabs';
import TripsToolbar from '@/components/trips/TripsToolbar';
import TripsTable from '@/components/trips/TripsTable';
import { useSearchParams } from 'react-router-dom';

// Mock data for trips
const mockTrips = [
  {
    id: '1',
    created: '30/04/2025 10:38 AM',
    picklist: '0',
    regNo: 'KAW-12382',
    driver: 'BEN HYMAN',
    capacity: '207 CRATES',
    volume: '133',
    capacityUtilization: '64%',
    stops: 10,
    plannedDistance: '38.41',
    status: 'pending'
  },
  {
    id: '2',
    created: '08/04/2025 2:20 PM',
    picklist: '0',
    regNo: 'KAC 2030-2',
    driver: 'Aurora Lang',
    capacity: '150 Crates',
    volume: '31',
    capacityUtilization: '21%',
    stops: 5,
    plannedDistance: '26.82',
    status: 'dispatched'
  },
  {
    id: '3',
    created: '14/02/2025 9:47 AM',
    picklist: '0',
    regNo: 'KDL 320Y-2',
    driver: '-',
    capacity: '350',
    volume: '45',
    capacityUtilization: '21%',
    stops: 5,
    plannedDistance: '22.74',
    status: 'in-transit'
  },
  {
    id: '4',
    created: '16/10/2024 11:57 AM',
    picklist: '0',
    regNo: 'KCE 227L-2',
    driver: '-',
    capacity: '350',
    volume: '3',
    capacityUtilization: '1%',
    stops: 1,
    plannedDistance: '12.5',
    status: 'completed'
  },
  {
    id: '5',
    created: '13/09/2024 9:52 AM',
    picklist: '0',
    regNo: 'KAW 34202',
    driver: '-',
    capacity: '230 CRATES',
    volume: '251',
    capacityUtilization: '76%',
    stops: 12,
    plannedDistance: '40.53',
    status: 'cancelled'
  }
];

export default function TripsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trips, setTrips] = useState(mockTrips);
  const [filteredTrips, setFilteredTrips] = useState(mockTrips);
  const [activeStatus, setActiveStatus] = useState(searchParams.get('status') || 'pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [depot, setDepot] = useState('All Depots');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Statistics for tabs
  const tripCounts = {
    pending: trips.filter(trip => trip.status === 'pending').length,
    dispatched: trips.filter(trip => trip.status === 'dispatched').length,
    'in-transit': trips.filter(trip => trip.status === 'in-transit').length,
    completed: trips.filter(trip => trip.status === 'completed').length,
    cancelled: trips.filter(trip => trip.status === 'cancelled').length,
    all: trips.length
  };

  useEffect(() => {
    // Apply filters
    let result = [...trips];
    
    // Filter by status
    if (activeStatus !== 'all') {
      result = result.filter(trip => trip.status === activeStatus);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(trip => 
        trip.regNo.toLowerCase().includes(term) || 
        trip.driver.toLowerCase().includes(term) ||
        trip.created.toLowerCase().includes(term)
      );
    }
    
    // Apply depot filter if not "All Depots"
    if (depot !== 'All Depots') {
      // This would filter by depot in a real implementation
    }
    
    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      // This would filter by date range in a real implementation
    }
    
    setFilteredTrips(result);
    
    // Update URL with active filters
    setSearchParams({
      status: activeStatus,
      search: searchTerm,
      depot: depot,
      ...(dateRange.start && { startDate: dateRange.start }),
      ...(dateRange.end && { endDate: dateRange.end })
    });
  }, [activeStatus, searchTerm, depot, dateRange, trips, setSearchParams]);

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  
  const handleDepotChange = (newDepot: string) => {
    setDepot(newDepot);
  };
  
  const handleDateRangeChange = (start: string, end: string) => {
    setDateRange({ start, end });
  };

  const handleDownloadTrips = () => {
    console.log('Downloading trips as CSV...');
    // Implementation for downloading trips as CSV would go here
  };

  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-6">Trips</h1>
      
      <TripsTabs 
        activeStatus={activeStatus} 
        onStatusChange={handleStatusChange}
        counts={tripCounts}
      />
      
      <div className="mt-4">
        <TripsToolbar 
          onSearch={handleSearch} 
          onDepotChange={handleDepotChange}
          onDateRangeChange={handleDateRangeChange}
          onDownload={handleDownloadTrips}
        />
        
        <div className="mt-4">
          <TripsTable 
            trips={filteredTrips} 
            activeStatus={activeStatus}
          />
        </div>
      </div>
    </PageLayout>
  );
}
