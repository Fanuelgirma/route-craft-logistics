
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { SubRegion } from '@/types/customer';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubRegionCustomersModalProps {
  subRegion: SubRegion;
  open: boolean;
  onClose: () => void;
}

// Mock customer data
const mockSubRegionCustomers = [
  {
    id: '1',
    name: 'ABEL OMBATI',
    region: 'ZONE 2',
    subRegion: 'BURUBURU',
    latitude: -1.312281,
    longitude: 36.862246,
    rank: 0
  },
  {
    id: '2',
    name: 'ABEL OMBATI',
    region: 'ZONE 2',
    subRegion: 'BURUBURU',
    latitude: -1.312266,
    longitude: 36.862256,
    rank: 0
  },
  {
    id: '3',
    name: 'BENARD ODUOR M',
    region: 'ZONE 2',
    subRegion: 'BURUBURU',
    latitude: -1.165256,
    longitude: 36.950547,
    rank: 0
  },
  {
    id: '4',
    name: 'CAROL WAIRIMU NDUNGU',
    region: 'ZONE 2',
    subRegion: 'BURUBURU',
    latitude: -1.253673,
    longitude: 36.880423,
    rank: 0
  }
];

export default function SubRegionCustomersModal({
  subRegion,
  open,
  onClose
}: SubRegionCustomersModalProps) {
  const { toast } = useToast();
  const [customers, setCustomers] = useState(mockSubRegionCustomers);
  
  const handleUpdateRanks = () => {
    // Mock API call
    toast({
      title: "Ranks Updated",
      description: `Customer ranks for ${subRegion.name} have been updated successfully.`
    });
  };
  
  const handleRankChange = (id: string, value: string) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === id 
          ? { ...customer, rank: parseInt(value) || 0 } 
          : customer
      )
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{subRegion.name} Customers</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <div className="flex justify-end mb-4">
          <Button onClick={handleUpdateRanks}>Update Ranks</Button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Sub-Region</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Rank</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.region}</TableCell>
                  <TableCell>{customer.subRegion}</TableCell>
                  <TableCell>{customer.latitude}</TableCell>
                  <TableCell>{customer.longitude}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      className="w-16"
                      value={customer.rank}
                      onChange={(e) => handleRankChange(customer.id, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {customers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    No customers found in this sub-region
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Showing {customers.length} items</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">{'>'}</Button>
            <span className="flex items-center">20 / page</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
