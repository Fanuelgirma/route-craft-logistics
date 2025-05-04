
import { useState } from 'react';
import { ChevronRight, MapPin } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import RouteWizard from '@/components/routing/RouteWizard';

export default function RoutingPage() {
  const [showWizard, setShowWizard] = useState(false);
  
  if (showWizard) {
    return <RouteWizard />;
  }
  
  return (
    <PageLayout title="Routing">
      <div className="space-y-8 p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <MapPin className="h-16 w-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Plan Your Routes</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Optimize delivery routes, assign drivers, and manage your fleet efficiently with our advanced routing system.
          </p>
          <Button 
            onClick={() => setShowWizard(true)}
            className="flex items-center mx-auto"
            size="lg"
          >
            Create New Route Plan
            <ChevronRight className="ml-1 w-5 h-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Recent Route Plans</h3>
            <div className="text-center py-8 text-gray-500">
              <p>No recent route plans found.</p>
              <p className="text-sm mt-2">Create your first route plan to get started.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Route Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Total Distance</p>
                <p className="text-2xl font-bold">0 km</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Total Stops</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Active Drivers</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Average Route Time</p>
                <p className="text-2xl font-bold">0h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
