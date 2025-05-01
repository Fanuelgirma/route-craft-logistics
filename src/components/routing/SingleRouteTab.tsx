
import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, GitCompare } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Route } from '@/types/routing';

interface SingleRouteTabProps {
  route: Route;
}

export default function SingleRouteTab({ route }: SingleRouteTabProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real implementation, we'd initialize a map (Leaflet) here
    // and draw the route using polylines
    console.log('Initializing map for route:', route.id);

    return () => {
      // Cleanup map
      console.log('Cleaning up map for route:', route.id);
    };
  }, [route]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side - Route stops table */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium text-lg">{route.name} Stops</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              Add Orders
            </Button>
            <Button variant="outline" size="sm" id="R5.B5" className="flex items-center">
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
            <Button variant="outline" size="sm" id="R5.B3" className="flex items-center">
              <GitCompare className="h-4 w-4 mr-1" />
              Swap
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Drop No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Total Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {route.stops.map((stop) => (
                <TableRow key={stop.id}>
                  <TableCell>{stop.dropNo}</TableCell>
                  <TableCell>{stop.customer}</TableCell>
                  <TableCell>{stop.distance.toFixed(2)} KM</TableCell>
                  <TableCell>{stop.volume.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Right side - Map */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div 
          ref={mapContainerRef}
          className="h-96 bg-gray-100 relative"
          style={{
            backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/36.817,-1.286,12,0/600x400?access_token=pk.eyJ1IjoibHVjaWRlZGVtbyIsImEiOiJjbHM5ZXhxbXowa2FnMmpxcGo5ZXZkdDgwIn0.w17jFQCOrBCxR8ORGPnJGQ')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Route drawn on the map would go here */}
          <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-xs">
            <p>Total Distance: {route.distance.toFixed(2)} KM</p>
            <p>Total Volume: {route.volume} CRATES</p>
          </div>
        </div>
      </div>
    </div>
  );
}
