
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SalesSummary from './SalesSummary';
import SalesTable from './SalesTable';
import SalesFilter from './SalesFilter';
import NewSaleModal from './NewSaleModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SaleSummary } from '@/types/sales';

// Mock data for initial stats
const mockSummary: SaleSummary = {
  totalRevenue: 145000,
  totalOrders: 87,
  paidOrders: 53,
  outstandingBalance: 12500,
  averageOrderValue: 1667
};

interface SalesDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SalesDashboard({ activeTab, setActiveTab }: SalesDashboardProps) {
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [summary, setSummary] = useState<SaleSummary>(mockSummary);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales</h1>
        <Button onClick={() => setIsNewSaleModalOpen(true)} className="gap-2">
          <Plus size={16} />
          New Sale
        </Button>
      </div>
      
      <SalesSummary stats={summary} />
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Tabs defaultValue="orders" className="w-full">
          <div className="px-6 pt-4 border-b border-gray-200 bg-gray-50">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-md overflow-hidden">
              <TabsTrigger value="orders">All Orders</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </div>
          
          <SalesFilter />
          
          <TabsContent value="orders">
            <SalesTable />
          </TabsContent>
          <TabsContent value="invoices">
            <SalesTable filterByInvoice={true} />
          </TabsContent>
          <TabsContent value="analytics">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Sales Analytics</h3>
              <div className="aspect-[2/1] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Sales charts and analytics will appear here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <NewSaleModal 
        isOpen={isNewSaleModalOpen} 
        onClose={() => setIsNewSaleModalOpen(false)} 
      />
    </div>
  );
}
