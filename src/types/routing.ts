
import { Order, OrderStatus } from './order';
import { Vehicle } from './vehicle';
import { Driver } from './driver';

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
  address: string;
  distance: number; // in KM
  volume: number;
  timeWindow?: {
    from: string;
    to: string;
  };
}

export interface Route {
  id: string;
  name: string;
  stops: RouteStop[];
  vehicleId?: string;
  vehicleRegNo?: string;
  driverId?: string;
  driverName?: string;
  capacityUtilization: number; // percentage
  distance: number; // in KM
  volume: number;
  color?: string; // For map visualization
  estimatedEndTime?: string;
}

export interface RouteBatch {
  id: string;
  routes: Route[];
  unplannedOrders: Order[];
  createdAt: string;
}

export type CustomerType = 'Retail' | 'Wholesale' | 'Distributor' | 'Other';

export interface RoutingLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'Warehouse' | 'Customer' | 'Driver Home' | 'Custom';
}

export interface TripPlan {
  id: string;
  name: string;
  startLocation: RoutingLocation;
  endLocation?: RoutingLocation | null;
  endLocationType: 'No End Location' | 'Return To Start' | 'Driver Default' | 'Warehouse' | 'Custom';
  date: Date;
  startTime: string; // Format: HH:mm
  endTime: string; // Format: HH:mm
  skillMatching: boolean;
  useTeamMemberProfile: boolean;
  addReturnToStart: boolean;
  ignoreTimeWindows: boolean;
  selectedStops: RouteStop[];
  selectedDrivers: Driver[];
  routes: Route[];
  createFixedOrderTrips: boolean;
}

export type RoutingStep = 'Trip Details' | 'Select Stops' | 'Select Team Members' | 'Trip Summary';
