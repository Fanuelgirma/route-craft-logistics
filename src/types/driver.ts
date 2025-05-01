
export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNo: string;
  depot: string;
  assignedVehicle?: string;
  status: 'Active' | 'Inactive' | 'On Leave';
}
