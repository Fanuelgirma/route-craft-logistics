
import React, { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import ActionButton from '@/components/ui/ActionButton';
import AddKpiModal from '@/components/kpis/AddKpiModal';
import EditKpiModal from '@/components/kpis/EditKpiModal';
import { Kpi } from '@/types/kpi';

// Mock data
const mockKpis: Kpi[] = [
  { id: '1', name: 'On-Time Delivery', type: 'Operational', unit: 'Percentage', target: 95, calculation: 'Deliveries on time / Total deliveries', value1: 92, value2: 90 },
  { id: '2', name: 'Vehicle Utilization', type: 'Efficiency', unit: 'Percentage', target: 85, calculation: 'Space used / Total space', value1: 80, value2: 78 },
  { id: '3', name: 'Fuel Efficiency', type: 'Cost', unit: 'L/100km', target: 12, calculation: 'Total fuel / Distance traveled', value1: 13.2, value2: 13.5 },
  { id: '4', name: 'Delivery Cost', type: 'Financial', unit: 'USD/km', target: 2.5, calculation: 'Total cost / Distance traveled', value1: 2.7, value2: 2.8 },
  { id: '5', name: 'Customer Satisfaction', type: 'Customer', unit: 'Scale 1-10', target: 8.5, calculation: 'Average rating score', value1: 8.2, value2: 8.3 },
];

const KPIsPage = () => {
  const [kpis, setKpis] = useState<Kpi[]>(mockKpis);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState<Kpi | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredKpis = kpis.filter(kpi => 
    kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kpi.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kpi.calculation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddKpi = (newKpi: Kpi) => {
    setKpis([...kpis, { ...newKpi, id: (kpis.length + 1).toString() }]);
    setIsAddModalOpen(false);
  };

  const handleEditKpi = (updatedKpi: Kpi) => {
    setKpis(kpis.map(kpi => kpi.id === updatedKpi.id ? updatedKpi : kpi));
    setIsEditModalOpen(false);
    setSelectedKpi(null);
  };

  const handleDeleteKpi = (id: string) => {
    setKpis(kpis.filter(kpi => kpi.id !== id));
  };

  const handleEdit = (kpi: Kpi) => {
    setSelectedKpi(kpi);
    setIsEditModalOpen(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKpis = filteredKpis.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredKpis.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PageLayout>
      <PageHeader
        title="KPI Management"
        breadcrumbs={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'KPIs', href: '/kpis' }]}
        actions={
          <ActionButton
            variant="primary"
            leftIcon={<PlusCircle size={16} />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add KPI
          </ActionButton>
        }
      />
      
      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search KPIs..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-logistic-accent focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>KPI Name</TableHead>
                <TableHead>KPI Type</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Calculation</TableHead>
                <TableHead>Value 1</TableHead>
                <TableHead>Value 2</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentKpis.map((kpi) => (
                <TableRow key={kpi.id}>
                  <TableCell>{kpi.name}</TableCell>
                  <TableCell>{kpi.type}</TableCell>
                  <TableCell>{kpi.unit}</TableCell>
                  <TableCell>{kpi.target} {kpi.unit}</TableCell>
                  <TableCell>{kpi.calculation}</TableCell>
                  <TableCell>{kpi.value1}</TableCell>
                  <TableCell>{kpi.value2}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(kpi)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteKpi(kpi.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {currentKpis.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No KPIs found.
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

      {isAddModalOpen && (
        <AddKpiModal 
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddKpi}
        />
      )}

      {isEditModalOpen && selectedKpi && (
        <EditKpiModal 
          kpi={selectedKpi}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedKpi(null);
          }}
          onSave={handleEditKpi}
        />
      )}
    </PageLayout>
  );
};

export default KPIsPage;
