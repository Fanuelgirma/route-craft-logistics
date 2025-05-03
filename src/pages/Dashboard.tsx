import { useEffect, useState, useMemo } from 'react';
import { addDays, startOfDay, subDays, format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, Clock, MapPin, Package2, Truck, Users, 
  Fuel, DollarSign, Wrench, CreditCard, TrendingUp, Calendar 
} from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import DateRangePicker from '@/components/routing/DateRangePicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  Bar, 
  BarChart, 
  Line, 
  LineChart, 
  PolarGrid, 
  PolarRadiusAxis,
  PolarAngleAxis,
  Radar,
  RadarChart,
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Cell,
  Legend
} from 'recharts';
import VehicleMap from '@/components/map/VehicleMap';
import { Vehicle } from '@/types/vehicle';

// Mock data for dashboard KPIs and charts
const mockApi = {
  fetchTrips: async () => ({ count: 1045 }),
  fetchCustomers: async () => ({ count: 324 }),
  fetchLoad: async () => ({ value: 12540 }),
  fetchDistance: async () => ({ value: 8765 }),
  fetchCapacity: async () => ({ percentage: 87.5 }),
  fetchDuration: async () => ({ hours: 4, minutes: 32, seconds: 18 }),
  fetchFuelCost: async () => ({ value: 12550 }),
  fetchServiceCost: async () => ({ value: 4850 }),
  fetchDriverPayroll: async () => ({ value: 18700 }),
  fetchRevenue: async () => ({ value: 65420 }),
  fetchProfit: async () => ({ value: 29320, percentage: 44.8 }),
  fetchRevenueByMonth: async () => ([
    { month: 'Nov', revenue: 42000 },
    { month: 'Dec', revenue: 58000 },
    { month: 'Jan', revenue: 49000 },
    { month: 'Feb', revenue: 55000 },
    { month: 'Mar', revenue: 67000 },
    { month: 'Apr', revenue: 65420 }
  ]),
  fetchCostBreakdown: async () => ([
    { name: 'Fuel', value: 12550, fill: '#9b87f5' },
    { name: 'Service', value: 4850, fill: '#FEC6A1' },
    { name: 'Driver Pay', value: 18700, fill: '#D3E4FD' }
  ]),
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
  }),
  fetchVehicles: async () => {
    return [
      { 
        id: '1', 
        vinNumber: 'VIN10293847', 
        regNo: 'KCD 123A', 
        model: 'Isuzu FRR', 
        vehicleType: 'Truck', 
        depot: 'Nairobi', 
        status: 'Available', 
        driverName: 'John Doe',
        location: { lat: -1.286389, lng: 36.817223 } 
      },
      { 
        id: '2', 
        vinNumber: 'VIN20394857', 
        regNo: 'KBZ 456B', 
        model: 'Toyota Hilux', 
        vehicleType: 'Pickup', 
        depot: 'Mombasa', 
        status: 'In Transit', 
        driverName: 'Jane Smith',
        location: { lat: -1.291389, lng: 36.827223 } 
      },
      { 
        id: '3', 
        vinNumber: 'VIN30495867', 
        regNo: 'KDA 789C', 
        model: 'Mercedes Actros', 
        vehicleType: 'Heavy Truck', 
        depot: 'Nakuru', 
        status: 'Scheduled', 
        driverName: 'Mark Johnson',
        location: { lat: -1.281389, lng: 36.807223 } 
      },
      { 
        id: '4', 
        vinNumber: 'VIN40596877', 
        regNo: 'KDB 012D', 
        model: 'Mitsubishi Fuso', 
        vehicleType: 'Truck', 
        depot: 'Kisumu', 
        status: 'Dispatched', 
        driverName: 'Sarah Williams',
        location: { lat: -1.296389, lng: 36.837223 } 
      }
    ] as Vehicle[];
  }
};

type KpiTileProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  isLoading: boolean;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
};

const KpiTile = ({ title, value, icon, isLoading, color = 'bg-gray-100', trend, trendValue }: KpiTileProps) => (
  <Card className="p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center">
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color} mr-4`}>
        {icon}
      </div>
      <div className="flex-1">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-24 mb-1" />
            <Skeleton className="h-4 w-16" />
          </>
        ) : (
          <>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">{value}</div>
              {trend && (
                <div className={`flex items-center text-xs font-medium ${
                  trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : null}
                  {trend === 'down' ? <TrendingUp size={14} className="mr-1 rotate-180" /> : null}
                  {trendValue}
                </div>
              )}
            </div>
            <div className="text-xs uppercase text-gray-500">{title}</div>
          </>
        )}
      </div>
    </div>
  </Card>
);

export default function Dashboard() {
  const [startDate, setStartDate] = useState<Date | undefined>(subDays(startOfDay(new Date()), 6));
  const [endDate, setEndDate] = useState<Date | undefined>(startOfDay(new Date()));
  const [branch, setBranch] = useState<string>("all");
  const [driver, setDriver] = useState<string>("other");
  const [vehicleType, setVehicleType] = useState<string>("vehicle");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Query parameters for all API calls
  const queryParams = {
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    branchId: branch,
    driverId: driver,
    vehicleType: vehicleType
  };

  // Basic KPIs
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

  // Financial KPIs
  const { data: fuelCostData, isLoading: isLoadingFuelCost } = useQuery({
    queryKey: ['dashboard', 'fuelCost', queryParams],
    queryFn: mockApi.fetchFuelCost
  });

  const { data: serviceCostData, isLoading: isLoadingServiceCost } = useQuery({
    queryKey: ['dashboard', 'serviceCost', queryParams],
    queryFn: mockApi.fetchServiceCost
  });

  const { data: driverPayrollData, isLoading: isLoadingDriverPayroll } = useQuery({
    queryKey: ['dashboard', 'driverPayroll', queryParams],
    queryFn: mockApi.fetchDriverPayroll
  });

  const { data: revenueData, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ['dashboard', 'revenue', queryParams],
    queryFn: mockApi.fetchRevenue
  });

  const { data: profitData, isLoading: isLoadingProfit } = useQuery({
    queryKey: ['dashboard', 'profit', queryParams],
    queryFn: mockApi.fetchProfit
  });

  // Chart data
  const { data: revenueChartData, isLoading: isLoadingRevenueChart } = useQuery({
    queryKey: ['dashboard', 'revenueByMonth', queryParams],
    queryFn: mockApi.fetchRevenueByMonth
  });

  const { data: costBreakdownData, isLoading: isLoadingCostBreakdown } = useQuery({
    queryKey: ['dashboard', 'costBreakdown', queryParams],
    queryFn: mockApi.fetchCostBreakdown
  });

  const { data: tripStatusData, isLoading: isLoadingTripStatus } = useQuery({
    queryKey: ['dashboard', 'tripStatus', queryParams],
    queryFn: mockApi.fetchTripStatusPie
  });

  const { data: capacityRollingData, isLoading: isLoadingCapacityRolling } = useQuery({
    queryKey: ['dashboard', 'capacityRolling', queryParams],
    queryFn: mockApi.fetchCapacityRolling
  });

  // Vehicle map data
  const { data: vehiclesData, isLoading: isLoadingVehicles } = useQuery({
    queryKey: ['dashboard', 'vehicles', queryParams],
    queryFn: mockApi.fetchVehicles
  });

  // Transform trip status data for pie chart
  const tripStatusChartData = useMemo(() => {
    if (!tripStatusData) return [];
    
    return [
      { name: 'Completed', value: tripStatusData.completed, fill: '#10B981' },
      { name: 'In Transit', value: tripStatusData.inTransit, fill: '#F59E0B' },
      { name: 'Cancelled', value: tripStatusData.cancelled, fill: '#EF4444' },
      { name: 'Pending', value: tripStatusData.pending, fill: '#6B7280' }
    ];
  }, [tripStatusData]);

  // Transform capacity rolling data for line chart
  const capacityRollingChartData = useMemo(() => {
    if (!capacityRollingData?.series) return [];
    
    return capacityRollingData.series.map(item => ({
      date: format(new Date(item.date), 'dd MMM'),
      value: item.value
    }));
  }, [capacityRollingData]);

  // Handle date range changes
  const handleDateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Format the duration
  const formatDuration = (hours = 0, minutes = 0, seconds = 0) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle vehicle selection
  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <PageLayout>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="font-bold text-xl text-logistic-accent">LETA</div>
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
      
      {/* Operational KPI tiles - First row */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Operational KPIs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiTile 
            title="Trips" 
            value={isLoadingTrips ? "" : tripsData?.count.toLocaleString() || "0"} 
            icon={<Truck size={24} className="text-[#9b87f5]" />} 
            isLoading={isLoadingTrips}
            color="bg-[#E5DEFF]"
            trend="up"
            trendValue="+5.2%"
          />
          <KpiTile 
            title="Customers" 
            value={isLoadingCustomers ? "" : customersData?.count.toLocaleString() || "0"} 
            icon={<Users size={24} className="text-[#7E69AB]" />} 
            isLoading={isLoadingCustomers}
            color="bg-[#E5DEFF]"
          />
          <KpiTile 
            title="Load (kg)" 
            value={isLoadingLoad ? "" : loadData?.value.toLocaleString() || "0"} 
            icon={<Package2 size={24} className="text-[#1EAEDB]" />} 
            isLoading={isLoadingLoad}
            color="bg-[#D3E4FD]"
          />
          <KpiTile 
            title="Distance (km)" 
            value={isLoadingDistance ? "" : distanceData?.value.toLocaleString() || "0"} 
            icon={<MapPin size={24} className="text-[#ea384c]" />} 
            isLoading={isLoadingDistance}
            color="bg-[#FFDEE2]"
            trend="up"
            trendValue="+3.7%"
          />
          <KpiTile 
            title="Vehicle Capacity" 
            value={isLoadingCapacity ? "" : `${capacityData?.percentage.toFixed(1)}%` || "0%"} 
            icon={<BarChart3 size={24} className="text-[#F59E0B]" />} 
            isLoading={isLoadingCapacity}
            color="bg-[#FEF7CD]"
          />
          <KpiTile 
            title="Average Trip Duration" 
            value={isLoadingDuration ? "" : formatDuration(durationData?.hours, durationData?.minutes, durationData?.seconds) || "00:00:00"} 
            icon={<Clock size={24} className="text-[#7E69AB]" />} 
            isLoading={isLoadingDuration}
            color="bg-[#E5DEFF]"
          />
        </div>
      </div>
      
      {/* Financial KPI tiles - Second row */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Financial KPIs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <KpiTile 
            title="Fuel Costs" 
            value={isLoadingFuelCost ? "" : `$${fuelCostData?.value.toLocaleString()}` || "$0"} 
            icon={<Fuel size={24} className="text-[#F59E0B]" />} 
            isLoading={isLoadingFuelCost}
            color="bg-[#FEF7CD]"
            trend="up"
            trendValue="+8.3%"
          />
          <KpiTile 
            title="Service Costs" 
            value={isLoadingServiceCost ? "" : `$${serviceCostData?.value.toLocaleString()}` || "$0"} 
            icon={<Wrench size={24} className="text-[#ea384c]" />} 
            isLoading={isLoadingServiceCost}
            color="bg-[#FFDEE2]"
            trend="down"
            trendValue="-2.1%"
          />
          <KpiTile 
            title="Driver Payroll" 
            value={isLoadingDriverPayroll ? "" : `$${driverPayrollData?.value.toLocaleString()}` || "$0"} 
            icon={<Users size={24} className="text-[#1EAEDB]" />} 
            isLoading={isLoadingDriverPayroll}
            color="bg-[#D3E4FD]"
          />
          <KpiTile 
            title="Revenue" 
            value={isLoadingRevenue ? "" : `$${revenueData?.value.toLocaleString()}` || "$0"} 
            icon={<DollarSign size={24} className="text-[#10B981]" />} 
            isLoading={isLoadingRevenue}
            color="bg-[#F2FCE2]"
            trend="up"
            trendValue="+12.5%"
          />
          <KpiTile 
            title="Profit" 
            value={isLoadingProfit ? "" : `$${profitData?.value.toLocaleString()}` || "$0"} 
            icon={<CreditCard size={24} className="text-[#10B981]" />} 
            isLoading={isLoadingProfit}
            color="bg-[#F2FCE2]"
            trend="up"
            trendValue={isLoadingProfit ? "" : `${profitData?.percentage}%` || "0%"}
          />
        </div>
      </div>
      
      {/* Charts - First row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 h-[260px]">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-base font-semibold">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoadingRevenueChart ? (
              <div className="h-48 flex items-center justify-center">
                <Skeleton className="h-48 w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueChartData || []}>
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="revenue" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card className="p-4 h-[260px]">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-base font-semibold">Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoadingCostBreakdown ? (
              <div className="h-48 flex items-center justify-center">
                <Skeleton className="h-48 w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={costBreakdownData || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costBreakdownData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        
        <Card className="p-4 h-[260px]">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-base font-semibold">Trip Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoadingTripStatus ? (
              <div className="h-48 flex items-center justify-center">
                <Skeleton className="h-48 w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={tripStatusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tripStatusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Chart - Second row */}
      <Card className="p-4 mb-6">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-base font-semibold">Vehicle Capacity Utilization - Rolling Week</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoadingCapacityRolling ? (
            <div className="h-64 flex items-center justify-center">
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={capacityRollingChartData}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => {
                  // Fix: Check if value is a number before calling toFixed
                  return typeof value === 'number' ? `${value.toFixed(1)}%` : `${value}%`;
                }} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#9b87f5" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: "#9b87f5" }} 
                />
                {/* Reference line for target */}
                <line 
                  x1="0%" 
                  y1="80%" 
                  x2="100%" 
                  y2="80%" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      
      {/* Vehicle Map */}
      <Card className="p-4">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-base font-semibold">Vehicle Tracking Map</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px]">
            {isLoadingVehicles ? (
              <div className="h-full flex items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <VehicleMap 
                vehicles={vehiclesData || []} 
                selectedVehicle={selectedVehicle}
                onSelectVehicle={handleSelectVehicle}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
