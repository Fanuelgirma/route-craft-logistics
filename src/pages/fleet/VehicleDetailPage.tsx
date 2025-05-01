
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';

// Mock data (in a real app, you would fetch this from an API)
const mockVehicle = {
  id: '1',
  vinNumber: '1HGCM82633A123456',
  regNo: 'KAB-987',
  model: 'Isuzu',
  make: 'FRR',
  year: 2020,
  tonnage: 10,
  vehicleType: 'Rigid',
  depot: 'LETA',
  region: 'DEFAULT',
  subRegion: 'NAIROBI',
  status: 'Scheduled',
  driverName: '',
  driverPhone: '',
};

export default function VehicleDetailPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  
  // In a real app, you would fetch vehicle details based on vehicleId
  // const { data: vehicle, isLoading } = useQuery(['vehicle', vehicleId], ...) 
  const vehicle = mockVehicle;
  
  const goBack = () => {
    navigate('/fleet');
  };
  
  return (
    <PageLayout 
      title={
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>Vehicle Details</div>
        </div>
      }
      breadcrumb={
        <div className="text-sm text-gray-500">
          Fleet » Vehicles » {vehicle.regNo}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gray-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{vehicle.regNo}</h2>
              <p className="text-gray-500">{vehicle.model} {vehicle.make}</p>
            </div>
          </div>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
            vehicle.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
            vehicle.status === 'Dispatched' ? 'bg-purple-100 text-purple-800' :
            vehicle.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {vehicle.status}
          </span>
        </div>
        
        <Tabs 
          defaultValue="info" 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="w-full justify-start h-12 bg-white border-b">
            <TabsTrigger 
              value="info" 
              className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                activeTab === 'info' 
                  ? 'text-logistic-accent border-logistic-accent' 
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Info
            </TabsTrigger>
            <TabsTrigger 
              value="assignments" 
              className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                activeTab === 'assignments' 
                  ? 'text-logistic-accent border-logistic-accent' 
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Assignments
            </TabsTrigger>
            <TabsTrigger 
              value="maintenance" 
              className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                activeTab === 'maintenance' 
                  ? 'text-logistic-accent border-logistic-accent' 
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Maintenance Log
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="p-4 bg-white border rounded-md mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">VIN Number</p>
                    <p className="font-medium">{vehicle.vinNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registration No</p>
                    <p className="font-medium">{vehicle.regNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Model</p>
                    <p className="font-medium">{vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Make</p>
                    <p className="font-medium">{vehicle.make}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tonnage</p>
                    <p className="font-medium">{vehicle.tonnage}T</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Type</p>
                    <p className="font-medium">{vehicle.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{vehicle.status}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Location & Assignment</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Depot</p>
                    <p className="font-medium">{vehicle.depot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Region</p>
                    <p className="font-medium">{vehicle.region}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sub-Region</p>
                    <p className="font-medium">{vehicle.subRegion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assigned Driver</p>
                    <p className="font-medium">{vehicle.driverName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Driver Phone</p>
                    <p className="font-medium">{vehicle.driverPhone || '-'}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Edit Vehicle Information</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assignments" className="p-4 bg-white border rounded-md mt-4">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">No Assignment History</h3>
              <p className="text-gray-500">This vehicle has no assignment history.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="p-4 bg-white border rounded-md mt-4">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">No Maintenance Records</h3>
              <p className="text-gray-500">This vehicle has no maintenance records.</p>
              <Button className="mt-4">Add Maintenance Record</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
