
import { Column } from '@/components/ui/DataTable';
import { ServiceTaskExtended } from '@/types/maintenance';

export const getServiceTaskColumns = (
  onSelectTask: (task: ServiceTaskExtended) => void
): Column<ServiceTaskExtended>[] => [
  {
    header: 'Name',
    accessor: 'name',
    cell: (row) => (
      <button 
        onClick={() => onSelectTask(row)} 
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
