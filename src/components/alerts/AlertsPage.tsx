import { useState } from 'react';
import { format } from 'date-fns';
import { Search, Plus, Download } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertsTable } from './AlertsTable';
import ViewAlertModal from './ViewAlertModal';
import ResolveAlertModal from './ResolveAlertModal';
import { Alert, AlertStatus } from '@/types/alert';

// Mock data
const mockAlerts: Alert[] = [
  {
    id: '1',
    kpiName: 'READY FOR DISPATCH',
    driver: 'Aurora Long',
    message: 'Truck is ready for dispatch and has not left office.',
    status: 'Unresolved',
    sentAt: '2025-04-15T12:37:00Z',
  },
  {
    id: '2',
    kpiName: 'READY FOR DISPATCH',
    driver: 'Aurora Long',
    message: 'Truck is ready for dispatch and has not left office.',
    status: 'Unresolved',
    sentAt: '2025-04-15T12:37:00Z',
  },
  {
    id: '3',
    kpiName: 'READY FOR DISPATCH',
    driver: 'Aurora Long',
    message: 'Truck is ready for dispatch and has not left office.',
    status: 'Unresolved',
    sentAt: '2025-04-15T12:37:00Z',
  },
  {
    id: '4',
    kpiName: 'READY FOR DISPATCH',
    driver: 'Anthony Patterson',
    message: 'Truck is ready for dispatch and has not left office.',
    status: 'Resolved',
    sentAt: '2025-03-15T12:35:00Z',
    resolvedAt: '2025-02-14T09:27:00Z',
    resolvedBy: 'DEMO ADMIN',
    resolutionReason: 'Issue was resolved by driver',
  },
  {
    id: '5',
    kpiName: 'READY FOR DISPATCH',
    driver: 'Aaron Rivers',
    message: 'Test message',
    status: 'Resolved',
    sentAt: '2024-09-26T10:14:00Z',
    resolvedAt: '2024-10-07T12:46:00Z',
    resolvedBy: 'DEMO ADMIN',
    resolutionReason: 'No longer relevant',
  },
  {
    id: '6',
    kpiName: 'READY FOR DISPATCH',
    driver: 'Aaron Rivers',
    message: 'Test message',
    status: 'Resolved',
    sentAt: '2024-09-26T10:14:00Z',
    resolvedAt: '2024-10-07T12:46:00Z',
    resolvedBy: 'DEMO ADMIN',
    resolutionReason: 'Driver has departed',
  }
];

const AlertsPage = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AlertStatus | 'All'>('Unresolved');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());

  // Filter alerts based on tab and search
  const filteredAlerts = mockAlerts.filter(alert => {
    // Filter by status tab
    if (activeTab !== 'All' && alert.status !== activeTab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        alert.kpiName.toLowerCase().includes(term) ||
        alert.driver.toLowerCase().includes(term) ||
        alert.message.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const resolvedCount = mockAlerts.filter(alert => alert.status === 'Resolved').length;
  const unresolvedCount = mockAlerts.filter(alert => alert.status === 'Unresolved').length;
  const allCount = mockAlerts.length;

  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsViewModalOpen(true);
  };

  const handleResolveAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsResolveModalOpen(true);
  };

  const handleBulkResolve = () => {
    setIsResolveModalOpen(true);
  };

  const handleBulkReceive = () => {
    console.log("Bulk receive triggered for", selectedAlerts);
    // Mock API call would go here
    setSelectedAlerts(new Set());
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedAlert(null);
  };

  const handleCloseResolveModal = () => {
    setIsResolveModalOpen(false);
    setSelectedAlert(null);
  };

  const handleResolveSubmit = (reason: string) => {
    console.log("Resolving with reason:", reason);
    // Mock API call would go here
    setIsResolveModalOpen(false);
    setSelectedAlert(null);
  };

  const handleSelectAlert = (id: string, selected: boolean) => {
    const newSelectedAlerts = new Set(selectedAlerts);
    
    if (selected) {
      newSelectedAlerts.add(id);
    } else {
      newSelectedAlerts.delete(id);
    }
    
    setSelectedAlerts(newSelectedAlerts);
  };

  return (
    <PageLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Alerts</h1>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-40"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-40"
            />
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AlertStatus | 'All')} className="flex-1">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger value="Resolved">Resolved ({resolvedCount})</TabsTrigger>
              <TabsTrigger value="Unresolved">Unresolved ({unresolvedCount})</TabsTrigger>
              <TabsTrigger value="All">All ({allCount})</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2 items-center ml-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search Notifications..."
                className="pl-9 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {activeTab === 'Unresolved' && selectedAlerts.size > 0 && (
              <Button onClick={handleBulkResolve}>Bulk Resolve</Button>
            )}
            
            {activeTab === 'Resolved' && selectedAlerts.size > 0 && (
              <Button onClick={handleBulkReceive}>Bulk Receive</Button>
            )}
          </div>
        </div>

        <AlertsTable 
          alerts={filteredAlerts}
          onViewAlert={handleViewAlert}
          onResolveAlert={handleResolveAlert}
          selectedAlerts={selectedAlerts}
          onSelectAlert={handleSelectAlert}
          showCheckboxes={activeTab !== 'All'}
        />

        {selectedAlert && isViewModalOpen && (
          <ViewAlertModal
            alert={selectedAlert}
            onClose={handleCloseViewModal}
          />
        )}

        {isResolveModalOpen && (
          <ResolveAlertModal
            alert={selectedAlert}
            selectedCount={selectedAlerts.size}
            onClose={handleCloseResolveModal}
            onResolve={handleResolveSubmit}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default AlertsPage;
