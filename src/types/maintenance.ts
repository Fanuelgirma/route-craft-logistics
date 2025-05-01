
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
