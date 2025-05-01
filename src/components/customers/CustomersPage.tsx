
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomersTab from './CustomersTab';
import SubRegionsTab from './SubRegionsTab';
import MapTab from './MapTab';
import NotificationsTab from './NotificationsTab';

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <PageLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="sub-regions">Sub-Regions</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customers">
            <CustomersTab />
          </TabsContent>
          
          <TabsContent value="sub-regions">
            <SubRegionsTab />
          </TabsContent>
          
          <TabsContent value="map">
            <MapTab />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
