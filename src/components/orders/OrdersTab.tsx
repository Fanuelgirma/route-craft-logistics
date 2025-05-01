
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, Eye } from 'lucide-react';
import SearchInput from '@/components/ui/SearchInput';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Order, OrderStatus } from '@/types/order';
import OrderDetailDrawer from './OrderDetailDrawer';

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1',
    orderNo: 'ORD-001',
    customer: 'ABC Company',
    phoneNumber: '+254 712 345 678',
    driver: 'John Doe',
    volume: '3.58 Crates',
    createdAt: '2024-05-01T10:30:00Z',
    status: 'Pending',
    depot: 'Depot A',
    region: 'Central',
    subRegion: 'CBD'
  },
  {
    id: '2',
    orderNo: 'ORD-002',
    customer: 'XYZ Enterprise',
    phoneNumber: '+254 723 456 789',
    volume: '2.1 Crates',
    createdAt: '2024-05-01T11:45:00Z',
    status: 'Ready For Dispatch',
    depot: 'Depot B',
    region: 'Eastern',
    subRegion: 'Industrial Area'
  },
  {
    id: '3',
    orderNo: 'ORD-003',
    customer: 'LMN Corporation',
    phoneNumber: '+254 734 567 890',
    driver: 'Jane Smith',
    volume: '5.75 Crates',
    createdAt: '2024-05-01T09:15:00Z',
    status: 'In Transit',
    depot: 'Depot C',
    region: 'Western',
    subRegion: 'Highway Belt',
    vehicleRegNo: 'KBC 123D'
  },
  {
    id: '4',
    orderNo: 'ORD-004',
    customer: 'PQR Limited',
    phoneNumber: '+254 745 678 901',
    driver: 'Michael Brown',
    volume: '1.25 Crates',
    createdAt: '2024-05-01T14:20:00Z',
    status: 'Completed',
    depot: 'Depot A',
    region: 'Central',
    subRegion: 'Suburbs'
  },
  {
    id: '5',
    orderNo: 'ORD-005',
    customer: 'EFG Holdings',
    phoneNumber: '+254 756 789 012',
    volume: '4.32 Crates',
    createdAt: '2024-05-01T08:00:00Z',
    status: 'Cancelled',
    depot: 'Depot D',
    region: 'Northern',
    subRegion: 'City Center'
  }
];

const statusColors: Record<OrderStatus, string> = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Ready For Dispatch': 'bg-blue-100 text-blue-800',
  'In Transit': 'bg-purple-100 text-purple-800',
  'Arrived At Customer': 'bg-teal-100 text-teal-800',
  'Completed': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

export default function OrdersTab() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  
  // Calculate counts for each status
  const statusCounts = mockOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<OrderStatus, number>);
  
  const allCount = mockOrders.length;
  
  // Filter orders based on status and search query
  const filteredOrders = mockOrders.filter(order => {
    // Filter by status
    if (activeStatus !== 'All' && order.status !== activeStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNo.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.phoneNumber.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const handleBulkUpload = () => {
    // Simulate file upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        // Simulate API call
        setTimeout(() => {
          toast({
            title: 'Bulk Upload Successful',
            description: `Processed ${target.files?.length} orders successfully`,
          });
        }, 1000);
      }
    };
    fileInput.click();
  };
  
  const handleExportOrders = () => {
    // Simulate export functionality
    toast({
      title: 'Export Started',
      description: 'Your orders are being exported',
    });
    
    // In a real app, this would be a fetch call to download a file
  };
  
  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
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
          onClick={handleExportOrders}
        >
          <Download size={16} />
          Export Orders
        </Button>
      </div>
      
      <div className="border-b border-gray-200 pb-1">
        <div className="flex space-x-6 overflow-x-auto">
          {(['All'] as const).concat(['Pending', 'Ready For Dispatch', 'In Transit', 'Arrived At Customer', 'Completed', 'Cancelled']).map((status) => (
            <button
              key={status}
              className={`py-2 whitespace-nowrap ${
                activeStatus === status
                  ? 'text-logistic-accent border-b-2 border-logistic-accent font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveStatus(status)}
            >
              {status} ({status === 'All' ? allCount : statusCounts[status as OrderStatus] || 0})
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <SearchInput
          placeholder="Search Orders..."
          onSearch={setSearchQuery}
          className="max-w-md"
        />
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow 
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => openOrderDetail(order)}
                >
                  <TableCell className="text-blue-600 hover:underline">{order.orderNo}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>{order.driver || "—"}</TableCell>
                  <TableCell>{order.volume}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openOrderDetail(order);
                      }}
                    >
                      <Eye size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Showing {Math.min(filteredOrders.length, 20)} of {filteredOrders.length} orders
          </span>
          {/* Pagination would go here */}
        </div>
      </div>
      
      {selectedOrder && (
        <OrderDetailDrawer
          order={selectedOrder}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
}
