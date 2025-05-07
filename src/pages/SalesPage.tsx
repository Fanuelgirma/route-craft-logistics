
import PageLayout from '@/components/layout/PageLayout';
import SalesDashboard from '@/components/sales/SalesDashboard';
import { useState } from 'react';

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState('orders');
  
  return (
    <PageLayout title="Sales Management">
      <SalesDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
    </PageLayout>
  );
}
