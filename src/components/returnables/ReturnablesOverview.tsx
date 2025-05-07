
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReturnablesStats from './ReturnablesStats';
import ReturnablesTable from './ReturnablesTable';
import ReturnablesFilter from './ReturnablesFilter';
import { ReturnableStats } from '@/types/returnable';

// Mock data for initial stats
const mockStats: ReturnableStats = {
  totalSentToday: 145,
  pendingReturns: 87,
  returnedToday: 53,
  overdueReturns: 12
};

export default function ReturnablesOverview() {
  const [showOverdueOnly, setShowOverdueOnly] = useState(false);
  const [stats, setStats] = useState<ReturnableStats>(mockStats);

  return (
    <div className="space-y-6">
      {stats.overdueReturns > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <span className="font-bold">{stats.overdueReturns} overdue {stats.overdueReturns === 1 ? 'returnable' : 'returnables'}</span>. Please follow up with customers.
              </p>
            </div>
            <div className="ml-auto">
              <button 
                onClick={() => setShowOverdueOnly(true)}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 text-xs font-medium rounded-full"
              >
                View Overdue
              </button>
            </div>
          </div>
        </div>
      )}

      <ReturnablesStats stats={stats} />
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6 pt-4 border-b border-gray-200 bg-gray-50">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-md overflow-hidden">
              <TabsTrigger value="all">All Returnables</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="returned">Returned</TabsTrigger>
              <TabsTrigger value="issues">Damaged/Lost</TabsTrigger>
            </TabsList>
          </div>
          
          <ReturnablesFilter showOverdueOnly={showOverdueOnly} setShowOverdueOnly={setShowOverdueOnly} />
          
          <TabsContent value="all">
            <ReturnablesTable showOverdueOnly={showOverdueOnly} />
          </TabsContent>
          <TabsContent value="pending">
            <ReturnablesTable status="Pending Return" />
          </TabsContent>
          <TabsContent value="returned">
            <ReturnablesTable status="Returned" />
          </TabsContent>
          <TabsContent value="issues">
            <ReturnablesTable status={["Damaged", "Lost"]} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
