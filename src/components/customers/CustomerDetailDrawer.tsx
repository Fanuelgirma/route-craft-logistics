
import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';
import { Customer } from '@/types/customer';
import { Button } from '@/components/ui/button';

interface CustomerDetailDrawerProps {
  customer: Customer;
  open: boolean;
  onClose: () => void;
}

export default function CustomerDetailDrawer({
  customer,
  open,
  onClose
}: CustomerDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState('info');
  
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="flex justify-between items-center border-b pb-2">
          <DrawerTitle className="text-lg font-medium">
            Customer Details: {customer.name}
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="geofence">Geofence</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Code</p>
                  <p className="font-medium">{customer.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-medium">{customer.region || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sub-Region</p>
                  <p className="font-medium">{customer.subRegion || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customer.email || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{customer.phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Orders</p>
                  <p className="font-medium">{customer.numberOfOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Geofence Radius</p>
                  <p className="font-medium">{customer.geofenceRadius} m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivery Window</p>
                  <p className="font-medium">{`${customer.deliveryWindowFrom} - ${customer.deliveryWindowTo}`}</p>
                </div>
                {customer.latitude && customer.longitude && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Latitude</p>
                      <p className="font-medium">{customer.latitude}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Longitude</p>
                      <p className="font-medium">{customer.longitude}</p>
                    </div>
                  </>
                )}
                {customer.address && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{customer.address}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="text-center py-10 text-gray-500">
                {customer.numberOfOrders > 0 
                  ? "Orders list would appear here" 
                  : "No orders found for this customer"}
              </div>
            </TabsContent>
            
            <TabsContent value="geofence">
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-100 h-[300px] flex items-center justify-center">
                  <p className="text-gray-500">Geofence map would appear here</p>
                </div>
                <div className="flex justify-end">
                  <Button>Save Geofence</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
