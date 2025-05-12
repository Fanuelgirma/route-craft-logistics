
import { ServiceTask, ServiceTaskExtended } from '@/types/maintenance';

// Mock data for service tasks
export const mockServiceTasks: ServiceTask[] = [
  {
    id: '1',
    name: 'Engine Oil & Filter Replacement',
  },
  {
    id: '2',
    name: 'Engine Air Filter Replacement',
  },
  {
    id: '3',
    name: 'Tire Rotation',
  },
  {
    id: '4',
    name: 'Brake Inspection',
  },
  {
    id: '5',
    name: 'ABS Control Module Replacement',
  },
  {
    id: '6',
    name: 'A/C Accumulator Replacement',
  },
  {
    id: '7', 
    name: 'Accelerator Pedal Inspect',
  },
  {
    id: '8',
    name: 'Accessories/Upfitting (Miscellaneous)',
  }
];

// Extended service task data for the table display
export const mockServiceTasksExtended: ServiceTaskExtended[] = mockServiceTasks.map(task => ({
  ...task,
  description: '',
  serviceEntries: Math.floor(Math.random() * 5),
  serviceReminders: Math.floor(Math.random() * 3),
  servicePrograms: Math.floor(Math.random() * 2),
  workOrders: Math.floor(Math.random() * 4),
  defaultCategoryCode: Math.random() > 0.5 ? 'Chassis' : 'Accessories',
  defaultSystemCode: Math.random() > 0.5 ? '013 - Brakes' : '044 - Fuel System',
  defaultAssemblyCode: Math.random() > 0.5 ? '011 - ABS, Anti-Lock System' : '007 - Throttle Controls',
}));
