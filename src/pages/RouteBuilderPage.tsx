
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Merge, GitCompare, Truck } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { RouteBatch, Route } from '@/types/routing';
import AllRoutesTab from '@/components/routing/AllRoutesTab';
import SingleRouteTab from '@/components/routing/SingleRouteTab';

// Mock data for route batch
const mockRouteBatch: RouteBatch = {
  id: 'batch-123',
  routes: [
    {
      id: 'route-1',
      name: 'Route #1',
      stops: [
        { id: 'stop-1', dropNo: 1, orderId: '1', customer: 'MOSES B. ORUYA', distance: 0, volume: 1.58 },
        { id: 'stop-2', dropNo: 2, orderId: '2', customer: 'HOTEL MONARCH LIMITED', distance: 5.2, volume: 1.58 },
        { id: 'stop-3', dropNo: 3, orderId: '3', customer: 'STEPHEN MJEMA COSMAS', distance: 3.7, volume: 11 },
        { id: 'stop-4', dropNo: 4, orderId: '4', customer: 'JAMES KIBUCHI NJOROGE', distance: 4.4, volume: 22.84 },
        { id: 'stop-5', dropNo: 5, orderId: '5', customer: 'FRANCIS MARIA MWANGI', distance: 3.2, volume: 8.67 },
      ],
      vehicleRegNo: 'KAC-203D-2',
      capacityUtilization: 51.33,
      distance: 19.31,
      volume: 77,
      color: 'blue'
    },
    {
      id: 'route-2',
      name: 'Route #2',
      stops: [
        { id: 'stop-6', dropNo: 1, orderId: '6', customer: 'CHANDRANA SUPERMARKETS YAYA CENTER', distance: 0, volume: 5.75 },
        { id: 'stop-7', dropNo: 2, orderId: '7', customer: 'MAJID AL FUTTAIM HYPERMARKET LTD-MEGA', distance: 8.3, volume: 3.5 },
        { id: 'stop-8', dropNo: 3, orderId: '8', customer: 'MAJID AL FUTTAIM HYPERMARKET LTD-MEGA', distance: 7.5, volume: 5.22 },
        { id: 'stop-9', dropNo: 4, orderId: '9', customer: 'NAIVAS EASTGATE', distance: 10.3, volume: 12.5 },
        { id: 'stop-10', dropNo: 5, orderId: '10', customer: 'CARREFOUR TWO RIVERS', distance: 8.1, volume: 5 },
      ],
      vehicleRegNo: 'KAW-129R2',
      capacityUtilization: 27.05,
      distance: 26.11,
      volume: 58,
      color: 'green'
    },
    {
      id: 'route-3',
      name: 'Route #3',
      stops: [
        { id: 'stop-11', dropNo: 1, orderId: '11', customer: 'QUICKMART KILIMANI', distance: 0, volume: 8.6 },
        { id: 'stop-12', dropNo: 2, orderId: '12', customer: 'NAIVAS MOUNTAIN VIEW', distance: 5.8, volume: 7.4 },
        { id: 'stop-13', dropNo: 3, orderId: '13', customer: 'QUICKMART CIATA MALL', distance: 4.2, volume: 6.3 },
        { id: 'stop-14', dropNo: 4, orderId: '14', customer: 'CHANDARANA FKY', distance: 2.1, volume: 7.7 },
        { id: 'stop-15', dropNo: 5, orderId: '15', customer: 'NAIVAS PRESTIGE', distance: 4.62, volume: 10 },
      ],
      vehicleRegNo: 'KAW-132R1',
      capacityUtilization: 24.15,
      distance: 16.77,
      volume: 50,
      color: 'red'
    },
    {
      id: 'route-4',
      name: 'Route #4',
      stops: [
        { id: 'stop-16', dropNo: 1, orderId: '16', customer: 'FOOD PLUS KILIMANI', distance: 0, volume: 3.7 },
        { id: 'stop-17', dropNo: 2, orderId: '17', customer: 'TUMAINI EMBAKASI', distance: 12.6, volume: 5.1 },
        { id: 'stop-18', dropNo: 3, orderId: '18', customer: 'NAIVAS GATEWAY', distance: 7.9, volume: 8.2 },
        { id: 'stop-19', dropNo: 4, orderId: '19', customer: 'CHANDARANA DIAMOND', distance: 3.87, volume: 2 },
      ],
      vehicleRegNo: 'KBL-247W-2',
      capacityUtilization: 9.18,
      distance: 24.67,
      volume: 19,
      color: 'purple'
    }
  ],
  unplannedOrders: [],
  createdAt: '2023-05-01T08:00:00Z'
};

export default function RouteBuilderPage() {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all-routes');
  const [routeBatch, setRouteBatch] = useState<RouteBatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, fetch the route batch from the API
    // fetch(`/api/routing/batches/${batchId}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setRouteBatch(data);
    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching route batch:', error);
    //     setIsLoading(false);
    //   });

    // For now, use mock data
    setTimeout(() => {
      setRouteBatch(mockRouteBatch);
      setIsLoading(false);
    }, 500);
  }, [batchId]);

  const handleGenerateTrip = () => {
    // Check if all routes have vehicles assigned
    const allRoutesHaveVehicles = routeBatch?.routes.every(route => route.vehicleRegNo);
    
    if (!allRoutesHaveVehicles) {
      toast.error("All routes must have a vehicle assigned.");
      return;
    }

    // In a real implementation, call the API to generate trips
    // fetch('/api/trips/generate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ routeBatch })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     toast.success("Trips generated successfully!");
    //     navigate('/trips?status=dispatched');
    //   })
    //   .catch(error => {
    //     console.error('Error generating trips:', error);
    //     toast.error("Failed to generate trips.");
    //   });

    // For now, simulate success
    setTimeout(() => {
      toast.success("Trips generated successfully!");
      navigate('/trips?status=dispatched');
    }, 1000);
  };

  if (isLoading) {
    return (
      <PageLayout title="Routing">
        <div className="flex justify-center items-center h-64">
          <p>Loading route data...</p>
        </div>
      </PageLayout>
    );
  }

  if (!routeBatch) {
    return (
      <PageLayout title="Routing">
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-red-500">Failed to load route data.</p>
          <Button asChild>
            <Link to="/routing">Return to Routing</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={
        <div className="flex flex-col space-y-2">
          <Link 
            to="/routing" 
            className="flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
            id="R5.H1"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back To Orders
          </Link>
          <h1 className="text-2xl font-semibold">Routing</h1>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" id="R5.B1" className="flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              Add Orders
            </Button>
            <Button 
              variant="outline" 
              id="R5.B2" 
              className="flex items-center" 
              disabled={routeBatch.routes.length < 2}
            >
              <Merge className="h-4 w-4 mr-1" />
              Merge
            </Button>
            <Button 
              variant="outline" 
              id="R5.B3" 
              className="flex items-center"
              disabled
            >
              <GitCompare className="h-4 w-4 mr-1" />
              Swap
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div 
              id="R5.D1"
              className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              Unplanned Orders ({routeBatch.unplannedOrders.length})
            </div>
            <Button 
              id="R5.B4" 
              onClick={handleGenerateTrip}
              className="flex items-center"
              disabled={!routeBatch.routes.every(route => route.vehicleRegNo)}
            >
              <Truck className="h-4 w-4 mr-1" />
              Generate Trip →
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white border-b border-gray-200 w-full h-auto p-0 justify-start">
            <TabsTrigger
              value="all-routes"
              className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-logistic-accent data-[state=active]:text-logistic-accent"
            >
              All Routes ({routeBatch.routes.length})
            </TabsTrigger>
            
            {routeBatch.routes.map((route) => (
              <TabsTrigger
                key={route.id}
                value={route.id}
                className="py-2 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-logistic-accent data-[state=active]:text-logistic-accent"
              >
                {route.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all-routes" className="mt-6 p-0">
            <AllRoutesTab routes={routeBatch.routes} />
          </TabsContent>

          {routeBatch.routes.map((route) => (
            <TabsContent key={route.id} value={route.id} className="mt-6 p-0">
              <SingleRouteTab route={route} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
}
