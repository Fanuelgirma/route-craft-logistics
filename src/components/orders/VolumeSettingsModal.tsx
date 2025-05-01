
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { VolumeSettings } from '@/types/product';

interface VolumeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample default values
const defaultSettings: VolumeSettings = {
  defaultCrateCapacity: 24,
  defaultGMVCapacity: 12
};

export default function VolumeSettingsModal({ isOpen, onClose }: VolumeSettingsModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<VolumeSettings>({
    defaultValues: defaultSettings
  });
  
  const onSubmit = (data: VolumeSettings) => {
    setIsSubmitting(true);
    
    // In a real app, this would be a fetch call to update settings
    setTimeout(() => {
      toast({
        title: 'Settings Updated',
        description: 'Volume settings have been updated successfully',
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Volume Settings"
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="defaultCrateCapacity">Default Crate Capacity</Label>
          <Input 
            id="defaultCrateCapacity"
            type="number"
            step="0.01"
            min="0"
            {...register('defaultCrateCapacity', { 
              required: 'Default crate capacity is required',
              min: { value: 0, message: 'Capacity must be positive' }
            })}
            className={errors.defaultCrateCapacity ? 'border-red-500' : ''}
          />
          {errors.defaultCrateCapacity && (
            <p className="text-red-500 text-xs mt-1">{errors.defaultCrateCapacity.message}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="defaultGMVCapacity">Default GMV Capacity</Label>
          <Input 
            id="defaultGMVCapacity"
            type="number"
            step="0.01"
            min="0"
            {...register('defaultGMVCapacity', { 
              required: 'Default GMV capacity is required',
              min: { value: 0, message: 'Capacity must be positive' }
            })}
            className={errors.defaultGMVCapacity ? 'border-red-500' : ''}
          />
          {errors.defaultGMVCapacity && (
            <p className="text-red-500 text-xs mt-1">{errors.defaultGMVCapacity.message}</p>
          )}
        </div>
      </form>
    </Modal>
  );
}
