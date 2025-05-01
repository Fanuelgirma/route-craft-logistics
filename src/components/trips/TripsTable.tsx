
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Trip {
  id: string;
  created: string;
  picklist: string;
  regNo: string;
  driver: string;
  capacity: string;
  volume: string;
  capacityUtilization: string;
  stops: number;
  plannedDistance: string;
  status: string;
}

interface TripsTableProps {
  trips: Trip[];
  activeStatus: string;
}

export default function TripsTable({ trips, activeStatus }: TripsTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (tripId: string) => {
    navigate(`/trips/${tripId}`);
  };
  
  const showViewButton = activeStatus === 'completed';

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Created</TableHead>
              <TableHead className="w-[80px]">Picklist</TableHead>
              <TableHead className="w-[120px]">Reg No.</TableHead>
              <TableHead className="w-[150px]">Driver</TableHead>
              <TableHead className="w-[120px]">Capacity</TableHead>
              <TableHead className="w-[80px]">Volume</TableHead>
              <TableHead className="w-[140px]">Capacity Utilization</TableHead>
              <TableHead className="w-[80px] text-center">Stops</TableHead>
              <TableHead className="w-[160px]">Planned Distance (KM)</TableHead>
              {showViewButton && <TableHead className="w-[80px]">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {trips.length > 0 ? (
              trips.map((trip, index) => (
                <TableRow 
                  key={trip.id} 
                  className={cn(
                    "hover:bg-gray-50 cursor-pointer",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  )}
                  onClick={() => handleRowClick(trip.id)}
                >
                  <TableCell className="font-medium">{trip.created}</TableCell>
                  <TableCell>{trip.picklist}</TableCell>
                  <TableCell className="text-blue-600">{trip.regNo}</TableCell>
                  <TableCell>{trip.driver}</TableCell>
                  <TableCell>{trip.capacity}</TableCell>
                  <TableCell>{trip.volume}</TableCell>
                  <TableCell>{trip.capacityUtilization}</TableCell>
                  <TableCell className="text-center">{trip.stops}</TableCell>
                  <TableCell>{trip.plannedDistance}</TableCell>
                  {showViewButton && (
                    <TableCell>
                      <button 
                        className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(trip.id);
                        }}
                      >
                        <Eye size={16} className="text-gray-600" />
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={showViewButton ? 10 : 9} className="py-8 text-center text-gray-500">
                  No trips found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {trips.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">{trips.length}</span> trips
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

// Helper function for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
