
export interface Product {
  id: string;
  code: string;
  productName: string;
  price: number;
  saleableUnit: string;
  conversionFactor: number;
  salesRank?: number;
  salesStatus: 'Available' | 'Unavailable';
}

export interface VolumeSettings {
  defaultCrateCapacity: number;
  defaultGMVCapacity: number;
}
