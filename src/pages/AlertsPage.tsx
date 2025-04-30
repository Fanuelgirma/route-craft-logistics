
import React, { useState } from 'react';
import { Search, Calendar, X } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import ActionButton from '@/components/ui/ActionButton';
import ResolveAlertModal from '@/components/alerts/ResolveAlertModal';
import ViewAlertModal from '@/components/alerts/ViewAlertModal';
import { Alert, AlertStatus } from '@/types/alert';

// Mock data
const mockAlerts: Alert[] = [
  { 
    id: '1', 
    kpiName: 'On-Time Delivery', 
    driver: 'John Doe', 
    message: 'On-Time Delivery KPI threshold exceeded by 8%', 
    status: 'Unresolved', 
    sentAt: new Date('2025-04-28T10:30:00'), 
    resolvedAt: null,
    resolvedBy: null
  },
  { 
    id: '2', 
    kpiName: 'Vehicle Utilization', 
    driver: 'Jane Smith', 
    message: 'Vehicle Utilization below target (72% vs 85% target)', 
    status: 'Resolved', 
    sentAt: new Date('2025-04-27T14:45:00'), 
    resolvedAt: new Date('2025-04-27T16:20:00'),
    resolvedBy: 'Admin User'
  },
  { 
    id: '3', 
    kpiName: 'Fuel Efficiency', 
    driver: 'Mark Johnson', 
    message: 'Fuel consumption exceeding threshold by 15%', 
    status: 'Unresolved', 
    sentAt: new Date('2025-04-29T09:15:00'), 
    resolvedAt: null,
    resolvedBy: null
  },
  { 
    id: '4', 
    kpiName: 'Delivery Cost', 
    driver: 'Sarah Williams', 
    message: 'Delivery cost per km above target (3.2 vs 2.5 target)', 
    status: 'Resolved', 
    sentAt: new Date('2025-04-26T11:20:00'), 
    resolvedAt: new Date('2025-04-26T13:45:00'),
    resolvedBy: 'Admin User'
  },
  { 
    id: '5', 
    kpiName: 'Customer Satisfaction', 
    driver: 'Robert Brown', 
    message: 'Customer satisfaction score below threshold (7.5 vs 8.5 target)', 
    status: 'Unresolved', 
    sentAt: new Date('2025-04-29T16:10:00'), 
    resolvedAt: null,
    resolvedBy: null
  },
];

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [activeTab, setActiveTab] = useState<AlertStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState<Set<string>>(new Set());
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleTabChange = (tab: AlertStatus) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedAlerts(new Set());
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    if (type === 'start') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
    setCurrentPage(1);
  };

  const handleClearDates = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleSelectAlert = (id: string) => {
    const newSelected = new Set(selectedAlerts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedAlerts(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = filteredAlerts.map(alert => alert.id);
      setSelectedAlerts(new Set(allIds));
    } else {
      setSelectedAlerts(new Set());
    }
  };

  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsViewModalOpen(true);
  };

  const handleResolveIndividual = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsResolveModalOpen(true);
  };

  const handleBulkResolve = () => {
    if (selectedAlerts.size === 0) return;
    setIsResolveModalOpen(true);
  };

  const resolveAlerts = (reason: string) => {
    const now = new Date();
    const updatedAlerts = alerts.map(alert => {
      if (selectedAlert && alert.id === selectedAlert.id || selectedAlerts.has(alert.id)) {
        return {
          ...alert,
          status: 'Resolved' as AlertStatus,
          resolvedAt: now,
          resolvedBy: 'Current User', // In a real app, use the actual user
          resolutionReason: reason
        };
      }
      return alert;
    });
    
    setAlerts(updatedAlerts);
    setIsResolveModalOpen(false);
    setSelectedAlert(null);
    setSelectedAlerts(new Set());
  };

  // Filtering logic
  const filterByDate = (alert: Alert) => {
    if (!startDate && !endDate) return true;
    
    const alertDate = new Date(alert.sentAt);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date(8640000000000000); // Max date value
    
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    
    return alertDate >= start && alertDate <= end;
  };

  const filterByTab = (alert: Alert) => {
    return activeTab === 'All' || alert.status === activeTab;
  };

  const filterBySearch = (alert: Alert) => {
    return !searchTerm || 
      alert.kpiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredAlerts = alerts
    .filter(filterByDate)
    .filter(filterByTab)
    .filter(filterBySearch);

  // Count of alerts by status
  const resolvedCount = alerts.filter(a => a.status === 'Resolved').length;
  const unresolvedCount = alerts.filter(a => a.status === 'Unresolved').length;
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <PageLayout>
      <PageHeader
        title="Alert Management"
        breadcrumbs={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Alerts', href: '/alerts' }]}
        actions={
          selectedAlerts.size > 0 && (
            <ActionButton
              variant="primary"
              onClick={handleBulkResolve}
            >
              Resolve Selected ({selectedAlerts.size})
            </ActionButton>
          )
        }
      />
      
      <div className="mt-6 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex space-x-1">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-t-md ${activeTab === 'All' ? 'bg-white text-logistic-accent border-b-2 border-logistic-accent' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => handleTabChange('All')}
            >
              All ({alerts.length})
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-t-md ${activeTab === 'Resolved' ? 'bg-white text-logistic-accent border-b-2 border-logistic-accent' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => handleTabChange('Resolved')}
            >
              Resolved ({resolvedCount})
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-t-md ${activeTab === 'Unresolved' ? 'bg-white text-logistic-accent border-b-2 border-logistic-accent' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => handleTabChange('Unresolved')}
            >
              Unresolved ({unresolvedCount})
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDateChange(e, 'start')}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <span className="text-gray-500">to</span>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDateChange(e, 'end')}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {(startDate || endDate) && (
                <button
                  onClick={handleClearDates}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  title="Clear dates"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    checked={selectedAlerts.size === currentAlerts.length && currentAlerts.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-logistic-accent focus:ring-logistic-accent"
                  />
                </TableHead>
                <TableHead>KPI Name</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent At</TableHead>
                <TableHead>Resolved At</TableHead>
                <TableHead>Resolved By</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedAlerts.has(alert.id)}
                      onChange={() => handleSelectAlert(alert.id)}
                      className="rounded text-logistic-accent focus:ring-logistic-accent"
                    />
                  </TableCell>
                  <TableCell>{alert.kpiName}</TableCell>
                  <TableCell>{alert.driver}</TableCell>
                  <TableCell className="max-w-xs truncate">{alert.message}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {alert.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(alert.sentAt)}</TableCell>
                  <TableCell>{formatDate(alert.resolvedAt)}</TableCell>
                  <TableCell>{alert.resolvedBy || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewAlert(alert)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                      {alert.status === 'Unresolved' && (
                        <button 
                          onClick={() => handleResolveIndividual(alert)}
                          className="text-green-600 hover:text-green-800"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {currentAlerts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    No alerts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-logistic-accent text-white' : 'bg-white border border-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* View Alert Modal */}
      {isViewModalOpen && selectedAlert && (
        <ViewAlertModal 
          alert={selectedAlert}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedAlert(null);
          }}
        />
      )}
      
      {/* Resolve Alert Modal */}
      {isResolveModalOpen && (
        <ResolveAlertModal 
          alert={selectedAlert}
          selectedCount={selectedAlert ? 1 : selectedAlerts.size}
          onClose={() => {
            setIsResolveModalOpen(false);
            setSelectedAlert(null);
          }}
          onResolve={resolveAlerts}
        />
      )}
    </PageLayout>
  );
};

export default AlertsPage;
