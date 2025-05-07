
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SaleFormData, SaleItem } from '@/types/sales';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultSaleItem: SaleItem = {
  id: '',
  name: '',
  quantity: 1,
  unitPrice: 0,
  tax: 0,
  total: 0
};

export default function NewSaleModal({ isOpen, onClose }: NewSaleModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SaleFormData>({
    customer: '',
    salesperson: '',
    orderDate: new Date(),
    items: [{ ...defaultSaleItem, id: '1' }],
    amountPaid: 0,
    paymentMethod: 'Cash',
    notes: ''
  });
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const calculateItemTotal = (item: SaleItem): number => {
    const subtotal = item.quantity * item.unitPrice;
    const tax = (item.tax || 0) / 100 * subtotal;
    return subtotal + tax;
  };

  const calculateTotal = (): number => {
    return formData.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const handleAddItem = () => {
    const newItems = [...formData.items, { 
      ...defaultSaleItem, 
      id: Math.random().toString(36).substring(2, 11)
    }];
    setFormData({ ...formData, items: newItems });
  };

  const handleRemoveItem = (id: string) => {
    if (formData.items.length === 1) {
      return;
    }
    const newItems = formData.items.filter(item => item.id !== id);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (id: string, field: keyof SaleItem, value: any) => {
    const updatedItems = formData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate total when quantity, unitPrice, or tax changes
        if (field === 'quantity' || field === 'unitPrice' || field === 'tax') {
          updatedItem.total = calculateItemTotal(updatedItem);
        }
        return updatedItem;
      }
      return item;
    });
    
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = () => {
    if (!formData.customer || !formData.salesperson) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Sale Created",
      description: "The sale has been successfully created",
      variant: "default"
    });
    
    onClose();
  };

  const totalAmount = calculateTotal();
  const balanceAmount = totalAmount - formData.amountPaid;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Sale</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Customer and Salesperson */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer*</Label>
              <Select 
                value={formData.customer} 
                onValueChange={(value) => setFormData({...formData, customer: value})}
              >
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corporation</SelectItem>
                  <SelectItem value="globex">Globex Inc</SelectItem>
                  <SelectItem value="initech">Initech LLC</SelectItem>
                  <SelectItem value="umbrella">Umbrella Corp</SelectItem>
                  <SelectItem value="stark">Stark Industries</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salesperson">Salesperson*</Label>
              <Select 
                value={formData.salesperson} 
                onValueChange={(value) => setFormData({...formData, salesperson: value})}
              >
                <SelectTrigger id="salesperson">
                  <SelectValue placeholder="Select Salesperson" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                  <SelectItem value="alice">Alice Williams</SelectItem>
                  <SelectItem value="peter">Peter Parker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Order Date and Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Order Date*</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.orderDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.orderDate}
                    onSelect={(date) => date && setFormData({...formData, orderDate: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Select due date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Order Items*</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddItem}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <Input
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Price"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, 'unitPrice', Number(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      type="number"
                      placeholder="Tax %"
                      value={item.tax || ''}
                      onChange={(e) => handleItemChange(item.id, 'tax', Number(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      readOnly
                      value={`$${calculateItemTotal(item).toFixed(2)}`}
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={formData.items.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amountPaid">Amount Paid</Label>
              <Input
                id="amountPaid"
                type="number"
                value={formData.amountPaid}
                onChange={(e) => setFormData({...formData, amountPaid: Number(e.target.value) || 0})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value: any) => setFormData({...formData, paymentMethod: value})}
              >
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          
          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Amount Paid:</span>
              <span>${formData.amountPaid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Balance:</span>
              <span className={balanceAmount > 0 ? "text-red-500" : "text-green-500"}>
                ${balanceAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={() => {
            handleSubmit();
            // Additional logic to generate invoice would go here
          }}>
            Save & Generate Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
