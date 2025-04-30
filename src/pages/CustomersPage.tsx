
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import DataTable, { Column } from '@/components/ui/DataTable';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/Modal';
import { PlusCircle, Upload, Download, Trash2, Eye, Edit } from 'lucide-react';

interface Customer {
  id: string;
  code: string;
  name: string;
  region: string;
  subRegion: string;
  email: string;
  phone: string;
  orders: number;
  geofenceRadius: number;
  deliveryWindow: string;
}

// Sample data
const sampleCustomers: Customer[] = [
  {
    id: '1',
    code: 'CUST001',
    name: 'ABC Corporation',
    region: 'North',
    subRegion: 'Downtown',
    email: 'contact@abccorp.com',
    phone: '555-123-4567',
    orders: 42,
    geofenceRadius: 500,
    deliveryWindow: '9:00 AM - 5:00 PM'
  },
  {
    id: '2',
    code: 'CUST002',
    name: 'XYZ Enterprises',
    region: 'South',
    subRegion: 'Industrial',
    email: 'info@xyzent.com',
    phone: '555-987-6543',
    orders: 28,
    geofenceRadius: 350,
    deliveryWindow: '10:00 AM - 3:00 PM'
  },
  {
    id: '3',
    code: 'CUST003',
    name: 'Acme Inc',
    region: 'East',
    subRegion: 'Suburban',
    email: 'sales@acmeinc.com',
    phone: '555-456-7890',
    orders: 76,
    geofenceRadius: 600,
    deliveryWindow: '8:00 AM - 4:00 PM'
  },
  {
    id: '4',
    code: 'CUST004',
    name: 'Global Traders',
    region: 'West',
    subRegion: 'Harbor',
    email: 'info@globaltraders.com',
    phone: '555-789-0123',
    orders: 51,
    geofenceRadius: 450,
    deliveryWindow: '7:00 AM - 7:00 PM'
  },
  {
    id: '5',
    code: 'CUST005',
    name: 'Metro Supplies',
    region: 'Central',
    subRegion: 'Downtown',
    email: 'contact@metrosupplies.com',
    phone: '555-321-6547',
    orders: 33,
    geofenceRadius: 300,
    deliveryWindow: '9:00 AM - 6:00 PM'
  },
];

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(sampleCustomers);
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const columns: Column<Customer>[] = [
    { header: 'Code', accessor: 'code' },
    { header: 'Customer Name', accessor: 'name' },
    { header: 'Region', accessor: 'region' },
    { header: 'Sub-region', accessor: 'subRegion' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'No. of Orders', accessor: 'orders' },
    { header: 'Geofence Radius (M)', accessor: 'geofenceRadius' },
    { header: 'Delivery Window', accessor: 'deliveryWindow' },
    { 
      header: 'Actions', 
      accessor: (row) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Eye size={18} />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Edit size={18} />
          </button>
        </div>
      )
    },
  ];

  const handleViewCustomer = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsAddModalOpen(true);
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Customers" 
        breadcrumbs={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Customers', href: '/customers' }]}
        actions={
          <div className="flex space-x-2">
            <ActionButton
              variant="primary"
              leftIcon={<PlusCircle size={16} />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Customer
            </ActionButton>
            <ActionButton
              variant="outline"
              leftIcon={<Upload size={16} />}
            >
              Bulk Update Lat/Long
            </ActionButton>
            <ActionButton
              variant="outline"
              leftIcon={<Upload size={16} />}
            >
              Bulk Upload
            </ActionButton>
            <ActionButton
              variant="outline"
              leftIcon={<Trash2 size={16} />}
              disabled={selectedCustomers.size === 0}
            >
              Delete
            </ActionButton>
          </div>
        }
      />
      
      <div className="mt-6">
        <DataTable 
          columns={columns} 
          data={customers} 
          searchable 
          searchPlaceholder="Search customers..."
          onRowClick={handleViewCustomer}
          keyField="id"
          selectable
        />
      </div>

      {/* Add/Edit Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setCurrentCustomer(null);
        }}
        title={currentCustomer ? 'Edit Customer' : 'Add Customer'}
        size="lg"
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
              {currentCustomer ? 'Save Changes' : 'Create Customer'}
            </ActionButton>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Code</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentCustomer?.code}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentCustomer?.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentCustomer?.region}
            >
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
              <option>Central</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sub-region</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentCustomer?.subRegion}
            >
              <option>Downtown</option>
              <option>Industrial</option>
              <option>Suburban</option>
              <option>Harbor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentCustomer?.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentCustomer?.phone}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Geofence Radius (M)</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentCustomer?.geofenceRadius}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Window</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
              defaultValue={currentCustomer?.deliveryWindow}
            />
          </div>
        </div>
      </Modal>
    </PageLayout>
  );
}
