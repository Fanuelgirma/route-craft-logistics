
import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Route } from '@/types/routing';
import { Vehicle } from '@/types/vehicle';

interface AllRoutesTabProps {
  routes: Route[];
}

// Mock vehicles data
const mockVehicles: Vehicle[] = [
  { id: '1', regNo: 'KAC-203D-2', model: 'Isuzu FRR', vinNumber: 'VINI12345', vehicleType: 'Truck', depot: 'Nairobi Main', status: 'Available' },
  { id: '2', regNo: 'KAW-129R2', model: 'Mitsubishi Fuso', vinNumber: 'VINI12346', vehicleType: 'Truck', depot: 'Nairobi East', status: 'Available' },
  { id: '3', regNo: 'KAW-132R1', model: 'Hino 300', vinNumber: 'VINI12347', vehicleType: 'Truck', depot: 'Nairobi West', status: 'Available' },
  { id: '4', regNo: 'KBL-247W-2', model: 'Isuzu NQR', vinNumber: 'VINI12348', vehicleType: 'Truck', depot: 'Nairobi Main', status: 'Available' },
];

export default function AllRoutesTab({ routes }: AllRoutesTabProps) {
  const [localRoutes, setLocalRoutes] = useState(routes);

  const handleVehicleChange = (routeId: string, vehicleRegNo: string) => {
    setLocalRoutes(prevRoutes => 
      prevRoutes.map(route => 
        route.id === routeId ? { ...route, vehicleRegNo } : route
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Stops</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Capacity Utilization</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localRoutes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium text-blue-600 hover:underline">
                  {route.name}
                </TableCell>
                <TableCell>{route.stops.length}</TableCell>
                <TableCell>
                  <Select 
                    value={route.vehicleRegNo || ''} 
                    onValueChange={(value) => handleVehicleChange(route.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.regNo}>
                          {vehicle.regNo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{route.capacityUtilization.toFixed(2)}%</TableCell>
                <TableCell>{route.distance.toFixed(2)} KM</TableCell>
                <TableCell>
                  {typeof route.volume === 'number' 
                    ? `${route.volume} CRATES` 
                    : route.volume}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Zoom All 4 Items</span>
        <span>20 / page</span>
      </div>
    </div>
  );
}
