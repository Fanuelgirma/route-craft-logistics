
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Order, TimelineEvent } from '@/types/order';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';

// Mock data for timeline and products
const mockTimelineEvents: TimelineEvent[] = [
  { 
    status: 'Pending', 
    timestamp: '2024-05-01T08:00:00Z',
    user: 'System'
  },
  { 
    status: 'Ready For Dispatch', 
    timestamp: '2024-05-01T10:30:00Z',
    user: 'Jane Operator'
  },
  { 
    status: 'In Transit', 
    timestamp: '2024-05-01T11:15:00Z',
    user: 'John Driver'
  }
];

const statusColors: Record<string, string> = {
  'Pending': 'bg-yellow-500',
  'Ready For Dispatch': 'bg-blue-500',
  'In Transit': 'bg-purple-500',
  'Arrived At Customer': 'bg-teal-500',
  'Completed': 'bg-green-500',
  'Cancelled': 'bg-red-500'
};

interface OrderDetailDrawerProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailDrawer({ order, open, onClose }: OrderDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();
  
  // Sample products data
  const orderProducts = order.products || [
    {
      code: 'P001',
      productName: 'Bottled Water 500ml',
      quantity: 24,
      uom: 'BLUE CRATE',
      volumePerUnit: 0.12,
      lineVolume: 2.88
    },
    {
      code: 'P002',
      productName: 'Soda 330ml',
      quantity: 12,
      uom: 'BLUE CRATE',
      volumePerUnit: 0.06,
      lineVolume: 0.72
    }
  ];
  
  // Mock timeline events - in a real app, this would be fetched from the API
  const timelineEvents = mockTimelineEvents;
  
  const goToDriverProfile = (driver: string) => {
    // Navigate to driver profile
    // This is just a placeholder, adjust as needed for your app's routing
    console.log(`Navigate to driver profile: ${driver}`);
  };
  
  const goToVehicleDetail = (regNo: string) => {
    // Navigate to vehicle detail
    // This is just a placeholder, adjust as needed for your app's routing
    console.log(`Navigate to vehicle detail: ${regNo}`);
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-4">
            <DrawerTitle>Order No. {order.orderNo}</DrawerTitle>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[order.status]}`}>
              {order.status}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </DrawerHeader>
        <div className="p-4">
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order No</p>
                    <p className="mt-1">{order.orderNo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Customer</p>
                    <p className="mt-1">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="mt-1">{order.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Depot</p>
                    <p className="mt-1">{order.depot || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Region / Sub-Region</p>
                    <p className="mt-1">{order.region} / {order.subRegion}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Volume</p>
                    <p className="mt-1">{order.volume}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created At</p>
                    <p className="mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Driver</p>
                    <p className="mt-1">
                      {order.driver ? (
                        <button 
                          className="text-blue-600 hover:underline"
                          onClick={() => order.driver && goToDriverProfile(order.driver)}
                        >
                          {order.driver}
                        </button>
                      ) : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Vehicle</p>
                    <p className="mt-1">
                      {order.vehicleRegNo ? (
                        <button 
                          className="text-blue-600 hover:underline"
                          onClick={() => order.vehicleRegNo && goToVehicleDetail(order.vehicleRegNo)}
                        >
                          {order.vehicleRegNo}
                        </button>
                      ) : '—'}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <div className="mt-4">
                <div className="relative">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex mb-6">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`rounded-full h-4 w-4 ${statusColors[event.status]}`} />
                        {index < timelineEvents.length - 1 && (
                          <div className="h-full w-0.5 bg-gray-200" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.timestamp).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">By: {event.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="products">
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead>UOM</TableHead>
                      <TableHead className="text-right">Volume per unit</TableHead>
                      <TableHead className="text-right">Line Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.code}</TableCell>
                        <TableCell>{product.productName}</TableCell>
                        <TableCell className="text-right">{product.quantity}</TableCell>
                        <TableCell>{product.uom}</TableCell>
                        <TableCell className="text-right">{product.volumePerUnit.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{product.lineVolume.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
