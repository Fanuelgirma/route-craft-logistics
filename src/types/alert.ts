
export type AlertStatus = 'Resolved' | 'Unresolved' | 'All';

export interface Alert {
  id: string;
  kpiName: string;
  driver: string;
  message: string;
  status: AlertStatus;
  sentAt: Date;
  resolvedAt: Date | null;
  resolvedBy: string | null;
  resolutionReason?: string;
}
