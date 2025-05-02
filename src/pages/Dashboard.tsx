
import { useEffect, useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import DateRangePicker from '@/components/routing/DateRangePicker';
import { addDays, startOfDay, subDays } from 'date-fns';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, Clock, MapPin, Package2, Truck, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for dashboard KPIs and charts
const mockApi = {
  fetchTrips: async () => ({ count: 1045 }),
  fetchCustomers: async () => ({ count: 324 }),
  fetchLoad: async () => ({ value: 12540 }),
  fetchDistance: async () => ({ value: 8765 }),
  fetchCapacity: async () => ({ percentage: 87.5 }),
  fetchDuration: async () => ({ hours: 4, minutes: 32, seconds: 18 }),
  fetchDeliveries: async () => ({ planned: 1200, completed: 980 }),
  fetchDriverCompliance: async () => ({ percentage: 93.2 }),
  fetchDeliverySwipes: async () => ({ success: 985, failed: 12 }),
  fetchCapacityRolling: async () => ({
    series: [
      { date: "2025-04-25", value: 70.5 },
      { date: "2025-04-26", value: 78.3 },
      { date: "2025-04-27", value: 82.1 },
      { date: "2025-04-28", value: 75.8 },
      { date: "2025-04-29", value: 86.2 },
      { date: "2025-04-30", value: 91.4 },
      { date: "2025-05-01", value: 88.9 }
    ]
  }),
  fetchTripStatusPie: async () => ({
    completed: 540,
    inTransit: 125,
    cancelled: 38,
    pending: 342
  })
};

type KpiTileProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  isLoading: boolean;
};

const KpiTile = ({ title, value, icon, isLoading }: KpiTileProps) => (
  <Card className="p-4 flex items-center">
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 mr-4">
      {icon}
    </div>
    <div>
      {isLoading ? (
        <>
          <Skeleton className="h-8 w-24 mb-1" />
          <Skeleton className="h-4 w-16" />
        </>
      ) : (
        <>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs uppercase text-gray-500">{title}</div>
        </>
      )}
    </div>
  </Card>
);

export default function Dashboard() {
  const [startDate, setStartDate] = useState<Date | undefined>(subDays(startOfDay(new Date()), 6));
  const [endDate, setEndDate] = useState<Date | undefined>(startOfDay(new Date()));
  const [branch, setBranch] = useState<string>("all");
  const [driver, setDriver] = useState<string>("other");
  const [vehicleType, setVehicleType] = useState<string>("vehicle");

  // Query parameters for all API calls
  const queryParams = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    branchId: branch,
    driverId: driver,
    vehicleType: vehicleType
  };

  const { data: tripsData, isLoading: isLoadingTrips } = useQuery({
    queryKey: ['dashboard', 'trips', queryParams],
    queryFn: mockApi.fetchTrips
  });

  const { data: customersData, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['dashboard', 'customers', queryParams],
    queryFn: mockApi.fetchCustomers
  });

  const { data: loadData, isLoading: isLoadingLoad } = useQuery({
    queryKey: ['dashboard', 'load', queryParams],
    queryFn: mockApi.fetchLoad
  });

  const { data: distanceData, isLoading: isLoadingDistance } = useQuery({
    queryKey: ['dashboard', 'distance', queryParams],
    queryFn: mockApi.fetchDistance
  });

  const { data: capacityData, isLoading: isLoadingCapacity } = useQuery({
    queryKey: ['dashboard', 'capacity', queryParams],
    queryFn: mockApi.fetchCapacity
  });

  const { data: durationData, isLoading: isLoadingDuration } = useQuery({
    queryKey: ['dashboard', 'duration', queryParams],
    queryFn: mockApi.fetchDuration
  });

  // Handle date range changes
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Format the duration
  const formatDuration = (hours = 0, minutes = 0, seconds = 0) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <PageLayout>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="font-bold text-xl">LETA</div>
            <div className="text-xl font-semibold ml-4">**Overview</div>
          </div>
          
          <div className="flex items-center gap-4">
            <DateRangePicker 
              startDate={startDate} 
              endDate={endDate} 
              onChange={handleDateRangeChange} 
            />
            
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="north">North Branch</SelectItem>
                <SelectItem value="east">East Branch</SelectItem>
                <SelectItem value="south">South Branch</SelectItem>
                <SelectItem value="west">West Branch</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={driver} onValueChange={setDriver}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="bob">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Vehicle Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="trailer">Trailer</SelectItem>
                <SelectItem value="motorcycle">Motorcycle</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="h-10 w-20 flex items-center justify-center">
              <img src="/placeholder.svg" alt="Company Logo" className="max-h-full" />
            </div>
          </div>
        </div>
      </div>
      
      {/* KPI tiles */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <KpiTile 
          title="Trips" 
          value={isLoadingTrips ? "" : tripsData?.count.toLocaleString() || "0"} 
          icon={<Truck size={24} className="text-gray-700" />} 
          isLoading={isLoadingTrips}
        />
        <KpiTile 
          title="Customers" 
          value={isLoadingCustomers ? "" : customersData?.count.toLocaleString() || "0"} 
          icon={<Users size={24} className="text-gray-700" />} 
          isLoading={isLoadingCustomers}
        />
        <KpiTile 
          title="Load (kg)" 
          value={isLoadingLoad ? "" : loadData?.value.toLocaleString() || "0"} 
          icon={<Package2 size={24} className="text-gray-700" />} 
          isLoading={isLoadingLoad}
        />
        <KpiTile 
          title="Distance (km)" 
          value={isLoadingDistance ? "" : distanceData?.value.toLocaleString() || "0"} 
          icon={<MapPin size={24} className="text-gray-700" />} 
          isLoading={isLoadingDistance}
        />
        <KpiTile 
          title="Vehicle Capacity Utilization" 
          value={isLoadingCapacity ? "" : `${capacityData?.percentage.toFixed(1)}%` || "0%"} 
          icon={<BarChart3 size={24} className="text-gray-700" />} 
          isLoading={isLoadingCapacity}
        />
        <KpiTile 
          title="Average Trip Duration" 
          value={isLoadingDuration ? "" : formatDuration(durationData?.hours, durationData?.minutes, durationData?.seconds) || "00:00:00"} 
          icon={<Clock size={24} className="text-gray-700" />} 
          isLoading={isLoadingDuration}
        />
      </div>
      
      {/* Charts - Placeholder for now since we'd need to implement ApexCharts */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 h-[180px]">
          <h3 className="font-semibold mb-2">Planned vs Completed Deliveries</h3>
          <div className="h-32 flex items-center justify-center text-gray-400">
            Gauge Chart - Planned vs Completed
          </div>
        </Card>
        <Card className="p-4 h-[180px]">
          <h3 className="font-semibold mb-2">Driver Compliance</h3>
          <div className="h-32 flex items-center justify-center text-gray-400">
            Gauge Chart - Driver Compliance
          </div>
        </Card>
        <Card className="p-4 h-[180px]">
          <h3 className="font-semibold mb-2">Delivery Swipes</h3>
          <div className="h-32 flex items-center justify-center text-gray-400">
            Gauge Chart - Delivery Swipes
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 h-[260px] col-span-2">
          <h3 className="font-semibold mb-2">Vehicle Capacity Utilization - Rolling Week</h3>
          <div className="h-48 flex items-center justify-center text-gray-400">
            Line Chart - Vehicle Capacity Utilization
          </div>
        </Card>
        <Card className="p-4 h-[260px]">
          <h3 className="font-semibold mb-2">Trip Status Distribution</h3>
          <div className="h-48 flex items-center justify-center text-gray-400">
            Doughnut Chart - Trip Status Distribution
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
