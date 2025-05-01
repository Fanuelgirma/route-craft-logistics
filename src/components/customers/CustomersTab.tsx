
import { useState } from 'react';
import { Search, Plus, Download, Upload, Trash2, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Customer } from '@/types/customer';
import CustomerDetailDrawer from './CustomerDetailDrawer';
import CustomerModal from './CustomerModal';

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    code: 'DM-001222',
    name: 'AARON M. MUTUKU',
    region: '',
    subRegion: '',
    email: '',
    phone: '',
    numberOfOrders: 0,
    geofenceRadius: 0,
    deliveryWindowFrom: '3:00 AM',
    deliveryWindowTo: '3:00 AM'
  },
  {
    id: '2',
    code: 'DM-021254',
    name: 'AARON M. MUTUKU',
    region: 'DEFAULT',
    subRegion: 'NAMANGA',
    email: '',
    phone: '',
    numberOfOrders: 0,
    geofenceRadius: 0,
    deliveryWindowFrom: '3:00 AM',
    deliveryWindowTo: '3:00 AM'
  },
  {
    id: '3',
    code: 'DM-002358',
    name: 'AARON W. MUSEMBI',
    region: 'DEFAULT',
    subRegion: 'KITUI',
    email: '',
    phone: '',
    numberOfOrders: 0,
    geofenceRadius: 0,
    deliveryWindowFrom: '6:30 AM',
    deliveryWindowTo: '10:00 AM'
  }
];

export default function CustomersTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  
  const { toast } = useToast();

  const filteredCustomers = mockCustomers.filter(customer => {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      customer.code.toLowerCase().includes(term) ||
      customer.name.toLowerCase().includes(term)
    );
  });

  const handleSelectCustomer = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedCustomers);
    
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    
    setSelectedCustomers(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(new Set(filteredCustomers.map(c => c.id)));
    } else {
      setSelectedCustomers(new Set());
    }
  };

  const handleOpenCustomerDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const handleDeleteSelected = () => {
    // Mock API call
    toast({
      title: "Customers Deleted",
      description: `${selectedCustomers.size} customers have been deleted.`,
    });
    setSelectedCustomers(new Set());
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleBulkUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        toast({
          title: "Bulk Upload Started",
          description: "Your file is being processed.",
        });
      }
    };
    fileInput.click();
  };

  const handleBulkUpdateLatLngs = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        toast({
          title: "Coordinates Update Started",
          description: "Your coordinates are being updated.",
        });
      }
    };
    fileInput.click();
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-end gap-2">
        <Button 
          className="flex items-center gap-2"
          onClick={handleAddCustomer}
        >
          <Plus size={16} />
          Add Customer
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2" 
          onClick={handleBulkUpdateLatLngs}
        >
          <Upload size={16} />
          Bulk Update LatLngs
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleBulkUpload}
        >
          <Upload size={16} />
          Bulk Upload
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleDeleteSelected}
          disabled={selectedCustomers.size === 0}
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search Customers..."
            className="pl-9 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox 
                    checked={selectedCustomers.size > 0 && selectedCustomers.size === filteredCustomers.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Sub-Region</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>No. of Orders</TableHead>
                <TableHead>Geofence Radius (M)</TableHead>
                <TableHead>Delivery Window</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow 
                  key={customer.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOpenCustomerDetail(customer)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedCustomers.has(customer.id)}
                      onCheckedChange={(checked) => 
                        handleSelectCustomer(customer.id, Boolean(checked))
                      }
                    />
                  </TableCell>
                  <TableCell>{customer.code}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.region || '-'}</TableCell>
                  <TableCell>{customer.subRegion || '-'}</TableCell>
                  <TableCell>{customer.email || '-'}</TableCell>
                  <TableCell>{customer.phone || '-'}</TableCell>
                  <TableCell>{customer.numberOfOrders}</TableCell>
                  <TableCell>{customer.geofenceRadius}</TableCell>
                  <TableCell>{`${customer.deliveryWindowFrom} - ${customer.deliveryWindowTo}`}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()} className="space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCustomerDetail(customer);
                      }}
                    >
                      <Eye size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCustomer(customer);
                      }}
                    >
                      <Edit size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-6 text-gray-500">
                    No customers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-end space-x-2 p-4">
          <span className="text-sm text-gray-500">
            Showing {Math.min(filteredCustomers.length, 20)} of {filteredCustomers.length} customers
          </span>
          {/* Pagination would go here */}
        </div>
      </div>
      
      {/* Customer Detail Drawer */}
      {selectedCustomer && (
        <CustomerDetailDrawer
          customer={selectedCustomer}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
      
      {/* Add/Edit Customer Modal */}
      <CustomerModal
        customer={editingCustomer}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
