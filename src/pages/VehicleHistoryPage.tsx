
import { useState } from 'react';
import { Plus, Save, Download, Settings, Search, ChevronDown } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import DataTable, { Column } from '@/components/ui/DataTable';
import ActionButton from '@/components/ui/ActionButton';
import { Button } from '@/components/ui/button';
import { ServiceEntry } from '@/types/maintenance';
import ServiceEntryModal from '@/components/maintenance/ServiceEntryModal';
import PageHeader from '@/components/layout/PageHeader';

// Mock data for service entries
const mockServiceEntries: ServiceEntry[] = [
  {
    id: '1',
    assetId: '1100',
    assetName: '1100 [2018 Toyota Prius]',
    assetThumbnail: 'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/priusprime/1.png?bg=fff&fm=webp&w=930',
    completionDate: '2025-01-28T13:33:00',
    meter: 11278,
    serviceTasks: [
      { id: '1', name: 'Engine Oil & Filter Replacement' },
      { id: '2', name: 'Engine Air Filter Replacement' }
    ],
    total: 94.88,
    status: 'Completed',
  },
  {
    id: '2',
    assetId: '2100',
    assetName: '2100 [2016 Ford F-150]',
    assetThumbnail: 'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/f-150/2023/collections/equipment/3-2/23_frd_f150_rptp_ps34_xlt_carbonized_gray_pass_596x447.png',
    completionDate: '2025-10-15T12:24:00',
    meter: 40115,
    serviceTasks: [
      { id: '3', name: 'Engine Oil & Filter Replacement' },
      { id: '4', name: 'Tire Rotation' }
    ],
    total: 70.99,
    status: 'Completed',
  },
  {
    id: '3',
    assetId: '2100',
    assetName: '2100 [2016 Ford F-150]',
    assetThumbnail: 'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/f-150/2023/collections/equipment/3-2/23_frd_f150_rptp_ps34_xlt_carbonized_gray_pass_596x447.png',
    completionDate: '2025-01-12T15:23:00',
    meter: 47610,
    serviceTasks: [
      { id: '5', name: 'Engine Oil & Filter Replacement' }
    ],
    total: 47.46,
    status: 'Completed',
  },
  {
    id: '4',
    assetId: '2100',
    assetName: '2100 [2016 Ford F-150]',
    assetThumbnail: 'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/f-150/2023/collections/equipment/3-2/23_frd_f150_rptp_ps34_xlt_carbonized_gray_pass_596x447.png',
    completionDate: '2025-04-17T06:48:00',
    meter: 55208,
    serviceTasks: [
      { id: '6', name: 'Engine Oil & Filter Replacement' },
      { id: '7', name: 'Brake Inspection' }
    ],
    total: 360.94,
    status: 'Completed',
  },
  {
    id: '5',
    assetId: '3100',
    assetName: '3100 [2014 Chevrolet Express Cargo]',
    assetThumbnail: 'https://www.gmfleet.com/content/dam/gmfleet/na/us/english/index/vehicles/2023/vans/express-cargo-van/01-images/2023-express-cargo-van-mov-design-01.jpg?imwidth=960',
    completionDate: '2024-07-26T11:54:00',
    meter: 112816,
    serviceTasks: [
      { id: '8', name: 'Engine Oil & Filter Replacement' },
      { id: '9', name: 'Tire Rotation' }
    ],
    total: 74.49,
    status: 'Completed',
  },
];

export default function VehicleHistoryPage() {
  const [isServiceEntryModalOpen, setIsServiceEntryModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  
  // Column definitions for the service history table
  const columns: Column<ServiceEntry>[] = [
    {
      header: 'Asset',
      accessor: (row) => (
        <div className="flex items-center space-x-2">
          {row.assetThumbnail && (
            <div className="w-10 h-8">
              <img src={row.assetThumbnail} alt={row.assetName} className="h-full object-contain" />
            </div>
          )}
          <div className="relative">
            <span className="font-medium text-blue-600">{row.assetName}</span>
            <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"></span>
          </div>
        </div>
      ),
    },
    {
      header: 'Actual Completion Date',
      accessor: (row) => {
        const date = new Date(row.completionDate);
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) + 
               ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      },
    },
    {
      header: 'Watchers',
      accessor: () => '—',
    },
    {
      header: 'Repair Priority Class',
      accessor: () => '—',
    },
    {
      header: 'Meter',
      accessor: (row) => `${row.meter.toLocaleString()} mi`,
    },
    {
      header: 'Service Tasks',
      accessor: (row) => (
        <div className="flex flex-col">
          {row.serviceTasks.map((task, i) => (
            <span key={i} className="text-blue-600 hover:underline cursor-pointer">
              {task.name}
            </span>
          ))}
          {row.serviceTasks.length > 1 && (
            <span className="text-sm text-gray-500">+{row.serviceTasks.length - 1} more</span>
          )}
        </div>
      ),
    },
    {
      header: 'Issues',
      accessor: () => '—',
    },
    {
      header: 'Vendor',
      accessor: () => '—',
    },
    {
      header: 'Total',
      accessor: (row) => `$${row.total.toFixed(2)}`,
    },
    {
      header: 'Work Order',
      accessor: () => '—',
    },
    {
      header: 'Labels',
      accessor: () => '',
    },
  ];

  const tabs = [
    { name: 'All', href: '#', current: selectedTab === 'all' },
    { name: 'Today', href: '#', current: selectedTab === 'today' },
    { name: 'This Week', href: '#', current: selectedTab === 'this-week' },
    { name: 'This Month', href: '#', current: selectedTab === 'this-month' },
  ];

  return (
    <PageLayout>
      <PageHeader
        title="Vehicle History"
        tabs={tabs}
        actions={
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="hidden md:flex"
            >
              <Plus className="mr-1" size={16} />
              Add Tab
            </Button>
            <ActionButton
              onClick={() => setIsServiceEntryModalOpen(true)}
              variant="primary"
              leftIcon={<Plus size={16} />}
            >
              Add Service Entry
            </ActionButton>
          </div>
        }
      />
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <div className="flex items-center bg-white border rounded-md shadow-sm">
            <Button variant="ghost" className="h-9">
              Asset
              <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="h-9">
              Asset Group
              <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="h-9">
              Service Tasks
              <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="h-9">
              Watcher
              <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="h-9">
              Filters
              <ChevronDown size={16} className="ml-1" />
            </Button>
          </div>
          
          <div className="ml-auto flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
              />
            </div>
            
            <Button variant="outline" size="icon">
              <Save size={16} />
            </Button>
            <Button variant="outline" size="icon">
              <Download size={16} />
            </Button>
            <Button variant="outline" size="icon">
              <Settings size={16} />
            </Button>
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={mockServiceEntries}
          searchable={false}
          emptyMessage="No service history found"
        />
      </div>
      
      {isServiceEntryModalOpen && (
        <ServiceEntryModal
          isOpen={isServiceEntryModalOpen}
          onClose={() => setIsServiceEntryModalOpen(false)}
        />
      )}
    </PageLayout>
  );
}
