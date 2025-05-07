
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ReturnableEntry, ReturnableStatus } from '@/types/returnable';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Download, Plus } from 'lucide-react';
import ReturnableEntryModal from './ReturnableEntryModal';

interface ReturnablesTableProps {
  status?: ReturnableStatus | ReturnableStatus[];
  showOverdueOnly?: boolean;
}

// Mock data for demo
const mockReturnables: ReturnableEntry[] = [
  {
    id: '1',
    tripId: 'T-10045',
    date: new Date('2023-05-15'),
    regNo: 'AB12 CDE',
    driver: 'John Smith',
    customer: 'Acme Corp',
    itemType: 'Crate',
    quantityOut: 15,
    quantityReturned: 12,
    status: 'Pending Return',
    notes: 'Three crates still at customer site',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-16')
  },
  {
    id: '2',
    tripId: 'T-10046',
    date: new Date('2023-05-16'),
    regNo: 'XY34 ZWA',
    driver: 'Sarah Johnson',
    customer: 'Globex Ltd',
    itemType: 'Cylinder',
    quantityOut: 8,
    quantityReturned: 8,
    status: 'Returned',
    notes: 'All returned in good condition',
    createdAt: new Date('2023-05-16'),
    updatedAt: new Date('2023-05-18')
  },
  {
    id: '3',
    tripId: 'T-10047',
    date: new Date('2023-05-14'),
    regNo: 'LM56 NOP',
    driver: 'Mike Brown',
    customer: 'Initech Inc',
    itemType: 'Pallet',
    quantityOut: 10,
    quantityReturned: 8,
    status: 'Damaged',
    notes: '2 pallets damaged during handling',
    createdAt: new Date('2023-05-14'),
    updatedAt: new Date('2023-05-19')
  },
  {
    id: '4',
    tripId: 'T-10048',
    date: new Date('2023-05-13'),
    regNo: 'QR78 STU',
    driver: 'Lisa Davis',
    customer: 'Umbrella Co',
    itemType: 'Container',
    quantityOut: 5,
    quantityReturned: 3,
    status: 'Lost',
    notes: '2 containers not found at delivery site',
    createdAt: new Date('2023-05-13'),
    updatedAt: new Date('2023-05-15'),
    overdueBy: 10
  },
  {
    id: '5',
    tripId: 'T-10049',
    date: new Date('2023-05-16'),
    regNo: 'AB12 CDE',
    driver: 'John Smith',
    customer: 'Wayne Enterprises',
    itemType: 'Box',
    quantityOut: 24,
    quantityReturned: 20,
    status: 'Pending Return',
    notes: 'Follow-up scheduled for next week',
    createdAt: new Date('2023-05-16'),
    updatedAt: new Date('2023-05-17'),
    overdueBy: 5
  },
  {
    id: '6',
    tripId: 'T-10050',
    date: new Date('2023-05-15'),
    regNo: 'XY34 ZWA',
    driver: 'Sarah Johnson',
    customer: 'Stark Industries',
    itemType: 'Cylinder',
    quantityOut: 12,
    quantityReturned: 12,
    status: 'Returned',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-17')
  }
];

export default function ReturnablesTable({ status, showOverdueOnly = false }: ReturnablesTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReturnable, setEditingReturnable] = useState<ReturnableEntry | null>(null);
  
  // Filter returnables based on props
  let filteredReturnables = [...mockReturnables];
  
  if (status) {
    const statusArray = Array.isArray(status) ? status : [status];
    filteredReturnables = filteredReturnables.filter(item => 
      statusArray.includes(item.status as ReturnableStatus)
    );
  }
  
  if (showOverdueOnly) {
    filteredReturnables = filteredReturnables.filter(item => item.overdueBy && item.overdueBy > 0);
  }

  const getStatusColor = (status: ReturnableStatus) => {
    switch (status) {
      case 'Returned':
        return 'bg-green-100 text-green-800';
      case 'Pending Return':
        return 'bg-yellow-100 text-yellow-800';
      case 'Damaged':
      case 'Lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportCSV = () => {
    // In a real implementation, this would generate and download a CSV
    console.log('Exporting CSV of current view');
  };

  const handleAddNew = () => {
    setEditingReturnable(null);
    setIsModalOpen(true);
  };

  const handleEdit = (returnable: ReturnableEntry) => {
    setEditingReturnable(returnable);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="p-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {filteredReturnables.length} results
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportCSV}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button 
            onClick={handleAddNew}
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Returnable Entry
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Trip ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Reg No.</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Item Type</TableHead>
              <TableHead className="text-right">Qty Out</TableHead>
              <TableHead className="text-right">Qty Returned</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReturnables.map((returnable) => (
              <TableRow 
                key={returnable.id}
                className={returnable.overdueBy && returnable.overdueBy > 0 ? 'bg-red-50' : undefined}
              >
                <TableCell className="font-medium">
                  <Link to={`/trips/${returnable.tripId}`} className="text-blue-600 hover:underline">
                    {returnable.tripId}
                  </Link>
                </TableCell>
                <TableCell>{returnable.date.toLocaleDateString()}</TableCell>
                <TableCell>{returnable.regNo}</TableCell>
                <TableCell>{returnable.driver}</TableCell>
                <TableCell>{returnable.customer}</TableCell>
                <TableCell>{returnable.itemType}</TableCell>
                <TableCell className="text-right">{returnable.quantityOut}</TableCell>
                <TableCell className="text-right">{returnable.quantityReturned}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(returnable.status)}`}>
                    {returnable.status}
                    {returnable.overdueBy && returnable.overdueBy > 0 && (
                      <span className="ml-1 font-bold">({returnable.overdueBy}d)</span>
                    )}
                  </span>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{returnable.notes || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEdit(returnable)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredReturnables.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                  No returnables found matching the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 flex items-center justify-between border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing page 1 of 1
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <ReturnableEntryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          returnable={editingReturnable}
        />
      )}
    </div>
  );
}
