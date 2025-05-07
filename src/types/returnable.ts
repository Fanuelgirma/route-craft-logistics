
export type ReturnableStatus = 'Pending Return' | 'Returned' | 'Damaged' | 'Lost';

export type ReturnableType = 'Crate' | 'Pallet' | 'Cylinder' | 'Container' | 'Box' | 'Drum' | 'Tote' | 'Other';

export interface ReturnableEntry {
  id: string;
  tripId: string;
  date: Date;
  regNo: string;
  driver: string;
  customer: string;
  itemType: ReturnableType;
  quantityOut: number;
  quantityReturned: number;
  status: ReturnableStatus;
  notes?: string;
  proofOfReturn?: string[];
  createdAt: Date;
  updatedAt: Date;
  overdueBy?: number; // Number of days overdue
}

export interface ReturnableStats {
  totalSentToday: number;
  pendingReturns: number;
  returnedToday: number;
  overdueReturns: number;
}
