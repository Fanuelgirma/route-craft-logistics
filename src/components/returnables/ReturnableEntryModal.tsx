
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReturnableType, ReturnableStatus, ReturnableEntry } from '@/types/returnable';
import { useToast } from '@/hooks/use-toast';

interface ReturnableEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  returnable?: ReturnableEntry;
}

export default function ReturnableEntryModal({ isOpen, onClose, onSave, returnable }: ReturnableEntryModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tripId: '',
    driver: '',
    customer: '',
    itemType: 'Crate' as ReturnableType,
    quantityOut: 0,
    quantityReturned: 0,
    status: 'Pending Return' as ReturnableStatus,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If a returnable is provided, populate the form with its data
  useEffect(() => {
    if (returnable) {
      setFormData({
        tripId: returnable.tripId || '',
        driver: returnable.driver || '',
        customer: returnable.customer || '',
        itemType: returnable.itemType || 'Crate',
        quantityOut: returnable.quantityOut || 0,
        quantityReturned: returnable.quantityReturned || 0,
        status: returnable.status || 'Pending Return',
        notes: returnable.notes || ''
      });
    } else {
      // Reset the form for new entries
      setFormData({
        tripId: '',
        driver: '',
        customer: '',
        itemType: 'Crate',
        quantityOut: 0,
        quantityReturned: 0,
        status: 'Pending Return',
        notes: ''
      });
    }
  }, [returnable]);

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async () => {
    if (!formData.tripId || !formData.customer) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await onSave({
        ...formData,
        id: returnable?.id || formData.tripId,
        date: returnable?.date || new Date(),
        createdAt: returnable?.createdAt || new Date(),
        updatedAt: new Date(),
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving returnable:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{returnable ? 'Edit' : 'Add'} Returnable Entry</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tripId">Trip ID *</Label>
              <Input 
                id="tripId" 
                value={formData.tripId} 
                onChange={(e) => handleChange('tripId', e.target.value)}
                placeholder="Enter Trip ID" 
                disabled={!!returnable} // Disable editing tripId for existing entries
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driver">Driver</Label>
              <Input 
                id="driver" 
                value={formData.driver} 
                onChange={(e) => handleChange('driver', e.target.value)} 
                placeholder="Driver Name"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer">Customer *</Label>
            <Input 
              id="customer" 
              value={formData.customer} 
              onChange={(e) => handleChange('customer', e.target.value)} 
              placeholder="Customer Name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemType">Item Type</Label>
              <Select 
                value={formData.itemType} 
                onValueChange={(value) => handleChange('itemType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Crate">Crate</SelectItem>
                  <SelectItem value="Pallet">Pallet</SelectItem>
                  <SelectItem value="Cylinder">Cylinder</SelectItem>
                  <SelectItem value="Container">Container</SelectItem>
                  <SelectItem value="Box">Box</SelectItem>
                  <SelectItem value="Drum">Drum</SelectItem>
                  <SelectItem value="Tote">Tote</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleChange('status', value as ReturnableStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending Return">Pending Return</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                  <SelectItem value="Damaged">Damaged</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantityOut">Quantity Out</Label>
              <Input 
                id="quantityOut" 
                type="number" 
                value={formData.quantityOut.toString()} 
                onChange={(e) => handleChange('quantityOut', parseInt(e.target.value) || 0)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantityReturned">Quantity Returned</Label>
              <Input 
                id="quantityReturned" 
                type="number" 
                value={formData.quantityReturned.toString()} 
                onChange={(e) => handleChange('quantityReturned', parseInt(e.target.value) || 0)} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              value={formData.notes} 
              onChange={(e) => handleChange('notes', e.target.value)} 
              placeholder="Add any notes about this returnable"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Proof of Return</Label>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer hover:bg-gray-50">
              <p className="text-sm text-gray-500">Drag and drop or click to upload images</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : returnable ? 'Update' : 'Save'} Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
