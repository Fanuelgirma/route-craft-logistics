
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { ChevronRight, Truck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

export default function TripDetailPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to get trip details
    const fetchTrip = async () => {
      setLoading(true);
      try {
        // Mocked data
        const mockTrip = {
          id: tripId,
          regNo: 'KAX 248C-2',
          driver: 'PERFECT 2',
          status: 'completed',
          created: '02/04/2025 2:42 PM',
          dispatched: '02/04/2025 2:45 PM',
          inTransit: '02/04/2025 2:48 PM',
          completed: '02/04/2025 2:52 PM',
          stops: 5,
          duration: '10 minutes',
          distance: '20.21 km',
          stopsDetails: [
            { id: 1, name: 'DEPOT RUIRU', distance: 0, diffDistance: 0, deliveryTime: '02:48 PM', timeAtCustomer: '-', status: 'Completed', rank: 0 },
            { id: 2, name: 'MAJID AL FUTTAIM HYPERMARKET LTD, THB4', distance: 14.35, diffDistance: 14.35, deliveryTime: '02:49 PM', timeAtCustomer: '2min', status: 'Completed', rank: 1 },
            { id: 3, name: 'FRANCIS OMOTHO KARIO', distance: 15.39, diffDistance: 1.05, deliveryTime: '02:53 PM', timeAtCustomer: '2min', status: 'Completed', rank: 2 },
            { id: 4, name: 'GOOD HOPE MINIMART', distance: 18.21, diffDistance: 2.82, deliveryTime: '02:55 PM', timeAtCustomer: '0min', status: 'Completed', rank: 3 },
            { id: 5, name: 'MICHAEL N. MENDIA', distance: 18.21, diffDistance: 0, deliveryTime: '02:57 PM', timeAtCustomer: '0min', status: 'Completed', rank: 4 },
            { id: 6, name: 'JUSAKALI G.M. JUMBO', distance: 20.21, diffDistance: 2, deliveryTime: '02:59 PM', timeAtCustomer: '0min', status: 'Completed', rank: 5 }
          ]
        };
        setTrip(mockTrip);
      } catch (error) {
        console.error('Failed to fetch trip details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-logistic-accent"></div>
        </div>
      </PageLayout>
    );
  }

  if (!trip) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-lg font-semibold text-gray-700">Trip not found</h2>
          <button
            onClick={() => navigate('/trips')}
            className="mt-4 bg-logistic-accent text-white px-4 py-2 rounded-md text-sm"
          >
            Back to Trips
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link to="/trips" className="hover:text-logistic-accent">Trips</Link>
        <ChevronRight size={16} className="mx-1" />
        <Link to={`/trips?status=${trip.status}`} className="hover:text-logistic-accent">
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </Link>
        <ChevronRight size={16} className="mx-1" />
        <span className="text-gray-700 font-medium">{trip.regNo}</span>
      </div>
      
      {/* Header Strip */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 p-2 rounded-full">
            <Truck size={24} className="text-logistic-accent" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">{trip.regNo}</h1>
            <p className="text-gray-600">{trip.driver || 'No driver assigned'}</p>
          </div>
        </div>
        <div>
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${trip.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
            ${trip.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${trip.status === 'dispatched' ? 'bg-blue-100 text-blue-800' : ''}
            ${trip.status === 'in-transit' ? 'bg-purple-100 text-purple-800' : ''}
            ${trip.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column - Tabbed Content */}
        <div className="md:col-span-2">
          {trip.status === 'completed' ? (
            <CompletedTripDetail trip={trip} />
          ) : (
            <TripInfo trip={trip} />
          )}
        </div>
        
        {/* Right Column - Map */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map View Placeholder</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function TripInfo({ trip }: { trip: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-medium mb-4">Trip Info</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <p className="mt-1 text-gray-900">{trip.regNo}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Driver</label>
            <p className="mt-1 text-gray-900">{trip.driver || '-'}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <p className="mt-1">
              <span className={`
                px-2 py-0.5 rounded text-xs font-medium
                ${trip.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                ${trip.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${trip.status === 'dispatched' ? 'bg-blue-100 text-blue-800' : ''}
                ${trip.status === 'in-transit' ? 'bg-purple-100 text-purple-800' : ''}
                ${trip.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </span>
            </p>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Created</label>
            <p className="mt-1 text-gray-900">{trip.created}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Stops</label>
            <p className="mt-1 text-gray-900">{trip.stops}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Planned Distance</label>
            <p className="mt-1 text-gray-900">{trip.distance}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 border-t border-gray-200 pt-4">
        <button className="bg-logistic-accent text-white px-4 py-2 rounded-md text-sm">
          {trip.status === 'pending' && 'Mark as Dispatched'}
          {trip.status === 'dispatched' && 'Mark as In Transit'}
          {trip.status === 'in-transit' && 'Mark as Completed'}
        </button>
      </div>
    </div>
  );
}

function CompletedTripDetail({ trip }: { trip: any }) {
  return (
    <Tabs defaultValue="route-details">
      <TabsList className="w-full bg-white border border-gray-200 rounded-t-lg">
        <TabsTrigger value="route-details" className="flex-1">Route Details</TabsTrigger>
        <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
        <TabsTrigger value="compare" className="flex-1">Compare</TabsTrigger>
      </TabsList>
      
      {/* Route Details Tab */}
      <TabsContent value="route-details" className="mt-0">
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-4">
          <div className="mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <p><span className="font-medium">Route Details</span> | {trip.created.split(' ')[0]} | {trip.regNo} | -</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
              <p>
                <span className="font-medium">Stops:</span> {trip.stops}
                <span className="mx-2">•</span>
                <span className="font-medium">Duration:</span> {trip.duration}
                <span className="mx-2">•</span>
                <span className="font-medium">Distance:</span> {trip.distance}
              </p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip Distance (KM)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance (Q/Q)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time at Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trip.stopsDetails.map((stop: any) => (
                  <tr key={stop.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stop.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{stop.distance}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{stop.diffDistance}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{stop.deliveryTime}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{stop.timeAtCustomer}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {stop.status === 'Completed' && (
                        <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-800">
                          {stop.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{stop.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabsContent>
      
      {/* Timeline Tab */}
      <TabsContent value="timeline" className="mt-0">
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-4">
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Pending</h3>
                <p className="text-xs text-gray-500">{trip.created}</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Dispatched</h3>
                <p className="text-xs text-gray-500">{trip.dispatched}</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">In Transit</h3>
                <p className="text-xs text-gray-500">{trip.inTransit}</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Completed</h3>
                <p className="text-xs text-gray-500">{trip.completed}</p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* Compare Tab */}
      <TabsContent value="compare" className="mt-0">
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600">Planned</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-600">Actual</span>
              </div>
            </div>
            <div className="text-sm font-medium">
              Route Distance: {trip.distance}
            </div>
          </div>
          
          <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Route Comparison View Placeholder</p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-700 border border-gray-200">
                Planned
              </button>
              <button className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-700 border border-gray-200">
                Actual
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-1 rounded-md bg-gray-100 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                </svg>
              </button>
              <button className="p-1 rounded-md bg-gray-100 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                </svg>
              </button>
              <button className="p-1 rounded-md bg-gray-100 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <polygon points="19 5 19 19"></polygon>
                </svg>
              </button>
              <button className="p-1 rounded-md bg-gray-100 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M21 16a9 9 0 0 1-15 6.7L3 20"></path>
                  <path d="M3 22v-6h6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
