
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PageLayout from '@/components/layout/PageLayout';
import OrdersTab from '@/components/orders/OrdersTab';
import ProductsTab from '@/components/orders/ProductsTab';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <PageLayout title="Orders Management">
      <div className="space-y-4">
        <div className="border-b border-gray-200">
          <Tabs defaultValue="orders" onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-12 bg-transparent p-0">
              <TabsTrigger 
                value="orders" 
                className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'orders' 
                    ? 'text-logistic-accent border-logistic-accent' 
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="products" 
                className={`rounded-none py-3 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'products' 
                    ? 'text-logistic-accent border-logistic-accent' 
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Products
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="mt-4">
              <OrdersTab />
            </TabsContent>
            
            <TabsContent value="products" className="mt-4">
              <ProductsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}
