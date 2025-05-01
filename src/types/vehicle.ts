
export interface Vehicle {
  id: string;
  vinNumber: string;
  regNo: string;
  model: string;
  make?: string;
  year?: number;
  tonnage?: number;
  vehicleType: string;
  depot: string;
  region?: string;
  subRegion?: string;
  status: 'Available' | 'Scheduled' | 'Dispatched' | 'In Transit' | 'Offline';
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  // Adding these properties needed by LiveMapPage
  plate?: string; 
  driver?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export type VehicleStatus = 'Available' | 'Scheduled' | 'Dispatched' | 'In Transit' | 'Offline';

export interface Region {
  id: string;
  name: string;
  subRegions: SubRegion[];
}

export interface SubRegion {
  id: string;
  name: string;
  regionId: string;
}

export interface Depot {
  id: string;
  name: string;
}

export interface VehicleType {
  id: string;
  name: string;
}
