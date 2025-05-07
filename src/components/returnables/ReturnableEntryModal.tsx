
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ReturnableEntry, ReturnableStatus, ReturnableType } from '@/types/returnable';
import { useToast } from '@/hooks/use-toast';
import { X, Upload } from 'lucide-react';

interface ReturnableEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnable: ReturnableEntry | null;
}

export default function ReturnableEntryModal({ 
  isOpen, 
  onClose,
  returnable 
}: ReturnableEntryModalProps) {
  // Default values for new returnable entry
  const defaultReturnable = {
    id: '',
    tripId: '',
    date: new Date(),
    regNo: '',
    driver: '',
    customer: '',
    itemType: 'Crate' as ReturnableType,
    quantityOut: 0,
    quantityReturned: 0,
    status: 'Pending Return' as ReturnableStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
    notes: ''
  };

  const [formData, setFormData] = useState<Partial<ReturnableEntry>>(
    returnable || defaultReturnable
  );
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const returnableTypes: ReturnableType[] = ['Crate', 'Pallet', 'Cylinder', 'Container', 'Box', 'Drum', 'Tote', 'Other'];
  const statuses: ReturnableStatus[] = ['Pending Return', 'Returned', 'Damaged', 'Lost'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = value ? parseInt(value, 10) : 0;
    setFormData({ ...formData, [name]: numValue });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (saveAndAddAnother: boolean = false) => {
    console.log('Submitting form data:', formData);
    console.log('Uploaded files:', uploadedFiles);

    // In a real implementation, this would save the data to the server
    toast({
      title: returnable ? "Returnable entry updated" : "Returnable entry created",
      description: `${formData.itemType} for ${formData.customer} has been ${returnable ? "updated" : "added"}.`,
      variant: "success",
    });

    if (saveAndAddAnother) {
      setFormData(defaultReturnable);
      setUploadedFiles([]);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{returnable ? 'Edit Returnable Entry' : 'Add Returnable Entry'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
          {/* Trip ID */}
          <div className="space-y-2">
            <Label htmlFor="tripId">Trip ID</Label>
            <Input 
              id="tripId" 
              name="tripId" 
              placeholder="T-12345" 
              value={formData.tripId} 
              onChange={handleInputChange} 
            />
          </div>

          {/* Driver */}
          <div className="space-y-2">
            <Label htmlFor="driver">Driver</Label>
            <Input 
              id="driver" 
              name="driver" 
              placeholder="Driver Name" 
              value={formData.driver} 
              onChange={handleInputChange} 
            />
          </div>

          {/* Customer */}
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Input 
              id="customer" 
              name="customer" 
              placeholder="Customer Name" 
              value={formData.customer} 
              onChange={handleInputChange} 
            />
          </div>

          {/* Vehicle Reg No */}
          <div className="space-y-2">
            <Label htmlFor="regNo">Vehicle Reg No</Label>
            <Input 
              id="regNo" 
              name="regNo" 
              placeholder="AB12 CDE" 
              value={formData.regNo} 
              onChange={handleInputChange} 
            />
          </div>

          {/* Item Type */}
          <div className="space-y-2">
            <Label htmlFor="itemType">Returnable Type</Label>
            <Select 
              value={formData.itemType} 
              onValueChange={(value) => handleSelectChange('itemType', value)}
            >
              <SelectTrigger id="itemType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {returnableTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Out */}
          <div className="space-y-2">
            <Label htmlFor="quantityOut">Quantity Sent</Label>
            <Input 
              id="quantityOut" 
              name="quantityOut" 
              type="number" 
              min={0} 
              value={formData.quantityOut} 
              onChange={(e) => handleNumberChange('quantityOut', e.target.value)} 
            />
          </div>

          {/* Quantity Returned */}
          <div className="space-y-2">
            <Label htmlFor="quantityReturned">Quantity Returned</Label>
            <Input 
              id="quantityReturned" 
              name="quantityReturned" 
              type="number" 
              min={0}
              max={formData.quantityOut} 
              value={formData.quantityReturned} 
              onChange={(e) => handleNumberChange('quantityReturned', e.target.value)} 
            />
          </div>

          {/* Notes */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes / Comments</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              placeholder="Add any additional notes here..." 
              value={formData.notes} 
              onChange={handleInputChange} 
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="fileUpload">Proof of Return (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-4">Drag and drop files here, or click to select files</p>
              <Input 
                id="fileUpload" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                multiple
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                Select Files
              </Button>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Uploaded Files</Label>
                <ul className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <span className="text-sm truncate max-w-[90%]">{file.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => handleSubmit(true)}>
            Save & Add Another
          </Button>
          <Button onClick={() => handleSubmit(false)}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
