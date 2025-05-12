
import { useState } from 'react';
import { Plus } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import DataTable from '@/components/ui/DataTable';
import ActionButton from '@/components/ui/ActionButton';
import PageHeader from '@/components/layout/PageHeader';
import ServiceTaskDetailDrawer from '@/components/maintenance/ServiceTaskDetailDrawer';
import AddServiceTaskModal from '@/components/maintenance/AddServiceTaskModal';
import ServiceTasksFilters from '@/components/maintenance/ServiceTasksFilters';
import { getServiceTaskColumns } from '@/components/maintenance/ServiceTasksColumns';
import { mockServiceTasksExtended } from '@/components/maintenance/serviceTasksData';
import { ServiceTaskExtended } from '@/types/maintenance';

export default function ServiceTasksPage() {
  const [isServiceTaskModalOpen, setIsServiceTaskModalOpen] = useState(false);
  const [selectedServiceTask, setSelectedServiceTask] = useState<ServiceTaskExtended | null>(null);
  const [selectedTab, setSelectedTab] = useState('active');
  
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab.toLowerCase());
  };

  const tabs = [
    { name: 'Active', href: '#', current: selectedTab === 'active' },
    { name: 'Archived', href: '#', current: selectedTab === 'archived' },
  ];

  const columns = getServiceTaskColumns(setSelectedServiceTask);

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
        <ServiceTasksFilters />
        
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
