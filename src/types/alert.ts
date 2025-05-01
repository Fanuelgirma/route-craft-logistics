
export type AlertStatus = 'Resolved' | 'Unresolved';

export interface Alert {
  id: string;
  kpiName: string;
  driver: string;
  message: string;
  status: AlertStatus;
  sentAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}
