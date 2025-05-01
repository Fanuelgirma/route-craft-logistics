
export interface Customer {
  id: string;
  code: string;
  name: string;
  region?: string;
  subRegion?: string;
  email?: string;
  phone: string;
  numberOfOrders: number;
  geofenceRadius: number;
  deliveryWindowFrom: string;
  deliveryWindowTo: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

export interface SubRegion {
  id: string;
  name: string;
  numberOfCustomers: number;
  created: string;
  createdBy: string;
  status: 'Active' | 'Inactive';
}

export interface NotificationTemplate {
  id: string;
  title: string;
  body: string;
  type: 'Email' | 'SMS';
}
