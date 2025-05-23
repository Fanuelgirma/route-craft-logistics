
import { useState, useEffect } from 'react';
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
import { Download, Plus, Loader2 } from 'lucide-react';
import ReturnableEntryModal from './ReturnableEntryModal';
import { returnablesService } from '@/services/returnablesService';
import { useToast } from '@/hooks/use-toast';

interface ReturnablesTableProps {
  status?: ReturnableStatus | ReturnableStatus[];
  showOverdueOnly?: boolean;
}

export default function ReturnablesTable({ status, showOverdueOnly = false }: ReturnablesTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReturnable, setEditingReturnable] = useState<ReturnableEntry | null>(null);
  const [returnables, setReturnables] = useState<ReturnableEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch returnables from Supabase
  useEffect(() => {
    const loadReturnables = async () => {
      try {
        setIsLoading(true);
        const data = await returnablesService.getAllReturnables();
        
        // Map the database columns to our ReturnableEntry type
        const mappedData: ReturnableEntry[] = data.map((item: any) => ({
          id: item['Trip ID'].toString(),
          tripId: item['Trip ID'].toString(),
          date: new Date(), // Default to current date as it's not in DB
          regNo: '', // Not in DB schema
          driver: item['Driver'] || '',
          customer: item['Customer'] || '',
          itemType: item['Item Type'] || 'Crate',
          quantityOut: item['Quantity Out'] || 0,
          quantityReturned: item['Quantity Returned'] || 0,
          status: item['Status'] || 'Pending Return',
          notes: item['Notes'] || '',
          proofOfReturn: item['Proof of Return'] ? [item['Proof of Return']] : [],
          createdAt: new Date(), // Default to current date as it's not in DB
          updatedAt: new Date(), // Default to current date as it's not in DB
          overdueBy: Math.floor(Math.random() * 10) // Random for demo purposes
        }));
        
        setReturnables(mappedData);
      } catch (error) {
        console.error('Failed to load returnables:', error);
        toast({
          title: "Error Loading Data",
          description: "Could not load returnable entries. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReturnables();
  }, [toast]);
  
  // Filter returnables based on props
  let filteredReturnables = [...returnables];
  
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

  const handleSaveReturnable = async (data: any) => {
    try {
      if (editingReturnable) {
        // Update existing returnable
        await returnablesService.updateReturnable(data.id, data);
        
        // Update local state
        const updatedReturnables = returnables.map(item => 
          item.id === editingReturnable.id ? { ...item, ...data } : item
        );
        setReturnables(updatedReturnables);
        
        toast({
          title: "Returnable Entry Updated",
          description: "The returnable entry has been successfully updated.",
          variant: "default"
        });
      } else {
        // Add new returnable
        const newReturnable = await returnablesService.createReturnable(data);
        
        // Map the database response to our ReturnableEntry type
        const mappedData: ReturnableEntry = {
          id: newReturnable['Trip ID'].toString(),
          tripId: newReturnable['Trip ID'].toString(),
          date: new Date(),
          regNo: '',
          driver: newReturnable['Driver'] || '',
          customer: newReturnable['Customer'] || '',
          itemType: newReturnable['Item Type'] || 'Crate',
          quantityOut: newReturnable['Quantity Out'] || 0,
          quantityReturned: newReturnable['Quantity Returned'] || 0,
          status: newReturnable['Status'] || 'Pending Return',
          notes: newReturnable['Notes'] || '',
          proofOfReturn: newReturnable['Proof of Return'] ? [newReturnable['Proof of Return']] : [],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Update local state
        setReturnables([...returnables, mappedData]);
        
        toast({
          title: "Returnable Entry Added",
          description: "The returnable entry has been successfully created.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error saving returnable:', error);
      toast({
        title: "Error Saving Data",
        description: "Could not save returnable entry. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <div className="p-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {isLoading ? 'Loading...' : `Showing ${filteredReturnables.length} results`}
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
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
            Add Returnable Entry
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
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
              {filteredReturnables.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                    No returnables found matching the current filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReturnables.map((returnable) => (
                  <TableRow 
                    key={returnable.id}
                    className={returnable.overdueBy && returnable.overdueBy > 0 ? 'bg-red-50' : undefined}
                  >
                    <TableCell className="font-medium">
                      <Link to={`/trips/${returnable.tripId}`} className="text-blue-600 hover:underline">
                        {returnable.tripId}
                      </Link>
                    </TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>{returnable.regNo || 'N/A'}</TableCell>
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
                ))
              )}
            </TableBody>
          </Table>
        )}
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
          onSave={handleSaveReturnable}
          returnable={editingReturnable || undefined}
        />
      )}
    </div>
  );
}
