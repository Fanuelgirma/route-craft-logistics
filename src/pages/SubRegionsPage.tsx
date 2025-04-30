
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import DataTable, { Column } from '@/components/ui/DataTable';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/Modal';
import MapComponent from '@/components/map/MapComponent';
import { PlusCircle, Power, ArrowLeftRight, Edit, XCircle } from 'lucide-react';

interface SubRegion {
  id: string;
  name: string;
  customerCount: number;
  created: string;
  createdBy: string;
  status: 'active' | 'inactive';
}

interface CustomerInSubRegion {
  id: string;
  name: string;
  rank: number;
}

// Sample data
const sampleSubRegions: SubRegion[] = [
  {
    id: '1',
    name: 'Downtown Core',
    customerCount: 24,
    created: '2024-03-15 09:45 AM',
    createdBy: 'John Smith',
    status: 'active'
  },
  {
    id: '2',
    name: 'Industrial Park',
    customerCount: 18,
    created: '2024-02-28 02:30 PM',
    createdBy: 'Emily Johnson',
    status: 'active'
  },
  {
    id: '3',
    name: 'Harbor District',
    customerCount: 12,
    created: '2024-04-02 11:15 AM',
    createdBy: 'Michael Brown',
    status: 'inactive'
  },
  {
    id: '4',
    name: 'Retail Zone',
    customerCount: 32,
    created: '2024-03-22 03:20 PM',
    createdBy: 'Sarah Wilson',
    status: 'active'
  },
  {
    id: '5',
    name: 'Eastern Suburbs',
    customerCount: 15,
    created: '2024-04-10 10:05 AM',
    createdBy: 'David Miller',
    status: 'active'
  },
];

const sampleCustomersInSubRegion: CustomerInSubRegion[] = [
  { id: '1', name: 'ABC Corporation', rank: 1 },
  { id: '2', name: 'XYZ Enterprises', rank: 2 },
  { id: '3', name: 'Acme Inc', rank: 3 },
  { id: '4', name: 'Global Traders', rank: 4 },
  { id: '5', name: 'Metro Supplies', rank: 5 },
];

export default function SubRegionsPage() {
  const [subRegions] = useState<SubRegion[]>(sampleSubRegions);
  const [customersInSubRegion] = useState<CustomerInSubRegion[]>(sampleCustomersInSubRegion);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCustomersModalOpen, setIsCustomersModalOpen] = useState(false);
  const [currentSubRegion, setCurrentSubRegion] = useState<SubRegion | null>(null);

  const columns: Column<SubRegion>[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'No. of Customers', accessor: 'customerCount' },
    { header: 'Created', accessor: 'created' },
    { header: 'Created By', accessor: 'createdBy' },
    { 
      header: 'Status', 
      accessor: (row) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          row.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex space-x-2">
          <button 
            className="text-gray-600 hover:text-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              handleEditSubRegion(row);
            }}
          >
            <Edit size={18} />
          </button>
        </div>
      )
    },
  ];

  const customerColumns: Column<CustomerInSubRegion>[] = [
    { header: 'Rank', accessor: 'rank' },
    { header: 'Customer Name', accessor: 'name' },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex space-x-2">
          <button className="text-gray-600 hover:text-gray-800">
            <ArrowLeftRight size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <XCircle size={18} />
          </button>
        </div>
      )
    },
  ];

  const handleViewSubRegionCustomers = (subRegion: SubRegion) => {
    setCurrentSubRegion(subRegion);
    setIsCustomersModalOpen(true);
  };

  const handleEditSubRegion = (subRegion: SubRegion) => {
    setCurrentSubRegion(subRegion);
    setIsAddModalOpen(true);
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Sub-Regions" 
        breadcrumbs={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Sub-Regions', href: '/subregions' }]}
        actions={
          <div className="flex space-x-2">
            <ActionButton
              variant="primary"
              leftIcon={<PlusCircle size={16} />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Sub-region
            </ActionButton>
            <ActionButton
              variant="outline"
              leftIcon={<Power size={16} />}
            >
              Deactivate
            </ActionButton>
            <ActionButton
              variant="outline"
              leftIcon={<ArrowLeftRight size={16} />}
            >
              Swap
            </ActionButton>
          </div>
        }
      />
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <DataTable 
            columns={columns} 
            data={subRegions} 
            searchable 
            searchPlaceholder="Search sub-regions..."
            onRowClick={handleViewSubRegionCustomers}
            keyField="id"
          />
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Sub-Region Map</h3>
          </div>
          <div className="h-96">
            <MapComponent withMarkers />
          </div>
        </div>
      </div>

      {/* Add/Edit Sub-region Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setCurrentSubRegion(null);
        }}
        title={currentSubRegion ? 'Edit Sub-region' : 'Add Sub-region'}
        footer={
          <>
            <ActionButton 
              variant="outline" 
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </ActionButton>
            <ActionButton 
              variant="primary"
            >
              {currentSubRegion ? 'Save Changes' : 'Create Sub-region'}
            </ActionButton>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub-region Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentSubRegion?.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentSubRegion?.status}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Region Map</label>
            <div className="mt-1 h-60">
              <MapComponent />
            </div>
          </div>
        </div>
      </Modal>

      {/* View Sub-region Customers Modal */}
      <Modal
        isOpen={isCustomersModalOpen}
        onClose={() => {
          setIsCustomersModalOpen(false);
          setCurrentSubRegion(null);
        }}
        title={`Customers in ${currentSubRegion?.name || 'Sub-region'}`}
        size="lg"
      >
        <DataTable 
          columns={customerColumns} 
          data={customersInSubRegion} 
          searchable={false}
        />
      </Modal>
    </PageLayout>
  );
}
