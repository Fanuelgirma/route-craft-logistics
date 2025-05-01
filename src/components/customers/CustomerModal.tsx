
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Customer } from '@/types/customer';
import { useToast } from '@/hooks/use-toast';

interface CustomerModalProps {
  customer: Customer | null;
  open: boolean;
  onClose: () => void;
}

export default function CustomerModal({
  customer,
  open,
  onClose
}: CustomerModalProps) {
  const isEditing = !!customer;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<Customer>>({
    code: '',
    name: '',
    region: '',
    subRegion: '',
    email: '',
    phone: '',
    geofenceRadius: 0,
    deliveryWindowFrom: '08:00 AM',
    deliveryWindowTo: '05:00 PM',
    latitude: undefined,
    longitude: undefined
  });
  
  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        code: '',
        name: '',
        region: '',
        subRegion: '',
        email: '',
        phone: '',
        geofenceRadius: 0,
        deliveryWindowFrom: '08:00 AM',
        deliveryWindowTo: '05:00 PM',
        latitude: undefined,
        longitude: undefined
      });
    }
  }, [customer]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation would go here
    
    // Mock API call
    toast({
      title: isEditing ? "Customer Updated" : "Customer Created",
      description: `${formData.name} has been ${isEditing ? 'updated' : 'added'} successfully.`
    });
    
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Code*</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone*</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Region*</Label>
              <Select
                value={formData.region}
                onValueChange={(value) => handleSelectChange('region', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEFAULT">DEFAULT</SelectItem>
                  <SelectItem value="ZONE 1">ZONE 1</SelectItem>
                  <SelectItem value="ZONE 2">ZONE 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subRegion">Sub-Region*</Label>
              <Select
                value={formData.subRegion}
                onValueChange={(value) => handleSelectChange('subRegion', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sub-Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KITUI">KITUI</SelectItem>
                  <SelectItem value="NAMANGA">NAMANGA</SelectItem>
                  <SelectItem value="BURUBURU">BURUBURU</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude*</Label>
              <Input
                id="latitude"
                name="latitude"
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude*</Label>
              <Input
                id="longitude"
                name="longitude"
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryWindowFrom">Delivery Window From*</Label>
              <Input
                id="deliveryWindowFrom"
                name="deliveryWindowFrom"
                type="time"
                value={formData.deliveryWindowFrom}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryWindowTo">Delivery Window To*</Label>
              <Input
                id="deliveryWindowTo"
                name="deliveryWindowTo"
                type="time"
                value={formData.deliveryWindowTo}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="geofenceRadius">Geofence Radius (m)*</Label>
              <Input
                id="geofenceRadius"
                name="geofenceRadius"
                type="number"
                min="0"
                value={formData.geofenceRadius}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Save Changes' : 'Add Customer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
