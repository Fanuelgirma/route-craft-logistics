
export type OrderStatus =
  | 'Pending'
  | 'Ready For Dispatch'
  | 'In Transit'
  | 'Arrived At Customer'
  | 'Completed'
  | 'Cancelled';

export interface Order {
  id: string;
  orderNo: string;
  customer: string;
  phoneNumber: string;
  driver?: string;
  volume: string;
  createdAt: string;
  status: OrderStatus;
  depot?: string;
  region?: string;
  subRegion?: string;
  vehicleRegNo?: string;
  products?: OrderProduct[];
}

export interface OrderProduct {
  code: string;
  productName: string;
  quantity: number;
  uom: string;
  volumePerUnit: number;
  lineVolume: number;
}

export interface TimelineEvent {
  status: OrderStatus;
  timestamp: string;
  user: string;
}
