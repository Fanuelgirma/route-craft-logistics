
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import PageLayout from '@/components/layout/PageLayout';

// Mock data (in a real app, you would fetch this from an API)
const mockDriver = {
  id: '1',
  name: 'Aurora Long',
  phone: '+254757961280',
  licenseNo: 'DL123456',
  depot: 'LETA',
  assignedVehicle: 'KAC 2030-2',
  status: 'Active',
};

export default function DriverDetailPage() {
  const { driverId } = useParams<{ driverId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  // In a real app, you would fetch driver details based on driverId
  // const { data: driver, isLoading } = useQuery(['driver', driverId], ...) 
  const driver = mockDriver;
  
  const goBack = () => {
    navigate('/fleet');
  };
  
  return (
    <PageLayout>
      <div className="flex items-center space-x-2 mb-4">
        <Button variant="outline" size="sm" onClick={goBack}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <div className="text-2xl font-bold">Driver Details</div>
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        Fleet » Drivers » {driver.name}
      </div>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gray-100 p-3 rounded-full">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{driver.name}</h2>
              <p className="text-gray-500">{driver.phone}</p>
            </div>
          </div>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            driver.status === 'Active' ? 'bg-green-100 text-green-800' :
            driver.status === 'Inactive' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {driver.status}
          </span>
        </div>
        
        <Tabs 
          defaultValue="profile" 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="w-full justify-start h-12 bg-white border-b">
            <TabsTrigger 
              value="profile" 
              className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                activeTab === 'profile' 
                  ? 'text-logistic-accent border-logistic-accent' 
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                activeTab === 'documents' 
                  ? 'text-logistic-accent border-logistic-accent' 
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="trips" 
              className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                activeTab === 'trips' 
                  ? 'text-logistic-accent border-logistic-accent' 
                  : 'border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Trip History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="p-4 bg-white border rounded-md mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Driver Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Driver ID</p>
                    <p className="font-medium">{driver.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{driver.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{driver.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License No</p>
                    <p className="font-medium">{driver.licenseNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Depot</p>
                    <p className="font-medium">{driver.depot}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{driver.status}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Assigned Vehicle</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Registration Number</p>
                    <p className="font-medium">{driver.assignedVehicle || '-'}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Edit Driver Information</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="p-4 bg-white border rounded-md mt-4">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">No Documents</h3>
              <p className="text-gray-500">This driver has no uploaded documents.</p>
              <Button className="mt-4">Upload Document</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="trips" className="p-4 bg-white border rounded-md mt-4">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">No Trip History</h3>
              <p className="text-gray-500">This driver has no trip history.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
