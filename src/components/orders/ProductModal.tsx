
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  product?: Product;
}

interface ProductFormData {
  code: string;
  productName: string;
  price: number;
  saleableUnit: string;
  conversionFactor: number;
  salesRank?: number;
  salesStatus: 'Available' | 'Unavailable';
}

export default function ProductModal({ isOpen, onClose, title, product }: ProductModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with product data or defaults
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    defaultValues: product ? {
      code: product.code,
      productName: product.productName,
      price: product.price,
      saleableUnit: product.saleableUnit,
      conversionFactor: product.conversionFactor,
      salesRank: product.salesRank,
      salesStatus: product.salesStatus
    } : {
      salesStatus: 'Available'
    }
  });
  
  const onSubmit = (data: ProductFormData) => {
    setIsSubmitting(true);
    
    // In a real app, this would be a fetch call
    setTimeout(() => {
      toast({
        title: product ? 'Product Updated' : 'Product Added',
        description: `${data.productName} has been ${product ? 'updated' : 'added'} successfully`,
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="code">Code *</Label>
          <Input 
            id="code"
            {...register('code', { required: 'Code is required' })}
            className={errors.code ? 'border-red-500' : ''}
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="productName">Product Name *</Label>
          <Input 
            id="productName"
            {...register('productName', { required: 'Product name is required' })}
            className={errors.productName ? 'border-red-500' : ''}
          />
          {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="price">Price *</Label>
          <Input 
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' }
            })}
            className={errors.price ? 'border-red-500' : ''}
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="saleableUnit">Saleable Unit *</Label>
          <select 
            id="saleableUnit"
            {...register('saleableUnit', { required: 'Saleable unit is required' })}
            className={`w-full px-3 py-2 border rounded-md ${errors.saleableUnit ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="BLUE CRATE">BLUE CRATE</option>
            <option value="GMV">GMV</option>
            <option value="BOX">BOX</option>
          </select>
          {errors.saleableUnit && <p className="text-red-500 text-xs mt-1">{errors.saleableUnit.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="conversionFactor">Conversion Factor *</Label>
          <Input 
            id="conversionFactor"
            type="number"
            step="0.01"
            min="0"
            {...register('conversionFactor', { 
              required: 'Conversion factor is required',
              min: { value: 0, message: 'Conversion factor must be positive' }
            })}
            className={errors.conversionFactor ? 'border-red-500' : ''}
          />
          {errors.conversionFactor && <p className="text-red-500 text-xs mt-1">{errors.conversionFactor.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="salesRank">Sales Rank</Label>
          <Input 
            id="salesRank"
            type="number"
            min="0"
            {...register('salesRank', { 
              min: { value: 0, message: 'Sales rank must be positive' }
            })}
            className={errors.salesRank ? 'border-red-500' : ''}
          />
          {errors.salesRank && <p className="text-red-500 text-xs mt-1">{errors.salesRank.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="salesStatus">Sales Status *</Label>
          <select 
            id="salesStatus"
            {...register('salesStatus', { required: 'Sales status is required' })}
            className={`w-full px-3 py-2 border rounded-md ${errors.salesStatus ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          {errors.salesStatus && <p className="text-red-500 text-xs mt-1">{errors.salesStatus.message}</p>}
        </div>
      </form>
    </Modal>
  );
}
