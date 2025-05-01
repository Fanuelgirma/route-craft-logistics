
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PageLayout from '@/components/layout/PageLayout';
import VehiclesTab from '@/components/fleet/VehiclesTab';
import DriversTab from '@/components/fleet/DriversTab';
import MaintenanceTab from '@/components/fleet/MaintenanceTab';

export default function FleetPage() {
  const [activeTab, setActiveTab] = useState("vehicles");

  return (
    <PageLayout title="Fleet Management">
      <div className="space-y-4">
        <div className="border-b border-gray-200">
          <Tabs defaultValue="vehicles" onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0">
              <TabsTrigger 
                value="vehicles" 
                className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'vehicles' 
                    ? 'text-logistic-accent border-logistic-accent' 
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vehicles
              </TabsTrigger>
              <TabsTrigger 
                value="drivers" 
                className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'drivers' 
                    ? 'text-logistic-accent border-logistic-accent' 
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Drivers
              </TabsTrigger>
              <TabsTrigger 
                value="maintenance" 
                className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'maintenance' 
                    ? 'text-logistic-accent border-logistic-accent' 
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vehicle Maintenance
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="vehicles" className="mt-4">
              <VehiclesTab />
            </TabsContent>
            
            <TabsContent value="drivers" className="mt-4">
              <DriversTab />
            </TabsContent>
            
            <TabsContent value="maintenance" className="mt-4">
              <MaintenanceTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}
