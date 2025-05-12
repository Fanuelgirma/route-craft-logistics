
import { useState } from 'react';
import { Plus, Save, Download, Settings, Search, ChevronDown, Filter } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import DataTable from '@/components/ui/DataTable';
import { Column } from '@/components/ui/DataTable';
import ActionButton from '@/components/ui/ActionButton';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/layout/PageHeader';
import ServiceTaskDetailDrawer from '@/components/maintenance/ServiceTaskDetailDrawer';
import AddServiceTaskModal from '@/components/maintenance/AddServiceTaskModal';
import { ServiceTask } from '@/types/maintenance';

// Mock data for service tasks
const mockServiceTasks: ServiceTask[] = [
  {
    id: '1',
    name: 'Engine Oil & Filter Replacement',
  },
  {
    id: '2',
    name: 'Engine Air Filter Replacement',
  },
  {
    id: '3',
    name: 'Tire Rotation',
  },
  {
    id: '4',
    name: 'Brake Inspection',
  },
  {
    id: '5',
    name: 'ABS Control Module Replacement',
  },
  {
    id: '6',
    name: 'A/C Accumulator Replacement',
  },
  {
    id: '7', 
    name: 'Accelerator Pedal Inspect',
  },
  {
    id: '8',
    name: 'Accessories/Upfitting (Miscellaneous)',
  }
];

// Extended service task data for the table display
interface ServiceTaskExtended extends ServiceTask {
  description?: string;
  serviceEntries: number;
  serviceReminders: number;
  servicePrograms: number;
  workOrders: number;
  defaultReasonForRepair?: string;
  defaultCategoryCode?: string;
  defaultSystemCode?: string;
  defaultAssemblyCode?: string;
}

// Mock extended data
const mockServiceTasksExtended: ServiceTaskExtended[] = mockServiceTasks.map(task => ({
  ...task,
  description: '',
  serviceEntries: Math.floor(Math.random() * 5),
  serviceReminders: Math.floor(Math.random() * 3),
  servicePrograms: Math.floor(Math.random() * 2),
  workOrders: Math.floor(Math.random() * 4),
  defaultCategoryCode: Math.random() > 0.5 ? 'Chassis' : 'Accessories',
  defaultSystemCode: Math.random() > 0.5 ? '013 - Brakes' : '044 - Fuel System',
  defaultAssemblyCode: Math.random() > 0.5 ? '011 - ABS, Anti-Lock System' : '007 - Throttle Controls',
}));

export default function ServiceTasksPage() {
  const [isServiceTaskModalOpen, setIsServiceTaskModalOpen] = useState(false);
  const [selectedServiceTask, setSelectedServiceTask] = useState<ServiceTaskExtended | null>(null);
  const [selectedTab, setSelectedTab] = useState('active');
  
  // Column definitions for the service tasks table
  const columns: Column<ServiceTaskExtended>[] = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (row) => (
        <button 
          onClick={() => setSelectedServiceTask(row)} 
          className="font-medium text-blue-600 hover:underline text-left"
        >
          {row.name}
        </button>
      ),
    },
    {
      header: 'Description',
      accessor: 'description',
      cell: (row) => row.description || '—',
    },
    {
      header: 'Service Entries',
      accessor: 'serviceEntries',
    },
    {
      header: 'Service Reminders',
      accessor: 'serviceReminders',
    },
    {
      header: 'Service Programs',
      accessor: 'servicePrograms',
    },
    {
      header: 'Work Orders',
      accessor: 'workOrders',
    },
    {
      header: 'Default Reason For Repair Code',
      accessor: 'defaultReasonForRepair',
      cell: (row) => row.defaultReasonForRepair || '—',
    },
    {
      header: 'Default Category Code',
      accessor: 'defaultCategoryCode',
      cell: (row) => row.defaultCategoryCode || '—',
    },
    {
      header: 'Default System Code',
      accessor: 'defaultSystemCode',
      cell: (row) => row.defaultSystemCode || '—',
    },
    {
      header: 'Default Assembly Code',
      accessor: 'defaultAssemblyCode',
      cell: (row) => row.defaultAssemblyCode || '—',
    },
  ];

  const tabs = [
    { name: 'Active', href: '#', current: selectedTab === 'active' },
    { name: 'Archived', href: '#', current: selectedTab === 'archived' },
  ];

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab.toLowerCase());
  };

  return (
    <PageLayout>
      <PageHeader
        title="Service Tasks"
        tabs={tabs}
        onTabChange={handleTabChange}
        actions={
          <div className="flex space-x-2">
            <ActionButton
              onClick={() => setIsServiceTaskModalOpen(true)}
              variant="primary"
              leftIcon={<Plus size={16} />}
            >
              Add Service Task
            </ActionButton>
          </div>
        }
      />
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <div className="flex items-center bg-white border rounded-md shadow-sm flex-wrap">
            <Button variant="ghost" className="h-9">
              Service Task Type
              <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="h-9">
              Default Category Code
              <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="h-9">
              Default System Code
              <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="h-9">
              Has Service Reminders
              <ChevronDown size={16} className="ml-1" />
            </Button>
            <Button variant="ghost" className="h-9">
              <Filter size={16} className="mr-1" />
              Filters
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
          data={mockServiceTasksExtended}
          searchable={false}
          emptyMessage="No service tasks found"
          selectable={true}
        />
      </div>
      
      {selectedServiceTask && (
        <ServiceTaskDetailDrawer
          serviceTask={selectedServiceTask}
          isOpen={!!selectedServiceTask}
          onClose={() => setSelectedServiceTask(null)}
        />
      )}
      
      {isServiceTaskModalOpen && (
        <AddServiceTaskModal
          isOpen={isServiceTaskModalOpen}
          onClose={() => setIsServiceTaskModalOpen(false)}
        />
      )}
    </PageLayout>
  );
}
