
import { useState } from 'react';
import { Edit, Plus, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import SearchInput from '@/components/ui/SearchInput';
import { MaintenanceRecord } from '@/types/maintenance';
import AddMaintenanceModal from './AddMaintenanceModal';
import { toast } from '@/hooks/use-toast';

// Mock data for demonstration
const MOCK_MAINTENANCE: MaintenanceRecord[] = [
  { id: '1', purchaseNo: '15', purchaseDate: '02/04/2025', registrationNumber: 'KAW-132B2', vehicleId: '4', maintenanceService: 'License', cost: 600, description: 'License renewal' },
  { id: '2', purchaseNo: '10', purchaseDate: '09/10/2024', registrationNumber: 'KAW-129B2', vehicleId: '2', maintenanceService: 'Tyre change', cost: 500, description: 'Replacement of rear tyres' },
  { id: '3', purchaseNo: '12', purchaseDate: '06/10/2024', registrationNumber: 'KAW-129B2', vehicleId: '2', maintenanceService: 'Oil Change', cost: 3500, description: 'Regular oil change' },
  { id: '4', purchaseNo: '11', purchaseDate: '09/10/2024', registrationNumber: 'KAW 949D2', vehicleId: '6', maintenanceService: 'Oil Change', cost: 3500, description: 'Regular oil change' },
  { id: '5', purchaseNo: '13', purchaseDate: '15/01/2025', registrationNumber: 'KAB-987', vehicleId: '1', maintenanceService: 'Tyres', cost: 150000, description: 'Full set of new tyres' },
];

export default function MaintenanceTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecords, setSelectedRecords] = useState<Set<string>>(new Set());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);
  
  // Filter maintenance records based on search query and date range
  const filteredRecords = MOCK_MAINTENANCE.filter(record => {
    // Filter by search query
    if (searchQuery && !record.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !record.maintenanceService.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by date range (simplified - in a real app you'd use proper date parsing)
    if (startDate && new Date(record.purchaseDate) < new Date(startDate)) {
      return false;
    }
    
    if (endDate && new Date(record.purchaseDate) > new Date(endDate)) {
      return false;
    }
    
    return true;
  });
  
  const toggleRecord = (id: string) => {
    const newSelected = new Set(selectedRecords);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRecords(newSelected);
  };
  
  const toggleAll = () => {
    if (selectedRecords.size === filteredRecords.length) {
      setSelectedRecords(new Set());
    } else {
      setSelectedRecords(new Set(filteredRecords.map(r => r.id)));
    }
  };
  
  const handleAddClick = () => {
    setSelectedRecord(null);
    setShowAddModal(true);
  };
  
  const handleEditClick = (record: MaintenanceRecord) => {
    setSelectedRecord(record);
    setShowAddModal(true);
  };
  
  const handleDelete = () => {
    // Here we would normally send the delete request to the server
    console.log('Deleting records:', Array.from(selectedRecords));
    
    // Show toast notification
    toast({
      title: "Records deleted",
      description: `${selectedRecords.size} maintenance records have been deleted.`,
    });
    
    // Clear selection
    setSelectedRecords(new Set());
  };
  
  // Calculate total cost
  const totalCost = filteredRecords.reduce((sum, record) => sum + record.cost, 0);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              className="pl-10 pr-3 py-2 border rounded-md"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start date"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              className="pl-10 pr-3 py-2 border rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End date"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-50"
            disabled={selectedRecords.size === 0}
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
          
          <Button 
            className="bg-logistic hover:bg-logistic/80"
            onClick={handleAddClick}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Maintenance
          </Button>
        </div>
      </div>
      
      <div className="flex mb-4">
        <SearchInput 
          placeholder="Search table..." 
          onSearch={setSearchQuery}
          className="w-full md:w-64"
        />
      </div>
      
      <div className="bg-white rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="rounded text-logistic-accent focus:ring-logistic-accent"
                  checked={selectedRecords.size === filteredRecords.length && filteredRecords.length > 0}
                  onChange={toggleAll}
                />
              </TableHead>
              <TableHead>Purchase No</TableHead>
              <TableHead>Maintenance Date</TableHead>
              <TableHead>Registration Number</TableHead>
              <TableHead>Maintenance Service</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow 
                key={record.id}
                className="hover:bg-gray-50"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded text-logistic-accent focus:ring-logistic-accent"
                    checked={selectedRecords.has(record.id)}
                    onChange={() => toggleRecord(record.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{record.purchaseNo}</TableCell>
                <TableCell>{record.purchaseDate}</TableCell>
                <TableCell>{record.registrationNumber}</TableCell>
                <TableCell>{record.maintenanceService}</TableCell>
                <TableCell>{record.cost.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditClick(record)}
                  >
                    <span className="sr-only">Edit</span>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            <TableRow>
              <TableCell colSpan={5} className="font-bold text-right">TOTAL</TableCell>
              <TableCell colSpan={2} className="font-bold">KES {totalCost.toLocaleString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination would go here */}
      <div className="flex justify-end mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRecords.length}</span> of{" "}
          <span className="font-medium">{filteredRecords.length}</span> results
        </div>
      </div>
      
      {/* Maintenance Modal */}
      <AddMaintenanceModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        maintenanceRecord={selectedRecord}
      />
    </div>
  );
}
