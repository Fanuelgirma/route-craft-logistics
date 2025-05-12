
export interface MaintenanceRecord {
  id: string;
  purchaseNo: string;
  purchaseDate: string;
  registrationNumber: string;
  vehicleId: string;
  maintenanceService: string;
  cost: number;
  description?: string;
}

export interface MaintenanceService {
  id: string;
  name: string;
}

export interface ServiceTask {
  id: string;
  name: string;
}

export interface ServiceTaskExtended extends ServiceTask {
  description?: string;
  serviceEntries: number;
  serviceReminders: number;
  servicePrograms: number;
  workOrders: number;
  defaultReasonForRepair?: string;
  defaultCategoryCode?: string;
  defaultSystemCode?: string;
  defaultAssemblyCode?: string;
}

export interface ServiceEntry {
  id: string;
  assetId: string;
  assetName: string;
  assetThumbnail?: string;
  completionDate: string;
  watchers?: string[];
  repairPriority?: 'Scheduled' | 'Non-Scheduled' | 'Emergency';
  meter: number;
  serviceTasks: ServiceTask[];
  issues?: string[];
  vendor?: string;
  total: number;
  workOrder?: string;
  labels?: string[];
  status?: 'Active' | 'Completed' | 'Pending';
}

export interface Vendor {
  id: string;
  name: string;
}

export interface ServiceLineItem {
  id: string;
  taskId: string;
  taskName: string;
  cost: number;
  description?: string;
}

export interface RepairPriorityClass {
  id: string;
  name: 'Scheduled' | 'Non-Scheduled' | 'Emergency';
}
