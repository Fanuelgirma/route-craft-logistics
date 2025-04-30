
export type VehicleStatus = 'Available' | 'Scheduled' | 'Dispatched' | 'In Transit' | 'Offline';

export interface Location {
  lat: number;
  lng: number;
}

export interface Vehicle {
  id: string;
  plate: string;
  driver: string;
  status: VehicleStatus;
  location: Location;
}
