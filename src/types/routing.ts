
import { Order, OrderStatus } from './order';
import { Vehicle } from './vehicle';

export interface RouteConfig {
  id: string;
  name: string;
  globalDeliveryWindowFrom: string; // Format: HH:mm
  globalDeliveryWindowTo: string; // Format: HH:mm
  maximumStops: number;
  maximumUtilization: number;
  serviceTimePerCustomer: number; // in minutes
  routingStrategy: 'Dynamic' | 'Dynamic with Sub-Regions' | 'Static';
  applyCustomerTimeWindow: boolean;
  useCustomerServiceTime: boolean;
  returnTrip: boolean;
}

export interface RouteStop {
  id: string;
  dropNo: number;
  orderId: string;
  customer: string;
  distance: number; // in KM
  volume: number;
}

export interface Route {
  id: string;
  name: string;
  stops: RouteStop[];
  vehicleId?: string;
  vehicleRegNo?: string;
  capacityUtilization: number; // percentage
  distance: number; // in KM
  volume: number;
  color?: string; // For map visualization
}

export interface RouteBatch {
  id: string;
  routes: Route[];
  unplannedOrders: Order[];
  createdAt: string;
}

export type CustomerType = 'Retail' | 'Wholesale' | 'Distributor' | 'Other';
